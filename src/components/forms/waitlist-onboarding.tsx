"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  waitlistOnboarding,
  type WaitlistAudience,
} from "@/content/waitlist";
import {
  emailWaitlistSchema,
  onboardingWaitlistSchema,
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FloatingPanelBody,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelHeader,
  FloatingPanelRoot,
  useFloatingPanel,
} from "@/components/ui/floating-panel";
import styles from "./waitlist-onboarding.module.css";

type Answers = Record<string, string[]>;
type PanelStep = "email" | "audience" | "question";
type WaitlistIntent = "default" | "app";

type WaitlistOnboardingProps = {
  cta: string;
  source?: string;
  triggerClassName?: string;
  fullWidth?: boolean;
  /** email = input + CTA (hero); button = CTA opens full modal */
  variant?: "email" | "button";
  placeholder?: string;
  /** app = store/download copy that leads with get-the-app messaging */
  intent?: WaitlistIntent;
};

function toggleValue(
  current: string[],
  value: string,
  mode: "single" | "multi",
): string[] {
  if (mode === "single") {
    return [value];
  }
  return current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
}

function stepMeta(
  step: PanelStep,
  hasEmailUpFront: boolean,
  questionIndex: number,
  questionCount: number,
) {
  const questionSteps = Math.max(questionCount, 1);
  const base = hasEmailUpFront ? 1 : 2; // audience (+ optional email)
  const total = base + questionSteps;

  if (step === "email") return { index: 1, total };
  if (step === "audience") {
    return { index: hasEmailUpFront ? 1 : 2, total };
  }
  return {
    index: base + questionIndex + 1,
    total,
  };
}

function WaitlistButtonTrigger({
  cta,
  fullWidth,
  triggerClassName,
  onOpen,
}: {
  cta: string;
  fullWidth: boolean;
  triggerClassName?: string;
  onOpen: (rect: DOMRect | null) => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={triggerRef}
      type="button"
      className={`${styles.trigger} ${fullWidth ? styles.triggerFull : ""} ${triggerClassName ?? ""}`.trim()}
      aria-haspopup="dialog"
      onClick={() =>
        onOpen(triggerRef.current?.getBoundingClientRect() ?? null)
      }
    >
      {cta}
    </button>
  );
}

function WaitlistEmailTrigger({
  cta,
  fullWidth,
  placeholder,
  onStart,
}: {
  cta: string;
  fullWidth: boolean;
  placeholder: string;
  onStart: (email: string, rect: DOMRect | null) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const openModal = (nextEmail: string) => {
    onStart(
      nextEmail,
      formRef.current?.getBoundingClientRect() ?? null,
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const trimmed = email.trim();

    // Empty email still opens the modal at the email step.
    if (!trimmed) {
      openModal("");
      return;
    }

    const result = emailWaitlistSchema.safeParse({ email: trimmed });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    openModal(result.data.email);
  };

  return (
    <form
      ref={formRef}
      className={`${styles.emailForm} ${fullWidth ? styles.emailFormFull : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <Input
        id="waitlist-email-capture"
        type="email"
        name="email"
        placeholder={placeholder}
        autoComplete="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setError("");
        }}
        error={error}
        aria-label="Email address"
      />
      <Button type="submit">{cta}</Button>
    </form>
  );
}

export function WaitlistPanel({
  source,
  initialEmail,
  intent = "default",
}: {
  source: string;
  initialEmail: string;
  intent?: WaitlistIntent;
}) {
  const { closeFloatingPanel, isOpen } = useFloatingPanel();
  const hasEmailUpFront = Boolean(initialEmail.trim());

  const [step, setStep] = useState<PanelStep>(
    hasEmailUpFront ? "audience" : "email",
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [audience, setAudience] = useState<WaitlistAudience | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const advanceTimerRef = useRef<number | null>(null);

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    clearAdvanceTimer();
    setEmail(initialEmail);
    setStep(initialEmail.trim() ? "audience" : "email");
    setQuestionIndex(0);
    setAudience(null);
    setAnswers({});
    setError("");
    setStatus("idle");
  }, [isOpen, initialEmail]);

  useEffect(() => () => clearAdvanceTimer(), []);

  const questions = audience
    ? waitlistOnboarding.questionsByAudience[audience]
    : [];
  const currentQuestion = questions[questionIndex] ?? null;
  const isLastQuestion =
    questions.length > 0 && questionIndex >= questions.length - 1;

  const emailCopy =
    intent === "app"
      ? {
          heading: waitlistOnboarding.steps.email.headingApp,
          supporting: waitlistOnboarding.steps.email.supportingApp,
        }
      : {
          heading: waitlistOnboarding.steps.email.heading,
          supporting: waitlistOnboarding.steps.email.supporting,
        };

  const submitWaitlist = async (options?: {
    skipped?: boolean;
    nextAudience?: WaitlistAudience | null;
    nextAnswers?: Answers;
    nextEmail?: string;
  }) => {
    setError("");
    const payload = {
      email: (options?.nextEmail ?? email).trim(),
      audience: options?.nextAudience ?? audience ?? undefined,
      answers: options?.nextAnswers ?? answers,
      source,
      skippedQuestions: options?.skipped ?? false,
    };
    const result = onboardingWaitlistSchema.safeParse(payload);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Email is required");
      setStatus("idle");
      if (!payload.email) setStep("email");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const finishOrAdvance = (nextAnswers: Answers) => {
    if (isLastQuestion) {
      void submitWaitlist({
        nextAudience: audience,
        nextAnswers,
      });
      return;
    }
    setQuestionIndex((current) => current + 1);
  };

  const handleEmailContinue = () => {
    setError("");
    const result = emailWaitlistSchema.safeParse({ email: email.trim() });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setEmail(result.data.email);
    setStep("audience");
  };

  const selectAudience = (id: WaitlistAudience) => {
    setAudience(id);
    setAnswers({});
    setQuestionIndex(0);
    setStep("question");
  };

  const selectAnswer = (
    questionId: string,
    optionId: string,
    mode: "single" | "multi",
  ) => {
    if (!audience || !currentQuestion || status === "loading") return;

    clearAdvanceTimer();

    const next = {
      ...answers,
      [questionId]: toggleValue(answers[questionId] ?? [], optionId, mode),
    };
    setAnswers(next);

    // Multi-select: stay on step until Continue.
    if (mode === "multi") return;

    // Single-select: paint selection, then advance or submit.
    advanceTimerRef.current = window.setTimeout(() => {
      advanceTimerRef.current = null;
      finishOrAdvance(next);
    }, 180);
  };

  const handleQuestionContinue = () => {
    if (!currentQuestion) return;
    if ((answers[currentQuestion.id]?.length ?? 0) === 0) return;
    finishOrAdvance(answers);
  };

  const handleSkip = () => {
    void submitWaitlist({ skipped: true });
  };

  const handleBack = () => {
    if (step === "question") {
      if (questionIndex > 0) {
        setQuestionIndex((current) => current - 1);
        return;
      }
      setStep("audience");
      return;
    }
    if (step === "audience" && !hasEmailUpFront) {
      setStep("email");
    }
  };

  const { index: stepIndex, total: totalSteps } = stepMeta(
    step,
    hasEmailUpFront,
    questionIndex,
    questions.length || 2,
  );
  const isFirstStep =
    step === "email" || (step === "audience" && hasEmailUpFront);

  if (status === "loading") {
    return (
      <FloatingPanelContent
        className={styles.panel}
        titleId="waitlist-title"
        header={<FloatingPanelHeader>Almost there</FloatingPanelHeader>}
      >
        <FloatingPanelBody className={styles.body}>
          <div className={styles.submitting} role="status" aria-live="polite">
            <span className={styles.spinner} aria-hidden />
            <h3 id="waitlist-title" className={styles.stepHeading}>
              {waitlistOnboarding.steps.submitting.heading}
            </h3>
            <p className={styles.stepSupporting}>
              {waitlistOnboarding.steps.submitting.body}
            </p>
          </div>
        </FloatingPanelBody>
      </FloatingPanelContent>
    );
  }

  if (status === "success") {
    return (
      <FloatingPanelContent
        className={styles.panel}
        titleId="waitlist-title"
        header={<FloatingPanelHeader>You&apos;re in</FloatingPanelHeader>}
      >
        <FloatingPanelBody className={styles.body}>
          <div className={styles.success}>
            <Image
              src="/addons/check.png"
              alt=""
              width={160}
              height={160}
              className={styles.successIllustration}
              priority
            />
            <h3 id="waitlist-title" className={styles.stepHeading}>
              {waitlistOnboarding.steps.success.heading}
            </h3>
            <p className={styles.stepSupporting}>
              {waitlistOnboarding.steps.success.body}
            </p>
          </div>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <span />
          <Button type="button" onClick={closeFloatingPanel}>
            {waitlistOnboarding.steps.success.close}
          </Button>
        </FloatingPanelFooter>
      </FloatingPanelContent>
    );
  }

  const multiHasSelection =
    currentQuestion?.mode === "multi" &&
    (answers[currentQuestion.id]?.length ?? 0) > 0;

  return (
    <FloatingPanelContent
      className={styles.panel}
      titleId="waitlist-title"
      header={
        <FloatingPanelHeader>
          {waitlistOnboarding.nav.stepLabel(stepIndex, totalSteps)}
        </FloatingPanelHeader>
      }
    >
      <FloatingPanelBody className={styles.body}>
        {step === "email" ? (
          <div className={styles.step}>
            <h3 id="waitlist-title" className={styles.stepHeading}>
              {emailCopy.heading}
            </h3>
            <p className={styles.stepSupporting}>{emailCopy.supporting}</p>
            <Input
              id="waitlist-onboarding-email"
              type="email"
              name="email"
              placeholder={waitlistOnboarding.steps.email.placeholder}
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              error={error}
              aria-label="Email address"
            />
            <p className={styles.trust}>{waitlistOnboarding.steps.email.trust}</p>
          </div>
        ) : null}

        {step === "audience" ? (
          <div className={styles.step}>
            <h3 id="waitlist-title" className={styles.stepHeading}>
              {waitlistOnboarding.steps.audience.heading}
            </h3>
            <p className={styles.stepSupporting}>
              {waitlistOnboarding.steps.audience.supporting}
            </p>
            <div
              className={styles.audienceList}
              role="radiogroup"
              aria-label="Audience"
            >
              {waitlistOnboarding.audiences.map((item) => {
                const selected = audience === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={`${styles.audienceCard} ${selected ? styles.optionSelected : ""}`}
                    onClick={() => selectAudience(item.id)}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === "question" && currentQuestion ? (
          <div className={styles.step}>
            <h3 id="waitlist-title" className={styles.stepHeading}>
              {currentQuestion.prompt}
            </h3>
            <p className={styles.stepSupporting}>
              {currentQuestion.mode === "multi"
                ? waitlistOnboarding.steps.details.multiHint
                : waitlistOnboarding.steps.details.supporting}
            </p>
            <div
              className={styles.optionGrid}
              role={currentQuestion.mode === "single" ? "radiogroup" : "group"}
              aria-label={currentQuestion.prompt}
            >
              {currentQuestion.options.map((option) => {
                const selected = (answers[currentQuestion.id] ?? []).includes(
                  option.id,
                );
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.optionButton} ${selected ? styles.optionSelected : ""}`}
                    aria-pressed={
                      currentQuestion.mode === "multi" ? selected : undefined
                    }
                    role={
                      currentQuestion.mode === "single" ? "radio" : undefined
                    }
                    aria-checked={
                      currentQuestion.mode === "single" ? selected : undefined
                    }
                    onClick={() =>
                      selectAnswer(
                        currentQuestion.id,
                        option.id,
                        currentQuestion.mode,
                      )
                    }
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {error && step !== "email" ? (
          <p className={styles.inlineError} role="alert">
            {error}
          </p>
        ) : null}
      </FloatingPanelBody>
      <FloatingPanelFooter>
        <div className={styles.footerActions}>
          <div className={styles.footerLeft}>
            {isFirstStep ? (
              <FloatingPanelCloseButton />
            ) : (
              <Button type="button" variant="outline" onClick={handleBack}>
                {waitlistOnboarding.nav.back}
              </Button>
            )}
            {step !== "email" ? (
              <button
                type="button"
                className={styles.skip}
                onClick={handleSkip}
              >
                {waitlistOnboarding.skip}
              </button>
            ) : null}
          </div>
          {step === "email" ? (
            <Button type="button" onClick={handleEmailContinue}>
              {waitlistOnboarding.steps.email.submit}
            </Button>
          ) : step === "question" && currentQuestion?.mode === "multi" ? (
            <Button
              type="button"
              disabled={!multiHasSelection}
              onClick={handleQuestionContinue}
            >
              {isLastQuestion
                ? "Join waitlist"
                : waitlistOnboarding.nav.continue}
            </Button>
          ) : (
            <span className={styles.footerHint}>Tap to continue</span>
          )}
        </div>
      </FloatingPanelFooter>
    </FloatingPanelContent>
  );
}

function WaitlistShell({
  cta,
  source,
  triggerClassName,
  fullWidth,
  variant,
  placeholder,
  intent,
}: Required<
  Pick<
    WaitlistOnboardingProps,
    "cta" | "source" | "fullWidth" | "variant" | "intent"
  >
> &
  Pick<WaitlistOnboardingProps, "triggerClassName" | "placeholder">) {
  const { openFloatingPanel } = useFloatingPanel();
  const [initialEmail, setInitialEmail] = useState("");
  const panelTitle =
    intent === "app" ? waitlistOnboarding.titleApp : waitlistOnboarding.title;

  return (
    <>
      {variant === "email" ? (
        <WaitlistEmailTrigger
          cta={cta}
          fullWidth={fullWidth}
          placeholder={
            placeholder ?? waitlistOnboarding.emailCapture.placeholder
          }
          onStart={(email, rect) => {
            setInitialEmail(email);
            openFloatingPanel(rect, panelTitle, "centered");
          }}
        />
      ) : (
        <WaitlistButtonTrigger
          cta={cta}
          fullWidth={fullWidth}
          triggerClassName={triggerClassName}
          onOpen={(rect) => {
            setInitialEmail("");
            openFloatingPanel(rect, panelTitle, "centered");
          }}
        />
      )}
      <WaitlistPanel
        source={source}
        initialEmail={initialEmail}
        intent={intent}
      />
    </>
  );
}

export function WaitlistOnboarding({
  cta,
  source = "waitlist-onboarding",
  triggerClassName,
  fullWidth = false,
  variant = "button",
  placeholder,
  intent = "default",
}: WaitlistOnboardingProps) {
  return (
    <FloatingPanelRoot
      className={`${styles.root} ${variant === "email" ? styles.rootEmail : ""} ${fullWidth ? styles.rootFull : ""}`.trim()}
    >
      <WaitlistShell
        cta={cta}
        source={source}
        triggerClassName={triggerClassName}
        fullWidth={fullWidth}
        variant={variant}
        placeholder={placeholder}
        intent={intent}
      />
    </FloatingPanelRoot>
  );
}

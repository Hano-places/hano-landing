import type { Metadata } from "next";

import { CodeView } from "./code-view";

// The code is in the URL fragment (#123456): it never reaches the server, logs or analytics.
export const metadata: Metadata = {
  title: "Your Hano code",
  robots: { index: false, follow: false },
};

export default function CodePage() {
  return <CodeView />;
}

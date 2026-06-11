type SerifEmphasisProps = {
  children: React.ReactNode;
};

export function SerifEmphasis({ children }: SerifEmphasisProps) {
  return <span className="serif-emphasis">{children}</span>;
}

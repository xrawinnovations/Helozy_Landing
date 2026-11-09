/**
 * The last word of a headline plus its full stop, pulled in (Plus Jakarta's stop sits far from
 * the letter) and kept on one line so the stop never wraps alone.
 */
export function EndStop({ children }: { children: string }) {
  return (
    <span className="end-stop">
      {children}
      <span className="stop">.</span>
    </span>
  );
}

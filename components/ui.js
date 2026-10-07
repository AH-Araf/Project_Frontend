export const fieldClass =
  "w-full rounded-md border border-line bg-white px-2.5 py-1 text-sm leading-5 text-ink outline-none transition placeholder:text-mute/70 focus:border-moss";

export function Field({ label, name, type = "text", required, as, children, ...props }) {
  const Control = as === "textarea" ? "textarea" : as === "select" ? "select" : "input";
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-mute">{label}</span>
      {children || (
        <Control
          name={name}
          type={as ? undefined : type}
          required={required}
          className={`${fieldClass} ${as === "textarea" ? "min-h-28 resize-y" : ""}`}
          {...props}
        />
      )}
    </label>
  );
}

export function Button({ children, variant = "solid", className = "", ...props }) {
  const styles = {
    solid: "bg-ink text-paper hover:bg-moss",
    line: "border border-ink/15 bg-transparent text-ink hover:border-ink",
    moss: "bg-moss text-paper hover:bg-ink",
  };
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-2.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Note({ children, ok = false }) {
  if (!children) return null;
  return (
    <p className={`border px-3 py-2 text-sm ${ok ? "border-moss/30 text-moss" : "border-clay/30 text-clay"}`}>
      {children}
    </p>
  );
}

export function PageIntro({ eyebrow, title, lede }) {
  return (
    <header className="mb-10 max-w-2xl">
      {eyebrow ? <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-moss">{eyebrow}</p> : null}
      <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
      {lede ? <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">{lede}</p> : null}
    </header>
  );
}

export function Shell({ children, narrow = false }) {
  return (
    <div className={`mx-auto w-full px-4 py-10 sm:px-6 sm:py-14 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
      {children}
    </div>
  );
}

export function DataState({ configured, error, empty, emptyText, children }) {
  if (!configured) {
    return (
      <p className="border border-line bg-white px-4 py-3 text-sm text-mute">
        Add the Supabase URL and anon key in <span className="text-ink">.env</span>, run{" "}
        <span className="text-ink">supabase/schema.sql</span>, then reload.
      </p>
    );
  }
  if (error) return <p className="border border-clay/30 px-4 py-3 text-sm text-clay">{error}</p>;
  if (empty) return <p className="text-sm text-mute">{emptyText}</p>;
  return children;
}

export function Row({ title, meta, children }) {
  return (
    <article className="flex flex-col gap-3 border-b border-line py-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h3 className="text-base text-ink">{title}</h3>
        {meta ? <p className="mt-1 text-sm text-mute">{meta}</p> : null}
      </div>
      {children}
    </article>
  );
}

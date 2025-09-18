import { ReactNode } from "react";

type CardProps = {
  title?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
};

export default function Card({ title, href, children, className }: CardProps) {
  const content = (
    <div className={`rounded-xl border border-black/10 dark:border-white/10 bg-background shadow-sm ${className ?? ""}`}>
      {title ? (
        <div className="px-4 pt-4 text-sm font-medium text-black/80 dark:text-white/80">{title}</div>
      ) : null}
      <div className="p-4 pt-3">{children}</div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 rounded-xl">
        {content}
      </a>
    );
  }

  return content;
}

"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-bc-link underline underline-offset-2 hover:text-bc-blue transition-colors"
    >
      {children}
    </a>
  ),
  h2: ({ children }) => (
    <h2 className="text-base font-semibold text-text-primary mt-6 mb-2 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold text-text-primary mt-5 mb-1.5">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-text-primary leading-relaxed mb-3 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="text-sm text-text-secondary space-y-1.5 mb-3 ml-4 list-disc marker:text-bc-link/50">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-sm text-text-secondary space-y-1.5 mb-3 ml-4 list-decimal marker:text-bc-link/50">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed pl-1">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-3 border-bc-link/30 pl-4 my-3 text-sm text-text-secondary italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-4 border-surface-border" />,
};

interface Props {
  content: string;
  className?: string;
}

export function Markdown({ content, className = "" }: Props) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

import type { MDXComponents } from 'mdx/types';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Preview, PreviewCode, PreviewCSSProperties } from './preview';

function BaseUIReference({ href, label = 'Base UI API' }: { href: string; label?: string }) {
  return (
    <div className="not-prose my-6 rounded-lg border bg-fd-muted/40 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-fd-foreground">Original primitive API</p>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            Behavior, accessibility details, and low-level props are documented by Base UI.
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center justify-center rounded-md border bg-fd-background px-3 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          {label}
        </a>
      </div>
    </div>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    BaseUIReference,
    Preview,
    PreviewCode,
    PreviewCSSProperties,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
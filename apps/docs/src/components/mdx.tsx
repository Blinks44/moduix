import type { MDXComponents } from 'mdx/types';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Preview } from './preview';

function PrimitiveReference({ href, label = 'Ark UI API' }: { href: string; label?: string }) {
  return (
    <div className="not-prose my-6 rounded-lg border bg-fd-muted/40 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-fd-foreground">Upstream primitive API</p>
          <p className="mt-1 text-sm text-fd-muted-foreground">
            Behavior, accessibility details, and low-level props are documented by the upstream
            primitive library.
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center justify-center shrink-0 rounded-md border bg-fd-background px-3 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          {label}
        </a>
      </div>
    </div>
  );
}

const BaseUIReference = PrimitiveReference;

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    BaseUIReference,
    PrimitiveReference,
    Preview,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
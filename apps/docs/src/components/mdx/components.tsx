import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock.core';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import * as React from 'react';
import { docsShikiOptions, getDocsShikiHighlighter } from '@/lib/shiki';
import {
  CSSPropertiesReferenceTable,
  Preview,
  normalizeCssProperties,
  type CssPropertyInput,
} from './preview';

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

function ShadcnInstall({ packageName }: { packageName: string }) {
  const registryItem = `@moduix-react/${packageName}`;
  const sharedCodeBlockProps = {
    highlighter: getDocsShikiHighlighter,
    options: docsShikiOptions,
    codeblock: {
      allowCopy: true,
    },
  };

  return (
    <>
      <p>
        If you want the component to become part of your own project source instead of staying in{' '}
        <code>node_modules</code>, install it from the moduix hosted registry:
      </p>

      <TabsComponents.Tabs items={['npm', 'pnpm', 'bun', 'deno', 'aube']}>
        <TabsComponents.Tab value="npm" className="overflow-auto">
          <DynamicCodeBlock
            lang="bash"
            code={`npx shadcn@latest add ${registryItem}`}
            {...sharedCodeBlockProps}
          />
        </TabsComponents.Tab>

        <TabsComponents.Tab value="pnpm" className="overflow-auto">
          <DynamicCodeBlock
            lang="bash"
            code={`pnpm dlx shadcn@latest add ${registryItem}`}
            {...sharedCodeBlockProps}
          />
        </TabsComponents.Tab>

        <TabsComponents.Tab value="bun" className="overflow-auto">
          <DynamicCodeBlock
            lang="bash"
            code={`bunx shadcn@latest add ${registryItem}`}
            {...sharedCodeBlockProps}
          />
        </TabsComponents.Tab>

        <TabsComponents.Tab value="deno" className="overflow-auto">
          <DynamicCodeBlock
            lang="bash"
            code={`deno x -A npm:shadcn@latest add ${registryItem}`}
            {...sharedCodeBlockProps}
          />
        </TabsComponents.Tab>

        <TabsComponents.Tab value="aube" className="overflow-auto">
          <DynamicCodeBlock
            lang="bash"
            code={`aubx shadcn@latest add ${registryItem}`}
            {...sharedCodeBlockProps}
          />
        </TabsComponents.Tab>
      </TabsComponents.Tabs>
    </>
  );
}

function CssPropertiesSection({ properties }: { properties: CssPropertyInput[] }) {
  return (
    <div className="not-prose">
      <TabsComponents.Tabs items={['CSS Variables']} className="mb-0 mt-3">
        <TabsComponents.Tab className="max-h-150 overflow-auto">
          <CSSPropertiesReferenceTable properties={normalizeCssProperties(properties)} />
        </TabsComponents.Tab>
      </TabsComponents.Tabs>
    </div>
  );
}

function MdxPre(props: React.ComponentProps<'pre'>) {
  if (!React.isValidElement<{ className?: string; children?: string }>(props.children)) {
    return defaultMdxComponents.pre(props);
  }

  const { className = '', children: code } = props.children.props;

  if (typeof code !== 'string' || !code) {
    return defaultMdxComponents.pre(props);
  }

  return (
    <DynamicCodeBlock
      lang={className.match(/language-([a-z0-9-]+)/i)?.[1] ?? docsShikiOptions.fallbackLanguage}
      code={code}
      highlighter={getDocsShikiHighlighter}
      options={docsShikiOptions}
      codeblock={{
        allowCopy: true,
      }}
    />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    pre: MdxPre,
    CssPropertiesSection,
    PrimitiveReference,
    Preview,
    ShadcnInstall,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
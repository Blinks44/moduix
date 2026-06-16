import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock.core';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import * as React from 'react';
import { cn } from '@/lib/cn';
import { docsShikiOptions, getDocsShikiHighlighter } from '@/lib/shiki';

type PreviewProps = React.ComponentProps<'div'> & {
  code?: string;
  cssProperties?: CssPropertyInput[];
  codeLanguage?: string;
  cssVariableScope?: 'both' | 'local' | 'root';
};

type CssProperty = {
  name: `--${string}`;
  description?: React.ReactNode;
  defaultValue: string;
};

type CssPropertyInput =
  | CssProperty
  | readonly [name: `--${string}`, defaultValue: string, description?: React.ReactNode];

type CssVariables = React.CSSProperties & Partial<Record<`--${string}`, string>>;

type PreviewSlotProps = {
  children: React.ReactNode;
};

type CSSPropertiesEditorContext = {
  properties: CssProperty[];
  values: CssVariables;
  onChange: React.Dispatch<React.SetStateAction<CssVariables>>;
  onReset: () => void;
};

type PreviewCSSPropertiesSlotProps = {
  children: React.ReactNode | ((context: CSSPropertiesEditorContext) => React.ReactNode);
};

const rootCssVariableRegistry = new Map<`--${string}`, Map<string, string>>();
const rootInitialCssVariables = new Map<`--${string}`, string>();

function PreviewCode(_props: PreviewSlotProps) {
  return null;
}

function PreviewCSSProperties(_props: PreviewCSSPropertiesSlotProps) {
  return null;
}

function PreviewCSSPlayground(_props: PreviewCSSPropertiesSlotProps) {
  return null;
}

function PreviewCSS(_props: PreviewSlotProps) {
  return null;
}

function PreviewData(_props: PreviewSlotProps) {
  return null;
}

function PreviewRoot({
  children,
  className,
  code,
  cssProperties,
  codeLanguage = 'tsx',
  cssVariableScope = 'both',
  ...props
}: PreviewProps) {
  const {
    previewChildren,
    codeContent,
    cssContent,
    cssPlaygroundContent,
    exampleCssContent,
    dataContent,
  } = splitPreviewChildren(children);
  const propertiesSignature = getCssPropertiesSignature(cssProperties);
  const normalizedCssProperties = React.useMemo(
    () => normalizeCssProperties(cssProperties),
    [propertiesSignature],
  );
  const initialCssVariables = React.useMemo(() => {
    return getInitialCssVariables(normalizedCssProperties);
  }, [normalizedCssProperties]);
  const [cssVariables, setCssVariables] = React.useState(initialCssVariables);
  const resolvedCode = code ? dedentCode(code) : codeContent;
  const resolvedExampleCss = exampleCssContent
    ? dedentCode(extractText(exampleCssContent))
    : undefined;
  const appliedCssVariables = React.useMemo(() => {
    return getAppliedCssVariables(cssVariables, normalizedCssProperties);
  }, [cssVariables, normalizedCssProperties]);
  const cssPropertiesContext: CSSPropertiesEditorContext = {
    properties: normalizedCssProperties,
    values: cssVariables,
    onChange: setCssVariables,
    onReset: () => setCssVariables(initialCssVariables),
  };
  const resolvedCssContent = resolveCssPropertiesContent(cssContent, cssPropertiesContext);
  const resolvedCssPlaygroundContent = resolveCssPropertiesContent(
    cssPlaygroundContent,
    cssPropertiesContext,
  );
  const tabs = [
    resolvedCode ? 'Code' : null,
    resolvedExampleCss ? 'Styles' : null,
    dataContent ? 'Data' : null,
    resolvedCssContent ? 'CSS Variables' : null,
    resolvedCssPlaygroundContent ? 'Playground' : null,
  ].filter((item): item is string => Boolean(item));

  React.useEffect(() => {
    setCssVariables(initialCssVariables);
  }, [initialCssVariables]);

  const sharedCodeBlockProps = {
    highlighter: getDocsShikiHighlighter,
    options: docsShikiOptions,
    codeblock: {
      allowCopy: true,
      className: 'my-0 rounded-none border-0 shadow-none',
    },
  };

  useRootCssVariables(
    appliedCssVariables,
    cssVariableScope === 'both' || cssVariableScope === 'root',
  );

  return (
    <div className={cn('not-prose my-6', className)} {...props}>
      <div
        className="flex min-h-56 items-center overflow-x-hidden overflow-y-hidden rounded-xl border bg-white p-6 dark:bg-fd-card"
        style={cssVariableScope === 'root' ? undefined : appliedCssVariables}
      >
        {resolvedExampleCss ? <style>{resolvedExampleCss}</style> : null}
        <div className="flex w-full min-w-0 justify-center-safe">
          <div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-3 [&>*]:max-w-full [&>*]:min-w-0">
            {previewChildren}
          </div>
        </div>
      </div>

      {tabs.length > 0 && (
        <Tabs items={tabs} className="mb-0 mt-3">
          {resolvedCode && (
            <Tab className="overflow-auto">
              <DynamicCodeBlock lang={codeLanguage} code={resolvedCode} {...sharedCodeBlockProps} />
            </Tab>
          )}
          {resolvedExampleCss && (
            <Tab className="overflow-auto">
              <DynamicCodeBlock lang="css" code={resolvedExampleCss} {...sharedCodeBlockProps} />
            </Tab>
          )}
          {dataContent && (
            <Tab className="overflow-auto">
              <DynamicCodeBlock
                lang="ts"
                code={dedentCode(extractText(dataContent))}
                {...sharedCodeBlockProps}
              />
            </Tab>
          )}
          {resolvedCssContent && (
            <Tab className="max-h-150 overflow-auto">
              <div className="space-y-3">
                <p className="text-xs text-fd-muted-foreground">
                  Full list of component variables available for project-level overrides.
                </p>
                {resolvedCssContent}
              </div>
            </Tab>
          )}
          {resolvedCssPlaygroundContent && (
            <Tab className="max-h-150 overflow-auto">
              <div className="space-y-3">
                <p className="text-xs text-fd-muted-foreground">
                  Interactive variables scoped for docs preview without changing size scale tokens.
                </p>
                {resolvedCssPlaygroundContent}
              </div>
            </Tab>
          )}
        </Tabs>
      )}
    </div>
  );
}

function splitPreviewChildren(children: React.ReactNode) {
  const previewChildren: React.ReactNode[] = [];
  let codeContent: string | undefined;
  let cssContent: PreviewCSSPropertiesSlotProps['children'];
  let cssPlaygroundContent: PreviewCSSPropertiesSlotProps['children'];
  let exampleCssContent: React.ReactNode;
  let dataContent: React.ReactNode;

  function visit(node: React.ReactNode) {
    React.Children.forEach(node, (child) => {
      if (React.isValidElement(child) && child.type === React.Fragment) {
        visit((child as React.ReactElement<PreviewSlotProps>).props.children);
        return;
      }

      if (React.isValidElement(child)) {
        const slot = child as React.ReactElement<PreviewSlotProps | PreviewCSSPropertiesSlotProps>;

        if (slot.type === PreviewCode) {
          codeContent = dedentCode(
            extractText((slot as React.ReactElement<PreviewSlotProps>).props.children),
          );
          return;
        }

        if (slot.type === PreviewCSSProperties) {
          cssContent = (slot as React.ReactElement<PreviewCSSPropertiesSlotProps>).props.children;
          return;
        }

        if (slot.type === PreviewCSSPlayground) {
          cssPlaygroundContent = (slot as React.ReactElement<PreviewCSSPropertiesSlotProps>).props
            .children;
          return;
        }

        if (slot.type === PreviewCSS) {
          exampleCssContent = (slot as React.ReactElement<PreviewSlotProps>).props.children;
          return;
        }

        if (slot.type === PreviewData) {
          dataContent = (slot as React.ReactElement<PreviewSlotProps>).props.children;
          return;
        }
      }

      previewChildren.push(child);
    });
  }

  visit(children);

  return {
    previewChildren,
    codeContent,
    cssContent,
    cssPlaygroundContent,
    exampleCssContent,
    dataContent,
  };
}

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }

  if (React.isValidElement(children)) {
    return extractText((children as React.ReactElement<PreviewSlotProps>).props.children);
  }

  return '';
}

function dedentCode(code: string) {
  const lines = code.replace(/\t/g, '  ').split('\n');

  while (lines[0]?.trim() === '') {
    lines.shift();
  }

  while (lines.at(-1)?.trim() === '') {
    lines.pop();
  }

  const indent = lines
    .filter((line) => line.trim() !== '')
    .reduce((minIndent, line) => {
      const currentIndent = line.match(/^ */)?.[0].length ?? 0;

      return Math.min(minIndent, currentIndent);
    }, Number.POSITIVE_INFINITY);

  if (!Number.isFinite(indent) || indent === 0) {
    return lines.join('\n');
  }

  return lines.map((line) => line.slice(indent)).join('\n');
}

function getCssPropertiesSignature(properties?: CssPropertyInput[]) {
  return properties
    ?.map((property) => {
      const normalized = normalizeCssProperty(property);

      return `${normalized.name}:${normalized.defaultValue}`;
    })
    .join('|');
}

function normalizeCssProperties(properties?: CssPropertyInput[]) {
  return properties?.map(normalizeCssProperty) ?? [];
}

function normalizeCssProperty(property: CssPropertyInput): CssProperty {
  if (!('name' in property)) {
    return {
      name: property[0],
      defaultValue: property[1],
      description: property[2],
    };
  }

  return property;
}

function getInitialCssVariables(properties: CssProperty[]) {
  return Object.fromEntries(
    properties.map((property) => [property.name, property.defaultValue]),
  ) as CssVariables;
}

function getAppliedCssVariables(values: CssVariables, properties: CssProperty[]) {
  return Object.fromEntries(
    properties
      .map((property) => [property.name, values[property.name], property.defaultValue] as const)
      .filter(([, value, defaultValue]) => value !== defaultValue),
  ) as CssVariables;
}

function useRootCssVariables(variables: CssVariables, enabled: boolean) {
  const id = React.useId();

  React.useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;

    const entries = Object.entries(variables).filter(([name]) => name.startsWith('--')) as [
      `--${string}`,
      string,
    ][];

    for (const [name, value] of entries) {
      if (!rootInitialCssVariables.has(name)) {
        rootInitialCssVariables.set(name, document.documentElement.style.getPropertyValue(name));
      }

      const registry = rootCssVariableRegistry.get(name) ?? new Map<string, string>();
      registry.set(id, value);
      rootCssVariableRegistry.set(name, registry);
      applyRootCssVariable(name);
    }

    return () => {
      for (const [name] of entries) {
        const registry = rootCssVariableRegistry.get(name);

        if (!registry) continue;

        registry.delete(id);

        if (registry.size === 0) {
          rootCssVariableRegistry.delete(name);
        }

        applyRootCssVariable(name);
      }
    };
  }, [enabled, id, variables]);
}

function applyRootCssVariable(name: `--${string}`) {
  const registry = rootCssVariableRegistry.get(name);
  const latestValue = registry ? Array.from(registry.values()).at(-1) : undefined;

  if (latestValue !== undefined) {
    document.documentElement.style.setProperty(name, latestValue);
    return;
  }

  const initialValue = rootInitialCssVariables.get(name);

  if (initialValue) {
    document.documentElement.style.setProperty(name, initialValue);
  } else {
    document.documentElement.style.removeProperty(name);
  }

  rootInitialCssVariables.delete(name);
}

function resolveCssPropertiesContent(
  cssContent: PreviewCSSPropertiesSlotProps['children'],
  context: CSSPropertiesEditorContext,
) {
  if (cssContent) {
    if (typeof cssContent === 'function') {
      return cssContent(context);
    }

    return cssContent;
  }

  if (context.properties.length === 0) {
    return null;
  }

  return <CSSPropertiesEditor {...context} />;
}

function CSSPropertiesEditor({
  properties,
  values,
  onChange,
  onReset,
}: {
  properties: CssProperty[];
  values: CssVariables;
  onChange: React.Dispatch<React.SetStateAction<CssVariables>>;
  onReset: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md border px-2.5 py-1.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          onClick={onReset}
        >
          Reset
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-3 py-2 text-left font-medium">Property</th>
              <th className="px-3 py-2 text-left font-medium">Value</th>
              <th className="px-3 py-2 text-left font-medium">Default</th>
              <th className="px-3 py-2 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => {
              const value = values[property.name] ?? '';

              return (
                <tr key={property.name} className="border-b last:border-b-0">
                  <td className="px-3 py-2 font-mono text-xs">{property.name}</td>
                  <td className="min-w-44 px-3 py-2">
                    <input
                      className="h-9 w-full rounded-md border bg-fd-background px-2 font-mono text-xs outline-none transition-colors focus:border-fd-ring"
                      value={value}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        onChange((current) => ({
                          ...current,
                          [property.name]: nextValue,
                        }));
                      }}
                    />
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-fd-muted-foreground">
                    {property.defaultValue}
                  </td>
                  <td className="px-3 py-2">{property.description ?? '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CSSPropertiesReferenceTable({ properties }: { properties: CssProperty[] }) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-3 py-2 text-left font-medium">Property</th>
            <th className="px-3 py-2 text-left font-medium">Default</th>
            <th className="px-3 py-2 text-left font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.name} className="border-b last:border-b-0">
              <td className="px-3 py-2 font-mono text-xs">{property.name}</td>
              <td className="px-3 py-2 font-mono text-xs text-fd-muted-foreground">
                {property.defaultValue}
              </td>
              <td className="px-3 py-2">{property.description ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Preview = Object.assign(PreviewRoot, {
  Code: PreviewCode,
  CSS: PreviewCSS,
  Data: PreviewData,
  CSSProperties: PreviewCSSProperties,
  CSSPlayground: PreviewCSSPlayground,
});

export {
  CSSPropertiesEditor,
  CSSPropertiesReferenceTable,
  Preview,
  PreviewCode,
  PreviewCSS,
  PreviewCSSPlayground,
  PreviewData,
  PreviewCSSProperties,
};
export type { CSSPropertiesEditorContext, CssProperty, CssPropertyInput, PreviewProps };
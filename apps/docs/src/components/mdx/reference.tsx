import { BrowserOnly } from '@rspress/core/runtime';
import * as React from 'react';
import styles from './Reference.module.css';

type CssProperty = {
  name: `--${string}`;
  description?: React.ReactNode;
  defaultValue: string;
};

type CssPropertyInput =
  | CssProperty
  | readonly [name: `--${string}`, defaultValue: string, description?: React.ReactNode];

type CssVariables = React.CSSProperties & Partial<Record<`--${string}`, string>>;

type CSSPropertiesEditorContext = {
  properties: CssProperty[];
  values: CssVariables;
  onChange: React.Dispatch<React.SetStateAction<CssVariables>>;
  onReset: () => void;
};

const previewMaxWidths = {
  xs: '220px',
  sm: '384px',
  lg: '512px',
} as const;

const previewAlignments = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
} as const;

const previewJustifications = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
} as const;

type PreviewMaxWidth = keyof typeof previewMaxWidths | 'fit-content';
type PreviewAlignment = keyof typeof previewAlignments;
type PreviewJustification = keyof typeof previewJustifications;

function ExampleFrame({
  children,
  clientOnly = false,
}: {
  children: React.ReactNode;
  clientOnly?: boolean;
}) {
  if (import.meta.env.SSG_MD) return null;

  const content = <div className={styles.demoContent}>{children}</div>;

  return (
    <div className={`rp-not-doc ${styles.demo}`}>
      {clientOnly ? <BrowserOnly>{() => content}</BrowserOnly> : content}
    </div>
  );
}

function PreviewFrame({
  alignItems,
  childAlignItems,
  childJustifyContent,
  children,
  contentWidth,
  justifyContent,
  maxWidth,
}: {
  alignItems?: PreviewAlignment;
  childAlignItems?: PreviewAlignment;
  childJustifyContent?: PreviewJustification;
  children: React.ReactNode;
  contentWidth?: 'fit-content';
  justifyContent?: PreviewJustification;
  maxWidth?: PreviewMaxWidth;
}) {
  const isFitContent = maxWidth === 'fit-content';
  const style = {
    ...(alignItems ? { '--moduix-doc-preview-align-items': previewAlignments[alignItems] } : {}),
    ...(childAlignItems
      ? { '--moduix-doc-preview-child-align-items': previewAlignments[childAlignItems] }
      : {}),
    ...(childJustifyContent
      ? { '--moduix-doc-preview-child-justify-content': previewJustifications[childJustifyContent] }
      : {}),
    ...(justifyContent
      ? { '--moduix-doc-preview-justify-content': previewJustifications[justifyContent] }
      : {}),
    ...(maxWidth && maxWidth !== 'fit-content'
      ? { '--moduix-doc-preview-max-inline-size': previewMaxWidths[maxWidth] }
      : {}),
  } as React.CSSProperties;

  return (
    <div
      data-preview-child-align-items={childAlignItems ? '' : undefined}
      data-preview-child-justify-content={childJustifyContent ? '' : undefined}
      data-preview-content-width={contentWidth}
      data-preview-width={isFitContent ? maxWidth : undefined}
      style={style}
    >
      {children}
    </div>
  );
}

function normalizeCssProperties(properties?: CssPropertyInput[]) {
  return properties?.map(normalizeCssProperty) ?? [];
}

function normalizeCssProperty(property: CssPropertyInput): CssProperty {
  if ('name' in property) return property;

  return {
    name: property[0],
    defaultValue: property[1],
    description: property[2],
  };
}

function CSSPropertiesEditor({
  properties,
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div>
      <div className={styles.editorActions}>
        <button type="button" className={styles.reset} onClick={onReset}>
          Reset
        </button>
      </div>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.name}>
                <td>
                  <code>{property.name}</code>
                </td>
                <td>
                  <input
                    className={styles.input}
                    value={values[property.name] ?? ''}
                    onChange={(event) =>
                      onChange((current) => ({
                        ...current,
                        [property.name]: event.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <code>{property.defaultValue}</code>
                </td>
                <td>{property.description ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CSSPropertiesReferenceTable({ properties }: { properties: CssProperty[] }) {
  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Property</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.name}>
              <td>
                <code>{property.name}</code>
              </td>
              <td>
                <code>{property.defaultValue}</code>
              </td>
              <td>{property.description ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export {
  CSSPropertiesEditor,
  CSSPropertiesReferenceTable,
  ExampleFrame,
  PreviewFrame,
  normalizeCssProperties,
};
export type { CSSPropertiesEditorContext, CssProperty, CssPropertyInput, CssVariables };
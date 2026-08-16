import { BrowserOnly, useI18n } from '@rspress/core/runtime';
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

function CSSPropertiesReferenceTable({ properties }: { properties: CssProperty[] }) {
  const t = useI18n<typeof import('i18n')>();

  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('cssProperty')}</th>
            <th>{t('cssDefault')}</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { CSSPropertiesReferenceTable, ExampleFrame, PreviewFrame, normalizeCssProperties };
export type { CssProperty, CssPropertyInput };
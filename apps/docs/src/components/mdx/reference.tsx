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

export { CSSPropertiesEditor, CSSPropertiesReferenceTable, ExampleFrame, normalizeCssProperties };
export type { CSSPropertiesEditorContext, CssProperty, CssPropertyInput, CssVariables };
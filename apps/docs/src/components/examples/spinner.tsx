import { Spinner } from '@moduix/react';
import type { ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './spinner.module.css';

export const spinnerInlineCss = `
  .inline {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
  }

  .muted {
    color: var(--color-muted-foreground);
  }
`;

export const spinnerRowCss = `
  .row {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
  }
`;

export const spinnerStylingCss = `
  .brandSpinner {
    --spinner-color: var(--color-primary);
    --spinner-ring-border-width: var(--border-width-lg);
    --spinner-ring-track-color: color-mix(
      in oklab,
      var(--color-primary) 22%,
      transparent 40%
    );
  }
`;

export const spinnerAsChildCss = `
  .customSpinnerHost {
    color: var(--color-primary);
  }
`;

export const spinnerOverrideCssProperties: CssPropertyInput[] = [
  ['--spinner-animation', 'var(--animation-spin)', 'Controls indicator rotation animation.'],
  ['--spinner-color', 'currentColor', 'Controls spinner color.'],
  ['--spinner-radius', 'var(--radius-full)', 'Controls round spinner part radius.'],
  ['--spinner-ring-border-width', 'var(--border-width-md)', 'Controls ring stroke width.'],
  [
    '--spinner-ring-track-color',
    'color-mix(in oklab, currentColor 22%, transparent)',
    'Controls inactive ring stroke color.',
  ],
  ['--spinner-size', 'var(--spinner-size-md, var(--spacing-5))', 'Controls spinner size override.'],
  ['--spinner-size-xs', 'var(--spacing-3)', 'Controls xs spinner size.'],
  ['--spinner-size-sm', 'var(--spacing-4)', 'Controls sm spinner size.'],
  ['--spinner-size-md', 'var(--spacing-5)', 'Controls md spinner size.'],
  ['--spinner-size-lg', 'var(--spacing-7)', 'Controls lg spinner size.'],
  ['--spinner-size-xl', 'var(--size-md)', 'Controls xl spinner size.'],
];

export function SpinnerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={spinnerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function SpinnerExample(props: ComponentProps<typeof Spinner>) {
  return <Spinner {...props} />;
}

export function SpinnerInlineExample() {
  return (
    <div className={styles.inline}>
      <Spinner decorative size="sm" />
      <span className={styles.muted}>Saving changes</span>
    </div>
  );
}

export function SpinnerSizesExample() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <div className={styles.row}>
      {sizes.map((size) => (
        <Spinner key={size} decorative size={size} />
      ))}
    </div>
  );
}

export function SpinnerCustomIndicatorExample() {
  return (
    <Spinner size="lg" aria-label="Syncing">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Spinner>
  );
}

export function SpinnerStylingExample() {
  return <Spinner decorative size="lg" className={styles.brandSpinner} />;
}

export function SpinnerAsChildExample() {
  return (
    <Spinner asChild size="lg" aria-label="Loading report">
      <span className={styles.customSpinnerHost}>
        <span data-scope="spinner" data-part="indicator" data-slot="spinner-indicator">
          <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
        </span>
      </span>
    </Spinner>
  );
}
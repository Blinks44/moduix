import { Spinner, type SpinnerProps } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './spinner.module.css';

export const spinnerOverrideCssProperties: CssPropertyInput[] = [
  ['--spinner-bar-animation', 'var(--animation-spinner-bar)', 'Controls bar animation.'],
  ['--spinner-bar-color', 'currentColor', 'Controls bar color.'],
  ['--spinner-bar-gap', '12%', 'Controls spacing between bars.'],
  ['--spinner-bar-height', '62%', 'Controls bar height.'],
  ['--spinner-bar-radius', 'var(--radius-full)', 'Controls bar border radius.'],
  ['--spinner-bar-width', '18%', 'Controls bar width.'],
  ['--spinner-color', 'currentColor', 'Controls spinner color.'],
  ['--spinner-custom-icon-animation', 'var(--animation-spin)', 'Controls custom icon animation.'],
  ['--spinner-dot-animation', 'var(--animation-spinner-dot)', 'Controls dot animation.'],
  ['--spinner-dot-color', 'currentColor', 'Controls dot color.'],
  ['--spinner-dot-gap', '12%', 'Controls spacing between dots.'],
  ['--spinner-dot-size', '22%', 'Controls dot size.'],
  ['--spinner-pulse-animation', 'var(--animation-spinner-pulse)', 'Controls pulse animation.'],
  ['--spinner-pulse-color', 'currentColor', 'Controls pulse color.'],
  ['--spinner-radius', 'var(--radius-full)', 'Controls round spinner part radius.'],
  ['--spinner-ring-animation', 'var(--animation-spin)', 'Controls ring animation.'],
  ['--spinner-ring-border-width', '0.125rem', 'Controls ring stroke width.'],
  ['--spinner-ring-color', 'currentColor', 'Controls active ring stroke color.'],
  [
    '--spinner-ring-track-color',
    'color-mix(in oklab, currentColor 22%, transparent)',
    'Controls inactive ring stroke color.',
  ],
  ['--spinner-size', 'var(--spinner-size-md, 1.25rem)', 'Controls spinner size override.'],
  ['--spinner-size-xs', '0.75rem', 'Controls xs spinner size.'],
  ['--spinner-size-sm', '1rem', 'Controls sm spinner size.'],
  ['--spinner-size-md', '1.25rem', 'Controls md spinner size.'],
  ['--spinner-size-lg', '1.75rem', 'Controls lg spinner size.'],
  ['--spinner-size-xl', '2.25rem', 'Controls xl spinner size.'],
];

export const spinnerPlaygroundCssProperties: CssPropertyInput[] = [
  ['--spinner-color', 'var(--color-primary)', 'Controls spinner color.'],
  ['--spinner-ring-border-width', '0.125rem', 'Controls ring stroke width.'],
  [
    '--spinner-ring-track-color',
    'color-mix(in oklab, currentColor 22%, transparent)',
    'Controls inactive ring stroke color.',
  ],
];

export function SpinnerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={spinnerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function SpinnerCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={spinnerPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function SpinnerExample(props: SpinnerProps) {
  return <Spinner {...props} />;
}

export function SpinnerVariantsExample() {
  return (
    <div className={styles.row}>
      <Spinner variant="ring" />
      <Spinner variant="dots" />
      <Spinner variant="bars" />
      <Spinner variant="pulse" />
    </div>
  );
}

export function SpinnerSizesExample() {
  return (
    <div className={styles.row}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  );
}

export function SpinnerCustomIconExample() {
  return (
    <Spinner
      size="lg"
      icon={
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      }
    />
  );
}

export function SpinnerClassNameExample() {
  return (
    <div className={styles.brand}>
      <Spinner variant="dots" size="lg" />
    </div>
  );
}
import { Field, FieldDescription, FieldLabel, Rating } from 'moduix';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './rating.module.css';

export const ratingOverrideCssProperties: CssPropertyInput[] = [
  ['--rating-active-color', 'var(--color-primary)', 'Controls filled star color.'],
  ['--rating-color', 'var(--color-muted-foreground)', 'Controls empty star color.'],
  ['--rating-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled control opacity.'],
  ['--rating-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--rating-focus-ring-offset', '0.125rem', 'Controls focus ring offset.'],
  ['--rating-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--rating-gap', 'var(--spacing-1)', 'Controls gap between stars.'],
  ['--rating-icon-size-xs', '0.875rem', 'Controls icon size for `xs`.'],
  ['--rating-icon-size-sm', '1rem', 'Controls icon size for `sm`.'],
  ['--rating-icon-size-md', '1.25rem', 'Controls icon size for `md`.'],
  ['--rating-icon-size-lg', '1.5rem', 'Controls icon size for `lg`.'],
  ['--rating-icon-size-xl', '1.75rem', 'Controls icon size for `xl`.'],
  [
    '--rating-transition',
    'var(--transition-default)',
    'Controls icon color and fill transition timing.',
  ],
];

export const ratingPlaygroundCssProperties: CssPropertyInput[] = [
  ['--rating-active-color', 'var(--color-primary)', 'Controls filled star color.'],
  ['--rating-color', 'var(--color-muted-foreground)', 'Controls empty star color.'],
  ['--rating-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--rating-gap', 'var(--spacing-1)', 'Controls gap between stars.'],
  ['--rating-icon-size-md', '1.25rem', 'Controls medium icon size.'],
];

export function RatingCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={ratingOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function RatingCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={ratingPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function RatingExample(props: ComponentProps<typeof Rating>) {
  return (
    <Field className={styles.field}>
      <FieldLabel>Overall satisfaction</FieldLabel>
      <FieldDescription>Choose the score that best matches your experience.</FieldDescription>
      <Rating aria-label="Overall satisfaction" defaultValue={4} {...props} />
    </Field>
  );
}

export function ControlledRatingExample() {
  const [value, setValue] = useState(3);

  return (
    <div className={styles.stack}>
      <Field className={styles.field}>
        <FieldLabel>Support quality</FieldLabel>
        <Rating aria-label="Support quality" onValueChange={setValue} value={value} />
      </Field>
      <span className={styles.hint}>Current value: {value}</span>
    </div>
  );
}

export function RatingSizesExample() {
  return (
    <div className={styles.stack}>
      <Rating defaultValue={3} size="xs" aria-label="Extra-small rating" />
      <Rating defaultValue={3} size="sm" aria-label="Small rating" />
      <Rating defaultValue={3} size="md" aria-label="Medium rating" />
      <Rating defaultValue={3} size="lg" aria-label="Large rating" />
      <Rating defaultValue={3} size="xl" aria-label="Extra-large rating" />
    </div>
  );
}

export function DisabledAndReadOnlyRatingExample() {
  return (
    <div className={styles.stack}>
      <Rating defaultValue={4} disabled aria-label="Disabled rating" />
      <Rating defaultValue={2} readOnly aria-label="Read-only rating" />
    </div>
  );
}

export function RatingFormIntegrationExample() {
  return (
    <Field className={styles.field} name="experienceScore">
      <FieldLabel>Experience score</FieldLabel>
      <FieldDescription>Required discrete score from 1 to 5.</FieldDescription>
      <Rating defaultValue={4} required aria-label="Experience score" />
    </Field>
  );
}

export function CustomStylesRatingExample() {
  return <Rating className={styles.customRating} defaultValue={5} aria-label="Styled rating" />;
}
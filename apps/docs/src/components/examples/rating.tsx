import { Field, Rating } from 'moduix';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssProperty } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';

export const ratingOverrideCssProperties: CssProperty[] = [
  {
    name: '--rating-active-color',
    defaultValue: 'var(--color-primary)',
    description: 'Controls filled star color.',
  },
  {
    name: '--rating-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls empty star color.',
  },
  {
    name: '--rating-disabled-opacity',
    defaultValue: 'var(--opacity-disabled)',
    description: 'Controls disabled control opacity.',
  },
  {
    name: '--rating-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls focus ring color.',
  },
  {
    name: '--rating-focus-ring-offset',
    defaultValue: '0.125rem',
    description: 'Controls focus ring offset.',
  },
  {
    name: '--rating-focus-ring-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls focus ring width.',
  },
  {
    name: '--rating-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls gap between stars.',
  },
  {
    name: '--rating-icon-size-xs',
    defaultValue: '0.875rem',
    description: 'Controls icon size for `xs`.',
  },
  {
    name: '--rating-icon-size-sm',
    defaultValue: '1rem',
    description: 'Controls icon size for `sm`.',
  },
  {
    name: '--rating-icon-size-md',
    defaultValue: '1.25rem',
    description: 'Controls icon size for `md`.',
  },
  {
    name: '--rating-icon-size-lg',
    defaultValue: '1.5rem',
    description: 'Controls icon size for `lg`.',
  },
  {
    name: '--rating-icon-size-xl',
    defaultValue: '1.75rem',
    description: 'Controls icon size for `xl`.',
  },
  {
    name: '--rating-transition',
    defaultValue: 'var(--transition-default)',
    description: 'Controls icon color and fill transition timing.',
  },
];

export const ratingPlaygroundCssProperties: CssProperty[] = [
  {
    name: '--rating-active-color',
    defaultValue: 'var(--color-primary)',
    description: 'Controls filled star color.',
  },
  {
    name: '--rating-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls empty star color.',
  },
  {
    name: '--rating-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls focus ring color.',
  },
  {
    name: '--rating-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls gap between stars.',
  },
  {
    name: '--rating-icon-size-md',
    defaultValue: '1.25rem',
    description: 'Controls medium icon size.',
  },
];

export function RatingCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={ratingOverrideCssProperties} />;
}

export function RatingCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={ratingPlaygroundCssProperties}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

export function RatingExample(props: ComponentProps<typeof Rating>) {
  return (
    <Field className="field">
      <Field.Label>Overall satisfaction</Field.Label>
      <Field.HelperText>Choose the score that best matches your experience.</Field.HelperText>
      <Rating aria-label="Overall satisfaction" defaultValue={4} {...props} />
    </Field>
  );
}

export function ControlledRatingExample() {
  const [value, setValue] = useState(3);

  return (
    <div className="stack">
      <Field className="field">
        <Field.Label>Support quality</Field.Label>
        <Rating aria-label="Support quality" onValueChange={setValue} value={value} />
      </Field>
      <span className="hint">Current value: {value}</span>
    </div>
  );
}

export function RatingSizesExample() {
  return (
    <div className="stack">
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
    <div className="stack">
      <Rating defaultValue={4} disabled aria-label="Disabled rating" />
      <Rating defaultValue={2} readOnly aria-label="Read-only rating" />
    </div>
  );
}

export function RatingFormIntegrationExample() {
  return (
    <Field className="field">
      <Field.Label>Experience score</Field.Label>
      <Field.HelperText>Required discrete score from 1 to 5.</Field.HelperText>
      <Rating defaultValue={4} required aria-label="Experience score" />
    </Field>
  );
}

export function CustomStylesRatingExample() {
  return <Rating className="customRating" defaultValue={5} aria-label="Styled rating" />;
}
import { Heading, type HeadingProps } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './heading.module.css';

export const headingOverrideCssProperties: CssPropertyInput[] = [
  ['--heading-color', 'var(--color-foreground)', 'Controls heading text color.'],
  ['--heading-font-family', 'var(--font-sans)', 'Controls heading font family.'],
  ['--heading-font-size', 'size-dependent', 'Controls heading font size for all sizes.'],
  ['--heading-font-size-xs', 'var(--text-sm)', 'Controls `xs` heading font size.'],
  ['--heading-font-size-sm', 'var(--text-md)', 'Controls `sm` heading font size.'],
  ['--heading-font-size-md', 'var(--text-lg)', 'Controls `md` heading font size.'],
  ['--heading-font-size-lg', 'var(--text-xl)', 'Controls `lg` heading font size.'],
  ['--heading-font-size-xl', 'var(--text-2xl)', 'Controls `xl` heading font size.'],
  ['--heading-font-size-2xl', 'var(--text-3xl)', 'Controls `2xl` heading font size.'],
  ['--heading-font-weight', 'var(--weight-semibold)', 'Controls heading font weight.'],
  ['--heading-font-weight-bold', 'var(--weight-bold)', 'Controls `bold` heading font weight.'],
  [
    '--heading-font-weight-medium',
    'var(--weight-medium)',
    'Controls `medium` heading font weight.',
  ],
  [
    '--heading-font-weight-regular',
    'var(--weight-regular)',
    'Controls `regular` heading font weight.',
  ],
  [
    '--heading-font-weight-semibold',
    'var(--weight-semibold)',
    'Controls `semibold` heading font weight.',
  ],
  ['--heading-letter-spacing', '0', 'Controls heading letter spacing.'],
  ['--heading-line-height', 'size-dependent', 'Controls heading line height for all sizes.'],
  ['--heading-line-height-xs', 'var(--line-height-text-sm)', 'Controls `xs` heading line height.'],
  ['--heading-line-height-sm', 'var(--line-height-text-md)', 'Controls `sm` heading line height.'],
  ['--heading-line-height-md', 'var(--line-height-text-lg)', 'Controls `md` heading line height.'],
  ['--heading-line-height-lg', 'var(--line-height-text-xl)', 'Controls `lg` heading line height.'],
  ['--heading-line-height-xl', 'var(--line-height-text-2xl)', 'Controls `xl` heading line height.'],
  [
    '--heading-line-height-2xl',
    'var(--line-height-text-3xl)',
    'Controls `2xl` heading line height.',
  ],
  ['--heading-text-wrap', 'balance', 'Controls heading text wrapping.'],
];
export const headingPlaygroundCssProperties: CssPropertyInput[] = [
  ['--heading-color', 'var(--color-foreground)', 'Controls heading text color.'],
  ['--heading-font-family', 'var(--font-sans)', 'Controls heading font family.'],
  ['--heading-letter-spacing', '0', 'Controls heading letter spacing.'],
  ['--heading-text-wrap', 'balance', 'Controls heading text wrapping.'],
];

export function HeadingCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={headingOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function HeadingCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={headingPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function HeadingExample(props: HeadingProps) {
  return <Heading {...props}>Build reliable interfaces</Heading>;
}

export function HeadingElementsExample() {
  return (
    <div className={styles.stack}>
      <Heading as="h1">Heading level 1</Heading>
      <Heading as="h2">Heading level 2</Heading>
      <Heading as="h3">Heading level 3</Heading>
      <Heading as="h4">Heading level 4</Heading>
      <Heading as="h5">Heading level 5</Heading>
      <Heading as="h6">Heading level 6</Heading>
    </div>
  );
}

export function HeadingSizesExample() {
  return (
    <div className={styles.stack}>
      <Heading as="h2" size="2xl">
        Extra-large heading
      </Heading>
      <Heading as="h2" size="xl">
        Large heading
      </Heading>
      <Heading as="h2" size="lg">
        Medium-large heading
      </Heading>
      <Heading as="h2" size="md">
        Medium heading
      </Heading>
      <Heading as="h2" size="sm">
        Small heading
      </Heading>
      <Heading as="h2" size="xs">
        Extra-small heading
      </Heading>
    </div>
  );
}

export function HeadingWeightsExample() {
  return (
    <div className={styles.stack}>
      <Heading as="h2" weight="regular">
        Regular weight
      </Heading>
      <Heading as="h2" weight="medium">
        Medium weight
      </Heading>
      <Heading as="h2" weight="semibold">
        Semibold weight
      </Heading>
      <Heading as="h2" weight="bold">
        Bold weight
      </Heading>
    </div>
  );
}

export function HeadingAlignedExample() {
  return (
    <div className={styles.aligned}>
      <Heading as="h2" align="left">
        Left aligned
      </Heading>
      <Heading as="h2" align="center">
        Center aligned
      </Heading>
      <Heading as="h2" align="right">
        Right aligned
      </Heading>
    </div>
  );
}

export function HeadingSemanticExample() {
  return (
    <Heading as="h2" size="2xl">
      Page title rendered as h2
    </Heading>
  );
}

export function CustomStylesHeadingExample() {
  return (
    <Heading as="h2" className={styles.customHeading}>
      Customized heading
    </Heading>
  );
}
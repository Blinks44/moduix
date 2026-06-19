import type { ComponentProps } from 'react';
import { Heading } from 'moduix';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './heading.module.css';

export const headingLevels = [
  { level: 1, label: 'Heading level 1' },
  { level: 2, label: 'Heading level 2' },
  { level: 3, label: 'Heading level 3' },
  { level: 4, label: 'Heading level 4' },
  { level: 5, label: 'Heading level 5' },
  { level: 6, label: 'Heading level 6' },
] as const;

export const headingSizes = [
  { size: '2xl', label: 'Extra-large heading' },
  { size: 'xl', label: 'Large heading' },
  { size: 'lg', label: 'Medium-large heading' },
  { size: 'md', label: 'Medium heading' },
  { size: 'sm', label: 'Small heading' },
  { size: 'xs', label: 'Extra-small heading' },
] as const;

export const headingWeights = [
  { weight: 'regular', label: 'Regular weight' },
  { weight: 'medium', label: 'Medium weight' },
  { weight: 'semibold', label: 'Semibold weight' },
  { weight: 'bold', label: 'Bold weight' },
] as const;

export const headingOverrideCssProperties = [
  {
    name: '--heading-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls heading text color.',
  },
  {
    name: '--heading-font-family',
    defaultValue: 'var(--font-sans)',
    description: 'Controls heading font family.',
  },
  {
    name: '--heading-font-size',
    defaultValue: 'size-dependent',
    description: 'Controls heading font size for all sizes.',
  },
  {
    name: '--heading-font-size-xs',
    defaultValue: 'var(--text-sm)',
    description: 'Controls `xs` heading font size.',
  },
  {
    name: '--heading-font-size-sm',
    defaultValue: 'var(--text-md)',
    description: 'Controls `sm` heading font size.',
  },
  {
    name: '--heading-font-size-md',
    defaultValue: 'var(--text-lg)',
    description: 'Controls `md` heading font size.',
  },
  {
    name: '--heading-font-size-lg',
    defaultValue: 'var(--text-xl)',
    description: 'Controls `lg` heading font size.',
  },
  {
    name: '--heading-font-size-xl',
    defaultValue: 'var(--text-2xl)',
    description: 'Controls `xl` heading font size.',
  },
  {
    name: '--heading-font-size-2xl',
    defaultValue: 'var(--text-3xl)',
    description: 'Controls `2xl` heading font size.',
  },
  {
    name: '--heading-font-weight',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls heading font weight.',
  },
  {
    name: '--heading-font-weight-bold',
    defaultValue: 'var(--weight-bold)',
    description: 'Controls `bold` heading font weight.',
  },
  {
    name: '--heading-font-weight-medium',
    defaultValue: 'var(--weight-medium)',
    description: 'Controls `medium` heading font weight.',
  },
  {
    name: '--heading-font-weight-regular',
    defaultValue: 'var(--weight-regular)',
    description: 'Controls `regular` heading font weight.',
  },
  {
    name: '--heading-font-weight-semibold',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls `semibold` heading font weight.',
  },
  {
    name: '--heading-letter-spacing',
    defaultValue: '0',
    description: 'Controls heading letter spacing.',
  },
  {
    name: '--heading-line-height',
    defaultValue: 'size-dependent',
    description: 'Controls heading line height for all sizes.',
  },
  {
    name: '--heading-line-height-xs',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls `xs` heading line height.',
  },
  {
    name: '--heading-line-height-sm',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls `sm` heading line height.',
  },
  {
    name: '--heading-line-height-md',
    defaultValue: 'var(--line-height-text-lg)',
    description: 'Controls `md` heading line height.',
  },
  {
    name: '--heading-line-height-lg',
    defaultValue: 'var(--line-height-text-xl)',
    description: 'Controls `lg` heading line height.',
  },
  {
    name: '--heading-line-height-xl',
    defaultValue: 'var(--line-height-text-2xl)',
    description: 'Controls `xl` heading line height.',
  },
  {
    name: '--heading-line-height-2xl',
    defaultValue: 'var(--line-height-text-3xl)',
    description: 'Controls `2xl` heading line height.',
  },
  {
    name: '--heading-text-wrap',
    defaultValue: 'balance',
    description: 'Controls heading text wrapping.',
  },
] satisfies CssPropertyInput[];

export function HeadingCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={headingOverrideCssProperties} />;
}

export function HeadingExample(props: ComponentProps<typeof Heading>) {
  return (
    <Heading className={styles.demo} {...props}>
      Build reliable interfaces
    </Heading>
  );
}

export function HeadingElementsExample() {
  return (
    <div className={styles.stack}>
      <Heading>{headingLevels[0].label}</Heading>
      <Heading asChild>
        <h2>{headingLevels[1].label}</h2>
      </Heading>
      <Heading asChild>
        <h3>{headingLevels[2].label}</h3>
      </Heading>
      <Heading asChild>
        <h4>{headingLevels[3].label}</h4>
      </Heading>
      <Heading asChild>
        <h5>{headingLevels[4].label}</h5>
      </Heading>
      <Heading asChild>
        <h6>{headingLevels[5].label}</h6>
      </Heading>
    </div>
  );
}

export function HeadingSizesExample() {
  return (
    <div className={styles.stack}>
      {headingSizes.map((item) => (
        <Heading key={item.size} asChild size={item.size}>
          <h2>{item.label}</h2>
        </Heading>
      ))}
    </div>
  );
}

export function HeadingWeightsExample() {
  return (
    <div className={styles.stack}>
      {headingWeights.map((item) => (
        <Heading key={item.weight} asChild weight={item.weight}>
          <h2>{item.label}</h2>
        </Heading>
      ))}
    </div>
  );
}

export function HeadingSemanticLevelExample() {
  return (
    <Heading asChild size="2xl" className={styles.demo}>
      <h2>Page title rendered as h2</h2>
    </Heading>
  );
}

export function CustomStylingHeadingExample() {
  return (
    <Heading asChild className={styles.custom}>
      <h2>Customized heading</h2>
    </Heading>
  );
}
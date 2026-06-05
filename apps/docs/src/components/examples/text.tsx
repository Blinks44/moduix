import type { ComponentProps, ComponentPropsWithoutRef } from 'react';
import { Text } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './text.module.css';

export const textOverrideCssProperties: CssPropertyInput[] = [
  ['--text-default-color', 'var(--color-foreground)', 'Controls default tone color.'],
  ['--text-destructive-color', 'var(--color-destructive)', 'Controls destructive tone color.'],
  ['--text-font-family', 'var(--font-sans)', 'Controls text font family.'],
  ['--text-font-size-xs', 'var(--text-xs)', 'Controls `xs` text font size.'],
  ['--text-font-size-sm', 'var(--text-sm)', 'Controls `sm` text font size.'],
  ['--text-font-size-md', 'var(--text-md)', 'Controls `md` text font size.'],
  ['--text-font-size-lg', 'var(--text-lg)', 'Controls `lg` text font size.'],
  ['--text-font-size-xl', 'var(--text-xl)', 'Controls `xl` text font size.'],
  ['--text-font-weight-bold', 'var(--weight-bold)', 'Controls bold text weight.'],
  ['--text-font-weight-medium', 'var(--weight-medium)', 'Controls medium text weight.'],
  ['--text-font-weight-regular', 'var(--weight-regular)', 'Controls regular text weight.'],
  ['--text-font-weight-semibold', 'var(--weight-semibold)', 'Controls semibold text weight.'],
  ['--text-letter-spacing', '0', 'Controls text letter spacing.'],
  ['--text-line-height-xs', 'var(--line-height-text-xs)', 'Controls `xs` text line height.'],
  ['--text-line-height-sm', 'var(--line-height-text-sm)', 'Controls `sm` text line height.'],
  ['--text-line-height-md', 'var(--line-height-text-md)', 'Controls `md` text line height.'],
  ['--text-line-height-lg', 'var(--line-height-text-lg)', 'Controls `lg` text line height.'],
  ['--text-line-height-xl', 'var(--line-height-text-xl)', 'Controls `xl` text line height.'],
  ['--text-muted-color', 'var(--color-muted-foreground)', 'Controls muted tone color.'],
  ['--text-primary-color', 'var(--color-primary)', 'Controls primary tone color.'],
  ['--text-subtle-color', 'var(--color-secondary-foreground)', 'Controls subtle tone color.'],
];
export const textPlaygroundCssProperties: CssPropertyInput[] = [
  ['--text-default-color', 'var(--color-foreground)', 'Controls default tone color.'],
  ['--text-destructive-color', 'var(--color-destructive)', 'Controls destructive tone color.'],
  ['--text-font-family', 'var(--font-sans)', 'Controls text font family.'],
  ['--text-letter-spacing', '0', 'Controls text letter spacing.'],
  ['--text-muted-color', 'var(--color-muted-foreground)', 'Controls muted tone color.'],
  ['--text-primary-color', 'var(--color-primary)', 'Controls primary tone color.'],
  ['--text-subtle-color', 'var(--color-secondary-foreground)', 'Controls subtle tone color.'],
];

export function TextCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable properties={textOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

export function TextCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={textPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function TextExample(props: ComponentProps<typeof Text>) {
  return (
    <div className={styles.stack}>
      <Text {...props}>Use text to describe interface state and supporting details.</Text>
      <Text as="small" tone="muted">
        Last updated 2 minutes ago
      </Text>
    </div>
  );
}

export function TextElementsExample() {
  return (
    <div className={styles.stack}>
      <Text>Paragraph text rendered as p.</Text>
      <Text as="span">Inline text rendered as span.</Text>
      <Text as="small" tone="muted">
        Small supporting text rendered as small.
      </Text>
      <Text as="strong">Important text rendered as strong.</Text>
      <Text as="em">Emphasized text rendered as em.</Text>
      <Text as="div">Block text rendered as div.</Text>
    </div>
  );
}

type InlineLinkProps = ComponentPropsWithoutRef<'a'>;

function InlineLink(props: InlineLinkProps) {
  return <a {...props} />;
}

export function TextCustomElementExample() {
  return (
    <Text render={<InlineLink href="/docs" />} tone="primary" weight="medium">
      Read the documentation
    </Text>
  );
}

export function TextSizesExample() {
  return (
    <div className={styles.stack}>
      <Text size="xl">Extra-large text</Text>
      <Text size="lg">Large text</Text>
      <Text size="md">Medium text</Text>
      <Text size="sm">Small text</Text>
      <Text size="xs">Extra-small text</Text>
    </div>
  );
}

export function TextTonesExample() {
  return (
    <div className={styles.stack}>
      <Text tone="default">Default tone</Text>
      <Text tone="muted">Muted tone</Text>
      <Text tone="subtle">Subtle tone</Text>
      <Text tone="primary">Primary tone</Text>
      <Text tone="destructive">Destructive tone</Text>
    </div>
  );
}

export function TextWeightsExample() {
  return (
    <div className={styles.stack}>
      <Text weight="regular">Regular weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  );
}

export function TextAlignExample() {
  return (
    <div className={styles.aligned}>
      <Text align="left">Left aligned text.</Text>
      <Text align="center">Center aligned text.</Text>
      <Text align="right">Right aligned text.</Text>
    </div>
  );
}

export function TextClassNameExample() {
  return <Text className={styles.customText}>Customized body copy with local CSS variables.</Text>;
}
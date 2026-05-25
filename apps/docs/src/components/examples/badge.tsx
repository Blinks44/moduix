import type { ComponentProps } from 'react';
import { Badge, BadgeDot, ChevronRightIcon } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './badge.module.css';

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost'] as const;

export const badgeOverrideCssProperties: CssPropertyInput[] = [
  ['--badge-bg', 'var(--color-primary)', 'Controls badge background color.'],
  ['--badge-border-color', 'transparent', 'Controls badge border color.'],
  ['--badge-border-width', 'var(--border-width-sm)', 'Controls badge border width.'],
  ['--badge-color', 'var(--color-primary-foreground)', 'Controls badge text and icon color.'],
  ['--badge-dot-size', '0.375rem', 'Controls BadgeDot size.'],
  ['--badge-font-size', 'var(--text-xs)', 'Controls badge font size.'],
  ['--badge-font-weight', 'var(--weight-medium)', 'Controls badge font weight.'],
  ['--badge-gap', '0.375rem', 'Controls space between badge children.'],
  ['--badge-height', '1.25rem', 'Controls badge minimum height.'],
  ['--badge-icon-size', '0.75rem', 'Controls direct child SVG icon size.'],
  ['--badge-line-height', 'var(--line-height-text-xs)', 'Controls badge line-height.'],
  ['--badge-padding-x', '0.625rem', 'Controls horizontal badge padding.'],
  ['--badge-padding-y', '0', 'Controls vertical badge padding.'],
  ['--badge-radius', 'var(--radius-full)', 'Controls badge border radius.'],
];

export const badgePlaygroundCssProperties: CssPropertyInput[] = [
  ['--badge-bg', 'var(--color-primary)', 'Controls badge background color.'],
  ['--badge-border-color', 'transparent', 'Controls badge border color.'],
  ['--badge-border-width', 'var(--border-width-sm)', 'Controls badge border width.'],
  ['--badge-color', 'var(--color-primary-foreground)', 'Controls badge text and icon color.'],
  ['--badge-dot-size', '0.375rem', 'Controls BadgeDot size.'],
  ['--badge-gap', '0.375rem', 'Controls space between badge children.'],
  ['--badge-height', '1.25rem', 'Controls badge minimum height.'],
  ['--badge-icon-size', '0.75rem', 'Controls direct child SVG icon size.'],
  ['--badge-padding-x', '0.625rem', 'Controls horizontal badge padding.'],
  ['--badge-radius', 'var(--radius-full)', 'Controls badge border radius.'],
];

export function BadgeCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={badgeOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function BadgeCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={badgePlaygroundCssProperties.map(normalizeCssProperty)}
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

export function BadgeExample(props: ComponentProps<typeof Badge>) {
  return <Badge {...props}>New</Badge>;
}

export function BadgeVariantsExample() {
  return (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  );
}

export function BadgeSizesExample() {
  return (
    <div className={styles.row}>
      <Badge className={styles.small}>Small</Badge>
      <Badge>Default</Badge>
      <Badge className={styles.large}>Large</Badge>
    </div>
  );
}

export function BadgeWithDotExample() {
  return (
    <div className={styles.row}>
      <Badge variant="default">
        <BadgeDot />
        Online
      </Badge>
      <Badge variant="secondary">
        <BadgeDot />
        Draft
      </Badge>
      <Badge variant="destructive">
        <BadgeDot />
        Failed
      </Badge>
    </div>
  );
}

export function BadgeWithRightIconExample() {
  return (
    <div className={styles.row}>
      <Badge variant="default">
        Release
        <ChevronRightIcon />
      </Badge>
      <Badge variant="secondary">
        Details
        <ChevronRightIcon />
      </Badge>
      <Badge variant="outline">
        Read more
        <ChevronRightIcon />
      </Badge>
    </div>
  );
}

export function CustomStylesBadgeExample() {
  return (
    <Badge className={styles.customBadge}>
      <BadgeDot />
      Priority
    </Badge>
  );
}
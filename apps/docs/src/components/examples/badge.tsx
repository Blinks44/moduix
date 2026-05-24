import { Badge, BadgeDot, ChevronRightIcon, type BadgeProps } from 'moduix';
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
  [
    '--badge-focus-ring-color',
    'color-mix(in oklab, var(--color-ring) 50%, transparent)',
    'Controls focus ring color.',
  ],
  [
    '--badge-focus-ring-offset-color',
    'var(--color-background)',
    'Controls focus ring offset color.',
  ],
  ['--badge-font-size', 'var(--badge-font-size-md)', 'Controls badge font size.'],
  ['--badge-font-size-sm', 'var(--text-xs)', 'Controls font size for `sm` badges.'],
  ['--badge-font-size-md', 'var(--text-xs)', 'Controls font size for `md` badges.'],
  ['--badge-font-size-lg', 'var(--text-sm)', 'Controls font size for `lg` badges.'],
  ['--badge-font-weight', 'var(--weight-medium)', 'Controls badge font weight.'],
  ['--badge-gap', '0.375rem', 'Controls space between badge children.'],
  ['--badge-height', 'var(--badge-height-md)', 'Controls badge height.'],
  ['--badge-height-sm', '1.125rem', 'Controls height for `sm` badges.'],
  ['--badge-height-md', '1.25rem', 'Controls height for `md` badges.'],
  ['--badge-height-lg', '1.5rem', 'Controls height for `lg` badges.'],
  ['--badge-icon-size', 'var(--badge-icon-size-md)', 'Controls direct child SVG icon size.'],
  ['--badge-icon-size-sm', '0.6875rem', 'Controls icon size for `sm` badges.'],
  ['--badge-icon-size-md', '0.75rem', 'Controls icon size for `md` badges.'],
  ['--badge-icon-size-lg', '0.875rem', 'Controls icon size for `lg` badges.'],
  ['--badge-line-height', 'var(--badge-line-height-md)', 'Controls badge line-height.'],
  ['--badge-line-height-sm', 'var(--line-height-text-xs)', 'Controls line-height for `sm`.'],
  ['--badge-line-height-md', 'var(--line-height-text-xs)', 'Controls line-height for `md`.'],
  ['--badge-line-height-lg', 'var(--line-height-text-sm)', 'Controls line-height for `lg`.'],
  ['--badge-padding-x', 'var(--badge-padding-x-md)', 'Controls horizontal badge padding.'],
  ['--badge-padding-x-sm', '0.5rem', 'Controls horizontal padding for `sm`.'],
  ['--badge-padding-x-md', '0.625rem', 'Controls horizontal padding for `md`.'],
  ['--badge-padding-x-lg', '0.75rem', 'Controls horizontal padding for `lg`.'],
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
  ['--badge-height', 'var(--badge-height-md)', 'Controls badge height.'],
  ['--badge-icon-size', 'var(--badge-icon-size-md)', 'Controls direct child SVG icon size.'],
  ['--badge-padding-x', 'var(--badge-padding-x-md)', 'Controls horizontal badge padding.'],
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

export function BadgeExample(props: BadgeProps) {
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
      <Badge size="sm">Small</Badge>
      <Badge size="md">Default</Badge>
      <Badge size="lg">Large</Badge>
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

export function BadgeAsLinkExample() {
  return (
    <Badge render={<a href="#badge-link" />} variant="outline">
      Release notes
    </Badge>
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
import type { BadgeVariant } from 'moduix';
import type { ComponentProps } from 'react';
import { Badge, ChevronRightIcon } from 'moduix';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './badge.module.css';

const variants: BadgeVariant[] = ['default', 'secondary', 'destructive', 'outline', 'ghost'];

const badgeCssProperties: CssPropertyInput[] = [
  ['--badge-bg', 'var(--color-primary)', 'Controls badge background color.'],
  ['--badge-border-color', 'transparent', 'Controls badge border color.'],
  ['--badge-border-width', 'var(--border-width-sm)', 'Controls badge border width.'],
  ['--badge-color', 'var(--color-primary-foreground)', 'Controls badge text and icon color.'],
  ['--badge-dot-size', '0.375rem', 'Controls Badge.Dot size.'],
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

export function BadgeCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={badgeCssProperties.map(normalizeCssProperty)} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function BadgeExample(props: ComponentProps<typeof Badge.Root>) {
  return <Badge.Root {...props}>New</Badge.Root>;
}

export function BadgeVariantsExample() {
  return (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Badge.Root key={variant} variant={variant}>
          {variant}
        </Badge.Root>
      ))}
    </div>
  );
}

export function BadgeWithDotExample() {
  return (
    <div className={styles.row}>
      <Badge.Root variant="default">
        <Badge.Dot />
        Online
      </Badge.Root>
      <Badge.Root variant="secondary">
        <Badge.Dot />
        Draft
      </Badge.Root>
      <Badge.Root variant="destructive">
        <Badge.Dot />
        Failed
      </Badge.Root>
    </div>
  );
}

export function BadgeWithIconExample() {
  return (
    <div className={styles.row}>
      <Badge.Root variant="default">
        Release
        <ChevronRightIcon />
      </Badge.Root>
      <Badge.Root variant="secondary">
        Details
        <ChevronRightIcon />
      </Badge.Root>
      <Badge.Root variant="outline">
        Read more
        <ChevronRightIcon />
      </Badge.Root>
    </div>
  );
}

export function BadgeTruncatedExample() {
  return (
    <Badge.Root
      className={styles.constrained}
      title="Ready for stakeholder review after legal approval"
    >
      Ready for stakeholder review after legal approval
    </Badge.Root>
  );
}

export function CustomBadgeExample() {
  return (
    <div className={styles.row}>
      <Badge.Root className={styles.small}>Small</Badge.Root>
      <Badge.Root>Default</Badge.Root>
      <Badge.Root className={styles.large}>Large</Badge.Root>
      <Badge.Root className={styles.customBadge}>
        <Badge.Dot />
        Priority
      </Badge.Root>
    </div>
  );
}
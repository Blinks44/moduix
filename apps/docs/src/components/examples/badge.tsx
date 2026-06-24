import type { BadgeVariant } from '@moduix/react';
import { Badge, ChevronRightIcon } from '@moduix/react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './badge.module.css';

const variants: BadgeVariant[] = ['default', 'secondary', 'destructive', 'outline', 'ghost'];
const basicBadgeLabel = 'New';
const statusBadges = [
  { label: 'Online', variant: 'default' },
  { label: 'Draft', variant: 'secondary' },
  { label: 'Failed', variant: 'destructive' },
] satisfies { label: string; variant: BadgeVariant }[];
const iconBadgeLabels = {
  release: 'Release',
  details: 'Details',
  more: 'Read more',
};
const longBadgeLabel = 'Ready for stakeholder review after legal approval';
const badgeLink = {
  href: '#styling',
  label: 'Badge styling guidance',
};
const customBadgeLabels = {
  small: 'Small',
  default: 'Default',
  large: 'Large',
  custom: 'Priority',
};

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

export function BadgeExample() {
  return (
    <div className={styles.basic}>
      <Badge>{basicBadgeLabel}</Badge>
    </div>
  );
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

export function BadgeWithDotExample() {
  return (
    <div className={styles.row}>
      {statusBadges.map((status) => (
        <Badge key={status.label} variant={status.variant}>
          <Badge.Dot />
          {status.label}
        </Badge>
      ))}
    </div>
  );
}

export function BadgeWithIconExample() {
  return (
    <div className={styles.row}>
      <Badge variant="default">
        {iconBadgeLabels.release}
        <ChevronRightIcon />
      </Badge>
      <Badge variant="secondary">
        {iconBadgeLabels.details}
        <ChevronRightIcon />
      </Badge>
      <Badge variant="outline">
        {iconBadgeLabels.more}
        <ChevronRightIcon />
      </Badge>
    </div>
  );
}

export function BadgeAsChildExample() {
  return (
    <Badge asChild variant="outline">
      <a className={styles.linkBadge} href={badgeLink.href}>
        {badgeLink.label}
      </a>
    </Badge>
  );
}

export function BadgeTruncatedExample() {
  return (
    <Badge className={styles.constrained} title={longBadgeLabel}>
      {longBadgeLabel}
    </Badge>
  );
}

export function CustomBadgeExample() {
  return (
    <div className={styles.row}>
      <Badge className={styles.small}>{customBadgeLabels.small}</Badge>
      <Badge>{customBadgeLabels.default}</Badge>
      <Badge className={styles.large}>{customBadgeLabels.large}</Badge>
      <Badge className={styles.customBadge}>
        <Badge.Dot />
        {customBadgeLabels.custom}
      </Badge>
    </div>
  );
}
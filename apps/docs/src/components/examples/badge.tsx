import { Badge } from '@moduix/react';
import { ChevronRight as ChevronRightIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import type { CssPropertyInput } from '../mdx/preview';
import styles from './badge.module.css';

type BadgeVariant = NonNullable<ComponentProps<typeof Badge>['variant']>;

const variants: BadgeVariant[] = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
  'link',
];
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

export const badgeCssProperties: CssPropertyInput[] = [
  ['--badge-bg', 'var(--color-primary)', 'Controls badge background color.'],
  ['--badge-border-color', 'transparent', 'Controls badge border color.'],
  ['--badge-border-width', 'var(--border-width-sm)', 'Controls badge border width.'],
  ['--badge-color', 'var(--color-primary-foreground)', 'Controls badge text and icon color.'],
  ['--badge-dot-size', 'var(--spacing-1-5)', 'Controls Badge.Dot size.'],
  ['--badge-font-size', 'var(--text-xs)', 'Controls badge font size.'],
  ['--badge-font-weight', 'var(--weight-medium)', 'Controls badge font weight.'],
  ['--badge-gap', 'var(--spacing-1-5)', 'Controls space between badge children.'],
  ['--badge-height', '1.25rem', 'Controls badge minimum height.'],
  ['--badge-icon-size', 'var(--spacing-3)', 'Controls direct child SVG icon size.'],
  ['--badge-line-height', 'var(--line-height-text-xs)', 'Controls badge line-height.'],
  ['--badge-link-underline-offset', '0.15em', 'Controls link badge underline offset.'],
  ['--badge-padding-x', 'var(--spacing-2-5)', 'Controls horizontal badge padding.'],
  ['--badge-padding-y', '0', 'Controls vertical badge padding.'],
  ['--badge-radius', 'var(--radius-full)', 'Controls badge border radius.'],
];

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
      <Badge asChild variant="link">
        <a href={badgeLink.href}>
          {iconBadgeLabels.more}
          <ChevronRightIcon />
        </a>
      </Badge>
    </div>
  );
}

export function BadgeLinkExample() {
  return (
    <Badge asChild variant="link">
      <a href={badgeLink.href}>{badgeLink.label}</a>
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
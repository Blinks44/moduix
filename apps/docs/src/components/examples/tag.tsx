import type { TagVariant } from '@moduix/react';
import type { ComponentProps } from 'react';
import { CheckIcon, Tag } from '@moduix/react';
import type { CssProperty } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './tag.module.css';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] satisfies TagVariant[];
const sizes = [
  { label: 'Compact', size: 'sm' },
  { label: 'Default', size: 'md' },
] satisfies { label: string; size: ComponentProps<typeof Tag>['size'] }[];
const removableTags = [
  { label: 'TypeScript', variant: 'default' },
  { label: 'Design review', variant: 'secondary' },
  { label: 'Needs approval', variant: 'outline', disabled: true },
] satisfies { label: string; variant: TagVariant; disabled?: boolean }[];
const iconTags = [
  { label: 'Selected', variant: 'default', removable: false },
  { label: 'Deployed', variant: 'outline', removable: true },
] satisfies { label: string; variant: TagVariant; removable: boolean }[];
const longTagLabel = 'Ready for stakeholder review after legal approval';

const tagCssProperties = (
  [
    ['--tag-bg', 'var(--color-primary)', 'Controls tag background color.'],
    ['--tag-border-color', 'transparent', 'Controls tag border color.'],
    ['--tag-border-width', 'var(--border-width-sm)', 'Controls tag border width.'],
    ['--tag-color', 'var(--color-primary-foreground)', 'Controls tag text and icon color.'],
    [
      '--tag-disabled-opacity',
      'var(--opacity-disabled)',
      'Controls disabled close trigger opacity.',
    ],
    ['--tag-font-size', 'var(--text-xs)', 'Controls tag font size.'],
    ['--tag-font-weight', 'var(--weight-medium)', 'Controls tag font weight.'],
    ['--tag-gap', '0.375rem', 'Controls space between tag children at md size.'],
    ['--tag-gap-sm', '0.25rem', 'Controls space between tag children at sm size.'],
    ['--tag-height-sm', '1.25rem', 'Controls sm tag minimum height.'],
    ['--tag-height-md', '1.5rem', 'Controls md tag minimum height.'],
    ['--tag-icon-size', '0.75rem', 'Controls SVG icon size.'],
    ['--tag-line-height', 'var(--line-height-text-xs)', 'Controls tag line-height.'],
    ['--tag-padding-x-sm', '0.375rem', 'Controls sm horizontal padding.'],
    ['--tag-padding-x-md', '0.5rem', 'Controls md horizontal padding.'],
    ['--tag-padding-y-sm', '0', 'Controls sm vertical padding.'],
    ['--tag-padding-y-md', '0.125rem', 'Controls md vertical padding.'],
    ['--tag-radius', 'var(--radius-full)', 'Controls tag border radius.'],
    ['--tag-close-trigger-bg', 'transparent', 'Controls close trigger background color.'],
    [
      '--tag-close-trigger-bg-hover',
      'color-mix(in oklab, currentColor 12%, transparent)',
      'Controls close trigger hover background color.',
    ],
    [
      '--tag-close-trigger-focus-ring-color',
      'var(--color-ring)',
      'Controls close trigger focus ring color.',
    ],
    ['--tag-close-trigger-focus-ring-offset', '0', 'Controls close trigger focus ring offset.'],
    [
      '--tag-close-trigger-focus-ring-offset-color',
      'transparent',
      'Controls close trigger focus ring offset color.',
    ],
    [
      '--tag-close-trigger-focus-ring-width',
      'var(--border-width-sm)',
      'Controls close trigger focus ring width.',
    ],
    ['--tag-close-trigger-icon-size', '0.625rem', 'Controls close trigger icon size.'],
    ['--tag-close-trigger-radius', 'var(--radius-full)', 'Controls close trigger border radius.'],
    ['--tag-close-trigger-size', '1rem', 'Controls close trigger size.'],
    ['--tag-transition', 'var(--transition-default)', 'Controls tag and trigger transitions.'],
  ] as const
).map(([name, defaultValue, description]) => ({
  name,
  defaultValue,
  description,
})) satisfies CssProperty[];

export function TagCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={tagCssProperties} />;
}

export function TagExample(props: ComponentProps<typeof Tag>) {
  return (
    <Tag {...props}>
      <Tag.Label>TypeScript</Tag.Label>
    </Tag>
  );
}

export function TagVariantsExample() {
  return (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Tag key={variant} variant={variant}>
          <Tag.Label>{variant}</Tag.Label>
        </Tag>
      ))}
    </div>
  );
}

export function TagSizesExample() {
  return (
    <div className={styles.row}>
      {sizes.map((tag) => (
        <Tag key={tag.size} size={tag.size}>
          <Tag.Label>{tag.label}</Tag.Label>
        </Tag>
      ))}
    </div>
  );
}

export function RemovableTagExample() {
  return (
    <div className={styles.row}>
      {removableTags.map((tag) => (
        <Tag key={tag.label} variant={tag.variant}>
          <Tag.Label>{tag.label}</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger disabled={tag.disabled} aria-label={`Remove ${tag.label} tag`} />
          </Tag.EndElement>
        </Tag>
      ))}
    </div>
  );
}

export function TagWithLeadingIconExample() {
  return (
    <div className={styles.row}>
      {iconTags.map((tag) => (
        <Tag key={tag.label} variant={tag.variant}>
          <Tag.StartElement>
            <CheckIcon />
          </Tag.StartElement>
          <Tag.Label>{tag.label}</Tag.Label>
          {tag.removable ? (
            <Tag.EndElement>
              <Tag.CloseTrigger aria-label={`Remove ${tag.label} tag`} />
            </Tag.EndElement>
          ) : null}
        </Tag>
      ))}
    </div>
  );
}

export function TagTruncatedExample() {
  return (
    <Tag className={styles.constrained}>
      <Tag.Label title={longTagLabel}>{longTagLabel}</Tag.Label>
      <Tag.EndElement>
        <Tag.CloseTrigger aria-label="Remove long tag" />
      </Tag.EndElement>
    </Tag>
  );
}

export function TagAsChildExample() {
  return (
    <Tag asChild variant="outline">
      <button className={styles.buttonTag} type="button">
        <Tag.Label>Open filter</Tag.Label>
      </button>
    </Tag>
  );
}

export function CustomTagExample() {
  return (
    <div className={styles.row}>
      <Tag className={styles.customSoft}>
        <Tag.StartElement>
          <CheckIcon />
        </Tag.StartElement>
        <Tag.Label>Priority</Tag.Label>
        <Tag.EndElement>
          <Tag.CloseTrigger aria-label="Remove priority tag" />
        </Tag.EndElement>
      </Tag>
      <Tag className={styles.customOutline} variant="outline">
        <Tag.Label>Customer-facing</Tag.Label>
      </Tag>
    </div>
  );
}
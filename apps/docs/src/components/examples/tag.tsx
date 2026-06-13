import type { TagVariant } from 'moduix';
import type { ComponentProps } from 'react';
import { CheckIcon, Tag, TagLabel, TagRemove } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './tag.module.css';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] satisfies TagVariant[];

const tagCssProperties: CssPropertyInput[] = [
  [
    '--tag-bg',
    'color-mix(in oklab, var(--color-primary) 8%, transparent)',
    'Controls tag background color.',
  ],
  [
    '--tag-border-color',
    'color-mix(in oklab, var(--color-foreground) 10%, transparent)',
    'Controls tag border color.',
  ],
  ['--tag-border-width', 'var(--border-width-sm)', 'Controls tag border width.'],
  ['--tag-color', 'var(--color-foreground)', 'Controls tag text and icon color.'],
  ['--tag-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled remove button opacity.'],
  ['--tag-font-size', 'var(--text-xs)', 'Controls tag font size.'],
  ['--tag-font-weight', 'var(--weight-medium)', 'Controls tag font weight.'],
  ['--tag-gap', '0.375rem', 'Controls space between tag children at md size.'],
  ['--tag-gap-sm', '0.25rem', 'Controls space between tag children at sm size.'],
  ['--tag-height-sm', '1.25rem', 'Controls sm tag minimum height.'],
  ['--tag-height-md', '1.5rem', 'Controls md tag minimum height.'],
  ['--tag-icon-size', '0.75rem', 'Controls direct child SVG icon size.'],
  ['--tag-line-height', 'var(--line-height-text-xs)', 'Controls tag line-height.'],
  ['--tag-padding-x-sm', '0.375rem', 'Controls sm horizontal padding.'],
  ['--tag-padding-x-md', '0.5rem', 'Controls md horizontal padding.'],
  ['--tag-padding-y-sm', '0', 'Controls sm vertical padding.'],
  ['--tag-padding-y-md', '0.125rem', 'Controls md vertical padding.'],
  ['--tag-radius', 'var(--radius-full)', 'Controls tag border radius.'],
  ['--tag-remove-bg', 'transparent', 'Controls remove button background color.'],
  [
    '--tag-remove-bg-hover',
    'color-mix(in oklab, currentColor 12%, transparent)',
    'Controls remove button hover background color.',
  ],
  [
    '--tag-remove-focus-ring-color',
    'var(--color-ring)',
    'Controls remove button focus ring color.',
  ],
  ['--tag-remove-focus-ring-offset', '0', 'Controls remove button focus ring offset.'],
  [
    '--tag-remove-focus-ring-offset-color',
    'transparent',
    'Controls remove button focus ring offset color.',
  ],
  [
    '--tag-remove-focus-ring-width',
    'var(--border-width-sm)',
    'Controls remove button focus ring width.',
  ],
  ['--tag-remove-icon-size', '0.625rem', 'Controls remove icon size.'],
  ['--tag-remove-radius', 'var(--radius-full)', 'Controls remove button border radius.'],
  ['--tag-remove-size', '1rem', 'Controls remove button size.'],
  ['--tag-transition', 'var(--transition-default)', 'Controls tag and remove button transitions.'],
];

export const tagPlaygroundCssProperties: CssPropertyInput[] = [
  tagCssProperties[0],
  tagCssProperties[1],
  tagCssProperties[3],
  tagCssProperties[7],
  tagCssProperties[10],
  tagCssProperties[14],
  tagCssProperties[17],
  tagCssProperties[19],
  tagCssProperties[24],
  tagCssProperties[26],
];

export function TagCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={tagCssProperties.map(normalizeCssProperty)} />;
}

export function TagCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={tagPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function TagExample(props: ComponentProps<typeof Tag>) {
  return (
    <Tag {...props}>
      <TagLabel>TypeScript</TagLabel>
    </Tag>
  );
}

export function TagVariantsExample() {
  return (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Tag key={variant} variant={variant}>
          <TagLabel>{variant}</TagLabel>
        </Tag>
      ))}
    </div>
  );
}

export function TagSizesExample() {
  return (
    <div className={styles.row}>
      <Tag size="sm">
        <TagLabel>Compact</TagLabel>
      </Tag>
      <Tag>
        <TagLabel>Default</TagLabel>
      </Tag>
    </div>
  );
}

export function RemovableTagExample() {
  return (
    <div className={styles.row}>
      <Tag>
        <TagLabel>TypeScript</TagLabel>
        <TagRemove aria-label="Remove TypeScript tag" />
      </Tag>
      <Tag variant="secondary">
        <TagLabel>Design review</TagLabel>
        <TagRemove aria-label="Remove design review tag" />
      </Tag>
      <Tag variant="outline">
        <TagLabel>Needs approval</TagLabel>
        <TagRemove disabled />
      </Tag>
    </div>
  );
}

export function TagWithLeadingIconExample() {
  return (
    <div className={styles.row}>
      <Tag>
        <CheckIcon />
        <TagLabel>Selected</TagLabel>
      </Tag>
      <Tag variant="outline">
        <CheckIcon />
        <TagLabel>Deployed</TagLabel>
        <TagRemove aria-label="Remove deployed tag" />
      </Tag>
    </div>
  );
}

export function TagTruncatedExample() {
  return (
    <Tag className={styles.constrained}>
      <TagLabel title="Ready for stakeholder review after legal approval">
        Ready for stakeholder review after legal approval
      </TagLabel>
      <TagRemove aria-label="Remove long tag" />
    </Tag>
  );
}

export function CustomTagExample() {
  return (
    <div className={styles.row}>
      <Tag className={styles.customSoft}>
        <CheckIcon />
        <TagLabel>Priority</TagLabel>
        <TagRemove aria-label="Remove priority tag" />
      </Tag>
      <Tag className={styles.customOutline} variant="outline">
        <TagLabel>Customer-facing</TagLabel>
      </Tag>
    </div>
  );
}
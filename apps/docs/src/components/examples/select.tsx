import { createListCollection } from '@ark-ui/react/collection';
import { Select } from '@moduix/react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

interface OptionItem {
  label: string;
  value: string;
  disabled?: boolean;
}

const languages = createListCollection<OptionItem>({
  items: [
    { label: 'C#', value: 'csharp' },
    { label: 'Go', value: 'go' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Rust', value: 'rust' },
    { label: 'TypeScript', value: 'typescript' },
  ],
});

const selectOverrideCssProperties: CssPropertyInput[] = [
  ['--select-action-bg', 'transparent', 'Controls clear and indicator button background.'],
  ['--select-action-bg-hover', 'var(--color-muted)', 'Controls clear trigger hover background.'],
  ['--select-action-color-hover', 'var(--color-foreground)', 'Controls clear trigger hover color.'],
  [
    '--select-action-gap',
    'var(--spacing-0-5)',
    'Controls spacing between clear and indicator controls.',
  ],
  [
    '--select-action-offset-right',
    'var(--spacing-2)',
    'Controls inline offset for trigger actions.',
  ],
  ['--select-action-radius', 'var(--radius-sm)', 'Controls clear trigger radius.'],
  ['--select-action-size', 'var(--size-xs)', 'Controls clear and indicator control size.'],
  ['--select-bg', 'var(--color-background)', 'Controls trigger background.'],
  ['--select-bg-active', 'var(--color-muted)', 'Controls trigger background when open.'],
  ['--select-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--select-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--select-border-width', 'var(--border-width-sm)', 'Controls control border width.'],
  ['--select-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--select-content-bg', 'var(--color-popover)', 'Controls popup content background.'],
  ['--select-content-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--select-content-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--select-content-closed-opacity', '0', 'Controls closed-state animation opacity.'],
  ['--select-content-closed-scale', 'var(--scale-popup)', 'Controls closed-state animation scale.'],
  ['--select-content-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--select-content-max-height', '24rem', 'Controls popup maximum height.'],
  [
    '--select-content-padding-y',
    'var(--popup-list-padding-y, var(--spacing-1))',
    'Controls popup vertical padding.',
  ],
  ['--select-content-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--select-control-height', 'var(--size-md)', 'Controls trigger height.'],
  ['--select-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--select-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--select-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--select-highlight-bg', 'var(--color-accent)', 'Controls highlighted item background.'],
  [
    '--select-highlight-color',
    'var(--color-accent-foreground)',
    'Controls highlighted item text color.',
  ],
  ['--select-icon-color', 'var(--color-muted-foreground)', 'Controls trigger action icon color.'],
  ['--select-icon-size', 'var(--spacing-4)', 'Controls trigger action icon size.'],
  ['--select-invalid-color', 'var(--color-destructive)', 'Controls invalid border and ring color.'],
  ['--select-item-bg', 'transparent', 'Customizes select item bg.'],
  ['--select-item-border-color', 'transparent', 'Controls item border color.'],
  ['--select-item-border-width', '0', 'Controls item border width.'],
  ['--select-item-checked-color', 'var(--select-item-color)', 'Controls selected item color.'],
  ['--select-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  [
    '--select-item-disabled-color',
    'var(--color-muted-foreground)',
    'Controls disabled item color.',
  ],
  [
    '--select-item-font-size',
    'var(--popup-item-font-size, var(--text-sm))',
    'Controls item font size.',
  ],
  ['--select-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--select-item-group-gap', 'var(--spacing-2)', 'Controls gap between item groups.'],
  [
    '--select-item-group-label-color',
    'var(--popup-group-label-color, var(--color-muted-foreground))',
    'Controls group label color.',
  ],
  [
    '--select-item-group-label-font-size',
    'var(--popup-group-label-font-size, var(--text-xs))',
    'Controls group label font size.',
  ],
  [
    '--select-item-group-label-font-weight',
    'var(--popup-group-label-font-weight, var(--weight-regular))',
    'Controls group label weight.',
  ],
  [
    '--select-item-group-label-line-height',
    'var(--popup-group-label-line-height, var(--line-height-text-xs))',
    'Controls group label line height.',
  ],
  [
    '--select-item-group-label-padding-x',
    'var(--spacing-2-5)',
    'Controls group label horizontal padding.',
  ],
  [
    '--select-item-group-label-padding-y',
    'var(--popup-group-label-padding-y, var(--spacing-1))',
    'Controls group label vertical padding.',
  ],
  ['--select-item-indicator-color', 'currentColor', 'Controls selected indicator color.'],
  [
    '--select-item-indicator-icon-size',
    'var(--spacing-3)',
    'Controls selected indicator icon size.',
  ],
  ['--select-item-indicator-size', 'var(--spacing-3-5)', 'Controls selected indicator box size.'],
  ['--select-item-inset-x', 'var(--spacing-2)', 'Controls item horizontal inset.'],
  [
    '--select-item-line-height',
    'var(--popup-item-line-height, var(--line-height-text-sm))',
    'Controls item line height.',
  ],
  [
    '--select-item-min-height',
    'var(--popup-item-min-height, var(--size-sm))',
    'Controls item minimum height.',
  ],
  [
    '--select-item-padding-x',
    'var(--popup-item-padding-x-start, var(--spacing-3))',
    'Controls item horizontal padding.',
  ],
  [
    '--select-item-padding-y',
    'var(--popup-item-padding-y, var(--spacing-1))',
    'Controls item vertical padding.',
  ],
  ['--select-item-radius', 'var(--radius-sm)', 'Controls item radius.'],
  ['--select-item-text-content-gap', 'var(--spacing-2)', 'Controls rich item text gap.'],
  ['--select-item-text-icon-color', 'currentColor', 'Controls rich item icon color.'],
  ['--select-item-text-icon-size', 'var(--spacing-4)', 'Controls rich item icon size.'],
  ['--select-label-color', 'var(--select-color)', 'Controls label color.'],
  ['--select-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--select-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--select-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--select-max-width', '100%', 'Controls root maximum width.'],
  ['--select-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--select-radius', 'var(--radius-md)', 'Controls trigger and popup radius.'],
  ['--select-root-gap', 'var(--spacing-1-5)', 'Controls gap between label and control.'],
  ['--select-transition', 'var(--transition-default)', 'Controls interactive transition timing.'],
  ['--select-trigger-padding-x-end', '4.25rem', 'Controls trigger end padding.'],
  ['--select-trigger-padding-x-start', 'var(--spacing-3-5)', 'Controls trigger start padding.'],
  ['--select-width', '14rem', 'Controls root width.'],
];

export function SelectCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={selectOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

function SelectControl({ placeholder = 'Select an option' }: { placeholder?: string }) {
  return <Select.Field placeholder={placeholder} clearLabel="Clear selection" />;
}

function SelectPopupContent({ children }: { children: ReactNode }) {
  return (
    <Select.Positioner>
      <Select.Content>{children}</Select.Content>
    </Select.Positioner>
  );
}

export function MaxSelectionSelectExample() {
  const [value, setValue] = useState<string[]>(['javascript']);
  const collection = useMemo(
    () =>
      createListCollection({
        items: languages.items.map((item) => ({
          ...item,
          disabled: value.length >= 3 && !value.includes(item.value),
        })),
      }),
    [value],
  );

  return (
    <Select
      collection={collection}
      multiple
      value={value}
      onValueChange={(details) => {
        if (details.value.length <= 3) setValue(details.value);
      }}
    >
      <Select.Label>Languages</Select.Label>
      <SelectControl placeholder="Select up to 3" />
      <SelectPopupContent>
        {collection.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </SelectPopupContent>
    </Select>
  );
}
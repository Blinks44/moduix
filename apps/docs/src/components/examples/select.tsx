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
  ['--moduix-select-action-bg', 'transparent', 'Controls clear and indicator button background.'],
  [
    '--moduix-select-action-bg-hover',
    'var(--moduix-color-muted)',
    'Controls clear trigger hover background.',
  ],
  [
    '--moduix-select-action-color-hover',
    'var(--moduix-color-foreground)',
    'Controls clear trigger hover color.',
  ],
  [
    '--moduix-select-action-gap',
    'var(--moduix-spacing-0-5)',
    'Controls spacing between clear and indicator controls.',
  ],
  [
    '--moduix-select-action-offset-right',
    'var(--moduix-spacing-2)',
    'Controls inline offset for trigger actions.',
  ],
  ['--moduix-select-action-radius', 'var(--moduix-radius-sm)', 'Controls clear trigger radius.'],
  [
    '--moduix-select-action-size',
    'var(--moduix-size-xs)',
    'Controls clear and indicator control size.',
  ],
  ['--moduix-select-bg', 'var(--moduix-color-background)', 'Controls trigger background.'],
  ['--select-bg-active', 'var(--moduix-color-muted)', 'Controls trigger background when open.'],
  ['--select-bg-hover', 'var(--moduix-color-accent)', 'Controls trigger hover background.'],
  ['--moduix-select-border-color', 'var(--moduix-color-border)', 'Controls trigger border color.'],
  [
    '--moduix-select-border-width',
    'var(--moduix-border-width-sm)',
    'Controls control border width.',
  ],
  ['--moduix-select-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  [
    '--moduix-select-content-bg',
    'var(--moduix-color-popover)',
    'Controls popup content background.',
  ],
  [
    '--moduix-select-content-border-color',
    'var(--moduix-color-border)',
    'Controls popup border color.',
  ],
  [
    '--moduix-select-content-border-width',
    'var(--moduix-border-width-sm)',
    'Controls popup border width.',
  ],
  ['--moduix-select-content-closed-opacity', '0', 'Controls closed-state animation opacity.'],
  [
    '--moduix-select-content-closed-scale',
    'var(--moduix-scale-popup)',
    'Controls closed-state animation scale.',
  ],
  [
    '--moduix-select-content-color',
    'var(--moduix-color-popover-foreground)',
    'Controls popup text color.',
  ],
  ['--moduix-select-content-max-height', '24rem', 'Controls popup maximum height.'],
  [
    '--moduix-select-content-padding-y',
    'var(--moduix-popup-list-padding-y, var(--moduix-spacing-1))',
    'Controls popup vertical padding.',
  ],
  ['--moduix-select-content-shadow', 'var(--moduix-shadow-lg)', 'Controls popup shadow.'],
  ['--moduix-select-control-height', 'var(--moduix-size-md)', 'Controls trigger height.'],
  [
    '--moduix-select-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  ['--moduix-select-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-select-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
  ],
  [
    '--moduix-select-highlight-bg',
    'var(--moduix-color-accent)',
    'Controls highlighted item background.',
  ],
  [
    '--moduix-select-highlight-color',
    'var(--moduix-color-accent-foreground)',
    'Controls highlighted item text color.',
  ],
  [
    '--moduix-select-icon-color',
    'var(--moduix-color-muted-foreground)',
    'Controls trigger action icon color.',
  ],
  ['--moduix-select-icon-size', 'var(--moduix-spacing-4)', 'Controls trigger action icon size.'],
  [
    '--moduix-select-invalid-color',
    'var(--moduix-color-destructive)',
    'Controls invalid border and ring color.',
  ],
  ['--moduix-select-item-bg', 'transparent', 'Customizes select item bg.'],
  ['--moduix-select-item-border-color', 'transparent', 'Controls item border color.'],
  ['--moduix-select-item-border-width', '0', 'Controls item border width.'],
  [
    '--moduix-select-item-checked-color',
    'var(--moduix-select-item-color)',
    'Controls selected item color.',
  ],
  ['--moduix-select-item-color', 'var(--moduix-color-foreground)', 'Controls item text color.'],
  [
    '--moduix-select-item-disabled-color',
    'var(--moduix-color-muted-foreground)',
    'Controls disabled item color.',
  ],
  [
    '--moduix-select-item-font-size',
    'var(--moduix-popup-item-font-size, var(--moduix-text-sm))',
    'Controls item font size.',
  ],
  ['--moduix-select-item-gap', 'var(--moduix-spacing-2)', 'Controls item content gap.'],
  [
    '--moduix-select-item-group-gap',
    'var(--moduix-spacing-2)',
    'Controls gap between item groups.',
  ],
  [
    '--moduix-select-item-group-label-color',
    'var(--moduix-popup-group-label-color, var(--moduix-color-muted-foreground))',
    'Controls group label color.',
  ],
  [
    '--moduix-select-item-group-label-font-size',
    'var(--moduix-popup-group-label-font-size, var(--moduix-text-xs))',
    'Controls group label font size.',
  ],
  [
    '--moduix-select-item-group-label-font-weight',
    'var(--moduix-popup-group-label-font-weight, var(--moduix-weight-regular))',
    'Controls group label weight.',
  ],
  [
    '--moduix-select-item-group-label-line-height',
    'var(--moduix-popup-group-label-line-height, var(--moduix-line-height-text-xs))',
    'Controls group label line height.',
  ],
  [
    '--moduix-select-item-group-label-padding-x',
    'var(--moduix-spacing-2-5)',
    'Controls group label horizontal padding.',
  ],
  [
    '--moduix-select-item-group-label-padding-y',
    'var(--moduix-popup-group-label-padding-y, var(--moduix-spacing-1))',
    'Controls group label vertical padding.',
  ],
  ['--moduix-select-item-indicator-color', 'currentColor', 'Controls selected indicator color.'],
  [
    '--moduix-select-item-indicator-icon-size',
    'var(--moduix-spacing-3)',
    'Controls selected indicator icon size.',
  ],
  [
    '--moduix-select-item-indicator-size',
    'var(--moduix-spacing-3-5)',
    'Controls selected indicator box size.',
  ],
  ['--moduix-select-item-inset-x', 'var(--moduix-spacing-2)', 'Controls item horizontal inset.'],
  [
    '--moduix-select-item-line-height',
    'var(--moduix-popup-item-line-height, var(--moduix-line-height-text-sm))',
    'Controls item line height.',
  ],
  [
    '--moduix-select-item-min-height',
    'var(--moduix-popup-item-min-height, var(--moduix-size-sm))',
    'Controls item minimum height.',
  ],
  [
    '--moduix-select-item-padding-x',
    'var(--moduix-popup-item-padding-x-start, var(--moduix-spacing-3))',
    'Controls item horizontal padding.',
  ],
  [
    '--moduix-select-item-padding-y',
    'var(--moduix-popup-item-padding-y, var(--moduix-spacing-1))',
    'Controls item vertical padding.',
  ],
  ['--moduix-select-item-radius', 'var(--moduix-radius-sm)', 'Controls item radius.'],
  [
    '--moduix-select-item-text-content-gap',
    'var(--moduix-spacing-2)',
    'Controls rich item text gap.',
  ],
  ['--moduix-select-item-text-icon-color', 'currentColor', 'Controls rich item icon color.'],
  [
    '--moduix-select-item-text-icon-size',
    'var(--moduix-spacing-4)',
    'Controls rich item icon size.',
  ],
  ['--moduix-select-label-color', 'var(--moduix-select-color)', 'Controls label color.'],
  ['--moduix-select-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-select-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  [
    '--moduix-select-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--moduix-select-max-width', '100%', 'Controls root maximum width.'],
  [
    '--moduix-select-placeholder-color',
    'var(--moduix-color-muted-foreground)',
    'Controls placeholder color.',
  ],
  ['--moduix-select-radius', 'var(--moduix-radius-md)', 'Controls trigger and popup radius.'],
  [
    '--moduix-select-root-gap',
    'var(--moduix-spacing-1-5)',
    'Controls gap between label and control.',
  ],
  [
    '--moduix-select-transition',
    'var(--moduix-transition-default)',
    'Controls interactive transition timing.',
  ],
  ['--moduix-select-trigger-padding-x-end', '4.25rem', 'Controls trigger end padding.'],
  [
    '--moduix-select-trigger-padding-x-start',
    'var(--moduix-spacing-3-5)',
    'Controls trigger start padding.',
  ],
  ['--moduix-select-width', '14rem', 'Controls root width.'],
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
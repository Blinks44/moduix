import { createListCollection } from '@ark-ui/react/collection';
import { Button, Field, Select } from '@moduix/react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import type { CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';

interface OptionItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface GroupedOption extends OptionItem {
  type: string;
}

const fruits = createListCollection<OptionItem>({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grape', value: 'grape' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Mango', value: 'mango' },
    { label: 'Orange', value: 'orange' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Watermelon', value: 'watermelon' },
  ],
});

const produce = createListCollection<GroupedOption>({
  items: [
    { label: 'Apple', value: 'apple', type: 'Fruits' },
    { label: 'Mango', value: 'mango', type: 'Fruits' },
    { label: 'Orange', value: 'orange', type: 'Fruits' },
    { label: 'Broccoli', value: 'broccoli', type: 'Vegetables' },
    { label: 'Carrot', value: 'carrot', type: 'Vegetables' },
    { label: 'Spinach', value: 'spinach', type: 'Vegetables' },
  ],
  groupBy: (item) => item.type,
});

const frameworks = createListCollection<OptionItem>({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ],
});

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

const themes = createListCollection<OptionItem>({
  items: [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ],
});

export const selectOverrideCssProperties: CssPropertyInput[] = [
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

function FruitItems() {
  return fruits.items.map((item) => (
    <Select.Item key={item.value} item={item}>
      <Select.ItemText>{item.label}</Select.ItemText>
      <Select.ItemIndicator />
    </Select.Item>
  ));
}

export function SelectExample() {
  return (
    <Select collection={fruits}>
      <Select.Label>Choose fruit</Select.Label>
      <SelectControl />
      <SelectPopupContent>
        <Select.ItemGroup>
          <Select.ItemGroupLabel>Fruits</Select.ItemGroupLabel>
          <FruitItems />
        </Select.ItemGroup>
      </SelectPopupContent>
    </Select>
  );
}

export function AdvancedCustomizationSelectExample() {
  return (
    <Select collection={fruits}>
      <Select.Label>Choose fruit</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select an option" />
        </Select.Trigger>
        <Select.Indicators>
          <Select.ClearTrigger aria-label="Clear selection" />
          <Select.Indicator />
        </Select.Indicators>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.ItemGroupLabel>Fruits</Select.ItemGroupLabel>
            <FruitItems />
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select>
  );
}

export function ControlledSelectExample() {
  const [value, setValue] = useState<string[]>(['light']);

  return (
    <div>
      <Select
        collection={themes}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <Select.Label>Theme</Select.Label>
        <SelectControl placeholder="Select theme" />
        <SelectPopupContent>
          {themes.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </SelectPopupContent>
      </Select>
      <p>Current value: {value[0] ?? 'none'}</p>
    </div>
  );
}

export function RootProviderSelectExample() {
  const select = Select.useSelect({ collection: fruits, defaultValue: ['banana'] });

  return (
    <div>
      <output>Selected: {select.valueAsString}</output>
      <Select.RootProvider value={select}>
        <Select.Label>Choose fruit</Select.Label>
        <SelectControl />
        <SelectPopupContent>
          <FruitItems />
        </SelectPopupContent>
      </Select.RootProvider>
    </div>
  );
}

export function MultipleSelectExample() {
  return (
    <Select collection={languages} multiple defaultValue={['javascript', 'typescript']}>
      <Select.Label>Languages</Select.Label>
      <SelectControl placeholder="Select languages" />
      <SelectPopupContent>
        {languages.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </SelectPopupContent>
    </Select>
  );
}

export function GroupedSelectExample() {
  return (
    <Select collection={produce}>
      <Select.Label>Choose produce</Select.Label>
      <SelectControl placeholder="Select item" />
      <SelectPopupContent>
        {produce.group().map(([type, group]) => (
          <Select.ItemGroup key={type}>
            <Select.ItemGroupLabel>{type}</Select.ItemGroupLabel>
            {group.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.ItemGroup>
        ))}
      </SelectPopupContent>
    </Select>
  );
}

export function FieldSelectExample() {
  return (
    <Field.Root required>
      <Select collection={frameworks} name="framework">
        <Select.Label>Framework</Select.Label>
        <SelectControl placeholder="Select framework" />
        <SelectPopupContent>
          {frameworks.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </SelectPopupContent>
      </Select>
      <Field.HelperText>Pick the framework used by this project.</Field.HelperText>
    </Field.Root>
  );
}

export function FormSelectExample() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  return (
    <form
      className="select-form"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(String(data.get('theme') ?? ''));
      }}
    >
      <Select collection={themes} name="theme" required>
        <Select.Label>Theme</Select.Label>
        <SelectControl placeholder="Select theme" />
        <SelectPopupContent>
          {themes.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </SelectPopupContent>
      </Select>
      <div className="select-form-actions">
        <Button type="submit">Submit</Button>
        <output className="select-form-output">Submitted: {submitted}</output>
      </div>
    </form>
  );
}

export function NativeFormControlSelectExample() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  return (
    <form
      className="select-form"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(String(data.get('theme') ?? ''));
      }}
    >
      <Select collection={themes} name="theme" nativeFormControl="input" required>
        <Select.Label>Theme</Select.Label>
        <SelectControl placeholder="Select theme" />
        <SelectPopupContent>
          {themes.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </SelectPopupContent>
      </Select>
      <div className="select-form-actions">
        <Button type="submit">Submit</Button>
        <output className="select-form-output">Submitted: {submitted}</output>
      </div>
    </form>
  );
}

export function LazyMountSelectExample() {
  return (
    <Select collection={fruits} lazyMount unmountOnExit>
      <Select.Label>Choose fruit</Select.Label>
      <SelectControl />
      <SelectPopupContent>
        <FruitItems />
      </SelectPopupContent>
    </Select>
  );
}

export function SelectOnHighlightExample() {
  const select = Select.useSelect({
    collection: fruits,
    onHighlightChange({ highlightedValue }) {
      if (highlightedValue) {
        select.selectValue(highlightedValue);
      }
    },
  });

  return (
    <Select.RootProvider value={select}>
      <Select.Label>Choose fruit</Select.Label>
      <SelectControl />
      <SelectPopupContent>
        <FruitItems />
      </SelectPopupContent>
    </Select.RootProvider>
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

export function SelectAllExample() {
  return (
    <Select collection={languages} multiple>
      <Select.Label>Languages</Select.Label>
      <SelectControl placeholder="Select languages" />
      <SelectPopupContent>
        <Select.Context>
          {(select) => (
            <button
              className="select-bulk-action"
              type="button"
              onClick={() => {
                select.selectAll();
                select.setOpen(false);
              }}
            >
              Select all
            </button>
          )}
        </Select.Context>
        {languages.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </SelectPopupContent>
    </Select>
  );
}

export function OverflowSelectExample() {
  return (
    <Select
      collection={fruits}
      positioning={{ fitViewport: true, placement: 'bottom-start', sameWidth: true }}
    >
      <Select.Label>Choose fruit</Select.Label>
      <SelectControl />
      <SelectPopupContent>
        <FruitItems />
      </SelectPopupContent>
    </Select>
  );
}

export function DynamicItemsSelectExample() {
  const [query, setQuery] = useState('');
  const collection = useMemo(
    () =>
      createListCollection({
        items: fruits.items.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase()),
        ),
      }),
    [query],
  );

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filter fruits"
      />
      <Select collection={collection}>
        <Select.Label>Choose fruit</Select.Label>
        <SelectControl />
        <SelectPopupContent>
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </SelectPopupContent>
      </Select>
    </div>
  );
}

export function CustomItemSelectExample() {
  return (
    <Select collection={fruits}>
      <Select.Label>Choose fruit</Select.Label>
      <SelectControl />
      <SelectPopupContent>
        {fruits.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>
              <Select.ItemTextContent>
                <Select.ItemTextIcon aria-hidden>i</Select.ItemTextIcon>
                <Select.ItemTextLabel>{item.label}</Select.ItemTextLabel>
              </Select.ItemTextContent>
            </Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </SelectPopupContent>
    </Select>
  );
}
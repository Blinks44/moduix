import { useToggleGroup } from '@ark-ui/react/toggle-group';
import { ToggleGroup } from '@moduix/react';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';
import { useState, type ComponentProps } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './toggle-group.module.css';

const alignmentItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

const variantItems = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
];

const viewItems = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
];

export const toggleGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--toggle-group-bg', 'var(--color-muted)', 'Controls group background color.'],
  ['--toggle-group-border-color', 'var(--color-border)', 'Controls group border color.'],
  ['--toggle-group-border-width', 'var(--border-width-sm)', 'Controls group border width.'],
  ['--toggle-group-color', 'var(--color-foreground)', 'Controls group text color.'],
  ['--toggle-group-gap', 'var(--border-width-sm)', 'Controls spacing between items.'],
  ['--toggle-group-ghost-bg', 'transparent', 'Controls ghost variant group background.'],
  [
    '--toggle-group-ghost-border-color',
    'transparent',
    'Controls ghost variant group border color.',
  ],
  ['--toggle-group-ghost-padding', '0', 'Controls ghost variant group padding.'],
  ['--toggle-group-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
  [
    '--toggle-group-outline-bg',
    'var(--color-background)',
    'Controls outline variant group background.',
  ],
  ['--toggle-group-padding', 'var(--border-width-md)', 'Controls group inner padding.'],
  ['--toggle-group-radius', 'var(--radius-lg)', 'Controls group corner radius.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

const toggleGroupCssPropertiesReference =
  toggleGroupOverrideCssProperties.map(normalizeCssProperty);

export function ToggleGroupCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={toggleGroupCssPropertiesReference} />;
}

export function ToggleGroupExample(props: ComponentProps<typeof ToggleGroup>) {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment" {...props}>
      {alignmentItems.map((item) => (
        <ToggleGroup.Item key={item.value} value={item.value}>
          {item.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  );
}

export function ToggleGroupVariantsExample() {
  return (
    <div className={styles.stack}>
      <ToggleGroup defaultValue={['one']} aria-label="Default variant">
        {variantItems.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Outline variant" variant="outline">
        {variantItems.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Ghost variant" variant="ghost">
        {variantItems.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
    </div>
  );
}

export function ToggleGroupMultipleExample() {
  return (
    <ToggleGroup multiple defaultValue={['bold', 'italic']} aria-label="Text formatting" size="md">
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <strong>B</strong>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <em>I</em>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <span className={styles.underline}>U</span>
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}

export function ControlledToggleGroupExample() {
  const [value, setValue] = useState(['left'] as string[]);

  return (
    <div className={styles.stack}>
      <ToggleGroup
        value={value}
        onValueChange={(details) => setValue(details.value)}
        aria-label="Text alignment"
      >
        {alignmentItems.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
      <span className={styles.hint}>Current value: {value.join(', ') || 'empty'}</span>
    </div>
  );
}

export function ToggleGroupIconExample() {
  return (
    <ToggleGroup
      defaultValue={['left']}
      aria-label="Text alignment"
      size="md"
      className={styles.iconGroup}
    >
      <ToggleGroup.Item value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}

export function ToggleGroupVerticalExample() {
  return (
    <ToggleGroup
      defaultValue={['list']}
      orientation="vertical"
      aria-label="View mode"
      variant="outline"
    >
      {viewItems.map((item) => (
        <ToggleGroup.Item key={item.value} value={item.value}>
          {item.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  );
}

export function ToggleGroupRootProviderExample() {
  const toggleGroup = useToggleGroup({ defaultValue: ['left'] });

  return (
    <div className={styles.stack}>
      <span className={styles.hint}>Current value: {toggleGroup.value.join(', ') || 'empty'}</span>
      <ToggleGroup.RootProvider value={toggleGroup} aria-label="Text alignment">
        {alignmentItems.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.RootProvider>
    </div>
  );
}

export function ToggleGroupDisabledExample() {
  return (
    <div className={styles.row}>
      <ToggleGroup defaultValue={['one']} aria-label="Disabled group" disabled>
        <ToggleGroup.Item value="one">One</ToggleGroup.Item>
        <ToggleGroup.Item value="two">Two</ToggleGroup.Item>
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Disabled item">
        <ToggleGroup.Item value="one">One</ToggleGroup.Item>
        <ToggleGroup.Item value="two" disabled>
          Two
        </ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
}
import { BellIcon, CheckIcon, StarIcon, ToggleGroup, useToggleGroup } from '@moduix/react';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
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

const formattingItems = [
  { value: 'bold', label: 'B', ariaLabel: 'Bold' },
  { value: 'italic', label: 'I', ariaLabel: 'Italic' },
  { value: 'underline', label: 'U', ariaLabel: 'Underline' },
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
  ['--toggle-group-padding', '0.125rem', 'Controls group inner padding.'],
  ['--toggle-group-radius', 'var(--radius-lg)', 'Controls group corner radius.'],
];

export const toggleGroupPlaygroundCssProperties: CssPropertyInput[] = [
  ['--toggle-group-bg', 'var(--color-muted)', 'Controls group background color.'],
  ['--toggle-group-border-color', 'var(--color-border)', 'Controls group border color.'],
  ['--toggle-group-color', 'var(--color-foreground)', 'Controls group text color.'],
  ['--toggle-group-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
  ['--toggle-group-radius', 'var(--radius-lg)', 'Controls group corner radius.'],
];

export function ToggleGroupCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={toggleGroupOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function ToggleGroupCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={toggleGroupPlaygroundCssProperties.map(normalizeCssProperty)}
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

function AlignLeftIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M2.5 3.5h11M2.5 8h8M2.5 12.5h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlignCenterIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M2.5 3.5h11M4 8h8M2.5 12.5h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlignRightIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M2.5 3.5h11M5.5 8h8M2.5 12.5h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
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
    <ToggleGroup
      multiple
      defaultValue={['bold', 'italic']}
      aria-label="Text formatting"
      size="icon-md"
    >
      {formattingItems.map((item) => (
        <ToggleGroup.Item key={item.value} value={item.value} aria-label={item.ariaLabel}>
          {item.value === 'bold' && <strong>{item.label}</strong>}
          {item.value === 'italic' && <em>{item.label}</em>}
          {item.value === 'underline' && <span className={styles.underline}>{item.label}</span>}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  );
}

export function ControlledToggleGroupExample() {
  const [value, setValue] = useState(['favorites'] as string[]);

  return (
    <div className={styles.stack}>
      <ToggleGroup
        value={value}
        onValueChange={(details) => setValue(details.value)}
        aria-label="Controlled options"
        multiple
      >
        <ToggleGroup.Item value="favorites">
          {value.includes('favorites') ? <CheckIcon /> : <StarIcon />}
          Favorites
        </ToggleGroup.Item>
        <ToggleGroup.Item value="alerts">
          <BellIcon />
          Alerts
        </ToggleGroup.Item>
      </ToggleGroup>
      <span className={styles.hint}>Current value: {value.join(', ') || 'empty'}</span>
    </div>
  );
}

export function ToggleGroupIconExample() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment" size="icon-md">
      <ToggleGroup.Item value="left" aria-label="Align left">
        <AlignLeftIcon className={styles.customIcon} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Align center">
        <AlignCenterIcon className={styles.customIcon} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Align right">
        <AlignRightIcon className={styles.customIcon} />
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

export function CustomCompositionToggleGroupExample() {
  return (
    <ToggleGroup
      defaultValue={['day']}
      aria-label="Schedule density"
      className={styles.customGroup}
    >
      <ToggleGroup.Item value="day" className={styles.customItem}>
        Day
      </ToggleGroup.Item>
      <ToggleGroup.Item value="week" className={styles.customItem}>
        Week
      </ToggleGroup.Item>
      <ToggleGroup.Item value="month" className={styles.customItem}>
        Month
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}
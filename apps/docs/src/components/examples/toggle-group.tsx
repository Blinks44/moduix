import {
  BellIcon,
  CheckSmallIcon,
  StarIcon,
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupProps,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './toggle-group.module.css';

export const toggleGroupCssProperties: CssPropertyInput[] = [
  ['--toggle-group-bg', 'var(--color-muted)', 'Controls group background color.'],
  ['--toggle-group-border-color', 'var(--color-border)', 'Controls group border color.'],
  ['--toggle-group-color', 'var(--color-foreground)', 'Controls group text color.'],
  ['--toggle-group-gap', 'var(--border-width-sm)', 'Controls spacing between items.'],
  ['--toggle-group-padding', '0.125rem', 'Controls group inner padding.'],
  ['--toggle-group-radius', 'var(--radius-lg)', 'Controls group corner radius.'],
  ['--toggle-group-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
];

function AlignLeftIcon(props: React.ComponentProps<'svg'>) {
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

function AlignCenterIcon(props: React.ComponentProps<'svg'>) {
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

function AlignRightIcon(props: React.ComponentProps<'svg'>) {
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

export function ToggleGroupExample(props: ToggleGroupProps<string>) {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment" {...props}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
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
      <ToggleGroupItem value="bold" aria-label="Bold">
        <strong>B</strong>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <em>I</em>
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <span className={styles.underline}>U</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ToggleGroupVariantsExample() {
  return (
    <div className={styles.stack}>
      <ToggleGroup defaultValue={['one']} aria-label="Default variant">
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
        <ToggleGroupItem value="three">Three</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Outline variant" variant="outline">
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
        <ToggleGroupItem value="three">Three</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Ghost variant" variant="ghost">
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
        <ToggleGroupItem value="three">Three</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export function ToggleGroupSizesExample() {
  return (
    <div className={styles.stack}>
      <ToggleGroup defaultValue={['xs']} aria-label="Extra-small size" size="xs">
        <ToggleGroupItem value="xs">XS</ToggleGroupItem>
        <ToggleGroupItem value="sm">SM</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={['sm']} aria-label="Small size" size="sm">
        <ToggleGroupItem value="sm">Small</ToggleGroupItem>
        <ToggleGroupItem value="md">Medium</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={['md']} aria-label="Medium size" size="md">
        <ToggleGroupItem value="md">Medium</ToggleGroupItem>
        <ToggleGroupItem value="lg">Large</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={['lg']} aria-label="Large size" size="lg">
        <ToggleGroupItem value="lg">Large</ToggleGroupItem>
        <ToggleGroupItem value="xl">Extra</ToggleGroupItem>
      </ToggleGroup>
    </div>
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
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="map">Map</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ToggleGroupDisabledExample() {
  return (
    <div className={styles.row}>
      <ToggleGroup defaultValue={['one']} aria-label="Disabled group" disabled>
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Disabled item">
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two" disabled>
          Two
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export function ToggleGroupLoopFocusExample() {
  return (
    <ToggleGroup defaultValue={['day']} aria-label="Schedule range" loopFocus={false}>
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ControlledToggleGroupExample() {
  const [value, setValue] = React.useState(['favorites']);

  return (
    <div className={styles.stack}>
      <ToggleGroup value={value} onValueChange={setValue} aria-label="Controlled options" multiple>
        <ToggleGroupItem value="favorites">
          {value.includes('favorites') ? <CheckSmallIcon /> : <StarIcon />}
          Favorites
        </ToggleGroupItem>
        <ToggleGroupItem value="alerts">
          <BellIcon />
          Alerts
        </ToggleGroupItem>
      </ToggleGroup>
      <span className={styles.hint}>Current value: {value.join(', ') || 'empty'}</span>
    </div>
  );
}

export function ToggleGroupIconExample() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment" size="icon-md">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon className={styles.customIcon} />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon className={styles.customIcon} />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon className={styles.customIcon} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ToggleGroupClassNameExample() {
  return (
    <ToggleGroup
      defaultValue={['day']}
      aria-label="Schedule density"
      className={styles.customGroup}
    >
      <ToggleGroupItem value="day" className={styles.customItem}>
        Day
      </ToggleGroupItem>
      <ToggleGroupItem value="week" className={styles.customItem}>
        Week
      </ToggleGroupItem>
      <ToggleGroupItem value="month" className={styles.customItem}>
        Month
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
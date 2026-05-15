import {
  ChevronDownIcon,
  InfoIcon,
  Select,
  SelectContent,
  SelectField,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
  SelectLabel,
  SelectList,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './select.module.css';

interface OptionItem {
  label: string;
  value: string;
}

interface OptionGroup {
  label: string;
  items: OptionItem[];
}

interface Assignee {
  id: string;
  name: string;
  role: string;
}

const fruits: OptionItem[] = [
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
];

const groupedOptions: OptionGroup[] = [
  {
    label: 'Fruits',
    items: [
      { label: 'Apple', value: 'apple' },
      { label: 'Mango', value: 'mango' },
      { label: 'Orange', value: 'orange' },
    ],
  },
  {
    label: 'Vegetables',
    items: [
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Carrot', value: 'carrot' },
      { label: 'Spinach', value: 'spinach' },
    ],
  },
];

const themeOptions: OptionItem[] = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

const clearableThemeOptions: Array<{ label: string; value: string | null }> = [
  { label: 'Select theme', value: null },
  ...themeOptions,
];

const groupedLabelByValue = Object.fromEntries(
  groupedOptions.flatMap((group) => group.items.map((item) => [item.value, item.label])),
) as Record<string, string>;

const languages = {
  csharp: 'C#',
  go: 'Go',
  javascript: 'JavaScript',
  python: 'Python',
  rust: 'Rust',
  typescript: 'TypeScript',
} as const;

type Language = keyof typeof languages;

const languageValues = Object.keys(languages) as Language[];

const assignees: Assignee[] = [
  { id: 'u-1', name: 'Leslie Alexander', role: 'Product Manager' },
  { id: 'u-2', name: 'Kathryn Murphy', role: 'Marketing Lead' },
  { id: 'u-3', name: 'Courtney Henry', role: 'Design Systems' },
  { id: 'u-4', name: 'Michael Foster', role: 'Frontend Engineer' },
];

export const selectCssProperties: CssPropertyInput[] = [
  ['--select-width', '14rem', 'Controls trigger and popup anchor width.'],
  ['--select-control-height', 'var(--size-lg)', 'Controls trigger minimum height.'],
  ['--select-radius', 'var(--radius-md)', 'Controls trigger and popup radius.'],
  ['--select-bg', 'var(--color-background)', 'Controls trigger background.'],
  ['--select-bg-hover', 'var(--color-accent)', 'Controls trigger background on hover.'],
  ['--select-bg-active', 'var(--color-muted)', 'Controls trigger background when open.'],
  ['--select-color', 'var(--color-foreground)', 'Controls primary text color.'],
  ['--select-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--select-focus-ring-color', 'var(--color-ring)', 'Controls keyboard focus ring color.'],
  ['--select-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--select-icon-color', 'var(--color-muted-foreground)', 'Controls trigger icon color.'],
  ['--select-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--select-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--select-popup-max-height', '24rem', 'Controls popup max height.'],
  ['--select-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--select-backdrop-bg', 'var(--backdrop-bg)', 'Controls optional backdrop color.'],
  ['--select-backdrop-blur', '2px', 'Controls optional backdrop blur.'],
  [
    '--select-backdrop-transition',
    'var(--transition-default)',
    'Controls optional backdrop animation.',
  ],
  ['--select-arrow-width', '1.25rem', 'Controls optional popup arrow width.'],
  ['--select-arrow-height', '0.625rem', 'Controls optional popup arrow height.'],
  [
    '--select-arrow-stroke-color',
    'var(--color-border)',
    'Controls optional popup arrow border color.',
  ],
  ['--select-list-padding-y', '0.25rem', 'Controls vertical list padding.'],
  ['--select-item-min-height', '2rem', 'Controls item minimum height.'],
  ['--select-item-padding-y', '0.5rem', 'Controls item vertical padding.'],
  ['--select-item-padding-x-start', '0.625rem', 'Controls item start padding.'],
  ['--select-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--select-item-gap', '0.5rem', 'Controls item content gap.'],
  ['--select-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  ['--select-highlight-color', 'var(--color-background)', 'Controls highlighted item text color.'],
  ['--select-item-indicator-size', '0.75rem', 'Controls selected indicator slot size.'],
  ['--select-group-label-color', 'var(--color-muted-foreground)', 'Controls group label color.'],
  ['--select-separator-margin-y', '0.375rem', 'Controls separator vertical margin.'],
  ['--select-transition', 'var(--transition-default)', 'Controls optional popup animation timing.'],
  ['--select-scale', 'var(--scale-popup)', 'Controls optional scale animation amount.'],
];

function renderMultipleValue(value: Language[]) {
  if (value.length === 0) {
    return 'Select languages';
  }

  const first = languages[value[0]];
  const suffix = value.length > 1 ? ` (+${value.length - 1})` : '';

  return `${first}${suffix}`;
}

function FruitItems({ indicator = 'start' }: { indicator?: 'start' | 'end' }) {
  return (
    <>
      {fruits.map((item) => (
        <SelectItem key={item.value} value={item.value} indicator={indicator}>
          {indicator === 'start' ? <SelectItemIndicator /> : null}
          <SelectItemText>{item.label}</SelectItemText>
          {indicator === 'end' ? <SelectItemIndicator /> : null}
        </SelectItem>
      ))}
    </>
  );
}

export function SelectExample() {
  return (
    <Select items={fruits}>
      <SelectField>
        <SelectLabel>Choose fruit</SelectLabel>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectContent>
        <SelectScrollUpArrow />
        <SelectList>
          <FruitItems />
        </SelectList>
        <SelectScrollDownArrow />
      </SelectContent>
    </Select>
  );
}

export function IndicatorRightSelectExample() {
  return (
    <Select items={fruits}>
      <SelectField>
        <SelectLabel>Choose fruit</SelectLabel>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
          <SelectIcon>
            <ChevronDownIcon className={styles.customTriggerIcon} />
          </SelectIcon>
        </SelectTrigger>
      </SelectField>

      <SelectContent>
        <SelectList>
          {fruits.map((item) => (
            <SelectItem key={item.value} value={item.value} indicator="end">
              <SelectItemText>
                <SelectItemTextContent>
                  <SelectItemTextIcon>
                    <InfoIcon className={styles.statusIcon} />
                  </SelectItemTextIcon>
                  <SelectItemTextLabel>{item.label}</SelectItemTextLabel>
                </SelectItemTextContent>
              </SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function GroupedSelectExample() {
  return (
    <Select>
      <SelectField>
        <SelectLabel>Choose produce</SelectLabel>
        <SelectTrigger>
          <SelectValue placeholder="Select item">
            {(value) =>
              typeof value === 'string' ? (groupedLabelByValue[value] ?? value) : 'Select item'
            }
          </SelectValue>
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectContent>
        <SelectList>
          {groupedOptions.map((group, index) => (
            <SelectGroup key={group.label}>
              {index > 0 ? <SelectSeparator /> : null}
              <SelectGroupLabel>{group.label}</SelectGroupLabel>
              {group.items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <SelectItemIndicator />
                  <SelectItemText>{item.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function AnimatedSelectExample() {
  return (
    <Select items={fruits}>
      <SelectField>
        <SelectLabel>Choose fruit</SelectLabel>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectContent animation="scale" className={styles.animatedContent}>
        <SelectList>
          <FruitItems />
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function MultipleSelectExample() {
  return (
    <Select<Language, true> multiple defaultValue={['javascript', 'typescript']}>
      <SelectField>
        <SelectLabel>Languages</SelectLabel>
        <SelectTrigger>
          <SelectValue>{renderMultipleValue}</SelectValue>
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectContent alignItemWithTrigger={false}>
        <SelectList>
          {languageValues.map((value) => (
            <SelectItem key={value} value={value}>
              <SelectItemIndicator />
              <SelectItemText>{languages[value]}</SelectItemText>
            </SelectItem>
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function ControlledSelectExample() {
  const [value, setValue] = React.useState<string | null>('light');

  return (
    <Select value={value} onValueChange={setValue} items={themeOptions}>
      <SelectField>
        <SelectLabel>Theme</SelectLabel>
        <SelectTrigger>
          <SelectValue placeholder="Select theme" />
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectContent>
        <SelectList>
          {themeOptions.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <SelectItemIndicator />
              <SelectItemText>{item.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function ClearableSelectExample() {
  return (
    <Select items={clearableThemeOptions}>
      <SelectField>
        <SelectLabel>Theme</SelectLabel>
        <SelectTrigger>
          <SelectValue />
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectContent>
        <SelectList>
          {clearableThemeOptions.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              <SelectItemIndicator />
              <SelectItemText>{item.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function ObjectValuesSelectExample() {
  return (
    <Select<Assignee>
      items={assignees.map((assignee) => ({ value: assignee, label: assignee.name }))}
      itemToStringLabel={(assignee) => assignee.name}
      itemToStringValue={(assignee) => assignee.id}
    >
      <SelectField>
        <SelectLabel>Assignee</SelectLabel>
        <SelectTrigger>
          <SelectValue placeholder="Select assignee" />
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectContent>
        <SelectList>
          {assignees.map((assignee) => (
            <SelectItem key={assignee.id} value={assignee}>
              <SelectItemIndicator />
              <SelectItemText>
                <span className={styles.assigneeItemText}>
                  <span className={styles.assigneeName}>{assignee.name}</span>
                  <span className={styles.assigneeRole}>{assignee.role}</span>
                </span>
              </SelectItemText>
            </SelectItem>
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function CustomStylesSelectExample() {
  return (
    <Select items={fruits}>
      <SelectField>
        <SelectLabel>Choose fruit</SelectLabel>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectContent
        alignItemWithTrigger={false}
        sideOffset={8}
        showArrow
        withBackdrop
        slotProps={{
          positioner: { sticky: true },
        }}
        className={styles.customPopup}
        classNames={{
          portal: styles.customPortal,
          backdrop: styles.customBackdrop,
          positioner: styles.customPositioner,
          arrow: styles.customArrow,
        }}
      >
        <SelectList>
          <FruitItems />
        </SelectList>
      </SelectContent>
    </Select>
  );
}
import {
  ChevronDownIcon,
  InfoIcon,
  Select,
  SelectArrow,
  SelectBackdrop,
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
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from 'moduix';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
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

export const selectOverrideCssProperties: CssPropertyInput[] = [
  ['--select-arrow-height', '0.625rem', 'Controls popup arrow height.'],
  ['--select-arrow-inline-offset', '0.8125rem', 'Controls popup arrow inline offset.'],
  ['--select-arrow-size', '0.5rem', 'Controls popup arrow side offset size.'],
  [
    '--select-arrow-stroke-color',
    'var(--select-popup-border-color)',
    'Controls popup arrow stroke color.',
  ],
  ['--select-arrow-width', '1.25rem', 'Controls popup arrow width.'],
  ['--select-backdrop-bg', 'var(--backdrop-bg, var(--color-overlay))', 'Controls backdrop color.'],
  ['--select-backdrop-blur', '4px', 'Controls backdrop blur.'],
  [
    '--select-backdrop-transition',
    'var(--transition-default)',
    'Controls backdrop transition timing.',
  ],
  ['--select-bg', 'var(--color-background)', 'Controls trigger background.'],
  ['--select-bg-active', 'var(--color-muted)', 'Controls trigger background when popup is open.'],
  ['--select-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--select-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--select-border-width', 'var(--border-width-sm)', 'Controls trigger border width.'],
  ['--select-color', 'var(--color-foreground)', 'Controls main text color.'],
  ['--select-control-height', 'var(--size-lg)', 'Controls trigger minimum height.'],
  ['--select-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--select-field-gap', '0.375rem', 'Controls field gap between label and trigger.'],
  ['--select-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--select-focus-ring-offset',
    'calc(var(--select-focus-ring-width, var(--select-border-width, var(--border-width-sm))) * -1)',
    'Controls focus ring offset.',
  ],
  ['--select-focus-ring-width', 'var(--select-border-width)', 'Controls focus ring width.'],
  ['--select-group-label-bg', 'var(--select-popup-bg)', 'Controls group label background.'],
  ['--select-group-label-color', 'var(--color-muted-foreground)', 'Controls group label color.'],
  ['--select-group-label-font-size', 'var(--text-xs)', 'Controls group label font size.'],
  [
    '--select-group-label-font-weight',
    'var(--weight-semibold)',
    'Controls group label font weight.',
  ],
  [
    '--select-group-label-line-height',
    'var(--line-height-text-xs)',
    'Controls group label line height.',
  ],
  ['--select-group-label-padding-bottom', '0.35rem', 'Controls group label bottom padding.'],
  ['--select-group-label-padding-top', '0.35rem', 'Controls group label top padding.'],
  ['--select-group-label-padding-x', '0.625rem', 'Controls group label horizontal padding.'],
  ['--select-group-padding-bottom', 'var(--spacing-1)', 'Controls group bottom padding.'],
  ['--select-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  ['--select-highlight-color', 'var(--color-background)', 'Controls highlighted item text color.'],
  ['--select-highlight-inset-x', 'var(--spacing-1)', 'Controls highlighted item horizontal inset.'],
  ['--select-highlight-radius', 'var(--radius-sm)', 'Controls highlighted item radius.'],
  ['--select-icon-color', 'var(--color-muted-foreground)', 'Controls trigger icon color.'],
  ['--select-icon-size', '0.875rem', 'Controls trigger icon wrapper size.'],
  ['--select-icon-svg-size', '1rem', 'Controls trigger icon SVG size.'],
  ['--select-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  ['--select-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  ['--select-item-gap', '0.5rem', 'Controls item grid gap.'],
  ['--select-item-indicator-icon-size', '0.75rem', 'Controls item indicator icon size.'],
  ['--select-item-indicator-size', '0.75rem', 'Controls item indicator slot size.'],
  ['--select-item-line-height', 'var(--line-height-text-sm)', 'Controls item line height.'],
  ['--select-item-min-height', '2rem', 'Controls item minimum height.'],
  ['--select-item-padding-x-end', '1rem', 'Controls item end padding.'],
  ['--select-item-padding-x-start', '0.625rem', 'Controls item start padding.'],
  ['--select-item-padding-y', '0.5rem', 'Controls item vertical padding.'],
  ['--select-item-radius', '0', 'Controls item radius.'],
  ['--select-item-text-content-gap', 'var(--spacing-2)', 'Controls item text content gap.'],
  ['--select-item-text-icon-color', 'currentColor', 'Controls item text icon color.'],
  ['--select-item-text-icon-size', '1rem', 'Controls item text icon size.'],
  ['--select-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--select-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--select-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--select-list-max-height', 'var(--select-popup-max-height)', 'Controls list max height.'],
  ['--select-list-padding-y', '0.25rem', 'Controls list vertical padding.'],
  ['--select-list-scroll-padding-y', '0.25rem', 'Controls list scroll padding.'],
  ['--select-overlap-offset', '1rem', 'Controls overlap offset for static side positioning.'],
  ['--select-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--select-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--select-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--select-popup-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--select-popup-max-height', '24rem', 'Controls popup max height.'],
  ['--select-radius', 'var(--radius-md)', 'Controls trigger and popup radius.'],
  ['--select-scroll-arrow-color', 'var(--select-color)', 'Controls scroll arrow color.'],
  ['--select-scroll-arrow-height', '1rem', 'Controls scroll arrow height.'],
  ['--select-scroll-arrow-icon-size', '0.875rem', 'Controls scroll arrow icon size.'],
  ['--select-scroll-arrow-z-index', '1', 'Controls scroll arrow stacking order.'],
  ['--select-separator-color', 'var(--select-border-color)', 'Controls separator color.'],
  ['--select-separator-margin-x', '1rem', 'Controls separator horizontal margin.'],
  ['--select-separator-margin-y', '0.375rem', 'Controls separator vertical margin.'],
  ['--select-separator-thickness', 'var(--border-width-sm)', 'Controls separator thickness.'],
  ['--select-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--select-trigger-gap', '0.75rem', 'Controls trigger content gap.'],
  ['--select-trigger-padding-x', '0.875rem', 'Controls trigger horizontal padding.'],
  ['--select-width', '14rem', 'Controls trigger and popup anchor width.'],
];
export const selectPlaygroundCssProperties: CssPropertyInput[] = [
  ['--select-bg', 'var(--color-background)', 'Controls trigger background.'],
  ['--select-bg-active', 'var(--color-muted)', 'Controls trigger background when open.'],
  ['--select-bg-hover', 'var(--color-accent)', 'Controls trigger background on hover.'],
  ['--select-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--select-color', 'var(--color-foreground)', 'Controls primary text color.'],
  ['--select-focus-ring-color', 'var(--color-ring)', 'Controls keyboard focus ring color.'],
  ['--select-highlight-bg', 'var(--color-foreground)', 'Controls highlighted item background.'],
  ['--select-highlight-color', 'var(--color-background)', 'Controls highlighted item text color.'],
  ['--select-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--select-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--select-radius', 'var(--radius-md)', 'Controls trigger and popup radius.'],
];

export function SelectCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={selectOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function SelectCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={selectPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

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
        <SelectList>
          <FruitItems />
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function SelectArrowExample() {
  return (
    <Select items={fruits}>
      <SelectField>
        <SelectLabel>Choose fruit</SelectLabel>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectContent showArrow alignItemWithTrigger={false}>
        <SelectList>
          <FruitItems />
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function ScrollableSelectExample() {
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
  const [value, setValue] = useState<string | null>('light');

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

export function CustomCompositionSelectExample() {
  return (
    <Select items={fruits}>
      <SelectField>
        <SelectLabel>Choose fruit</SelectLabel>
        <SelectTrigger className={styles.customTrigger}>
          <SelectValue placeholder="Select an option" />
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectPortal>
        <SelectBackdrop className={styles.customBackdrop} />
        <SelectPositioner
          alignItemWithTrigger={false}
          sideOffset={8}
          sticky
          className={styles.customPositioner}
        >
          <SelectPopup className={styles.customPopup}>
            <SelectArrow className={styles.customArrow} />
            <SelectList>
              <FruitItems />
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  );
}
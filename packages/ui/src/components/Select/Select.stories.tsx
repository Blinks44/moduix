import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { InfoIcon } from '@/icons/demo';
import {
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
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
  SelectItemText,
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
} from './Select';
import styles from './Select.stories.module.css';

const meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

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

function renderMultipleValue(value: Language[]) {
  if (value.length === 0) {
    return 'Select languages';
  }

  const first = languages[value[0]];
  const suffix = value.length > 1 ? ` (+${value.length - 1})` : '';
  return `${first}${suffix}`;
}

export const Basic: Story = {
  render: () => {
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
            {fruits.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemIndicator />
                <SelectItemText>{item.label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectList>
          <SelectScrollDownArrow />
        </SelectContent>
      </Select>
    );
  },
};

export const IndicatorRightWithIcon: Story = {
  render: () => {
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
            {fruits.map((item) => (
              <SelectItem key={item.value} value={item.value} indicator="end">
                <SelectItemText>
                  <SelectItemTextContent>
                    <SelectItemTextIcon>
                      <InfoIcon />
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
  },
};

export const Grouped: Story = {
  render: () => {
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
  },
};

export const Animated: Story = {
  render: () => {
    return (
      <Select items={fruits}>
        <SelectField>
          <SelectLabel>Choose fruit</SelectLabel>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
            <SelectIcon />
          </SelectTrigger>
        </SelectField>

        <SelectContent animation="scale">
          <SelectList>
            {fruits.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemIndicator />
                <SelectItemText>{item.label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectList>
        </SelectContent>
      </Select>
    );
  },
};

export const Multiple: Story = {
  render: () => {
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
  },
};

export const Controlled: Story = {
  render: () => {
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
  },
};

export const ClearableWithNullItem: Story = {
  render: () => {
    return (
      <Select items={clearableThemeOptions}>
        <SelectField>
          <SelectLabel>Theme (clearable)</SelectLabel>
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
  },
};

export const ObjectValues: Story = {
  render: () => {
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
                  {assignee.name} ({assignee.role})
                </SelectItemText>
              </SelectItem>
            ))}
          </SelectList>
        </SelectContent>
      </Select>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    return (
      <Select items={fruits}>
        <SelectField>
          <SelectLabel>Choose fruit</SelectLabel>
          <SelectTrigger className={styles.popupOptionsTrigger}>
            <SelectValue placeholder="Select an option" />
            <SelectIcon />
          </SelectTrigger>
        </SelectField>

        <SelectPortal>
          <SelectBackdrop className={styles.backdrop} />
          <SelectPositioner alignItemWithTrigger={false} sideOffset={8} sticky>
            <SelectPopup>
              <SelectArrow className={styles.arrow} />
              <SelectList>
                {fruits.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <SelectItemIndicator />
                    <SelectItemText>{item.label}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </Select>
    );
  },
};
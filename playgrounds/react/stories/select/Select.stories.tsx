import { createListCollection } from '@ark-ui/react/collection';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';
import {
  Select,
  SelectField,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectPositioner,
  SelectContent,
  SelectLabel,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectContext,
  useSelect,
  SelectRootProvider,
  SelectHiddenSelect,
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
} from '@/components/select/Select';
import { ChevronDownIcon } from '@/internal/icons/ui/Icons';
import styles from './Select.stories.module.css';

interface OptionItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface GroupedOption extends OptionItem {
  type: string;
}

function InfoIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0Zm-9-3.75h.008v.008H12V8.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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

const themeOptions = createListCollection<OptionItem>({
  items: [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
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

const longLabels = createListCollection<OptionItem>({
  items: [
    {
      label: 'A deliberately long option label that demonstrates truncation inside a narrow field',
      value: 'long-label',
    },
    { label: 'Short option', value: 'short-option' },
  ],
});

function SelectFieldView({ placeholder = 'Select an option' }: { placeholder?: string }) {
  return <SelectField placeholder={placeholder} clearLabel="Clear selection" />;
}

function FruitItems() {
  return fruits.items.map((item) => (
    <SelectItem key={item.value} item={item}>
      <SelectItemText>{item.label}</SelectItemText>
      <SelectItemIndicator />
    </SelectItem>
  ));
}

function SelectPopupContent({ children }: { children: ReactNode }) {
  return (
    <SelectPositioner>
      <SelectContent>{children}</SelectContent>
    </SelectPositioner>
  );
}

const meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Select collection={fruits}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectFieldView />
      <SelectPopupContent>
        <SelectItemGroup>
          <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
          <FruitItems />
        </SelectItemGroup>
      </SelectPopupContent>
    </Select>
  ),
};

export const CustomFieldIndicator: Story = {
  render: () => (
    <Select collection={fruits}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectField placeholder="Select an option" indicator={<ChevronDownIcon />} />
      <SelectPopupContent>
        <SelectItemGroup>
          <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
          <FruitItems />
        </SelectItemGroup>
      </SelectPopupContent>
    </Select>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Select collection={produce}>
      <SelectLabel>Choose produce</SelectLabel>
      <SelectFieldView placeholder="Select item" />
      <SelectPopupContent>
        {produce.group().map(([type, group]) => (
          <SelectItemGroup key={type}>
            <SelectItemGroupLabel>{type}</SelectItemGroupLabel>
            {group.map((item) => (
              <SelectItem key={item.value} item={item}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            ))}
          </SelectItemGroup>
        ))}
      </SelectPopupContent>
    </Select>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Select collection={languages} multiple defaultValue={['javascript', 'typescript']}>
      <SelectLabel>Languages</SelectLabel>
      <SelectFieldView placeholder="Select languages" />
      <SelectPopupContent>
        <SelectItemGroup>
          <SelectItemGroupLabel>Languages</SelectItemGroupLabel>
          {languages.items.map((item) => (
            <SelectItem key={item.value} item={item}>
              <SelectItemText>{item.label}</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          ))}
        </SelectItemGroup>
      </SelectPopupContent>
    </Select>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['light']);

    return (
      <div className={styles.stack}>
        <Select
          collection={themeOptions}
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          <SelectLabel>Theme</SelectLabel>
          <SelectFieldView placeholder="Select theme" />
          <SelectPopupContent>
            <SelectItemGroup>
              <SelectItemGroupLabel>Theme</SelectItemGroupLabel>
              {themeOptions.items.map((item) => (
                <SelectItem key={item.value} item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              ))}
            </SelectItemGroup>
          </SelectPopupContent>
        </Select>
        <span className={styles.state}>Current value: {value[0] ?? 'none'}</span>
      </div>
    );
  },
};

export const ClearTrigger: Story = {
  render: () => (
    <Select collection={themeOptions} defaultValue={['system']} deselectable>
      <SelectLabel>Theme</SelectLabel>
      <SelectFieldView placeholder="Select theme" />
      <SelectPopupContent>
        {themeOptions.items.map((item) => (
          <SelectItem key={item.value} item={item}>
            <SelectItemText>{item.label}</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
        ))}
      </SelectPopupContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select collection={fruits} defaultValue={['apple']} disabled>
      <SelectLabel>Unavailable fruit</SelectLabel>
      <SelectFieldView />
      <SelectPopupContent>
        <FruitItems />
      </SelectPopupContent>
    </Select>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Select collection={fruits} invalid>
      <SelectLabel>Required fruit</SelectLabel>
      <SelectFieldView />
      <SelectPopupContent>
        <FruitItems />
      </SelectPopupContent>
    </Select>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Select collection={longLabels} defaultValue={['long-label']} positioning={{ sameWidth: true }}>
      <SelectLabel>Delivery preference with a long label</SelectLabel>
      <SelectFieldView />
      <SelectPopupContent>
        {longLabels.items.map((item) => (
          <SelectItem key={item.value} item={item}>
            <SelectItemText>{item.label}</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
        ))}
      </SelectPopupContent>
    </Select>
  ),
};

export const LazyMount: Story = {
  render: () => (
    <Select collection={fruits} lazyMount unmountOnExit>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectFieldView />
      <SelectPopupContent>
        <SelectItemGroup>
          <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
          <FruitItems />
        </SelectItemGroup>
      </SelectPopupContent>
    </Select>
  ),
};

export const Context: Story = {
  render: () => (
    <Select collection={fruits} defaultValue={['apple']}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectFieldView />
      <SelectContext>
        {(select) => <span className={styles.state}>Selected: {select.valueAsString}</span>}
      </SelectContext>
      <SelectPopupContent>
        <SelectItemGroup>
          <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
          <FruitItems />
        </SelectItemGroup>
      </SelectPopupContent>
    </Select>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const select = useSelect({ collection: fruits, defaultValue: ['banana'] });

    return (
      <div className={styles.stack}>
        <span className={styles.state}>Selected: {select.valueAsString}</span>
        <SelectRootProvider value={select}>
          <SelectLabel>Choose fruit</SelectLabel>
          <SelectFieldView />
          <SelectPopupContent>
            <SelectItemGroup>
              <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
              <FruitItems />
            </SelectItemGroup>
          </SelectPopupContent>
        </SelectRootProvider>
      </div>
    );
  },
};

export const NativeFormControl: Story = {
  render: () => (
    <Select collection={fruits} defaultValue={['apple']} name="fruit">
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectFieldView />
      <SelectPopupContent>
        <SelectItemGroup>
          <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
          <FruitItems />
        </SelectItemGroup>
      </SelectPopupContent>
      <SelectHiddenSelect />
    </Select>
  ),
};

export const CustomItemLayout: Story = {
  render: () => (
    <Select collection={fruits}>
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectFieldView />
      <SelectPopupContent>
        {fruits.items.map((item) => (
          <SelectItem key={item.value} item={item}>
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
      </SelectPopupContent>
    </Select>
  ),
};

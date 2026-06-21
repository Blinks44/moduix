import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { InfoIcon } from '@/icons/demo';
import { Select, Portal, createListCollection, useSelect } from './Select';
import styles from './Select.stories.module.css';

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

function SelectFieldView({ placeholder = 'Select an option' }: { placeholder?: string }) {
  return (
    <>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.Indicators>
          <Select.ClearTrigger aria-label="Clear selection" />
          <Select.Indicator />
        </Select.Indicators>
      </Select.Control>
    </>
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

function SelectPopupContent({ children }: { children: ReactNode }) {
  return (
    <Portal>
      <Select.Positioner>
        <Select.Content>{children}</Select.Content>
      </Select.Positioner>
    </Portal>
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
      <Select.Label>Choose fruit</Select.Label>
      <SelectFieldView />
      <SelectPopupContent>
        <Select.ItemGroup>
          <Select.ItemGroupLabel>Fruits</Select.ItemGroupLabel>
          <FruitItems />
        </Select.ItemGroup>
      </SelectPopupContent>
      <Select.HiddenSelect />
    </Select>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Select collection={produce}>
      <Select.Label>Choose produce</Select.Label>
      <SelectFieldView placeholder="Select item" />
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
      <Select.HiddenSelect />
    </Select>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Select collection={languages} multiple defaultValue={['javascript', 'typescript']}>
      <Select.Label>Languages</Select.Label>
      <SelectFieldView placeholder="Select languages" />
      <SelectPopupContent>
        <Select.ItemGroup>
          <Select.ItemGroupLabel>Languages</Select.ItemGroupLabel>
          {languages.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.ItemGroup>
      </SelectPopupContent>
      <Select.HiddenSelect />
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
          <Select.Label>Theme</Select.Label>
          <SelectFieldView placeholder="Select theme" />
          <SelectPopupContent>
            <Select.ItemGroup>
              <Select.ItemGroupLabel>Theme</Select.ItemGroupLabel>
              {themeOptions.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </SelectPopupContent>
          <Select.HiddenSelect />
        </Select>
        <span className={styles.state}>Current value: {value[0] ?? 'none'}</span>
      </div>
    );
  },
};

export const ClearTrigger: Story = {
  render: () => (
    <Select collection={themeOptions} defaultValue={['system']} deselectable>
      <Select.Label>Theme</Select.Label>
      <SelectFieldView placeholder="Select theme" />
      <SelectPopupContent>
        {themeOptions.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </SelectPopupContent>
      <Select.HiddenSelect />
    </Select>
  ),
};

export const LazyMount: Story = {
  render: () => (
    <Select collection={fruits} lazyMount unmountOnExit>
      <Select.Label>Choose fruit</Select.Label>
      <SelectFieldView />
      <SelectPopupContent>
        <Select.ItemGroup>
          <Select.ItemGroupLabel>Fruits</Select.ItemGroupLabel>
          <FruitItems />
        </Select.ItemGroup>
      </SelectPopupContent>
      <Select.HiddenSelect />
    </Select>
  ),
};

export const Context: Story = {
  render: () => (
    <Select collection={fruits} defaultValue={['apple']}>
      <Select.Label>Choose fruit</Select.Label>
      <SelectFieldView />
      <Select.Context>
        {(select) => <span className={styles.state}>Selected: {select.valueAsString}</span>}
      </Select.Context>
      <SelectPopupContent>
        <Select.ItemGroup>
          <Select.ItemGroupLabel>Fruits</Select.ItemGroupLabel>
          <FruitItems />
        </Select.ItemGroup>
      </SelectPopupContent>
      <Select.HiddenSelect />
    </Select>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const select = useSelect({ collection: fruits, defaultValue: ['banana'] });

    return (
      <div className={styles.stack}>
        <span className={styles.state}>Selected: {select.valueAsString}</span>
        <Select.RootProvider value={select}>
          <Select.Label>Choose fruit</Select.Label>
          <SelectFieldView />
          <SelectPopupContent>
            <Select.ItemGroup>
              <Select.ItemGroupLabel>Fruits</Select.ItemGroupLabel>
              <FruitItems />
            </Select.ItemGroup>
          </SelectPopupContent>
          <Select.HiddenSelect />
        </Select.RootProvider>
      </div>
    );
  },
};

export const CustomItemLayout: Story = {
  render: () => (
    <Select collection={fruits}>
      <Select.Label>Choose fruit</Select.Label>
      <SelectFieldView />
      <SelectPopupContent>
        {fruits.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>
              <Select.ItemTextContent>
                <Select.ItemTextIcon>
                  <InfoIcon />
                </Select.ItemTextIcon>
                <Select.ItemTextLabel>{item.label}</Select.ItemTextLabel>
              </Select.ItemTextContent>
            </Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </SelectPopupContent>
      <Select.HiddenSelect />
    </Select>
  ),
};
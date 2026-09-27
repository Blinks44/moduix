import { createListCollection } from '@ark-ui/vue/collection';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, h, markRaw, ref } from 'vue';
import type { Component } from 'vue';
import {
  Select,
  SelectContext,
  SelectContent,
  SelectField,
  SelectHiddenSelect,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
  SelectLabel,
  SelectPositioner,
  SelectRootProvider,
  useSelect,
} from '@/components/select';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
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
const longLabels = createListCollection<OptionItem>({
  items: [
    {
      label: 'A deliberately long option label that demonstrates truncation inside a narrow field',
      value: 'long-label',
    },
    { label: 'Short option', value: 'short-option' },
  ],
});

const InfoIcon = defineComponent({
  template: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0Zm-9-3.75h.008v.008H12V8.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>`,
});
const SelectFieldView = defineComponent({
  components: { SelectField },
  props: { placeholder: { type: String, default: 'Select an option' } },
  template: '<SelectField :placeholder="placeholder" clear-label="Clear selection" />',
});
const FruitItems = defineComponent({
  components: { SelectItem, SelectItemIndicator, SelectItemText },
  setup: () => ({ items: fruits.items }),
  template:
    '<SelectItem v-for="item in items" :key="item.value" :item="item"><SelectItemText>{{ item.label }}</SelectItemText><SelectItemIndicator /></SelectItem>',
});
const SelectPopupContent = defineComponent({
  components: { SelectContent, SelectPositioner },
  template: '<SelectPositioner><SelectContent><slot /></SelectContent></SelectPositioner>',
});
const GroupedProduceItems = defineComponent({
  components: {
    SelectItem,
    SelectItemGroup,
    SelectItemGroupLabel,
    SelectItemIndicator,
    SelectItemText,
  },
  setup: () => ({ groups: produce.group() }),
  template:
    '<SelectItemGroup v-for="group in groups" :key="group[0]"><SelectItemGroupLabel>{{ group[0] }}</SelectItemGroupLabel><SelectItem v-for="item in group[1]" :key="item.value" :item="item"><SelectItemText>{{ item.label }}</SelectItemText><SelectItemIndicator /></SelectItem></SelectItemGroup>',
});
const storyComponents = {
  GroupedProduceItems,
  InfoIcon,
  FruitItems,
  Select,
  SelectContext,
  SelectField,
  SelectFieldView,
  SelectHiddenSelect,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
  SelectLabel,
  SelectPopupContent,
  SelectPositioner,
  SelectRootProvider,
} as unknown as Record<string, Component>;

const meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const renderStory = (template: string, setup?: () => Record<string, unknown>) => () =>
  defineComponent({
    components: storyComponents,
    setup: () => ({ fruits, languages, longLabels, produce, themeOptions, styles, ...setup?.() }),
    template,
  });
const base = (body: string) => `<div class="${styles.stack}">${body}</div>`;

export const Basic: Story = {
  render: renderStory(
    `<Select :collection="fruits"><SelectLabel>Choose fruit</SelectLabel><SelectFieldView /><SelectPopupContent><SelectItemGroup><SelectItemGroupLabel>Fruits</SelectItemGroupLabel><FruitItems /></SelectItemGroup></SelectPopupContent></Select>`,
  ),
};
export const CustomFieldIndicator: Story = {
  render: renderStory(
    `<Select :collection="fruits"><SelectLabel>Choose fruit</SelectLabel><SelectField placeholder="Select an option" :indicator="chevronDown" /><SelectPopupContent><SelectItemGroup><SelectItemGroupLabel>Fruits</SelectItemGroupLabel><FruitItems /></SelectItemGroup></SelectPopupContent></Select>`,
    () => ({ chevronDown: markRaw(h(ChevronDownIcon)) }),
  ),
};
export const Grouped: Story = {
  render: renderStory(
    `<Select :collection="produce"><SelectLabel>Choose produce</SelectLabel><SelectFieldView placeholder="Select item" /><SelectPopupContent><GroupedProduceItems /></SelectPopupContent></Select>`,
  ),
};
export const Multiple: Story = {
  render: renderStory(
    `<Select :collection="languages" multiple :default-value="['javascript', 'typescript']"><SelectLabel>Languages</SelectLabel><SelectFieldView placeholder="Select languages" /><SelectPopupContent><SelectItemGroup><SelectItemGroupLabel>Languages</SelectItemGroupLabel><SelectItem v-for="item in languages.items" :key="item.value" :item="item"><SelectItemText>{{ item.label }}</SelectItemText><SelectItemIndicator /></SelectItem></SelectItemGroup></SelectPopupContent></Select>`,
  ),
};
export const Controlled: Story = {
  render: renderStory(
    base(
      `<Select v-model="value" :collection="themeOptions"><SelectLabel>Theme</SelectLabel><SelectFieldView placeholder="Select theme" /><SelectPopupContent><SelectItemGroup><SelectItemGroupLabel>Theme</SelectItemGroupLabel><SelectItem v-for="item in themeOptions.items" :key="item.value" :item="item"><SelectItemText>{{ item.label }}</SelectItemText><SelectItemIndicator /></SelectItem></SelectItemGroup></SelectPopupContent></Select><span :class="styles.state">Current value: {{ value[0] ?? 'none' }}</span>`,
    ),
    () => ({ value: ref(['light']) }),
  ),
};
export const ClearTrigger: Story = {
  render: renderStory(
    `<Select :collection="themeOptions" :default-value="['system']" deselectable><SelectLabel>Theme</SelectLabel><SelectFieldView placeholder="Select theme" /><SelectPopupContent><SelectItem v-for="item in themeOptions.items" :key="item.value" :item="item"><SelectItemText>{{ item.label }}</SelectItemText><SelectItemIndicator /></SelectItem></SelectPopupContent></Select>`,
  ),
};
export const Disabled: Story = {
  render: renderStory(
    `<Select :collection="fruits" :default-value="['apple']" disabled><SelectLabel>Unavailable fruit</SelectLabel><SelectFieldView /><SelectPopupContent><FruitItems /></SelectPopupContent></Select>`,
  ),
};
export const Invalid: Story = {
  render: renderStory(
    `<Select :collection="fruits" invalid><SelectLabel>Required fruit</SelectLabel><SelectFieldView /><SelectPopupContent><FruitItems /></SelectPopupContent></Select>`,
  ),
};
export const LongContent: Story = {
  render: renderStory(
    `<Select :collection="longLabels" :default-value="['long-label']" :positioning="{ sameWidth: true }"><SelectLabel>Delivery preference with a long label</SelectLabel><SelectFieldView /><SelectPopupContent><SelectItem v-for="item in longLabels.items" :key="item.value" :item="item"><SelectItemText>{{ item.label }}</SelectItemText><SelectItemIndicator /></SelectItem></SelectPopupContent></Select>`,
  ),
};
export const LazyMount: Story = {
  render: renderStory(
    `<Select :collection="fruits" lazy-mount unmount-on-exit><SelectLabel>Choose fruit</SelectLabel><SelectFieldView /><SelectPopupContent><SelectItemGroup><SelectItemGroupLabel>Fruits</SelectItemGroupLabel><FruitItems /></SelectItemGroup></SelectPopupContent></Select>`,
  ),
};
export const Context: Story = {
  render: renderStory(
    `<Select :collection="fruits" :default-value="['apple']"><SelectLabel>Choose fruit</SelectLabel><SelectFieldView /><SelectContext v-slot="context"><span :class="styles.state">Selected: {{ context.valueAsString }}</span></SelectContext><SelectPopupContent><SelectItemGroup><SelectItemGroupLabel>Fruits</SelectItemGroupLabel><FruitItems /></SelectItemGroup></SelectPopupContent></Select>`,
  ),
};
export const RootProvider: Story = {
  render: renderStory(
    base(
      `<span :class="styles.state">Selected: {{ select.valueAsString }}</span><SelectRootProvider :value="select"><SelectLabel>Choose fruit</SelectLabel><SelectFieldView /><SelectPopupContent><SelectItemGroup><SelectItemGroupLabel>Fruits</SelectItemGroupLabel><FruitItems /></SelectItemGroup></SelectPopupContent></SelectRootProvider>`,
    ),
    () => ({ select: useSelect({ collection: fruits, defaultValue: ['banana'] }) }),
  ),
};
export const NativeFormControl: Story = {
  render: renderStory(
    `<Select :collection="fruits" :default-value="['apple']" name="fruit"><SelectLabel>Choose fruit</SelectLabel><SelectFieldView /><SelectPopupContent><SelectItemGroup><SelectItemGroupLabel>Fruits</SelectItemGroupLabel><FruitItems /></SelectItemGroup></SelectPopupContent><SelectHiddenSelect /></Select>`,
  ),
};
export const CustomItemLayout: Story = {
  render: renderStory(
    `<Select :collection="fruits"><SelectLabel>Choose fruit</SelectLabel><SelectFieldView /><SelectPopupContent><SelectItem v-for="item in fruits.items" :key="item.value" :item="item"><SelectItemText><SelectItemTextContent><SelectItemTextIcon><InfoIcon /></SelectItemTextIcon><SelectItemTextLabel>{{ item.label }}</SelectItemTextLabel></SelectItemTextContent></SelectItemText><SelectItemIndicator /></SelectItem></SelectPopupContent></Select>`,
  ),
};
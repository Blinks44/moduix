import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, defineComponent, ref, useAttrs } from 'vue';
import type { Component } from 'vue';
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
} from '@/components/checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const stackClass = 'flex flex-col items-start gap-3';
const hintClass = 'text-xs leading-4 text-muted-foreground';
const buttonClass = 'rounded-sm border border-border bg-background px-3 py-2 text-sm leading-5';
const wrapperClass = 'flex flex-col items-start gap-2';
const narrowClass = 'flex w-72 flex-col items-start gap-3';
const groupHeadingClass = 'text-sm leading-5 font-semibold text-foreground';
const customGroupClass = 'gap-3 text-primary';
const customRootClass = 'gap-3 text-primary';
const customControlClass =
  'border-primary data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary';
const customIndicatorIconClass = '-rotate-[8deg]';
const customLabelClass = 'font-semibold';

const notificationOptions = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

const sizeOptions = [
  { value: 'xs', label: 'Extra-small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra-large' },
] as const;

const frameworkOptions = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

const extendedFrameworkOptions = [...frameworkOptions, { value: 'svelte', label: 'Svelte' }];

const CustomPlusIcon = defineComponent({
  inheritAttrs: false,
  template: `
    <svg v-bind="$attrs" viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false">
      <path d="M5 1.5V8.5M1.5 5H8.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>
  `,
});

const checkboxComponents = {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
  CustomPlusIcon,
} as unknown as Record<string, Component>;

const CheckboxItem = defineComponent({
  inheritAttrs: false,
  components: checkboxComponents,
  props: {
    controlClass: { type: String, default: undefined },
    customStyled: Boolean,
    indicator: { type: String, default: 'default' },
    labelClass: { type: String, default: undefined },
  },
  setup() {
    return { attrs: useAttrs(), customIndicatorIconClass };
  },
  template: `
    <Checkbox v-bind="attrs">
      <CheckboxControl v-if="indicator !== 'custom'" :class="customStyled ? controlClass : undefined" />
      <CheckboxControl v-else :class="customStyled ? controlClass : undefined">
        <CheckboxIndicator><CustomPlusIcon :class="customIndicatorIconClass" /></CheckboxIndicator>
      </CheckboxControl>
      <CheckboxLabel :class="customStyled ? labelClass : undefined"><slot /></CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  `,
});

const storyComponents = { ...checkboxComponents, CheckboxItem };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`<CheckboxItem :default-checked="true">Enable notifications</CheckboxItem>`),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <CheckboxItem :checked="checked" @checked-change="handleCheckedChange">
          {{ checked ? 'Enabled' : 'Disabled' }}
        </CheckboxItem>
        <span :class="hintClass">Current value: {{ String(checked) }}</span>
      </div>
    `,
    () => {
      const checked = ref(true);
      const handleCheckedChange = (details: { checked: boolean | 'indeterminate' }) => {
        checked.value = details.checked === true;
      };
      return { checked, handleCheckedChange, hintClass, stackClass };
    },
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <CheckboxRootProvider :value="checkbox">
          <CheckboxControl />
          <CheckboxLabel>Managed outside the tree</CheckboxLabel>
          <CheckboxHiddenInput />
        </CheckboxRootProvider>
        <button type="button" :class="buttonClass" @click="toggleCheckbox">
          {{ checkbox.checked ? 'Uncheck' : 'Check' }}
        </button>
      </div>
    `,
    () => {
      const checkbox = useCheckbox({ defaultChecked: true });
      const toggleCheckbox = () => checkbox.value.setChecked(!checkbox.value.checked);
      return { buttonClass, checkbox, stackClass, toggleCheckbox };
    },
  ),
};

export const Indeterminate: Story = {
  render: renderStory(
    `<CheckboxItem :checked="'indeterminate'">Select all team members</CheckboxItem>`,
  ),
};

export const Sizes: Story = {
  render: renderStory(
    `
    <div :class="stackClass">
      <CheckboxItem v-for="option in sizeOptions" :key="option.value" :size="option.value" :default-checked="true">
        {{ option.label }}
      </CheckboxItem>
    </div>
  `,
    () => ({ sizeOptions, stackClass }),
  ),
};

export const Disabled: Story = {
  render: renderStory(
    `
    <div :class="stackClass">
      <CheckboxItem disabled>Receive weekly summary</CheckboxItem>
      <CheckboxItem :default-checked="true" disabled>Share anonymous usage data</CheckboxItem>
    </div>
  `,
    () => ({ stackClass }),
  ),
};

export const ReadOnly: Story = {
  render: renderStory(
    `
    <div :class="stackClass">
      <CheckboxItem read-only>Keep current selection</CheckboxItem>
      <CheckboxItem :default-checked="true" read-only>Preserve existing setting</CheckboxItem>
    </div>
  `,
    () => ({ stackClass }),
  ),
};

export const Invalid: Story = {
  render: renderStory(
    `
    <div :class="stackClass">
      <CheckboxItem invalid required>Accept the data processing terms</CheckboxItem>
      <CheckboxItem :default-checked="true" invalid>Keep the invalid selection</CheckboxItem>
    </div>
  `,
    () => ({ stackClass }),
  ),
};

export const ContentResilience: Story = {
  render: renderStory(
    `
    <div :class="narrowClass">
      <CheckboxItem :default-checked="true">Email me a weekly summary of security, billing, and workspace activity</CheckboxItem>
      <CheckboxItem>Allow administrators to contact me when an account setting needs attention</CheckboxItem>
    </div>
  `,
    () => ({ narrowClass }),
  ),
};

export const CustomIndicator: Story = {
  render: renderStory(
    `
    <CheckboxItem :default-checked="true" indicator="custom" :control-class="customControlClass">
      Custom indicator
    </CheckboxItem>
  `,
    () => ({ customControlClass }),
  ),
};

export const Group: Story = {
  render: renderStory(
    `
    <div :class="wrapperClass">
      <div :class="groupHeadingClass">Notification Channels</div>
      <CheckboxGroup :default-value="['email']" name="notifications">
        <CheckboxItem v-for="option in notificationOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </CheckboxItem>
      </CheckboxGroup>
    </div>
  `,
    () => ({ groupHeadingClass, notificationOptions, wrapperClass }),
  ),
};

export const GroupControlled: Story = {
  render: renderStory(
    `
    <div :class="wrapperClass">
      <div :class="groupHeadingClass">Active Alerts</div>
      <CheckboxGroup :value="value" @value-change="handleValueChange" name="alerts">
        <CheckboxItem v-for="option in notificationOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </CheckboxItem>
      </CheckboxGroup>
      <span :class="hintClass">Current value: {{ value.join(', ') || 'none' }}</span>
    </div>
  `,
    () => {
      const value = ref<string[]>(['push']);
      const handleValueChange = (nextValue: string[]) => {
        value.value = nextValue;
      };
      return {
        groupHeadingClass,
        handleValueChange,
        hintClass,
        notificationOptions,
        value,
        wrapperClass,
      };
    },
  ),
};

export const GroupWithFieldset: Story = {
  render: renderStory(
    `
    <fieldset :class="wrapperClass">
      <legend :class="groupHeadingClass">Frameworks</legend>
      <CheckboxGroup :default-value="['react']" name="frameworks">
        <CheckboxItem v-for="option in frameworkOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </CheckboxItem>
      </CheckboxGroup>
    </fieldset>
  `,
    () => ({ frameworkOptions, groupHeadingClass, wrapperClass }),
  ),
};

export const GroupWithMaxSelected: Story = {
  render: renderStory(
    `
    <CheckboxGroup :default-value="['react', 'solid']" :max-selected-values="2" name="frameworks">
      <CheckboxItem v-for="option in extendedFrameworkOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </CheckboxItem>
    </CheckboxGroup>
  `,
    () => ({ extendedFrameworkOptions }),
  ),
};

export const GroupWithForm: Story = {
  render: renderStory(
    `
    <form :class="stackClass" @submit="handleSubmit">
      <CheckboxGroup :default-value="['react']" name="frameworks">
        <CheckboxItem v-for="option in frameworkOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </CheckboxItem>
      </CheckboxGroup>
      <button type="submit" :class="buttonClass">Submit</button>
      <span :class="hintClass">{{ result }}</span>
    </form>
  `,
    () => {
      const result = ref('frameworks: []');
      const handleSubmit = (event: Event) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        result.value = `frameworks: ${JSON.stringify(new FormData(form).getAll('frameworks'))}`;
      };
      return { buttonClass, frameworkOptions, handleSubmit, hintClass, result, stackClass };
    },
  ),
};

export const GroupWithSelectAll: Story = {
  render: renderStory(
    `
    <div :class="wrapperClass">
      <CheckboxItem
        :checked="indeterminate ? 'indeterminate' : allSelected"
        @checked-change="handleSelectAll"
      >
        Select all
      </CheckboxItem>
      <CheckboxGroup v-model="value" name="frameworks">
        <CheckboxItem v-for="option in frameworkOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </CheckboxItem>
      </CheckboxGroup>
    </div>
  `,
    () => {
      const value = ref<string[]>(['react']);
      const allValues = frameworkOptions.map((option) => option.value);
      const allSelected = computed(() => value.value.length === allValues.length);
      const indeterminate = computed(
        () => value.value.length > 0 && value.value.length < allValues.length,
      );
      const handleSelectAll = (details: { checked: boolean | 'indeterminate' }) => {
        value.value = details.checked === true ? allValues : [];
      };
      return { allSelected, frameworkOptions, handleSelectAll, indeterminate, value, wrapperClass };
    },
  ),
};

export const InvalidGroup: Story = {
  render: renderStory(
    `
    <div :class="wrapperClass">
      <div :class="groupHeadingClass">Notification Channels</div>
      <CheckboxGroup invalid :default-value="['email']" name="channels">
        <CheckboxItem v-for="option in notificationOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </CheckboxItem>
      </CheckboxGroup>
      <span :class="hintClass">Use invalid on the group when selection is required.</span>
    </div>
  `,
    () => ({ groupHeadingClass, hintClass, notificationOptions, wrapperClass }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(
    `
    <div :class="wrapperClass">
      <div :class="groupHeadingClass">Styled Channels</div>
      <CheckboxGroup :default-value="['email']" :class="customGroupClass" name="styled-channels">
        <CheckboxItem
          v-for="option in notificationOptions"
          :key="option.value"
          :value="option.value"
          :class="customRootClass"
          indicator="custom"
          custom-styled
          :control-class="customControlClass"
          :label-class="customLabelClass"
        >
          {{ option.label }}
        </CheckboxItem>
      </CheckboxGroup>
    </div>
  `,
    () => ({
      customControlClass,
      customGroupClass,
      customLabelClass,
      customRootClass,
      notificationOptions,
      wrapperClass,
    }),
  ),
};
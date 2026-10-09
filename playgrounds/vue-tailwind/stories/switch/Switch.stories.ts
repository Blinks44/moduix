import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import { Button } from '@/components/button';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
  useSwitch,
  useSwitchContext,
} from '@/components/switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

const stackClass = 'flex flex-col items-start gap-3';
const hintClass = 'text-xs leading-4 text-muted-foreground';
const siblingRowClass = 'flex items-center gap-2';
const labelClass = 'text-foreground text-sm leading-5 font-medium';
const customIconThumbClass =
  'data-[state=checked]:text-primary data-[state=unchecked]:text-muted-foreground [&>svg]:size-3';

const PowerIcon = defineComponent({
  template: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M8 2.5V7M5.1 4.3A5 5 0 1 0 10.9 4.3"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  `,
});

const SwitchContextLabel = defineComponent({
  components: { SwitchLabel },
  setup() {
    return { switchApi: useSwitchContext() };
  },
  template:
    '<SwitchLabel>Feature is {{ switchApi.checked ? "enabled" : "disabled" }}</SwitchLabel>',
});

const storyComponents = {
  Button,
  Field,
  FieldErrorText,
  FieldHelperText,
  PowerIcon,
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
  SwitchContextLabel,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          hintClass,
          labelClass,
          customIconThumbClass,
          siblingRowClass,
          stackClass,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Switch :default-checked="true">
      <SwitchControl />
      <SwitchLabel>Enable notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Switch size="xs" :default-checked="true"><SwitchControl /><SwitchLabel>Extra-small</SwitchLabel><SwitchHiddenInput /></Switch>
      <Switch size="sm" :default-checked="true"><SwitchControl /><SwitchLabel>Small</SwitchLabel><SwitchHiddenInput /></Switch>
      <Switch size="md" :default-checked="true"><SwitchControl /><SwitchLabel>Medium</SwitchLabel><SwitchHiddenInput /></Switch>
      <Switch size="lg" :default-checked="true"><SwitchControl /><SwitchLabel>Large</SwitchLabel><SwitchHiddenInput /></Switch>
      <Switch size="xl" :default-checked="true"><SwitchControl /><SwitchLabel>Extra-large</SwitchLabel><SwitchHiddenInput /></Switch>
    </div>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Switch disabled><SwitchControl /><SwitchLabel>Enable dark mode</SwitchLabel><SwitchHiddenInput /></Switch>
      <Switch disabled :default-checked="true"><SwitchControl /><SwitchLabel>Keep me signed in</SwitchLabel><SwitchHiddenInput /></Switch>
    </div>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <Switch v-model:checked="checked">
          <SwitchControl />
          <SwitchLabel>{{ checked ? 'On' : 'Off' }}</SwitchLabel>
          <SwitchHiddenInput />
        </Switch>
        <span :class="hintClass">Current value: {{ String(checked) }}</span>
      </div>
    `,
    () => ({ checked: ref(true) }),
  ),
};

export const ReadOnly: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Switch read-only><SwitchControl /><SwitchLabel>Managed by policy</SwitchLabel><SwitchHiddenInput /></Switch>
      <Switch read-only :default-checked="true"><SwitchControl /><SwitchLabel>Always on</SwitchLabel><SwitchHiddenInput /></Switch>
    </div>
  `),
};

export const CustomIcon: Story = {
  render: renderStory(`
    <Switch :default-checked="true">
      <SwitchControl>
        <SwitchThumb :class="customIconThumbClass"><PowerIcon /></SwitchThumb>
      </SwitchControl>
      <SwitchLabel>Use custom thumb icon</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  `),
};

export const Context: Story = {
  render: renderStory(`
    <Switch :default-checked="true">
      <SwitchControl />
      <SwitchContextLabel />
      <SwitchHiddenInput />
    </Switch>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <Button variant="outline" @click="switchApi.toggleChecked">Toggle externally</Button>
        <SwitchRootProvider :value="switchApi">
          <SwitchControl />
          <SwitchLabel>External state owner</SwitchLabel>
          <SwitchHiddenInput />
        </SwitchRootProvider>
      </div>
    `,
    () => ({ switchApi: useSwitch({ defaultChecked: true }) }),
  ),
};

export const AsChild: Story = {
  render: renderStory(`
    <Switch as-child :default-checked="true">
      <label :class="siblingRowClass">
        <SwitchControl />
        <span :class="labelClass">Enable reminders</span>
        <SwitchHiddenInput />
      </label>
    </Switch>
  `),
};

export const NativeForm: Story = {
  render: renderStory(
    `
    <form :class="stackClass" @submit.prevent="handleSubmit" @reset="handleReset">
      <Switch name="notifications" :default-checked="true">
        <SwitchControl />
        <SwitchLabel>Notifications</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Button type="submit">Submit</Button>
      <Button type="reset" variant="outline">Reset</Button>
      <output>{{ submitted }}</output>
    </form>
  `,
    () => {
      const submitted = ref('Nothing submitted');
      const handleSubmit = (event: SubmitEvent) => {
        const form = event.currentTarget as HTMLFormElement;
        submitted.value = JSON.stringify(Array.from(new FormData(form).entries()));
      };
      const handleReset = () => {
        submitted.value = 'Nothing submitted';
      };

      return { handleReset, handleSubmit, submitted };
    },
  ),
};

export const FormIntegration: Story = {
  render: renderStory(`
    <Field invalid>
      <Switch name="notifications" required>
        <SwitchControl />
        <SwitchLabel>Notifications</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <FieldHelperText>Used for product and account updates.</FieldHelperText>
      <FieldErrorText>Notification preference is required.</FieldErrorText>
    </Field>
  `),
};
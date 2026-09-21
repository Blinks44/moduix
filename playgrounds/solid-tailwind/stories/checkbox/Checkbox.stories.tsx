import type { ComponentProps, JSX } from 'solid-js';
import { createSignal, splitProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
} from '@/components/checkbox/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
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
const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

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

function CustomPlusIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 10 10" fill="none" {...accessibilityProps} {...props}>
      <path
        d="M5 1.5V8.5M1.5 5H8.5"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  );
}

function CheckboxItem(
  props: ComponentProps<typeof Checkbox> & {
    indicator?: 'default' | 'custom';
    customStyled?: boolean;
  },
) {
  const [local, others] = splitProps(props, ['children', 'customStyled', 'indicator']);

  return (
    <Checkbox {...others}>
      <CheckboxControl class={local.customStyled ? customControlClass : undefined}>
        {local.indicator === 'custom' ? (
          <CheckboxIndicator>
            <CustomPlusIcon class={customIndicatorIconClass} />
          </CheckboxIndicator>
        ) : null}
      </CheckboxControl>
      <CheckboxLabel class={local.customStyled ? customLabelClass : undefined}>
        {local.children}
      </CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}

export const Basic: Story = {
  render: () => <CheckboxItem defaultChecked>Enable notifications</CheckboxItem>,
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = createSignal(true);

    return (
      <div class={stackClass}>
        <CheckboxItem
          checked={checked()}
          onCheckedChange={(details) => setChecked(details.checked === true)}
        >
          {checked() ? 'Enabled' : 'Disabled'}
        </CheckboxItem>
        <span class={hintClass}>Current value: {String(checked())}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const checkbox = useCheckbox({ defaultChecked: true });

    return (
      <div class={stackClass}>
        <CheckboxRootProvider value={checkbox}>
          <CheckboxControl />
          <CheckboxLabel>Managed outside the tree</CheckboxLabel>
          <CheckboxHiddenInput />
        </CheckboxRootProvider>
        <button
          type="button"
          class={buttonClass}
          onClick={() => checkbox().setChecked(!checkbox().checked)}
        >
          {checkbox().checked ? 'Uncheck' : 'Check'}
        </button>
      </div>
    );
  },
};

export const Indeterminate: Story = {
  render: () => <CheckboxItem checked="indeterminate">Select all team members</CheckboxItem>,
};

export const Sizes: Story = {
  render: () => (
    <div class={stackClass}>
      {sizeOptions.map((option) => (
        <CheckboxItem size={option.value} defaultChecked>
          {option.label}
        </CheckboxItem>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div class={stackClass}>
      <CheckboxItem disabled>Receive weekly summary</CheckboxItem>
      <CheckboxItem defaultChecked disabled>
        Share anonymous usage data
      </CheckboxItem>
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div class={stackClass}>
      <CheckboxItem readOnly>Keep current selection</CheckboxItem>
      <CheckboxItem defaultChecked readOnly>
        Preserve existing setting
      </CheckboxItem>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div class={stackClass}>
      <CheckboxItem invalid required>
        Accept the data processing terms
      </CheckboxItem>
      <CheckboxItem defaultChecked invalid>
        Keep the invalid selection
      </CheckboxItem>
    </div>
  ),
};

export const ContentResilience: Story = {
  render: () => (
    <div class={narrowClass}>
      <CheckboxItem defaultChecked>
        Email me a weekly summary of security, billing, and workspace activity
      </CheckboxItem>
      <CheckboxItem>
        Allow administrators to contact me when an account setting needs attention
      </CheckboxItem>
    </div>
  ),
};

export const CustomIndicator: Story = {
  render: () => (
    <CheckboxItem defaultChecked indicator="custom">
      Custom indicator
    </CheckboxItem>
  ),
};

export const Group: Story = {
  render: () => (
    <div class={wrapperClass}>
      <div class={groupHeadingClass}>Notification Channels</div>
      <CheckboxGroup defaultValue={['email']} name="notifications">
        {notificationOptions.map((option) => (
          <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
        ))}
      </CheckboxGroup>
    </div>
  ),
};

export const GroupControlled: Story = {
  render: () => {
    const [value, setValue] = createSignal<string[]>(['push']);

    return (
      <div class={wrapperClass}>
        <div class={groupHeadingClass}>Active Alerts</div>
        <CheckboxGroup
          value={value}
          onValueChange={(nextValue) => setValue(nextValue)}
          name="alerts"
        >
          {notificationOptions.map((option) => (
            <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
          ))}
        </CheckboxGroup>
        <span class={hintClass}>Current value: {value().join(', ') || 'none'}</span>
      </div>
    );
  },
};

export const GroupWithFieldset: Story = {
  render: () => (
    <fieldset class={wrapperClass}>
      <legend class={groupHeadingClass}>Frameworks</legend>
      <CheckboxGroup defaultValue={['react']} name="frameworks">
        {frameworkOptions.map((option) => (
          <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
        ))}
      </CheckboxGroup>
    </fieldset>
  ),
};

export const GroupWithMaxSelected: Story = {
  render: () => (
    <CheckboxGroup defaultValue={['react', 'solid']} maxSelectedValues={2} name="frameworks">
      {extendedFrameworkOptions.map((option) => (
        <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
      ))}
    </CheckboxGroup>
  ),
};

export const GroupWithForm: Story = {
  render: () => {
    const [result, setResult] = createSignal('frameworks: []');

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const form = event.currentTarget as HTMLFormElement;
      setResult(`frameworks: ${JSON.stringify(new FormData(form).getAll('frameworks'))}`);
    };

    return (
      <form class={stackClass} onSubmit={handleSubmit}>
        <CheckboxGroup defaultValue={['react']} name="frameworks">
          {frameworkOptions.map((option) => (
            <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
          ))}
        </CheckboxGroup>
        <button type="submit" class={buttonClass}>
          Submit
        </button>
        <span class={hintClass}>{result()}</span>
      </form>
    );
  },
};

export const GroupWithSelectAll: Story = {
  render: () => {
    const [value, setValue] = createSignal<string[]>(['react']);
    const allValues = frameworkOptions.map((option) => option.value);
    const allSelected = () => value().length === allValues.length;
    const indeterminate = () => value().length > 0 && value().length < allValues.length;

    return (
      <div class={wrapperClass}>
        <CheckboxItem
          checked={indeterminate() ? 'indeterminate' : allSelected()}
          onCheckedChange={(details) => setValue(details.checked === true ? allValues : [])}
        >
          Select all
        </CheckboxItem>
        <CheckboxGroup
          value={value}
          onValueChange={(nextValue) => setValue(nextValue)}
          name="frameworks"
        >
          {frameworkOptions.map((option) => (
            <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
          ))}
        </CheckboxGroup>
      </div>
    );
  },
};

export const InvalidGroup: Story = {
  render: () => (
    <div class={wrapperClass}>
      <div class={groupHeadingClass}>Notification Channels</div>
      <CheckboxGroup invalid defaultValue={['email']} name="channels">
        {notificationOptions.map((option) => (
          <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
        ))}
      </CheckboxGroup>
      <span class={hintClass}>Use `invalid` on the group when selection is required.</span>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class={wrapperClass}>
      <div class={groupHeadingClass}>Styled Channels</div>
      <CheckboxGroup class={customGroupClass} defaultValue={['email']} name="styled-channels">
        {notificationOptions.map((option) => (
          <CheckboxItem
            value={option.value}
            class={customRootClass}
            indicator="custom"
            customStyled
          >
            {option.label}
          </CheckboxItem>
        ))}
      </CheckboxGroup>
    </div>
  ),
};
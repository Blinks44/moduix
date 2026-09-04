import type { ComponentProps, JSX } from 'solid-js';
import { createSignal, splitProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Checkbox, useCheckbox } from '@/components/checkbox/Checkbox';
import styles from './Checkbox.stories.module.css';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

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
const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

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
  props: ComponentProps<typeof Checkbox.Root> & {
    indicator?: 'default' | 'custom';
    customStyled?: boolean;
  },
) {
  const [local, others] = splitProps(props, ['children', 'customStyled', 'indicator']);

  return (
    <Checkbox.Root {...others}>
      <Checkbox.Control class={local.customStyled ? styles.customControl : undefined}>
        {local.indicator === 'custom' ? (
          <Checkbox.Indicator>
            <CustomPlusIcon class={styles.customIndicatorIcon} />
          </Checkbox.Indicator>
        ) : null}
      </Checkbox.Control>
      <Checkbox.Label class={local.customStyled ? styles.customLabel : undefined}>
        {local.children}
      </Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  );
}

export const Basic: Story = {
  render: () => <CheckboxItem defaultChecked>Enable notifications</CheckboxItem>,
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = createSignal(true);

    return (
      <div class={styles.stack}>
        <CheckboxItem
          checked={checked()}
          onCheckedChange={(details) => setChecked(details.checked === true)}
        >
          {checked() ? 'Enabled' : 'Disabled'}
        </CheckboxItem>
        <span class={styles.hint}>Current value: {String(checked())}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const checkbox = useCheckbox({ defaultChecked: true });

    return (
      <div class={styles.stack}>
        <Checkbox.RootProvider value={checkbox}>
          <Checkbox.Control />
          <Checkbox.Label>Managed outside the tree</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.RootProvider>
        <button
          type="button"
          class={styles.button}
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
    <div class={styles.stack}>
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
    <div class={styles.stack}>
      <CheckboxItem disabled>Receive weekly summary</CheckboxItem>
      <CheckboxItem defaultChecked disabled>
        Share anonymous usage data
      </CheckboxItem>
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div class={styles.stack}>
      <CheckboxItem readOnly>Keep current selection</CheckboxItem>
      <CheckboxItem defaultChecked readOnly>
        Preserve existing setting
      </CheckboxItem>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div class={styles.stack}>
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
    <div class={styles.narrow}>
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
    <div class={styles.wrapper}>
      <div class={styles.groupHeading}>Notification Channels</div>
      <Checkbox.Group defaultValue={['email']} name="notifications">
        {notificationOptions.map((option) => (
          <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
        ))}
      </Checkbox.Group>
    </div>
  ),
};

export const GroupControlled: Story = {
  render: () => {
    const [value, setValue] = createSignal<string[]>(['push']);

    return (
      <div class={styles.wrapper}>
        <div class={styles.groupHeading}>Active Alerts</div>
        <Checkbox.Group
          value={value}
          onValueChange={(nextValue) => setValue(nextValue)}
          name="alerts"
        >
          {notificationOptions.map((option) => (
            <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
          ))}
        </Checkbox.Group>
        <span class={styles.hint}>Current value: {value().join(', ') || 'none'}</span>
      </div>
    );
  },
};

export const GroupWithFieldset: Story = {
  render: () => (
    <fieldset class={styles.wrapper}>
      <legend class={styles.groupHeading}>Frameworks</legend>
      <Checkbox.Group defaultValue={['react']} name="frameworks">
        {frameworkOptions.map((option) => (
          <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
        ))}
      </Checkbox.Group>
    </fieldset>
  ),
};

export const GroupWithMaxSelected: Story = {
  render: () => (
    <Checkbox.Group defaultValue={['react', 'solid']} maxSelectedValues={2} name="frameworks">
      {extendedFrameworkOptions.map((option) => (
        <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
      ))}
    </Checkbox.Group>
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
      <form class={styles.stack} onSubmit={handleSubmit}>
        <Checkbox.Group defaultValue={['react']} name="frameworks">
          {frameworkOptions.map((option) => (
            <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
          ))}
        </Checkbox.Group>
        <button type="submit" class={styles.button}>
          Submit
        </button>
        <span class={styles.hint}>{result()}</span>
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
      <div class={styles.wrapper}>
        <CheckboxItem
          checked={indeterminate() ? 'indeterminate' : allSelected()}
          onCheckedChange={(details) => setValue(details.checked === true ? allValues : [])}
        >
          Select all
        </CheckboxItem>
        <Checkbox.Group
          value={value}
          onValueChange={(nextValue) => setValue(nextValue)}
          name="frameworks"
        >
          {frameworkOptions.map((option) => (
            <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
          ))}
        </Checkbox.Group>
      </div>
    );
  },
};

export const InvalidGroup: Story = {
  render: () => (
    <div class={styles.wrapper}>
      <div class={styles.groupHeading}>Notification Channels</div>
      <Checkbox.Group invalid defaultValue={['email']} name="channels">
        {notificationOptions.map((option) => (
          <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
        ))}
      </Checkbox.Group>
      <span class={styles.hint}>Use `invalid` on the group when selection is required.</span>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div class={styles.wrapper}>
      <div class={styles.groupHeading}>Styled Channels</div>
      <Checkbox.Group defaultValue={['email']} class={styles.customGroup} name="styled-channels">
        {notificationOptions.map((option) => (
          <CheckboxItem
            value={option.value}
            class={styles.customRoot}
            indicator="custom"
            customStyled
          >
            {option.label}
          </CheckboxItem>
        ))}
      </Checkbox.Group>
    </div>
  ),
};
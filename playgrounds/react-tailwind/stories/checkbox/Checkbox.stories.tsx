import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
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

function CustomPlusIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M5 1.5V8.5M1.5 5H8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckboxItem({
  children,
  indicator,
  customStyled,
  ...props
}: ComponentProps<typeof Checkbox> & {
  indicator?: 'default' | 'custom';
  customStyled?: boolean;
}) {
  return (
    <Checkbox {...props}>
      <CheckboxControl className={customStyled ? customControlClass : undefined}>
        {indicator === 'custom' ? (
          <CheckboxIndicator>
            <CustomPlusIcon className={customIndicatorIconClass} />
          </CheckboxIndicator>
        ) : null}
      </CheckboxControl>
      <CheckboxLabel className={customStyled ? customLabelClass : undefined}>
        {children}
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
    const [checked, setChecked] = useState(true);

    return (
      <div className={stackClass}>
        <CheckboxItem
          checked={checked}
          onCheckedChange={(details) => setChecked(details.checked === true)}
        >
          {checked ? 'Enabled' : 'Disabled'}
        </CheckboxItem>
        <span className={hintClass}>Current value: {String(checked)}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const checkbox = useCheckbox({ defaultChecked: true });

    return (
      <div className={stackClass}>
        <CheckboxRootProvider value={checkbox}>
          <CheckboxControl />
          <CheckboxLabel>Managed outside the tree</CheckboxLabel>
          <CheckboxHiddenInput />
        </CheckboxRootProvider>
        <button
          type="button"
          className={buttonClass}
          onClick={() => checkbox.setChecked(!checkbox.checked)}
        >
          {checkbox.checked ? 'Uncheck' : 'Check'}
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
    <div className={stackClass}>
      {sizeOptions.map((option) => (
        <CheckboxItem key={option.value} size={option.value} defaultChecked>
          {option.label}
        </CheckboxItem>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className={stackClass}>
      <CheckboxItem disabled>Receive weekly summary</CheckboxItem>
      <CheckboxItem defaultChecked disabled>
        Share anonymous usage data
      </CheckboxItem>
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className={stackClass}>
      <CheckboxItem readOnly>Keep current selection</CheckboxItem>
      <CheckboxItem defaultChecked readOnly>
        Preserve existing setting
      </CheckboxItem>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className={stackClass}>
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
    <div className={narrowClass}>
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
    <div className={wrapperClass}>
      <div className={groupHeadingClass}>Notification Channels</div>
      <CheckboxGroup defaultValue={['email']} name="notifications">
        {notificationOptions.map((option) => (
          <CheckboxItem key={option.value} value={option.value}>
            {option.label}
          </CheckboxItem>
        ))}
      </CheckboxGroup>
    </div>
  ),
};

export const GroupControlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['push']);

    return (
      <div className={wrapperClass}>
        <div className={groupHeadingClass}>Active Alerts</div>
        <CheckboxGroup value={value} onValueChange={setValue} name="alerts">
          {notificationOptions.map((option) => (
            <CheckboxItem key={option.value} value={option.value}>
              {option.label}
            </CheckboxItem>
          ))}
        </CheckboxGroup>
        <span className={hintClass}>Current value: {value.join(', ') || 'none'}</span>
      </div>
    );
  },
};

export const GroupWithFieldset: Story = {
  render: () => (
    <fieldset className={wrapperClass}>
      <legend className={groupHeadingClass}>Frameworks</legend>
      <CheckboxGroup defaultValue={['react']} name="frameworks">
        {frameworkOptions.map((option) => (
          <CheckboxItem key={option.value} value={option.value}>
            {option.label}
          </CheckboxItem>
        ))}
      </CheckboxGroup>
    </fieldset>
  ),
};

export const GroupWithMaxSelected: Story = {
  render: () => (
    <CheckboxGroup defaultValue={['react', 'solid']} maxSelectedValues={2} name="frameworks">
      {extendedFrameworkOptions.map((option) => (
        <CheckboxItem key={option.value} value={option.value}>
          {option.label}
        </CheckboxItem>
      ))}
    </CheckboxGroup>
  ),
};

export const GroupWithForm: Story = {
  render: () => {
    const [result, setResult] = useState('frameworks: []');

    return (
      <form
        className={stackClass}
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            `frameworks: ${JSON.stringify(new FormData(event.currentTarget).getAll('frameworks'))}`,
          );
        }}
      >
        <CheckboxGroup defaultValue={['react']} name="frameworks">
          {frameworkOptions.map((option) => (
            <CheckboxItem key={option.value} value={option.value}>
              {option.label}
            </CheckboxItem>
          ))}
        </CheckboxGroup>
        <button type="submit" className={buttonClass}>
          Submit
        </button>
        <span className={hintClass}>{result}</span>
      </form>
    );
  },
};

export const GroupWithSelectAll: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['react']);
    const allValues = frameworkOptions.map((option) => option.value);
    const allSelected = value.length === allValues.length;
    const indeterminate = value.length > 0 && value.length < allValues.length;

    return (
      <div className={wrapperClass}>
        <CheckboxItem
          checked={indeterminate ? 'indeterminate' : allSelected}
          onCheckedChange={(details) => setValue(details.checked === true ? allValues : [])}
        >
          Select all
        </CheckboxItem>
        <CheckboxGroup value={value} onValueChange={setValue} name="frameworks">
          {frameworkOptions.map((option) => (
            <CheckboxItem key={option.value} value={option.value}>
              {option.label}
            </CheckboxItem>
          ))}
        </CheckboxGroup>
      </div>
    );
  },
};

export const InvalidGroup: Story = {
  render: () => (
    <div className={wrapperClass}>
      <div className={groupHeadingClass}>Notification Channels</div>
      <CheckboxGroup invalid defaultValue={['email']} name="channels">
        {notificationOptions.map((option) => (
          <CheckboxItem key={option.value} value={option.value}>
            {option.label}
          </CheckboxItem>
        ))}
      </CheckboxGroup>
      <span className={hintClass}>Use `invalid` on the group when selection is required.</span>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className={wrapperClass}>
      <div className={groupHeadingClass}>Styled Channels</div>
      <CheckboxGroup defaultValue={['email']} className={customGroupClass} name="styled-channels">
        {notificationOptions.map((option) => (
          <CheckboxItem
            key={option.value}
            value={option.value}
            className={customRootClass}
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
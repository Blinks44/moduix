import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { Fieldset, FieldsetLegend } from '../fieldset';
import { Checkbox, useCheckbox, useCheckboxGroup } from './Checkbox';
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
}: ComponentProps<typeof Checkbox.Root> & {
  indicator?: 'default' | 'dual' | 'custom';
  customStyled?: boolean;
}) {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.Control className={customStyled ? styles.customControl : undefined}>
        {indicator === 'custom' ? (
          <Checkbox.Indicator>
            <CustomPlusIcon className={styles.customIndicatorIcon} />
          </Checkbox.Indicator>
        ) : (
          <>
            <Checkbox.Indicator />
            {indicator === 'dual' ? <Checkbox.Indicator indeterminate /> : null}
          </>
        )}
      </Checkbox.Control>
      <Checkbox.Label className={customStyled ? styles.customLabel : undefined}>
        {children}
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
    const [checked, setChecked] = useState(true);

    return (
      <div className={styles.stack}>
        <CheckboxItem
          checked={checked}
          onCheckedChange={(details) => setChecked(details.checked === true)}
        >
          {checked ? 'Enabled' : 'Disabled'}
        </CheckboxItem>
        <span className={styles.hint}>Current value: {String(checked)}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const checkbox = useCheckbox({ defaultChecked: true });

    return (
      <div className={styles.stack}>
        <Checkbox.RootProvider value={checkbox}>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Managed outside the tree</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.RootProvider>
        <button
          type="button"
          className={styles.button}
          onClick={() => checkbox.setChecked(!checkbox.checked)}
        >
          {checkbox.checked ? 'Uncheck' : 'Check'}
        </button>
      </div>
    );
  },
};

export const Context: Story = {
  render: () => (
    <Checkbox.Root defaultChecked>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Context reader</Checkbox.Label>
      <Checkbox.HiddenInput />
      <Checkbox.Context>
        {(checkbox) => <span className={styles.hint}>Checked: {String(checkbox.checked)}</span>}
      </Checkbox.Context>
    </Checkbox.Root>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <CheckboxItem checked="indeterminate" indicator="dual">
      Select all team members
    </CheckboxItem>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={styles.stack}>
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
    <div className={styles.stack}>
      <CheckboxItem disabled>Receive weekly summary</CheckboxItem>
      <CheckboxItem defaultChecked disabled>
        Share anonymous usage data
      </CheckboxItem>
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className={styles.stack}>
      <CheckboxItem readOnly>Keep current selection</CheckboxItem>
      <CheckboxItem defaultChecked readOnly>
        Preserve existing setting
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
    <div className={styles.wrapper}>
      <div className={styles.groupHeading}>Notification Channels</div>
      <Checkbox.Group defaultValue={['email']} name="notifications">
        {notificationOptions.map((option) => (
          <CheckboxItem key={option.value} value={option.value}>
            {option.label}
          </CheckboxItem>
        ))}
      </Checkbox.Group>
    </div>
  ),
};

export const GroupControlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['push']);

    return (
      <div className={styles.wrapper}>
        <div className={styles.groupHeading}>Active Alerts</div>
        <Checkbox.Group value={value} onValueChange={setValue} name="alerts">
          {notificationOptions.map((option) => (
            <CheckboxItem key={option.value} value={option.value}>
              {option.label}
            </CheckboxItem>
          ))}
        </Checkbox.Group>
        <span className={styles.hint}>Current value: {value.join(', ') || 'none'}</span>
      </div>
    );
  },
};

export const GroupProvider: Story = {
  render: () => {
    const group = useCheckboxGroup({ defaultValue: ['react'], name: 'frameworks' });

    return (
      <Checkbox.GroupProvider value={group}>
        {frameworkOptions.map((option) => (
          <CheckboxItem key={option.value} value={option.value}>
            {option.label}
          </CheckboxItem>
        ))}
      </Checkbox.GroupProvider>
    );
  },
};

export const GroupWithFieldset: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend>Frameworks</FieldsetLegend>
      <Checkbox.Group defaultValue={['react']} name="frameworks">
        {frameworkOptions.map((option) => (
          <CheckboxItem key={option.value} value={option.value}>
            {option.label}
          </CheckboxItem>
        ))}
      </Checkbox.Group>
    </Fieldset>
  ),
};

export const GroupWithMaxSelected: Story = {
  render: () => (
    <Checkbox.Group defaultValue={['react', 'solid']} maxSelectedValues={2} name="frameworks">
      {extendedFrameworkOptions.map((option) => (
        <CheckboxItem key={option.value} value={option.value}>
          {option.label}
        </CheckboxItem>
      ))}
    </Checkbox.Group>
  ),
};

export const GroupWithForm: Story = {
  render: () => {
    const [result, setResult] = useState('frameworks: []');

    return (
      <form
        className={styles.stack}
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            `frameworks: ${JSON.stringify(new FormData(event.currentTarget).getAll('frameworks'))}`,
          );
        }}
      >
        <Checkbox.Group defaultValue={['react']} name="frameworks">
          {frameworkOptions.map((option) => (
            <CheckboxItem key={option.value} value={option.value}>
              {option.label}
            </CheckboxItem>
          ))}
        </Checkbox.Group>
        <button type="submit" className={styles.button}>
          Submit
        </button>
        <span className={styles.hint}>{result}</span>
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
      <div className={styles.wrapper}>
        <CheckboxItem
          checked={indeterminate ? 'indeterminate' : allSelected}
          indicator="dual"
          onCheckedChange={(details) => setValue(details.checked === true ? allValues : [])}
        >
          Select all
        </CheckboxItem>
        <Checkbox.Group value={value} onValueChange={setValue} name="frameworks">
          {frameworkOptions.map((option) => (
            <CheckboxItem key={option.value} value={option.value}>
              {option.label}
            </CheckboxItem>
          ))}
        </Checkbox.Group>
      </div>
    );
  },
};

export const InvalidGroup: Story = {
  render: () => (
    <div className={styles.wrapper}>
      <div className={styles.groupHeading}>Notification Channels</div>
      <Checkbox.Group invalid defaultValue={['email']} name="channels">
        {notificationOptions.map((option) => (
          <CheckboxItem key={option.value} value={option.value}>
            {option.label}
          </CheckboxItem>
        ))}
      </Checkbox.Group>
      <span className={styles.hint}>Use `invalid` on the group when selection is required.</span>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className={styles.wrapper}>
      <div className={styles.groupHeading}>Styled Channels</div>
      <Checkbox.Group
        defaultValue={['email']}
        className={styles.customGroup}
        name="styled-channels"
      >
        {notificationOptions.map((option) => (
          <CheckboxItem
            key={option.value}
            value={option.value}
            className={styles.customRoot}
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
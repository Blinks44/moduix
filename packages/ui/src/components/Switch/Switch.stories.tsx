import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState, type ComponentProps } from 'react';
import { Field, FieldLabel } from '../field';
import { Switch, SwitchField, SwitchLabel, SwitchThumb } from './Switch';
import styles from './Switch.stories.module.css';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

function PowerIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M8 2.5V7M5.1 4.3A5 5 0 1 0 10.9 4.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <SwitchField>
        <Switch defaultChecked />
        <SwitchLabel>Enable notifications</SwitchLabel>
      </SwitchField>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={styles.stack}>
        <SwitchField>
          <Switch size="xs" defaultChecked />
          <SwitchLabel>Extra-small</SwitchLabel>
        </SwitchField>
        <SwitchField>
          <Switch size="sm" defaultChecked />
          <SwitchLabel>Small</SwitchLabel>
        </SwitchField>
        <SwitchField>
          <Switch size="md" defaultChecked />
          <SwitchLabel>Medium</SwitchLabel>
        </SwitchField>
        <SwitchField>
          <Switch size="lg" defaultChecked />
          <SwitchLabel>Large</SwitchLabel>
        </SwitchField>
        <SwitchField>
          <Switch size="xl" defaultChecked />
          <SwitchLabel>Extra-large</SwitchLabel>
        </SwitchField>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className={styles.stack}>
        <SwitchField>
          <Switch disabled />
          <SwitchLabel>Enable dark mode</SwitchLabel>
        </SwitchField>
        <SwitchField>
          <Switch defaultChecked disabled />
          <SwitchLabel>Keep me signed in</SwitchLabel>
        </SwitchField>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <div className={styles.stack}>
        <SwitchField>
          <Switch checked={checked} onCheckedChange={setChecked} />
          <SwitchLabel>{checked ? 'On' : 'Off'}</SwitchLabel>
        </SwitchField>
        <span className={styles.hint}>Current value: {String(checked)}</span>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <div className={styles.stack}>
        <SwitchField>
          <Switch readOnly />
          <SwitchLabel>Managed by policy</SwitchLabel>
        </SwitchField>
        <SwitchField>
          <Switch defaultChecked readOnly />
          <SwitchLabel>Always on</SwitchLabel>
        </SwitchField>
      </div>
    );
  },
};

export const CustomIcon: Story = {
  render: () => {
    return (
      <SwitchField>
        <Switch defaultChecked>
          <SwitchThumb className={styles.customIconThumb}>
            <PowerIcon />
          </SwitchThumb>
        </Switch>
        <SwitchLabel>Use custom thumb icon</SwitchLabel>
      </SwitchField>
    );
  },
};

export const SiblingLabelNativeButton: Story = {
  name: 'Sibling Label (Native Button)',
  render: () => {
    const id = useId();

    return (
      <div className={styles.siblingRow}>
        <Switch nativeButton render={<button />} id={id} defaultChecked />
        <label htmlFor={id} className={styles.label}>
          Receive product updates
        </label>
      </div>
    );
  },
};

export const NativeButtonRenderCallback: Story = {
  name: 'Native Button (Render Callback)',
  render: () => {
    return (
      <Switch
        defaultChecked
        nativeButton
        render={(buttonProps) => (
          <label className={styles.siblingRow}>
            <button {...buttonProps} />
            <span className={styles.label}>Enable reminders</span>
          </label>
        )}
      />
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    return (
      <Field name="notifications">
        <FieldLabel>
          <Switch defaultChecked />
          <SwitchLabel>Notifications</SwitchLabel>
        </FieldLabel>
      </Field>
    );
  },
};
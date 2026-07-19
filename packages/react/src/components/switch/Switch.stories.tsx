import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { Button } from '../button';
import { Field } from '../field';
import { Switch, useSwitch, useSwitchContext } from './Switch';
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

function SwitchContextLabel() {
  const switchApi = useSwitchContext();

  return <Switch.Label>Feature is {switchApi.checked ? 'enabled' : 'disabled'}</Switch.Label>;
}

export const Basic: Story = {
  render: () => {
    return (
      <Switch defaultChecked>
        <Switch.Control />
        <Switch.Label>Enable notifications</Switch.Label>
      </Switch>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={styles.stack}>
        <Switch size="xs" defaultChecked>
          <Switch.Control />
          <Switch.Label>Extra-small</Switch.Label>
        </Switch>
        <Switch size="sm" defaultChecked>
          <Switch.Control />
          <Switch.Label>Small</Switch.Label>
        </Switch>
        <Switch size="md" defaultChecked>
          <Switch.Control />
          <Switch.Label>Medium</Switch.Label>
        </Switch>
        <Switch size="lg" defaultChecked>
          <Switch.Control />
          <Switch.Label>Large</Switch.Label>
        </Switch>
        <Switch size="xl" defaultChecked>
          <Switch.Control />
          <Switch.Label>Extra-large</Switch.Label>
        </Switch>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className={styles.stack}>
        <Switch disabled>
          <Switch.Control />
          <Switch.Label>Enable dark mode</Switch.Label>
        </Switch>
        <Switch defaultChecked disabled>
          <Switch.Control />
          <Switch.Label>Keep me signed in</Switch.Label>
        </Switch>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <div className={styles.stack}>
        <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
          <Switch.Control />
          <Switch.Label>{checked ? 'On' : 'Off'}</Switch.Label>
        </Switch>
        <span className={styles.hint}>Current value: {String(checked)}</span>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <div className={styles.stack}>
        <Switch readOnly>
          <Switch.Control />
          <Switch.Label>Managed by policy</Switch.Label>
        </Switch>
        <Switch defaultChecked readOnly>
          <Switch.Control />
          <Switch.Label>Always on</Switch.Label>
        </Switch>
      </div>
    );
  },
};

export const CustomIcon: Story = {
  render: () => {
    return (
      <Switch defaultChecked>
        <Switch.Control>
          <Switch.Thumb className={styles.customIconThumb}>
            <PowerIcon />
          </Switch.Thumb>
        </Switch.Control>
        <Switch.Label>Use custom thumb icon</Switch.Label>
      </Switch>
    );
  },
};

export const Context: Story = {
  render: () => {
    return (
      <Switch defaultChecked>
        <Switch.Control />
        <SwitchContextLabel />
      </Switch>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const switchApi = useSwitch({ defaultChecked: true });

    return (
      <div className={styles.stack}>
        <Button variant="outline" onClick={() => switchApi.toggleChecked()}>
          Toggle externally
        </Button>
        <Switch.RootProvider value={switchApi}>
          <Switch.Control />
          <Switch.Label>External state owner</Switch.Label>
        </Switch.RootProvider>
      </div>
    );
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <Switch asChild defaultChecked>
        <label className={styles.siblingRow}>
          <Switch.Control />
          <span className={styles.label}>Enable reminders</span>
        </label>
      </Switch>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    return (
      <Field invalid className={styles.formField}>
        <Switch defaultChecked name="notifications" required>
          <Switch.Control />
          <Switch.Label>Notifications</Switch.Label>
        </Switch>
        <Field.HelperText>Used for product and account updates.</Field.HelperText>
        <Field.ErrorText>Notification preference is required.</Field.ErrorText>
      </Field>
    );
  },
};
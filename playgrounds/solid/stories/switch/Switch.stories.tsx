import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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
} from '@/components/switch/Switch';
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

const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

function PowerIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...accessibilityProps} {...props}>
      <path
        d="M8 2.5V7M5.1 4.3A5 5 0 1 0 10.9 4.3"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  );
}

function SwitchContextLabel() {
  const switchApi = useSwitchContext();

  return <SwitchLabel>Feature is {switchApi().checked ? 'enabled' : 'disabled'}</SwitchLabel>;
}

export const Basic: Story = {
  render: () => (
    <Switch defaultChecked>
      <SwitchControl />
      <SwitchLabel>Enable notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={styles.stack}>
      <Switch size="xs" defaultChecked>
        <SwitchControl />
        <SwitchLabel>Extra-small</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Switch size="sm" defaultChecked>
        <SwitchControl />
        <SwitchLabel>Small</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Switch size="md" defaultChecked>
        <SwitchControl />
        <SwitchLabel>Medium</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Switch size="lg" defaultChecked>
        <SwitchControl />
        <SwitchLabel>Large</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Switch size="xl" defaultChecked>
        <SwitchControl />
        <SwitchLabel>Extra-large</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div class={styles.stack}>
      <Switch disabled>
        <SwitchControl />
        <SwitchLabel>Enable dark mode</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Switch defaultChecked disabled>
        <SwitchControl />
        <SwitchLabel>Keep me signed in</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = createSignal(true);

    return (
      <div class={styles.stack}>
        <Switch checked={checked()} onCheckedChange={(details) => setChecked(details.checked)}>
          <SwitchControl />
          <SwitchLabel>{checked() ? 'On' : 'Off'}</SwitchLabel>
          <SwitchHiddenInput />
        </Switch>
        <span class={styles.hint}>Current value: {String(checked())}</span>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => (
    <div class={styles.stack}>
      <Switch readOnly>
        <SwitchControl />
        <SwitchLabel>Managed by policy</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <Switch defaultChecked readOnly>
        <SwitchControl />
        <SwitchLabel>Always on</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <Switch defaultChecked>
      <SwitchControl>
        <SwitchThumb class={styles.customIconThumb}>
          <PowerIcon />
        </SwitchThumb>
      </SwitchControl>
      <SwitchLabel>Use custom thumb icon</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  ),
};

export const Context: Story = {
  render: () => (
    <Switch defaultChecked>
      <SwitchControl />
      <SwitchContextLabel />
      <SwitchHiddenInput />
    </Switch>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const switchApi = useSwitch({ defaultChecked: true });

    return (
      <div class={styles.stack}>
        <Button variant="outline" onClick={() => switchApi().toggleChecked()}>
          Toggle externally
        </Button>
        <SwitchRootProvider value={switchApi}>
          <SwitchControl />
          <SwitchLabel>External state owner</SwitchLabel>
          <SwitchHiddenInput />
        </SwitchRootProvider>
      </div>
    );
  },
};

export const AsChild: Story = {
  render: () => (
    <Switch
      defaultChecked
      asChild={(props) => {
        const resolvedProps = props();
        return (
          <label {...resolvedProps} class={(resolvedProps.class ?? '') + ' ' + styles.siblingRow} />
        );
      }}
    >
      <SwitchControl />
      <span class={styles.label}>Enable reminders</span>
      <SwitchHiddenInput />
    </Switch>
  ),
};

export const NativeForm: Story = {
  render: () => {
    const [submitted, setSubmitted] = createSignal('Nothing submitted');
    return (
      <form
        class={styles.stack}
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(JSON.stringify(Array.from(new FormData(event.currentTarget).entries())));
        }}
        onReset={() => setSubmitted('Nothing submitted')}
      >
        <Switch name="notifications" defaultChecked>
          <SwitchControl />
          <SwitchLabel>Notifications</SwitchLabel>
          <SwitchHiddenInput />
        </Switch>
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <output>{submitted()}</output>
      </form>
    );
  },
};

export const FormIntegration: Story = {
  render: () => (
    <Field invalid class={styles.formField}>
      <Switch name="notifications" required>
        <SwitchControl />
        <SwitchLabel>Notifications</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <FieldHelperText>Used for product and account updates.</FieldHelperText>
      <FieldErrorText>Notification preference is required.</FieldErrorText>
    </Field>
  ),
};

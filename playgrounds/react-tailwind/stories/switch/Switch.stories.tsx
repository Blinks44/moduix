import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { Button } from '@/components/button';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import { Switch, useSwitch, useSwitchContext } from '@/components/switch/Switch';

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

const stackClass = 'flex flex-col items-start gap-3';
const hintClass = 'text-xs leading-4 text-muted-foreground';
const siblingRowClass = 'flex items-center gap-2';
const labelClass = 'text-foreground text-sm leading-5 font-medium';
const customIconThumbClass =
  'data-[state=checked]:text-primary data-[state=unchecked]:text-muted-foreground [&>svg]:size-3';

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
        <Switch.HiddenInput />
      </Switch>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={stackClass}>
        <Switch size="xs" defaultChecked>
          <Switch.Control />
          <Switch.Label>Extra-small</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
        <Switch size="sm" defaultChecked>
          <Switch.Control />
          <Switch.Label>Small</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
        <Switch size="md" defaultChecked>
          <Switch.Control />
          <Switch.Label>Medium</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
        <Switch size="lg" defaultChecked>
          <Switch.Control />
          <Switch.Label>Large</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
        <Switch size="xl" defaultChecked>
          <Switch.Control />
          <Switch.Label>Extra-large</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className={stackClass}>
        <Switch disabled>
          <Switch.Control />
          <Switch.Label>Enable dark mode</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
        <Switch defaultChecked disabled>
          <Switch.Control />
          <Switch.Label>Keep me signed in</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <div className={stackClass}>
        <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
          <Switch.Control />
          <Switch.Label>{checked ? 'On' : 'Off'}</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
        <span className={hintClass}>Current value: {String(checked)}</span>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <div className={stackClass}>
        <Switch readOnly>
          <Switch.Control />
          <Switch.Label>Managed by policy</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
        <Switch defaultChecked readOnly>
          <Switch.Control />
          <Switch.Label>Always on</Switch.Label>
          <Switch.HiddenInput />
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
          <Switch.Thumb className={customIconThumbClass}>
            <PowerIcon />
          </Switch.Thumb>
        </Switch.Control>
        <Switch.Label>Use custom thumb icon</Switch.Label>
        <Switch.HiddenInput />
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
        <Switch.HiddenInput />
      </Switch>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const switchApi = useSwitch({ defaultChecked: true });

    return (
      <div className={stackClass}>
        <Button variant="outline" onClick={() => switchApi.toggleChecked()}>
          Toggle externally
        </Button>
        <Switch.RootProvider value={switchApi}>
          <Switch.Control />
          <Switch.Label>External state owner</Switch.Label>
          <Switch.HiddenInput />
        </Switch.RootProvider>
      </div>
    );
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <Switch asChild defaultChecked>
        <label className={siblingRowClass}>
          <Switch.Control />
          <span className={labelClass}>Enable reminders</span>
          <Switch.HiddenInput />
        </label>
      </Switch>
    );
  },
};

export const NativeForm: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState('Nothing submitted');
    return (
      <form
        className={stackClass}
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(JSON.stringify(Array.from(new FormData(event.currentTarget).entries())));
        }}
        onReset={() => setSubmitted('Nothing submitted')}
      >
        <Switch name="notifications" defaultChecked>
          <Switch.Control />
          <Switch.Label>Notifications</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <output>{submitted}</output>
      </form>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    return (
      <Field invalid>
        <Switch name="notifications" required>
          <Switch.Control />
          <Switch.Label>Notifications</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
        <FieldHelperText>Used for product and account updates.</FieldHelperText>
        <FieldErrorText>Notification preference is required.</FieldErrorText>
      </Field>
    );
  },
};

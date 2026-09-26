import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
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

  return <SwitchLabel>Feature is {switchApi.checked ? 'enabled' : 'disabled'}</SwitchLabel>;
}

export const Basic: Story = {
  render: () => {
    return (
      <Switch defaultChecked>
        <SwitchControl />
        <SwitchLabel>Enable notifications</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={stackClass}>
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
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className={stackClass}>
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
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <div className={stackClass}>
        <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
          <SwitchControl />
          <SwitchLabel>{checked ? 'On' : 'Off'}</SwitchLabel>
          <SwitchHiddenInput />
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
    );
  },
};

export const CustomIcon: Story = {
  render: () => {
    return (
      <Switch defaultChecked>
        <SwitchControl>
          <SwitchThumb className={customIconThumbClass}>
            <PowerIcon />
          </SwitchThumb>
        </SwitchControl>
        <SwitchLabel>Use custom thumb icon</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    );
  },
};

export const Context: Story = {
  render: () => {
    return (
      <Switch defaultChecked>
        <SwitchControl />
        <SwitchContextLabel />
        <SwitchHiddenInput />
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
  render: () => {
    return (
      <Switch asChild defaultChecked>
        <label className={siblingRowClass}>
          <SwitchControl />
          <span className={labelClass}>Enable reminders</span>
          <SwitchHiddenInput />
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
          <SwitchControl />
          <SwitchLabel>Notifications</SwitchLabel>
          <SwitchHiddenInput />
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
          <SwitchControl />
          <SwitchLabel>Notifications</SwitchLabel>
          <SwitchHiddenInput />
        </Switch>
        <FieldHelperText>Used for product and account updates.</FieldHelperText>
        <FieldErrorText>Notification preference is required.</FieldErrorText>
      </Field>
    );
  },
};
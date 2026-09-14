import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Clipboard } from '@/components/clipboard/Clipboard';

const meta = {
  title: 'Components/Clipboard',
  component: Clipboard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { defaultValue: 'https://moduix.dev/invite/maps' },
} satisfies Meta<typeof Clipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

const demoClassName = 'w-80';
const stackClassName = 'grid gap-3';
const actionClassName =
  'inline-flex min-h-control-lg cursor-pointer items-center justify-center rounded-md border border-border bg-background px-4 text-sm leading-5 text-foreground focus-visible:-outline-offset-1 focus-visible:outline-2 focus-visible:outline-ring';
const statusClassName = 'm-0 text-sm leading-5 text-muted-foreground';
const valueTextClassName = 'flex-1';
const copiedInputClassName =
  'data-copied:border-primary/22 data-copied:focus-visible:outline-primary';
const copiedTriggerClassName =
  'data-copied:border-primary/22 data-copied:bg-primary/5 data-copied:text-primary data-copied:focus-visible:outline-primary';

export const Basic: Story = {
  render: (args) => (
    <Clipboard className={demoClassName} {...args}>
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input readOnly />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('https://ark-ui.com');

    return (
      <div className={stackClassName}>
        <Clipboard
          className={demoClassName}
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          <Clipboard.Label>Share URL</Clipboard.Label>
          <Clipboard.Control>
            <Clipboard.Input />
            <Clipboard.Trigger>
              <Clipboard.Indicator />
              <Clipboard.CopyText />
            </Clipboard.Trigger>
          </Clipboard.Control>
        </Clipboard>
        <button className={actionClassName} onClick={() => setValue('https://chakra-ui.com')}>
          Change URL
        </button>
      </div>
    );
  },
};

export const WithValueText: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="moduix/clipboard">
      <Clipboard.Control>
        <Clipboard.ValueText className={valueTextClassName} />
        <Clipboard.Trigger aria-label="Copy package name">
          <Clipboard.Indicator />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  ),
};

export const StatusCallback: Story = {
  render: () => {
    const [copyCount, setCopyCount] = useState(0);

    return (
      <Clipboard
        className={demoClassName}
        defaultValue="maps-platform-token"
        onStatusChange={(details) => {
          if (details.copied) setCopyCount((count) => count + 1);
        }}
      >
        <Clipboard.Control>
          <Clipboard.Trigger>
            <Clipboard.Indicator />
            <Clipboard.ValueText />
          </Clipboard.Trigger>
        </Clipboard.Control>
        <p className={statusClassName}>Copied {copyCount} times</p>
      </Clipboard>
    );
  },
};

export const Timeout: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="workspace-secret" timeout={5000}>
      <Clipboard.Label>Five second copied state</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input readOnly />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const clipboard = Clipboard.useClipboard({ defaultValue: 'https://moduix.dev/docs/clipboard' });

    return (
      <Clipboard.RootProvider className={demoClassName} value={clipboard}>
        <Clipboard.Label>Provider-driven clipboard</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly />
          <Clipboard.Trigger>
            <Clipboard.Indicator />
            <Clipboard.CopyText />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.RootProvider>
    );
  },
};

export const ContextState: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Control>
        <Clipboard.ValueText className={valueTextClassName} />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
      <Clipboard.Context>
        {(clipboard) => <p className={statusClassName}>Copied: {String(clipboard.copied)}</p>}
      </Clipboard.Context>
    </Clipboard>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="workspace-secret">
      <Clipboard.Label>Disabled clipboard</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input disabled />
        <Clipboard.Trigger disabled>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  ),
};

export const AsChildBridge: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Label>Native elements through asChild</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input asChild>
          <input
            className="min-h-control-md min-w-0 flex-1 rounded-md border border-border bg-background px-3.5 py-1 text-md text-foreground"
            readOnly
          />
        </Clipboard.Input>
        <Clipboard.Trigger asChild>
          <button className={actionClassName} type="button">
            <Clipboard.Indicator />
            <Clipboard.CopyText />
          </button>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  ),
};

export const CustomCopyText: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="workspace-secret">
      <Clipboard.Label>Override copy labels</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input readOnly />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText copied="Copied!">Copy secret</Clipboard.CopyText>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="workspace-secret">
      <Clipboard.Label>Styled copied state</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input readOnly className={copiedInputClassName} />
        <Clipboard.Trigger className={copiedTriggerClassName} aria-label="Copy workspace secret">
          <Clipboard.Indicator />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  ),
};
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
  useClipboard,
} from '@/components/clipboard/Clipboard';

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
      <ClipboardLabel>Copy this link</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
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
          <ClipboardLabel>Share URL</ClipboardLabel>
          <ClipboardControl>
            <ClipboardInput />
            <ClipboardTrigger>
              <ClipboardIndicator />
            </ClipboardTrigger>
          </ClipboardControl>
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
      <ClipboardControl>
        <ClipboardValueText className={valueTextClassName} />
        <ClipboardTrigger aria-label="Copy package name">
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
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
        <ClipboardControl>
          <ClipboardTrigger>
            <ClipboardIndicator />
            <ClipboardValueText />
          </ClipboardTrigger>
        </ClipboardControl>
        <p className={statusClassName}>Copied {copyCount} times</p>
      </Clipboard>
    );
  },
};

export const Timeout: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="workspace-secret" timeout={5000}>
      <ClipboardLabel>Five second copied state</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const clipboard = useClipboard({ defaultValue: 'https://moduix.dev/docs/clipboard' });

    return (
      <ClipboardRootProvider className={demoClassName} value={clipboard}>
        <ClipboardLabel>Provider-driven clipboard</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput readOnly />
          <ClipboardTrigger>
            <ClipboardIndicator />
          </ClipboardTrigger>
        </ClipboardControl>
      </ClipboardRootProvider>
    );
  },
};

export const ContextState: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardControl>
        <ClipboardValueText className={valueTextClassName} />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
      <ClipboardContext>
        {(clipboard) => <p className={statusClassName}>Copied: {String(clipboard.copied)}</p>}
      </ClipboardContext>
    </Clipboard>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="workspace-secret">
      <ClipboardLabel>Disabled clipboard</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput disabled />
        <ClipboardTrigger disabled>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};

export const AsChildBridge: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardLabel>Native elements through asChild</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput asChild>
          <input
            className="min-h-control-md min-w-0 flex-1 rounded-md border border-border bg-background px-3.5 py-1 text-md text-foreground"
            readOnly
          />
        </ClipboardInput>
        <ClipboardTrigger asChild>
          <button className={actionClassName} type="button">
            <ClipboardIndicator />
          </button>
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};

export const CustomCopyText: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="workspace-secret">
      <ClipboardLabel>Override copy labels</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardIndicator copied="Copied!">Copy secret</ClipboardIndicator>
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Clipboard className={demoClassName} defaultValue="workspace-secret">
      <ClipboardLabel>Styled copied state</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly className={copiedInputClassName} />
        <ClipboardTrigger className={copiedTriggerClassName} aria-label="Copy workspace secret">
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};
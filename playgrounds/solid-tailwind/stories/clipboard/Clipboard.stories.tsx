import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Clipboard } from '@/components/clipboard/Clipboard';
import { cn } from '@/lib/moduix/cn';

const meta = {
  title: 'Components/Clipboard',
  component: Clipboard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { defaultValue: 'https://moduix.dev/invite/maps' },
} satisfies Meta<typeof Clipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

const demoClass = 'w-80';
const stackClass = 'grid gap-3';
const actionClass =
  'inline-flex min-h-control-lg cursor-pointer items-center justify-center rounded-md border border-border bg-background px-4 text-sm leading-5 text-foreground focus-visible:-outline-offset-1 focus-visible:outline-2 focus-visible:outline-ring';
const statusClass = 'm-0 text-sm leading-5 text-muted-foreground';
const valueTextClass = 'flex-1';
const copiedInputClass = 'data-copied:border-primary/22 data-copied:focus-visible:outline-primary';
const copiedTriggerClass =
  'data-copied:border-primary/22 data-copied:bg-primary/5 data-copied:text-primary data-copied:focus-visible:outline-primary';

export const Basic: Story = {
  render: (args) => (
    <Clipboard class={demoClass} {...args}>
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
    const [value, setValue] = createSignal('https://ark-ui.com');

    return (
      <div class={stackClass}>
        <Clipboard
          class={demoClass}
          value={value()}
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
        <button class={actionClass} onClick={() => setValue('https://chakra-ui.com')}>
          Change URL
        </button>
      </div>
    );
  },
};

export const WithValueText: Story = {
  render: () => (
    <Clipboard class={demoClass} defaultValue="moduix/clipboard">
      <Clipboard.Control>
        <Clipboard.ValueText class={valueTextClass} />
        <Clipboard.Trigger aria-label="Copy package name">
          <Clipboard.Indicator />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  ),
};

export const StatusCallback: Story = {
  render: () => {
    const [copyCount, setCopyCount] = createSignal(0);

    return (
      <Clipboard
        class={demoClass}
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
        <p class={statusClass}>Copied {copyCount()} times</p>
      </Clipboard>
    );
  },
};

export const Timeout: Story = {
  render: () => (
    <Clipboard class={demoClass} defaultValue="workspace-secret" timeout={5000}>
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
      <Clipboard.RootProvider class={demoClass} value={clipboard}>
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
    <Clipboard class={demoClass} defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Control>
        <Clipboard.ValueText class={valueTextClass} />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
      <Clipboard.Context>
        {(clipboard) => <p class={statusClass}>Copied: {String(clipboard().copied)}</p>}
      </Clipboard.Context>
    </Clipboard>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Clipboard class={demoClass} defaultValue="workspace-secret">
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
    <Clipboard class={demoClass} defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Label>Native elements through asChild</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input
          asChild={(props) => {
            const childProps = props();

            return (
              <input
                {...childProps}
                class={cn(
                  childProps.class,
                  'min-h-control-md min-w-0 flex-1 rounded-md border border-border bg-background px-3.5 py-1 text-md text-foreground',
                )}
                readOnly
              />
            );
          }}
        />
        <Clipboard.Trigger
          asChild={(props) => {
            const childProps = props();

            return (
              <button {...childProps} class={cn(childProps.class, actionClass)} type="button" />
            );
          }}
        >
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  ),
};

export const CustomCopyText: Story = {
  render: () => (
    <Clipboard class={demoClass} defaultValue="workspace-secret">
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
    <Clipboard class={demoClass} defaultValue="workspace-secret">
      <Clipboard.Label>Styled copied state</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input class={copiedInputClass} readOnly />
        <Clipboard.Trigger class={copiedTriggerClass} aria-label="Copy workspace secret">
          <Clipboard.Indicator />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  ),
};
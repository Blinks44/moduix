import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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
    const [value, setValue] = createSignal('https://ark-ui.com');

    return (
      <div class={stackClass}>
        <Clipboard
          class={demoClass}
          value={value()}
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
      <ClipboardControl>
        <ClipboardValueText class={valueTextClass} />
        <ClipboardTrigger aria-label="Copy package name">
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
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
        <ClipboardControl>
          <ClipboardTrigger>
            <ClipboardIndicator />
            <ClipboardValueText />
          </ClipboardTrigger>
        </ClipboardControl>
        <p class={statusClass}>Copied {copyCount()} times</p>
      </Clipboard>
    );
  },
};

export const Timeout: Story = {
  render: () => (
    <Clipboard class={demoClass} defaultValue="workspace-secret" timeout={5000}>
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
      <ClipboardRootProvider class={demoClass} value={clipboard}>
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
    <Clipboard class={demoClass} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardControl>
        <ClipboardValueText class={valueTextClass} />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
      <ClipboardContext>
        {(clipboard) => <p class={statusClass}>Copied: {String(clipboard().copied)}</p>}
      </ClipboardContext>
    </Clipboard>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Clipboard class={demoClass} defaultValue="workspace-secret">
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
    <Clipboard class={demoClass} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardLabel>Native elements through asChild</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput
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
        <ClipboardTrigger
          asChild={(props) => {
            const childProps = props();

            return (
              <button {...childProps} class={cn(childProps.class, actionClass)} type="button" />
            );
          }}
        >
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};

export const CustomCopyText: Story = {
  render: () => (
    <Clipboard class={demoClass} defaultValue="workspace-secret">
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
    <Clipboard class={demoClass} defaultValue="workspace-secret">
      <ClipboardLabel>Styled copied state</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput class={copiedInputClass} readOnly />
        <ClipboardTrigger class={copiedTriggerClass} aria-label="Copy workspace secret">
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardCopyText,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
  useClipboard,
} from '@/components/clipboard/Clipboard';
import { Input } from '@/components/input/Input';
import styles from './Clipboard.stories.module.css';

const meta = {
  title: 'Components/Clipboard',
  component: Clipboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    defaultValue: 'https://moduix.dev/invite/maps',
  },
} satisfies Meta<typeof Clipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Clipboard class={styles.demo} {...args}>
      <ClipboardLabel>Copy this link</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardCopyText />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal('https://ark-ui.com');

    return (
      <div class={styles.stack}>
        <Clipboard
          class={styles.demo}
          value={value()}
          onValueChange={(details) => setValue(details.value)}
        >
          <ClipboardLabel>Share URL</ClipboardLabel>
          <ClipboardControl>
            <ClipboardInput />
            <ClipboardTrigger>
              <ClipboardIndicator />
              <ClipboardCopyText />
            </ClipboardTrigger>
          </ClipboardControl>
        </Clipboard>

        <button class={styles.action} onClick={() => setValue('https://chakra-ui.com')}>
          Change URL
        </button>
      </div>
    );
  },
};

export const WithValueText: Story = {
  render: () => (
    <Clipboard class={styles.demo} defaultValue="moduix/clipboard">
      <ClipboardControl>
        <ClipboardValueText class={styles.valueText} />
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
        class={styles.demo}
        defaultValue="maps-platform-token"
        onStatusChange={(details) => {
          if (details.copied) {
            setCopyCount((value) => value + 1);
          }
        }}
      >
        <ClipboardControl>
          <ClipboardTrigger>
            <ClipboardIndicator />
            <ClipboardValueText />
          </ClipboardTrigger>
        </ClipboardControl>
        <p class={styles.status}>Copied {copyCount()} times</p>
      </Clipboard>
    );
  },
};

export const Timeout: Story = {
  render: () => (
    <Clipboard class={styles.demo} defaultValue="workspace-secret" timeout={5000}>
      <ClipboardLabel>Five second copied state</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardCopyText />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const clipboard = useClipboard({ defaultValue: 'https://moduix.dev/docs/clipboard' });

    return (
      <ClipboardRootProvider class={styles.demo} value={clipboard}>
        <ClipboardLabel>Provider-driven clipboard</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput readOnly />
          <ClipboardTrigger>
            <ClipboardIndicator />
            <ClipboardCopyText />
          </ClipboardTrigger>
        </ClipboardControl>
      </ClipboardRootProvider>
    );
  },
};

export const ContextState: Story = {
  render: () => (
    <Clipboard class={styles.demo} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardControl>
        <ClipboardValueText class={styles.valueText} />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardCopyText />
        </ClipboardTrigger>
      </ClipboardControl>
      <ClipboardContext>
        {(clipboard) => <p class={styles.status}>Copied: {String(clipboard().copied)}</p>}
      </ClipboardContext>
    </Clipboard>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Clipboard class={styles.demo} defaultValue="workspace-secret">
      <ClipboardLabel>Disabled clipboard</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput disabled />
        <ClipboardTrigger disabled>
          <ClipboardIndicator />
          <ClipboardCopyText />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};

export const AsChildBridge: Story = {
  render: () => (
    <Clipboard class={styles.demo} defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardLabel>Use moduix Input and Button</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput asChild={(props) => <Input {...props()} readOnly />} />
        <ClipboardTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              <ClipboardIndicator />
              <ClipboardCopyText />
            </Button>
          )}
        />
      </ClipboardControl>
    </Clipboard>
  ),
};

export const CustomCopyText: Story = {
  render: () => (
    <Clipboard class={styles.demo} defaultValue="workspace-secret">
      <ClipboardLabel>Override copy labels</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
          <ClipboardCopyText copied="Copied!">Copy secret</ClipboardCopyText>
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Clipboard class={styles.demo} defaultValue="workspace-secret">
      <ClipboardLabel>Styled copied state</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput class={styles.customInput} readOnly />
        <ClipboardTrigger class={styles.customTrigger} aria-label="Copy workspace secret">
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ),
};
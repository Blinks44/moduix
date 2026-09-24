import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/components/button';
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
import { Input } from '@/components/input';
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
  render: (args) => {
    return (
      <Clipboard className={styles.demo} {...args}>
        <ClipboardLabel>Copy this link</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput readOnly />
          <ClipboardTrigger>
            <ClipboardIndicator />
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('https://ark-ui.com');

    return (
      <div className={styles.stack}>
        <Clipboard
          className={styles.demo}
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

        <button className={styles.action} onClick={() => setValue('https://chakra-ui.com')}>
          Change URL
        </button>
      </div>
    );
  },
};

export const WithValueText: Story = {
  render: () => {
    return (
      <Clipboard className={styles.demo} defaultValue="moduix/clipboard">
        <ClipboardControl>
          <ClipboardValueText className={styles.valueText} />
          <ClipboardTrigger aria-label="Copy package name">
            <ClipboardIndicator />
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    );
  },
};

export const StatusCallback: Story = {
  render: () => {
    const [copyCount, setCopyCount] = useState(0);

    return (
      <Clipboard
        className={styles.demo}
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
        <p className={styles.status}>Copied {copyCount} times</p>
      </Clipboard>
    );
  },
};

export const Timeout: Story = {
  render: () => {
    return (
      <Clipboard className={styles.demo} defaultValue="workspace-secret" timeout={5000}>
        <ClipboardLabel>Five second copied state</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput readOnly />
          <ClipboardTrigger>
            <ClipboardIndicator />
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const clipboard = useClipboard({ defaultValue: 'https://moduix.dev/docs/clipboard' });

    return (
      <ClipboardRootProvider className={styles.demo} value={clipboard}>
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
  render: () => {
    return (
      <Clipboard className={styles.demo} defaultValue="https://moduix.dev/docs/clipboard">
        <ClipboardControl>
          <ClipboardValueText className={styles.valueText} />
          <ClipboardTrigger>
            <ClipboardIndicator />
          </ClipboardTrigger>
        </ClipboardControl>
        <ClipboardContext>
          {(clipboard) => <p className={styles.status}>Copied: {String(clipboard.copied)}</p>}
        </ClipboardContext>
      </Clipboard>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Clipboard className={styles.demo} defaultValue="workspace-secret">
        <ClipboardLabel>Disabled clipboard</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput disabled />
          <ClipboardTrigger disabled>
            <ClipboardIndicator />
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    );
  },
};

export const AsChildBridge: Story = {
  render: () => {
    return (
      <Clipboard className={styles.demo} defaultValue="https://moduix.dev/docs/clipboard">
        <ClipboardLabel>Use moduix Input and Button</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput asChild>
            <Input readOnly />
          </ClipboardInput>
          <ClipboardTrigger asChild>
            <Button variant="outline">
              <ClipboardIndicator />
            </Button>
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    );
  },
};

export const CustomCopyText: Story = {
  render: () => {
    return (
      <Clipboard className={styles.demo} defaultValue="workspace-secret">
        <ClipboardLabel>Override copy labels</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput readOnly />
          <ClipboardTrigger>
            <ClipboardIndicator />
            <ClipboardIndicator copied="Copied!">Copy secret</ClipboardIndicator>
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <Clipboard className={styles.demo} defaultValue="workspace-secret">
        <ClipboardLabel>Styled copied state</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput readOnly className={styles.customInput} />
          <ClipboardTrigger className={styles.customTrigger} aria-label="Copy workspace secret">
            <ClipboardIndicator />
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    );
  },
};
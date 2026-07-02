import type { Meta, StoryObj } from '@storybook/react-vite';
import { useClipboard } from '@ark-ui/react/clipboard';
import { useState } from 'react';
import { Clipboard } from './Clipboard';
import styles from './Clipboard.stories.module.css';

const meta = {
  title: 'Components/Clipboard',
  component: Clipboard.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    defaultValue: 'https://moduix.dev/invite/maps',
  },
} satisfies Meta<typeof Clipboard.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    return (
      <Clipboard.Root className={styles.demo} {...args}>
        <Clipboard.Label>Copy this link</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly />
          <Clipboard.Trigger aria-label="Copy link">
            <Clipboard.Indicator />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.Root>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('https://ark-ui.com');

    return (
      <div className={styles.stack}>
        <Clipboard.Root
          className={styles.demo}
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          <Clipboard.Label>Share URL</Clipboard.Label>
          <Clipboard.Control>
            <Clipboard.Input />
            <Clipboard.Trigger aria-label="Copy URL">
              <Clipboard.Indicator />
            </Clipboard.Trigger>
          </Clipboard.Control>
        </Clipboard.Root>

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
      <Clipboard.Root className={styles.demo} defaultValue="moduix/clipboard">
        <Clipboard.Control>
          <Clipboard.ValueText className={styles.valueText} />
          <Clipboard.Trigger>
            <Clipboard.Indicator />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.Root>
    );
  },
};

export const StatusCallback: Story = {
  render: () => {
    const [copyCount, setCopyCount] = useState(0);

    return (
      <Clipboard.Root
        className={styles.demo}
        defaultValue="maps-platform-token"
        onStatusChange={(details) => {
          if (details.copied) {
            setCopyCount((value) => value + 1);
          }
        }}
      >
        <Clipboard.Control>
          <Clipboard.Trigger>
            <Clipboard.Indicator />
            <Clipboard.ValueText />
          </Clipboard.Trigger>
        </Clipboard.Control>
        <p className={styles.status}>Copied {copyCount} times</p>
      </Clipboard.Root>
    );
  },
};

export const Timeout: Story = {
  render: () => {
    return (
      <Clipboard.Root className={styles.demo} defaultValue="workspace-secret" timeout={5000}>
        <Clipboard.Label>Five second copied state</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly />
          <Clipboard.Trigger aria-label="Copy workspace secret">
            <Clipboard.Indicator />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.Root>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const clipboard = useClipboard({ defaultValue: 'https://moduix.dev/docs/clipboard' });

    return (
      <Clipboard.RootProvider className={styles.demo} value={clipboard}>
        <Clipboard.Label>Provider-driven clipboard</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly />
          <Clipboard.Trigger aria-label="Copy provider value">
            <Clipboard.Indicator />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.RootProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <Clipboard.Root className={styles.demo} defaultValue="workspace-secret">
        <Clipboard.Label>Styled copied state</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly className={styles.customInput} />
          <Clipboard.Trigger className={styles.customTrigger} aria-label="Copy workspace secret">
            <Clipboard.Indicator />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.Root>
    );
  },
};
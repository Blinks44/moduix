import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { QrCode, useQrCode } from './QrCode';
import styles from './QrCode.stories.module.css';

const meta = {
  title: 'Components/QrCode',
  component: QrCode.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    defaultValue: 'https://moduix.dev/docs/qr-code',
  },
} satisfies Meta<typeof QrCode.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

function QrCodeGraphic() {
  return (
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
  );
}

export const Basic: Story = {
  render: (args) => {
    return (
      <QrCode.Root {...args}>
        <QrCodeGraphic />
      </QrCode.Root>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('https://ark-ui.com');

    return (
      <div className={styles.stack}>
        <QrCode.Root value={value} onValueChange={(details) => setValue(details.value)}>
          <QrCodeGraphic />
        </QrCode.Root>
        <div className={styles.actions}>
          <button className={styles.action} onClick={() => setValue('https://chakra-ui.com')}>
            Chakra UI
          </button>
          <button className={styles.action} onClick={() => setValue('https://moduix.dev')}>
            moduix
          </button>
        </div>
      </div>
    );
  },
};

export const ErrorCorrection: Story = {
  render: () => {
    return (
      <QrCode.Root
        defaultValue="https://moduix.dev/docs/qr-code"
        encoding={{
          ecc: 'H',
        }}
      >
        <QrCodeGraphic />
      </QrCode.Root>
    );
  },
};

export const Overlay: Story = {
  render: () => {
    return (
      <QrCode.Root
        defaultValue="https://moduix.dev/docs/qr-code"
        encoding={{
          ecc: 'H',
        }}
      >
        <QrCode.Frame className={styles.brandFrame}>
          <QrCode.Pattern />
        </QrCode.Frame>
        <QrCode.Overlay className={styles.overlay}>MX</QrCode.Overlay>
      </QrCode.Root>
    );
  },
};

export const Download: Story = {
  render: () => {
    return (
      <QrCode.Root defaultValue="https://moduix.dev/docs/qr-code">
        <QrCodeGraphic />
        <QrCode.DownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
          Download
        </QrCode.DownloadTrigger>
      </QrCode.Root>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const qrCode = useQrCode({ value: 'https://moduix.dev/docs/qr-code' });

    return (
      <div className={styles.stack}>
        <QrCode.RootProvider value={qrCode}>
          <QrCodeGraphic />
        </QrCode.RootProvider>
        <output className={styles.hint}>{qrCode.value}</output>
      </div>
    );
  },
};
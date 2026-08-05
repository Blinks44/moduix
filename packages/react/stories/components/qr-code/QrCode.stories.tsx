import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QrCode, useQrCode } from '@/components/qr-code/QrCode';
import styles from './QrCode.stories.module.css';

const meta = {
  title: 'Components/QrCode',
  component: QrCode,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    defaultValue: 'https://moduix.dev/docs/qr-code',
  },
} satisfies Meta<typeof QrCode>;

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
      <QrCode {...args}>
        <QrCodeGraphic />
      </QrCode>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('https://ark-ui.com');

    return (
      <div className={styles.stack}>
        <QrCode value={value} onValueChange={(details) => setValue(details.value)}>
          <QrCodeGraphic />
        </QrCode>
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
      <QrCode
        defaultValue="https://moduix.dev/docs/qr-code"
        encoding={{
          ecc: 'H',
        }}
      >
        <QrCodeGraphic />
      </QrCode>
    );
  },
};

export const Overlay: Story = {
  render: () => {
    return (
      <QrCode
        defaultValue="https://moduix.dev/docs/qr-code"
        encoding={{
          ecc: 'H',
        }}
      >
        <QrCode.Frame className={styles.brandFrame}>
          <QrCode.Pattern />
        </QrCode.Frame>
        <QrCode.Overlay className={styles.overlay}>MX</QrCode.Overlay>
      </QrCode>
    );
  },
};

export const Download: Story = {
  render: () => {
    return (
      <QrCode defaultValue="https://moduix.dev/docs/qr-code">
        <QrCodeGraphic />
        <QrCode.DownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
          Download
        </QrCode.DownloadTrigger>
      </QrCode>
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
        <QrCode.Context>
          {(context) => <output className={styles.hint}>{context.value}</output>}
        </QrCode.Context>
      </div>
    );
  },
};
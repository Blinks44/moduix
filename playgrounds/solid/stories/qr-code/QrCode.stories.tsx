import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
  useQrCode,
} from '@/components/qr-code/QrCode';
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
    <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
      <QrCodePattern />
    </QrCodeFrame>
  );
}

export const Basic: Story = {
  render: (args) => (
    <QrCode {...args}>
      <QrCodeGraphic />
    </QrCode>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal('https://ark-ui.com');

    return (
      <div class={styles.stack}>
        <QrCode value={value()} onValueChange={(details) => setValue(details.value)}>
          <QrCodeGraphic />
        </QrCode>
        <div class={styles.actions}>
          <button class={styles.action} onClick={() => setValue('https://chakra-ui.com')}>
            Chakra UI
          </button>
          <button class={styles.action} onClick={() => setValue('https://moduix.dev')}>
            moduix
          </button>
        </div>
      </div>
    );
  },
};

export const ErrorCorrection: Story = {
  render: () => (
    <QrCode
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCodeGraphic />
    </QrCode>
  ),
};

export const Overlay: Story = {
  render: () => (
    <QrCode
      defaultValue="https://moduix.dev/docs/qr-code"
      encoding={{
        ecc: 'H',
      }}
    >
      <QrCodeFrame class={styles.brandFrame}>
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay class={styles.overlay}>MX</QrCodeOverlay>
    </QrCode>
  ),
};

export const Download: Story = {
  render: () => (
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCodeGraphic />
      <QrCodeDownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
        Download
      </QrCodeDownloadTrigger>
    </QrCode>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const qrCode = useQrCode({ value: 'https://moduix.dev/docs/qr-code' });

    return (
      <div class={styles.stack}>
        <QrCodeRootProvider value={qrCode}>
          <QrCodeGraphic />
          <QrCodeContext>
            {(context) => <output class={styles.hint}>{context().value}</output>}
          </QrCodeContext>
        </QrCodeRootProvider>
      </div>
    );
  },
};
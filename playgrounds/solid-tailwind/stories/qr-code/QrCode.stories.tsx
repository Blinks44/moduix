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
      <div class="grid justify-items-center gap-3">
        <QrCode value={value()} onValueChange={(details) => setValue(details.value)}>
          <QrCodeGraphic />
        </QrCode>
        <div class="flex flex-wrap justify-center gap-2">
          <button
            class="inline-flex min-h-control-lg items-center justify-center rounded-md border border-border bg-background px-4 text-sm leading-5 text-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring"
            onClick={() => setValue('https://chakra-ui.com')}
          >
            Chakra UI
          </button>
          <button
            class="inline-flex min-h-control-lg items-center justify-center rounded-md border border-border bg-background px-4 text-sm leading-5 text-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring"
            onClick={() => setValue('https://moduix.dev')}
          >
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
      <QrCodeFrame class="text-primary">
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay class="text-xs leading-4 font-semibold">MX</QrCodeOverlay>
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
      <div class="grid justify-items-center gap-3">
        <QrCodeRootProvider value={qrCode}>
          <QrCodeGraphic />
          <QrCodeContext>
            {(context) => (
              <output class="m-0 text-sm leading-5 text-muted-foreground">{context().value}</output>
            )}
          </QrCodeContext>
        </QrCodeRootProvider>
      </div>
    );
  },
};

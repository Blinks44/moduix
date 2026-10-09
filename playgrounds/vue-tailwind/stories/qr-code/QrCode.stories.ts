import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref, type Component } from 'vue';
import {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
  useQrCode,
} from '@/components/qr-code';

const meta = {
  title: 'Components/QrCode',
  component: QrCode,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof QrCode>;

export default meta;

type Story = StoryObj<typeof meta>;

const qrCodeComponents = {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
} as unknown as Record<string, Component>;

const stackClass = 'grid justify-items-center gap-3';
const actionClass =
  'inline-flex min-h-control-lg items-center justify-center rounded-md border border-border bg-background px-4 text-sm leading-5 text-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring';

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: qrCodeComponents,
      setup() {
        return { actionClass, stackClass, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <QrCode default-value="https://moduix.dev/docs/qr-code">
      <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <QrCode v-model="value">
          <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
            <QrCodePattern />
          </QrCodeFrame>
        </QrCode>
        <div class="flex flex-wrap justify-center gap-2">
          <button :class="actionClass" type="button" @click="value = 'https://chakra-ui.com'">
            Chakra UI
          </button>
          <button :class="actionClass" type="button" @click="value = 'https://moduix.dev'">
            moduix
          </button>
        </div>
      </div>
    `,
    () => ({ value: ref('https://ark-ui.com') }),
  ),
};

export const ErrorCorrection: Story = {
  render: renderStory(`
    <QrCode default-value="https://moduix.dev/docs/qr-code" :encoding="{ ecc: 'H' }">
      <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
  `),
};

export const Overlay: Story = {
  render: renderStory(`
    <QrCode default-value="https://moduix.dev/docs/qr-code" :encoding="{ ecc: 'H' }">
      <QrCodeFrame class="text-primary">
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay class="text-xs leading-4 font-semibold">MX</QrCodeOverlay>
    </QrCode>
  `),
};

export const Download: Story = {
  render: renderStory(`
    <QrCode default-value="https://moduix.dev/docs/qr-code">
      <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeDownloadTrigger file-name="moduix-qr-code.png" mime-type="image/png">
        Download
      </QrCodeDownloadTrigger>
    </QrCode>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <QrCodeRootProvider :value="qrCode">
          <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
            <QrCodePattern />
          </QrCodeFrame>
          <QrCodeContext v-slot="context">
            <output class="m-0 text-sm leading-5 text-muted-foreground">{{ context.value }}</output>
          </QrCodeContext>
        </QrCodeRootProvider>
      </div>
    `,
    () => ({ qrCode: useQrCode({ value: 'https://moduix.dev/docs/qr-code' }) }),
  ),
};
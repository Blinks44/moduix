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
import styles from './QrCode.stories.module.css';

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

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: qrCodeComponents,
      setup() {
        return { styles, ...setup?.() };
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
      <div :class="styles.stack">
        <QrCode v-model="value">
          <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
            <QrCodePattern />
          </QrCodeFrame>
        </QrCode>
        <div :class="styles.actions">
          <button :class="styles.action" type="button" @click="value = 'https://chakra-ui.com'">
            Chakra UI
          </button>
          <button :class="styles.action" type="button" @click="value = 'https://moduix.dev'">
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
      <QrCodeFrame :class="styles.brandFrame">
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeOverlay :class="styles.overlay">MX</QrCodeOverlay>
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
      <div :class="styles.stack">
        <QrCodeRootProvider :value="qrCode">
          <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
            <QrCodePattern />
          </QrCodeFrame>
          <QrCodeContext v-slot="context">
            <output :class="styles.hint">{{ context.value }}</output>
          </QrCodeContext>
        </QrCodeRootProvider>
      </div>
    `,
    () => ({ qrCode: useQrCode({ value: 'https://moduix.dev/docs/qr-code' }) }),
  ),
};
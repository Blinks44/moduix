import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
  useQrCode,
  useQrCodeContext,
} from '@/index';

const qrCodeComponents = {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
};

test('supports controlled Vue model updates', async () => {
  const { container } = render({
    components: qrCodeComponents,
    setup() {
      return { value: ref('https://ark-ui.com') };
    },
    template: `
      <QrCode v-model="value">
        <QrCodeFrame><QrCodePattern /></QrCodeFrame>
      </QrCode>
      <button type="button" @click="value = 'https://moduix.dev'">Update code</button>
      <output>{{ value }}</output>
    `,
  });
  const pattern = container.querySelector('[data-slot="qr-code-pattern"]')!;
  const initialPath = pattern.getAttribute('d');

  await page.getByRole('button', { name: 'Update code' }).click();

  await expect.element(page.getByText('https://moduix.dev', { exact: true })).toBeVisible();
  expect(initialPath).toBeTruthy();
  await expect
    .element(page.locator('[data-slot="qr-code-pattern"]'))
    .not.toHaveAttribute('d', initialPath!);
});

test('keeps RootProvider, Context, and useQrCodeContext on the Vue surface', async () => {
  const QrCodeValue = defineComponent({
    setup() {
      return { qrCode: useQrCodeContext() };
    },
    template: '<output>Hook: {{ qrCode.value }}</output>',
  });
  render({
    components: { ...qrCodeComponents, QrCodeValue },
    setup() {
      return { qrCode: useQrCode({ defaultValue: 'https://moduix.dev/docs/qr-code' }) };
    },
    template: `
      <QrCodeRootProvider :value="qrCode" data-testid="qr-code-provider">
        <QrCodeFrame><QrCodePattern /></QrCodeFrame>
        <QrCodeValue />
        <QrCodeContext v-slot="context">
          <output>Context: {{ context.value }}</output>
          <button type="button" @click="context.setValue('https://chakra-ui.com')">
            Change context value
          </button>
        </QrCodeContext>
      </QrCodeRootProvider>
    `,
  });

  const root = screen.getByTestId('qr-code-provider');

  expect(root.getAttribute('data-slot')).toBe('qr-code-root-provider');
  expect(root.getAttribute('data-scope')).toBe('qr-code');
  expect(screen.getByText('Hook: https://moduix.dev/docs/qr-code')?.isConnected).toBe(true);
  expect(screen.getByText('Context: https://moduix.dev/docs/qr-code')?.isConnected).toBe(true);

  await page.getByRole('button', { name: 'Change context value' }).click();

  await expect
    .element(page.getByText('Context: https://chakra-ui.com', { exact: true }))
    .toBeVisible();
  expect(screen.getByText('Hook: https://chakra-ui.com')?.isConnected).toBe(true);
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const { container } = render({
    components: qrCodeComponents,
    template: `
      <QrCode class="w-48 gap-4 text-primary">
        <QrCodeFrame class="w-1/2"><QrCodePattern /></QrCodeFrame>
        <QrCodeOverlay class="size-control-xl bg-muted p-2" />
        <QrCodeDownloadTrigger
          class="rounded-lg bg-muted px-2"
          file-name="moduix-qr-code.png"
          mime-type="image/png"
        />
      </QrCode>
    `,
  });

  const root = container.querySelector('[data-slot="qr-code-root"]')!;
  const frame = container.querySelector('[data-slot="qr-code-frame"]')!;
  const overlay = container.querySelector('[data-slot="qr-code-overlay"]')!;
  const trigger = container.querySelector('[data-slot="qr-code-download-trigger"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['w-48', 'gap-4', 'text-primary']));
  expect([...frame.classList]).toEqual(expect.arrayContaining(['w-1/2']));
  expect([...overlay.classList]).toEqual(
    expect.arrayContaining(['size-control-xl', 'bg-muted', 'p-2']),
  );
  expect([...trigger.classList]).toEqual(
    expect.arrayContaining(['rounded-lg', 'bg-muted', 'px-2']),
  );
  await expect.element(page.locator('[data-slot="qr-code-root"]')).toHaveCSS('width', '192px');
  await expect.element(page.locator('[data-slot="qr-code-root"]')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="qr-code-frame"]')).toHaveCSS('width', '96px');
  await expect.element(page.locator('[data-slot="qr-code-overlay"]')).toHaveCSS('width', '48px');
  await expect.element(page.locator('[data-slot="qr-code-overlay"]')).toHaveCSS('padding', '8px');
  await expect
    .element(page.locator('[data-slot="qr-code-download-trigger"]'))
    .toHaveCSS('padding-left', '8px');
});
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
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
} from '../src';
import SsrQrCode from './fixtures/SsrQrCode.vue';

const qrCodeComponents = {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
};

test('renders Ark anatomy with stable hooks, accessible SVG output, and forwarded refs', () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    frame: ref<ComponentPublicInstance | null>(null),
    pattern: ref<ComponentPublicInstance | null>(null),
  };
  const { container } = render({
    components: qrCodeComponents,
    setup() {
      return {
        frameRef: refs.frame,
        patternRef: refs.pattern,
        rootRef: refs.root,
      };
    },
    template: `
      <QrCode ref="rootRef" default-value="https://moduix.dev/docs/qr-code">
        <QrCodeFrame
          ref="frameRef"
          role="img"
          aria-label="QR code for moduix documentation"
        >
          <QrCodePattern ref="patternRef" />
        </QrCodeFrame>
        <QrCodeOverlay>MX</QrCodeOverlay>
        <QrCodeDownloadTrigger file-name="moduix-qr-code.png" mime-type="image/png">
          Download PNG
        </QrCodeDownloadTrigger>
      </QrCode>
    `,
  });
  const root = refs.root.value?.$el;
  const frame = screen.getByRole('img', { name: 'QR code for moduix documentation' });
  const pattern = container.querySelector('[data-slot="qr-code-pattern"]')!;
  const trigger = screen.getByRole('button', { name: 'Download PNG' });

  expect(root.getAttribute('data-scope')).toBe('qr-code');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('qr-code-root');
  expect(refs.frame.value?.$el).toBe(frame);
  expect(frame.getAttribute('data-part')).toBe('frame');
  expect(frame.getAttribute('data-slot')).toBe('qr-code-frame');
  expect(refs.pattern.value?.$el).toBe(pattern);
  expect(pattern.getAttribute('data-part')).toBe('pattern');
  expect(pattern.getAttribute('data-slot')).toBe('qr-code-pattern');
  expect(screen.getByText('MX')!.getAttribute('data-slot')).toBe('qr-code-overlay');
  expect(trigger.getAttribute('type')).toBe('button');
  expect(trigger.getAttribute('data-slot')).toBe('qr-code-download-trigger');
  expect([...container.querySelector('[data-slot="qr-code-root"]')!.classList]).toEqual(
    expect.arrayContaining([
      'relative',
      'inline-flex',
      'w-32',
      'max-w-full',
      'flex-col',
      'items-center',
      'gap-3',
      'text-foreground',
    ]),
  );
  expect([...container.querySelector('[data-slot="qr-code-frame"]')!.classList]).toEqual(
    expect.arrayContaining(['h-auto', 'w-full', 'aspect-square', 'fill-current']),
  );
  expect([...container.querySelector('[data-slot="qr-code-pattern"]')!.classList]).toEqual(
    expect.arrayContaining(['fill-inherit']),
  );
  expect([...container.querySelector('[data-slot="qr-code-overlay"]')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'size-control-lg',
      'items-center',
      'justify-center',
      'rounded-sm',
      'bg-background',
      'p-1',
      'text-foreground',
    ]),
  );
  expect([...container.querySelector('[data-slot="qr-code-download-trigger"]')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'min-h-control-md',
      'gap-2',
      'rounded-md',
      'border-border',
      'bg-background',
      'px-4',
      'text-sm',
      'font-medium',
      'text-foreground',
    ]),
  );
});

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

test('forwards context value changes through Vue events', async () => {
  const values: string[] = [];
  render({
    components: qrCodeComponents,
    setup() {
      return { value: ref('https://moduix.dev/docs/qr-code'), values };
    },
    template: `
      <QrCode v-model="value" @value-change="values.push($event.value)">
        <QrCodeFrame><QrCodePattern /></QrCodeFrame>
        <QrCodeContext v-slot="context">
          <output>Parent value: {{ value }}</output>
          <button type="button" @click="context.setValue('https://chakra-ui.com')">
            Change context value
          </button>
        </QrCodeContext>
      </QrCode>
    `,
  });
  await page.getByRole('button', { name: 'Change context value' }).click();

  await expect
    .element(page.getByText('Parent value: https://chakra-ui.com', { exact: true }))
    .toBeVisible();
  expect(values).toEqual(['https://chakra-ui.com']);
});

test('keeps the disabled download trigger unavailable', async () => {
  render({
    components: qrCodeComponents,
    template: `
      <QrCode default-value="https://moduix.dev/docs/qr-code">
        <QrCodeFrame><QrCodePattern /></QrCodeFrame>
        <QrCodeDownloadTrigger disabled file-name="moduix-qr-code.png" mime-type="image/png">
          Download PNG
        </QrCodeDownloadTrigger>
      </QrCode>
    `,
  });

  await expect.element(page.getByRole('button', { name: 'Download PNG' })).toBeDisabled();
});

test('preserves semantic root and download composition with asChild', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  render({
    components: qrCodeComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <QrCode ref="rootRef" as-child default-value="https://moduix.dev/docs/qr-code">
        <section aria-label="QR code">
          <QrCodeFrame><QrCodePattern /></QrCodeFrame>
        </section>
      </QrCode>
      <QrCode default-value="https://moduix.dev/docs/qr-code">
        <QrCodeFrame><QrCodePattern /></QrCodeFrame>
        <QrCodeDownloadTrigger as-child file-name="moduix-qr-code.svg" mime-type="image/svg+xml">
          <a href="#download">Download SVG</a>
        </QrCodeDownloadTrigger>
      </QrCode>
    `,
  });

  const root = screen.getByRole('region', { name: 'QR code' });
  const trigger = screen.getByRole('link', { name: 'Download SVG' });

  expect(rootRef.value?.$el).toBe(root);
  expect(root.getAttribute('data-slot')).toBe('qr-code-root');
  expect(trigger.getAttribute('data-slot')).toBe('qr-code-download-trigger');
  expect(trigger.getAttribute('href')).toBe('#download');
});

test('hydrates qr-code without replacing hosts or IDs', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrQrCode));
  document.body.append(host);
  const nodes = [...host.querySelectorAll('[data-slot]')];
  const ids = [...host.querySelectorAll('[id]')].map((node) => node.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrQrCode);
  try {
    app.mount(host);
    await nextTick();
    const hydrated = [...host.querySelectorAll('[data-slot]')];
    expect(hydrated).toHaveLength(nodes.length);
    hydrated.forEach((node, index) => expect(node).toBe(nodes[index]));
    expect([...host.querySelectorAll('[id]')].map((node) => node.id)).toEqual(ids);
    expect(host.querySelectorAll('[data-slot="qr-code-root"]')).toHaveLength(1);
    expect(host.querySelector('svg')?.getAttribute('data-slot')).toBe('qr-code-frame');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
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
  expect(['w-32', 'gap-3', 'text-foreground'].some((name) => root.classList.contains(name))).toBe(
    false,
  );
  expect([...frame.classList]).toEqual(expect.arrayContaining(['w-1/2']));
  expect(frame.classList.contains('w-full')).toBe(false);
  expect([...overlay.classList]).toEqual(
    expect.arrayContaining(['size-control-xl', 'bg-muted', 'p-2']),
  );
  expect(
    ['size-control-lg', 'bg-background', 'p-1'].some((name) => overlay.classList.contains(name)),
  ).toBe(false);
  expect([...trigger.classList]).toEqual(
    expect.arrayContaining(['rounded-lg', 'bg-muted', 'px-2']),
  );
  expect(
    ['rounded-md', 'bg-background', 'px-4'].some((name) => trigger.classList.contains(name)),
  ).toBe(false);
  await expect.element(page.locator('[data-slot="qr-code-root"]')).toHaveCSS('width', '192px');
  await expect.element(page.locator('[data-slot="qr-code-root"]')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="qr-code-frame"]')).toHaveCSS('width', '96px');
  await expect.element(page.locator('[data-slot="qr-code-overlay"]')).toHaveCSS('width', '48px');
  await expect.element(page.locator('[data-slot="qr-code-overlay"]')).toHaveCSS('padding', '8px');
  await expect
    .element(page.locator('[data-slot="qr-code-download-trigger"]'))
    .toHaveCSS('padding-left', '8px');
});
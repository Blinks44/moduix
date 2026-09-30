import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
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

const qrCodeComponents = {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
} as unknown as Record<string, Component>;

test('renders Ark anatomy with stable hooks, accessible SVG output, and forwarded refs', () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    frame: ref<ComponentPublicInstance | null>(null),
    pattern: ref<ComponentPublicInstance | null>(null),
  };
  const Harness = defineComponent({
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

  const { container } = render(Harness);
  const root = refs.root.value?.$el;
  const frame = screen.getByRole('img', { name: 'QR code for moduix documentation' });
  const pattern = container.querySelector('[data-slot="qr-code-pattern"]');
  const trigger = screen.getByRole('button', { name: 'Download PNG' });

  expect(root).toHaveAttribute('data-scope', 'qr-code');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'qr-code-root');
  expect(refs.frame.value?.$el).toBe(frame);
  expect(frame).toHaveAttribute('data-part', 'frame');
  expect(frame).toHaveAttribute('data-slot', 'qr-code-frame');
  expect(refs.pattern.value?.$el).toBe(pattern);
  expect(pattern).toHaveAttribute('data-part', 'pattern');
  expect(pattern).toHaveAttribute('data-slot', 'qr-code-pattern');
  expect(screen.getByText('MX')).toHaveAttribute('data-slot', 'qr-code-overlay');
  expect(trigger).toHaveAttribute('type', 'button');
  expect(trigger).toHaveAttribute('data-slot', 'qr-code-download-trigger');
});

test('supports controlled Vue model updates', async () => {
  const Harness = defineComponent({
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

  const { container } = render(Harness);
  const pattern = container.querySelector('[data-slot="qr-code-pattern"]')!;
  const initialPath = pattern.getAttribute('d');

  await fireEvent.click(screen.getByRole('button', { name: 'Update code' }));

  await waitFor(() => expect(screen.getByText('https://moduix.dev')).toBeInTheDocument());
  expect(pattern).not.toHaveAttribute('d', initialPath!);
});

test('keeps RootProvider, Context, and useQrCodeContext on the Vue surface', async () => {
  const QrCodeValue = defineComponent({
    setup() {
      return { qrCode: useQrCodeContext() };
    },
    template: '<output>Hook: {{ qrCode.value }}</output>',
  });
  const Harness = defineComponent({
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

  render(Harness);

  const root = screen.getByTestId('qr-code-provider');

  expect(root).toHaveAttribute('data-slot', 'qr-code-root-provider');
  expect(root).toHaveAttribute('data-scope', 'qr-code');
  expect(screen.getByText('Hook: https://moduix.dev/docs/qr-code')).toBeInTheDocument();
  expect(screen.getByText('Context: https://moduix.dev/docs/qr-code')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Change context value' }));

  await waitFor(() =>
    expect(screen.getByText('Context: https://chakra-ui.com')).toBeInTheDocument(),
  );
  expect(screen.getByText('Hook: https://chakra-ui.com')).toBeInTheDocument();
});

// Ark Vue 5.39.2 does not pass its emit function to useQrCode from QrCodeRoot.
test.skip('forwards context value changes through Vue events', async () => {
  const values: string[] = [];
  const Harness = defineComponent({
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

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Change context value' }));

  await waitFor(() =>
    expect(screen.getByText('Parent value: https://chakra-ui.com')).toBeInTheDocument(),
  );
  expect(values).toEqual(['https://chakra-ui.com']);
});

test('keeps the disabled download trigger unavailable', () => {
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

  expect(screen.getByRole('button', { name: 'Download PNG' })).toBeDisabled();
});

test('preserves semantic root and download composition with asChild', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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

  render(Harness);

  const root = screen.getByRole('region', { name: 'QR code' });
  const trigger = screen.getByRole('link', { name: 'Download SVG' });

  expect(rootRef.value?.$el).toBe(root);
  expect(root).toHaveAttribute('data-slot', 'qr-code-root');
  expect(trigger).toHaveAttribute('data-slot', 'qr-code-download-trigger');
  expect(trigger).toHaveAttribute('href', '#download');
});

test('renders and hydrates the public anatomy with stable generated ids', async () => {
  const App = defineComponent({
    components: qrCodeComponents,
    template: `
      <QrCode default-value="https://moduix.dev/docs/qr-code">
        <QrCodeFrame role="img" aria-label="Hydrated QR code">
          <QrCodePattern />
        </QrCodeFrame>
        <QrCodeOverlay>MX</QrCodeOverlay>
      </QrCode>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="qr-code-root"');
  expect(html).toContain('data-slot="qr-code-frame"');
  expect(html).toContain('data-slot="qr-code-pattern"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('[data-slot="qr-code-root"]')).toHaveLength(1);
  expect(host.querySelector('svg')).toHaveAttribute('data-slot', 'qr-code-frame');
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

  app.unmount();
  host.remove();
});

test('applies native utilities to component-owned parts', () => {
  const { container } = render({
    components: qrCodeComponents,
    template: `
      <QrCode>
        <QrCodeFrame><QrCodePattern /></QrCodeFrame>
        <QrCodeOverlay />
        <QrCodeDownloadTrigger file-name="moduix-qr-code.png" mime-type="image/png" />
      </QrCode>
    `,
  });

  expect(container.querySelector('[data-slot="qr-code-root"]')).toHaveClass(
    'relative',
    'inline-flex',
    'w-32',
    'max-w-full',
    'flex-col',
    'items-center',
    'gap-3',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="qr-code-frame"]')).toHaveClass(
    'h-auto',
    'w-full',
    'aspect-square',
    'fill-current',
  );
  expect(container.querySelector('[data-slot="qr-code-pattern"]')).toHaveClass('fill-inherit');
  expect(container.querySelector('[data-slot="qr-code-overlay"]')).toHaveClass(
    'inline-flex',
    'size-control-lg',
    'items-center',
    'justify-center',
    'rounded-sm',
    'bg-background',
    'p-1',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="qr-code-download-trigger"]')).toHaveClass(
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
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
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

  const root = container.querySelector('[data-slot="qr-code-root"]');
  const frame = container.querySelector('[data-slot="qr-code-frame"]');
  const overlay = container.querySelector('[data-slot="qr-code-overlay"]');
  const trigger = container.querySelector('[data-slot="qr-code-download-trigger"]');

  expect(root).toHaveClass('w-48', 'gap-4', 'text-primary');
  expect(root).not.toHaveClass('w-32', 'gap-3', 'text-foreground');
  expect(frame).toHaveClass('w-1/2');
  expect(frame).not.toHaveClass('w-full');
  expect(overlay).toHaveClass('size-control-xl', 'bg-muted', 'p-2');
  expect(overlay).not.toHaveClass('size-control-lg', 'bg-background', 'p-1');
  expect(trigger).toHaveClass('rounded-lg', 'bg-muted', 'px-2');
  expect(trigger).not.toHaveClass('rounded-md', 'bg-background', 'px-4');
});
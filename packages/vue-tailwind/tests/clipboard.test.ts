import { afterEach, expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
  useClipboard,
  useClipboardContext,
} from '../src';

const clipboardComponents = {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
} as unknown as Record<string, Component>;

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

afterEach(() => {
  if (clipboardDescriptor) {
    Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
  } else {
    Reflect.deleteProperty(navigator, 'clipboard');
  }
});

test('keeps controlled value changes Ark-shaped and emits each Vue listener once', async () => {
  const details: string[] = [];
  const Harness = defineComponent({
    components: clipboardComponents,
    setup() {
      const value = ref('https://ark-ui.com');
      return { details, value };
    },
    template: `
      <Clipboard v-model="value" @value-change="details.push($event.value)">
        <ClipboardLabel>Share URL</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput />
          <ClipboardTrigger aria-label="Copy share URL" />
        </ClipboardControl>
        <ClipboardContext v-slot="clipboard">
          <button type="button" @click="clipboard.setValue('https://chakra-ui.com')">
            Change URL
          </button>
        </ClipboardContext>
      </Clipboard>
      <output>{{ value }}</output>
    `,
  });

  render(Harness);

  const input = screen.getByRole('textbox', { name: 'Share URL' });
  await fireEvent.click(screen.getByRole('button', { name: 'Change URL' }));

  await waitFor(() => expect(input).toHaveValue('https://chakra-ui.com'));
  await waitFor(() => expect(details).toEqual(['https://chakra-ui.com']));
});

test('keeps RootProvider and asChild composition semantic', () => {
  const ProviderClipboard = defineComponent({
    components: clipboardComponents,
    setup() {
      return { clipboard: useClipboard({ defaultValue: 'provider-value' }) };
    },
    template: `
      <ClipboardRootProvider :value="clipboard">
        <ClipboardLabel>Provider value</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput as-child><input readonly /></ClipboardInput>
          <ClipboardTrigger as-child><button type="button">Copy provider value</button></ClipboardTrigger>
        </ClipboardControl>
      </ClipboardRootProvider>
    `,
  });

  render(ProviderClipboard);

  const input = screen.getByRole('textbox', { name: 'Provider value' });
  const trigger = screen.getByRole('button', { name: 'Copy to clipboard' });

  expect(input).toHaveValue('provider-value');
  expect(input).toHaveAttribute('data-slot', 'clipboard-input');
  expect(trigger).toHaveAttribute('data-slot', 'clipboard-trigger');
});

test('forwards refs and renders default and custom indicator slots', async () => {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async () => undefined },
  });

  const rootRef = ref<ComponentPublicInstance | null>(null);
  const inputRef = ref<ComponentPublicInstance | null>(null);
  const triggerRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: clipboardComponents,
    setup() {
      return { inputRef, rootRef, triggerRef };
    },
    template: `
      <Clipboard ref="rootRef" default-value="https://moduix.dev/docs/clipboard">
        <ClipboardLabel>Copy this link</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput ref="inputRef" readonly />
          <ClipboardTrigger ref="triggerRef">
            <ClipboardIndicator />
            <ClipboardIndicator>
              Copy
              <template #copied>Copied!</template>
            </ClipboardIndicator>
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    `,
  });

  const { container } = render(Harness);
  const input = screen.getByRole('textbox', { name: 'Copy this link' });
  const trigger = screen.getByRole('button', { name: 'Copy to clipboard' });

  expect(rootRef.value?.$el).toHaveAttribute('data-slot', 'clipboard-root');
  expect(inputRef.value?.$el).toBe(input);
  expect(triggerRef.value?.$el).toBe(trigger);
  expect(
    container.querySelector('[data-slot="clipboard-indicator-idle-icon"]'),
  ).toBeInTheDocument();

  await fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('data-copied'));
  expect(
    container.querySelector('[data-slot="clipboard-indicator-idle-icon"]'),
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('[data-slot="clipboard-indicator-copied-icon"]'),
  ).toBeInTheDocument();
  expect(screen.getByText('Copied!')).toBeInTheDocument();
});

test('exposes the Ark clipboard state through context', () => {
  const ClipboardStatus = defineComponent({
    setup() {
      const clipboard = useClipboardContext();
      return { clipboard };
    },
    template: '<output>{{ clipboard.value }}:{{ String(clipboard.copied) }}</output>',
  });
  const Harness = defineComponent({
    components: { ...clipboardComponents, ClipboardStatus },
    template: `
      <Clipboard default-value="context-value">
        <ClipboardContext v-slot="clipboard">
          <span>render:{{ clipboard.value }}</span>
        </ClipboardContext>
        <ClipboardStatus />
      </Clipboard>
    `,
  });

  render(Harness);

  expect(screen.getByText('render:context-value')).toBeInTheDocument();
  expect(screen.getByText('context-value:false')).toBeInTheDocument();
});

test('preserves native disabled semantics on the input and trigger', () => {
  render({
    components: clipboardComponents,
    template: `
      <Clipboard default-value="disabled-value">
        <ClipboardLabel>Disabled value</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput disabled />
          <ClipboardTrigger disabled>Copy</ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    `,
  });

  expect(screen.getByRole('textbox', { name: 'Disabled value' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toBeDisabled();
});

test('clears copied state after the configured timeout', async () => {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async () => undefined },
  });

  render({
    components: clipboardComponents,
    template: `
      <Clipboard default-value="workspace-secret" :timeout="1">
        <ClipboardControl><ClipboardTrigger>Copy secret</ClipboardTrigger></ClipboardControl>
      </Clipboard>
    `,
  });

  const trigger = screen.getByRole('button', { name: 'Copy to clipboard' });
  await fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('data-copied'));
  await waitFor(() => expect(trigger).not.toHaveAttribute('data-copied'));
});

test('renders and hydrates Clipboard with stable anatomy and ids', async () => {
  const App = defineComponent({
    components: clipboardComponents,
    template: `
      <Clipboard default-value="server-value">
        <ClipboardLabel>Server value</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput as-child><input readonly /></ClipboardInput>
          <ClipboardTrigger as-child><button type="button">Copy server value</button></ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="clipboard-root"');
  expect(html).toContain('data-slot="clipboard-input"');
  expect(html).toContain('data-slot="clipboard-trigger"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('[data-slot="clipboard-root"]')).toHaveLength(1);
  expect(host.querySelector('input')).toHaveValue('server-value');
  expect(host.querySelector('button')).toHaveAttribute('data-slot', 'clipboard-trigger');
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

  app.unmount();
  host.remove();
});

test('applies native utilities and lets consumer classes win', () => {
  const Harness = defineComponent({
    components: clipboardComponents,
    template: `
      <Clipboard class="gap-4 text-primary" default-value="moduix/clipboard">
        <ClipboardLabel>Copy link</ClipboardLabel>
        <ClipboardControl class="gap-5">
          <ClipboardInput class="bg-muted px-0" />
          <ClipboardTrigger class="rounded-lg bg-muted px-2"><ClipboardIndicator /></ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    `,
  });

  const { container } = render(Harness);
  const root = container.querySelector('[data-slot="clipboard-root"]');
  const control = container.querySelector('[data-slot="clipboard-control"]');
  const input = container.querySelector('[data-slot="clipboard-input"]');
  const trigger = container.querySelector('[data-slot="clipboard-trigger"]');

  expect(root).toHaveClass('gap-4', 'text-primary');
  expect(root).not.toHaveClass('gap-1.5', 'text-foreground');
  expect(control).toHaveClass('gap-5');
  expect(control).not.toHaveClass('gap-2');
  expect(input).toHaveClass('bg-muted', 'px-0');
  expect(input).not.toHaveClass('bg-background', 'px-3.5');
  expect(trigger).toHaveClass('rounded-lg', 'bg-muted', 'px-2');
  expect(trigger).not.toHaveClass('rounded-md', 'bg-background', 'px-4');
  expect(container.querySelector('[data-slot="clipboard-indicator"]')).toHaveClass(
    'inline-flex',
    'items-center',
    'justify-center',
  );
});
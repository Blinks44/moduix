import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
import SsrClipboard from './fixtures/SsrClipboard.vue';

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
} as Record<string, Component>;

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

  await page.getByRole('button', { name: 'Change URL', exact: true }).click();

  await expect
    .element(page.getByRole('textbox', { name: 'Share URL', exact: true }))
    .toHaveValue('https://chakra-ui.com');
  await expect.poll(() => details).toEqual(['https://chakra-ui.com']);
});

test.each([false, true])(
  'keeps reactive input attrs and classes with asChild=%s',
  async (asChild) => {
    const inputRef = ref<ComponentPublicInstance>();
    const inputClass = ref<string[] | Record<string, boolean>>(['consumer-input', 'initial-class']);
    const title = ref('Initial title');
    const clicked = rs.fn();
    render(
      defineComponent({
        components: clipboardComponents,
        setup: () => ({ asChild, inputRef, inputClass, title, clicked }),
        template: `
      <Clipboard default-value="clipboard-code">
        <ClipboardLabel>Code</ClipboardLabel>
        <ClipboardInput ref="inputRef" :as-child="asChild" :class="inputClass" :title="title"
          style="color: red" data-testid="clipboard-input" @click="clicked"
        ><input v-if="asChild" readonly /></ClipboardInput>
      </Clipboard>
    `,
      }),
    );

    const input = screen.getByRole('textbox', { name: 'Code' });
    expect(inputRef.value?.$el).toBe(input);
    expect([...input!.classList]).toEqual(
      expect.arrayContaining(['consumer-input', 'initial-class']),
    );
    expect(getComputedStyle(input).color).toBe('rgb(255, 0, 0)');
    const inputLocator = page.getByRole('textbox', { name: 'Code', exact: true });
    await expect.element(inputLocator).toHaveValue('clipboard-code');
    await expect.element(inputLocator).toHaveAttribute('data-testid', 'clipboard-input');
    inputClass.value = { 'updated-class': true };
    title.value = 'Updated title';
    await expect.element(inputLocator).toHaveAttribute('title', 'Updated title');
    expect([...input!.classList]).toEqual(expect.arrayContaining(['updated-class']));
    expect(
      ['consumer-input', 'initial-class'].some((name) => input?.classList.contains(name)),
    ).toBe(false);
    await inputLocator.click();
    expect(clicked).toHaveBeenCalledTimes(1);
  },
);

test('keeps RootProvider and asChild composition semantic', async () => {
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

  await expect
    .element(page.getByRole('textbox', { name: 'Provider value', exact: true }))
    .toHaveValue('provider-value');
  await expect
    .element(page.getByRole('textbox', { name: 'Provider value', exact: true }))
    .toHaveAttribute('data-slot', 'clipboard-input');
  await expect
    .element(page.locator('[data-slot="clipboard-trigger"]'))
    .toHaveAttribute('data-slot', 'clipboard-trigger');
});

test('forwards refs and renders default and custom indicator slots', async () => {
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

  render(Harness);
  const input = screen.getByRole('textbox', { name: 'Copy this link' });
  const trigger = screen.getByRole('button', { name: 'Copy to clipboard' });

  expect(rootRef.value?.$el?.getAttribute('data-slot')).toBe('clipboard-root');
  expect(inputRef.value?.$el).toBe(input);
  expect(triggerRef.value?.$el).toBe(trigger);
  await expect.element(page.locator('[data-slot="clipboard-indicator-idle-icon"]')).toBeAttached();

  await page.locator('[data-slot="clipboard-trigger"]').click();

  await expect
    .element(page.locator('[data-slot="clipboard-trigger"]'))
    .toHaveAttribute('data-copied');
  await expect.poll(() => navigator.clipboard.readText()).toBe('https://moduix.dev/docs/clipboard');
  await expect.element(page.locator('[data-slot="clipboard-indicator-idle-icon"]')).toHaveCount(0);
  await expect
    .element(page.locator('[data-slot="clipboard-indicator-copied-icon"]'))
    .toBeAttached();
  await expect.element(page.getByText('Copied!')).toBeAttached();
});

test('exposes the Ark clipboard state through context', async () => {
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

  await expect.element(page.getByText('render:context-value')).toBeAttached();
  await expect.element(page.getByText('context-value:false')).toBeAttached();
});

test('preserves native disabled semantics on the input and trigger', async () => {
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

  await expect
    .element(page.getByRole('textbox', { name: 'Disabled value', exact: true }))
    .toBeDisabled();
  await expect.element(page.locator('[data-slot="clipboard-trigger"]')).toBeDisabled();
});

test('clears copied state after the configured timeout', async () => {
  const statusChange = rs.fn();

  render({
    components: clipboardComponents,
    setup: () => ({ statusChange }),
    template: `
      <Clipboard default-value="workspace-secret" :timeout="250" @status-change="statusChange">
        <ClipboardControl><ClipboardTrigger>Copy secret</ClipboardTrigger></ClipboardControl>
      </Clipboard>
    `,
  });

  const copyTrigger = page.locator('[data-slot="clipboard-trigger"]');
  await copyTrigger.click();

  expect(statusChange).toHaveBeenCalledExactlyOnceWith({ copied: true });
  await expect.element(copyTrigger).not.toHaveAttribute('data-copied');
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrClipboard));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const serverInput = host.querySelector('input');
  expect(serverInput).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const app = createSSRApp(SsrClipboard);
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelector('input')).toBe(serverInput);
    const trigger = page.locator('[data-slot="clipboard-trigger"]');
    await trigger.click();
    await expect.element(trigger).toHaveAttribute('data-copied');
    await expect.poll(() => navigator.clipboard.readText()).toBe('server-value');
  } finally {
    app.unmount();
    host.remove();
  }
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

  expect([...root!.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect(['gap-1.5', 'text-foreground'].some((name) => root?.classList.contains(name))).toBe(false);
  expect([...control!.classList]).toEqual(expect.arrayContaining(['gap-5']));
  expect(control?.classList.contains('gap-2')).toBe(false);
  expect([...input!.classList]).toEqual(expect.arrayContaining(['bg-muted', 'px-0']));
  expect(['bg-background', 'px-3.5'].some((name) => input?.classList.contains(name))).toBe(false);
  expect([...trigger!.classList]).toEqual(
    expect.arrayContaining(['rounded-lg', 'bg-muted', 'px-2']),
  );
  expect(
    ['rounded-md', 'bg-background', 'px-4'].some((name) => trigger?.classList.contains(name)),
  ).toBe(false);
  expect([...container.querySelector('[data-slot="clipboard-indicator"]')!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'items-center', 'justify-center']),
  );
  expect(getComputedStyle(root!).gap).toBe('16px');
  expect(getComputedStyle(input!).paddingLeft).toBe('0px');
  expect(getComputedStyle(trigger!).paddingLeft).toBe('8px');
});
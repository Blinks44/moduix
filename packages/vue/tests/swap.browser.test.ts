import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Swap, SwapIndicator, SwapRootProvider, useSwap, useSwapContext } from '../src';
import SsrSwap from './fixtures/SsrSwap.vue';

const swapComponents = { Swap, SwapIndicator, SwapRootProvider };

test('preserves Ark semantics, Vue refs, anatomy, attrs, and moduix hooks', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const offRef = ref<ComponentPublicInstance>();
  const onRef = ref<ComponentPublicInstance>();
  render({
    components: swapComponents,
    setup() {
      return { offRef, onRef, rootRef };
    },
    template: `
      <Swap ref="rootRef" data-probe="root">
        <SwapIndicator ref="offRef" type="off">Off</SwapIndicator>
        <SwapIndicator ref="onRef" type="on">On</SwapIndicator>
      </Swap>
    `,
  });

  const root = rootRef.value?.$el as HTMLElement;
  const off = screen.getByText('Off');
  const on = screen.getByText('On');

  expect(root.getAttribute('data-scope')).toBe('swap');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('swap-root');
  expect(root.getAttribute('data-animation')).toBe('scale');
  expect(root.getAttribute('data-swap')).toBe('off');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(getComputedStyle(root).display).toBe('inline-grid');
  expect(offRef.value?.$el).toBe(off);
  expect(onRef.value?.$el).toBe(on);
  expect(off.getAttribute('data-scope')).toBe('swap');
  expect(off.getAttribute('data-part')).toBe('indicator');
  expect(off.getAttribute('data-slot')).toBe('swap-indicator');
  expect(off.getAttribute('data-type')).toBe('off');
  expect(off.hasAttribute('hidden')).toBe(false);
  expect(on.getAttribute('data-type')).toBe('on');
  expect(on.hasAttribute('hidden')).toBe(true);
});

test('reactively applies animation and state while wrapper-owned attributes win', async () => {
  const animation = ref<'scale' | 'flip' | 'bounce'>('scale');
  const swapped = ref(false);
  render({
    components: swapComponents,
    setup() {
      return { animation, swapped };
    },
    template: `
      <Swap :animation="animation" data-animation="rotate" :swap="swapped" data-testid="swap">
        <SwapIndicator type="off">Off</SwapIndicator>
        <SwapIndicator type="on">On</SwapIndicator>
      </Swap>
    `,
  });
  const root = screen.getByTestId('swap');

  expect(root.getAttribute('data-animation')).toBe('scale');
  expect(root.getAttribute('data-swap')).toBe('off');

  animation.value = 'flip';
  swapped.value = true;
  await expect.element(page.getByTestId('swap')).toHaveAttribute('data-animation', 'flip');
  await expect.element(page.getByTestId('swap')).toHaveAttribute('data-swap', 'on');

  animation.value = 'bounce';
  await expect.element(page.getByTestId('swap')).toHaveAttribute('data-animation', 'bounce');
});

test('preserves Ark lazy mounting and exit unmounting', async () => {
  render({
    components: swapComponents,
    setup() {
      return { swapped: ref(false) };
    },
    template: `
      <button type="button" @click="swapped = !swapped">Toggle</button>
      <Swap lazy-mount unmount-on-exit :swap="swapped">
        <SwapIndicator type="off">Off</SwapIndicator>
        <SwapIndicator type="on">On</SwapIndicator>
      </Swap>
    `,
  });

  await expect.element(page.getByText('Off', { exact: true })).toBeVisible();
  await expect.element(page.getByText('On', { exact: true })).toHaveCount(0);

  await page.getByRole('button', { name: 'Toggle' }).click();

  await expect.element(page.getByText('On', { exact: true })).toHaveAttribute('data-state', 'open');
  await expect.element(page.getByText('Off', { exact: true })).toHaveCount(0);
});

test('keeps provider, context, fallthrough listeners, refs, and asChild composition connected', async () => {
  const providerRootRef = ref<ComponentPublicInstance>();
  const clicks = ref(0);
  const ProviderSwapValue = defineComponent({
    setup() {
      return { swap: useSwapContext() };
    },
    template: '<output>Swap: {{ String(swap.swap) }}</output>',
  });
  render({
    components: { ...swapComponents, ProviderSwapValue },
    setup() {
      return {
        clicks,
        providerRootRef,
        swap: useSwap({ swap: true }),
      };
    },
    template: `
      <SwapRootProvider
        ref="providerRootRef"
        as-child
        animation="fade"
        :value="swap"
        @click="clicks += 1"
      >
        <button data-testid="provider-root" type="button">
          <SwapIndicator type="off">Off</SwapIndicator>
          <SwapIndicator type="on"><ProviderSwapValue /></SwapIndicator>
        </button>
      </SwapRootProvider>
    `,
  });

  const root = screen.getByTestId('provider-root');
  expect(screen.getByText('Swap: true')?.isConnected).toBe(true);
  expect(root.getAttribute('data-animation')).toBe('fade');
  expect(root.getAttribute('data-slot')).toBe('swap-root-provider');
  expect(providerRootRef.value?.$el).toBe(root);

  await page.getByTestId('provider-root').click();
  expect(clicks.value).toBe(1);
});

test('preserves asChild hosts and refs for roots and indicators', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  render({
    components: swapComponents,
    setup() {
      return { indicatorRef, rootRef };
    },
    template: `
      <Swap ref="rootRef" as-child animation="rotate" swap>
        <span data-testid="custom-root">
          <SwapIndicator type="off">Off</SwapIndicator>
          <SwapIndicator ref="indicatorRef" as-child type="on">
            <output data-testid="custom-indicator">On</output>
          </SwapIndicator>
        </span>
      </Swap>
    `,
  });

  const root = screen.getByTestId('custom-root');
  const indicator = screen.getByTestId('custom-indicator');
  expect(root.getAttribute('data-animation')).toBe('rotate');
  expect(rootRef.value?.$el).toBe(root);
  expect(indicator.getAttribute('data-slot')).toBe('swap-indicator');
  expect(indicator.getAttribute('data-type')).toBe('on');
  expect(indicatorRef.value?.$el).toBe(indicator);
});

test('hydrates swap without replacing hosts or IDs', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrSwap));
  document.body.append(host);
  const nodes = [...host.querySelectorAll('[data-slot]')];
  const ids = [...host.querySelectorAll('[id]')].map((node) => node.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrSwap);
  try {
    app.mount(host);
    await nextTick();
    const hydrated = [...host.querySelectorAll('[data-slot]')];
    expect(hydrated).toHaveLength(nodes.length);
    hydrated.forEach((node, index) => expect(node).toBe(nodes[index]));
    expect([...host.querySelectorAll('[id]')].map((node) => node.id)).toEqual(ids);
    expect(host.querySelector('[data-type="on"]')).toBe(
      nodes.find((node) => node.getAttribute('data-type') === 'on'),
    );
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('keeps a computed provider store reactive', async () => {
  render({
    components: swapComponents,
    setup() {
      const swapped = ref(false);
      const swap = useSwap(computed(() => ({ swap: swapped.value })));
      return { swap, swapped };
    },
    template: `
      <button type="button" @click="swapped = !swapped">Toggle provider</button>
      <SwapRootProvider :value="swap">
        <SwapIndicator type="off">Off</SwapIndicator>
        <SwapIndicator type="on">On</SwapIndicator>
      </SwapRootProvider>
    `,
  });
  await page.getByRole('button', { name: 'Toggle provider' }).click();
  await expect.element(page.getByText('On', { exact: true })).toHaveAttribute('data-state', 'open');
  await expect
    .element(page.getByText('Off', { exact: true }))
    .toHaveAttribute('data-state', 'closed');
});
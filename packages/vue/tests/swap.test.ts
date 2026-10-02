import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Swap, SwapIndicator, SwapRootProvider, useSwap, useSwapContext } from '../src';

const swapComponents = { Swap, SwapIndicator, SwapRootProvider };

test('preserves Ark semantics, Vue refs, anatomy, attrs, and moduix hooks', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const offRef = ref<ComponentPublicInstance>();
  const onRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;
  const off = screen.getByText('Off');
  const on = screen.getByText('On');

  expect(root).toHaveAttribute('data-scope', 'swap');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'swap-root');
  expect(root).toHaveAttribute('data-animation', 'scale');
  expect(root).toHaveAttribute('data-swap', 'off');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(root).toHaveStyle({ display: 'inline-grid' });
  expect(offRef.value?.$el).toBe(off);
  expect(onRef.value?.$el).toBe(on);
  expect(off).toHaveAttribute('data-scope', 'swap');
  expect(off).toHaveAttribute('data-part', 'indicator');
  expect(off).toHaveAttribute('data-slot', 'swap-indicator');
  expect(off).toHaveAttribute('data-type', 'off');
  expect(off).not.toHaveAttribute('hidden');
  expect(on).toHaveAttribute('data-type', 'on');
  expect(on).toHaveAttribute('hidden');
});

test('reactively applies animation and state while wrapper-owned attributes win', async () => {
  const animation = ref<'scale' | 'flip' | 'bounce'>('scale');
  const swapped = ref(false);
  const Harness = defineComponent({
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

  render(Harness);
  const root = screen.getByTestId('swap');

  expect(root).toHaveAttribute('data-animation', 'scale');
  expect(root).toHaveAttribute('data-swap', 'off');

  animation.value = 'flip';
  swapped.value = true;
  await waitFor(() => {
    expect(root).toHaveAttribute('data-animation', 'flip');
    expect(root).toHaveAttribute('data-swap', 'on');
  });

  animation.value = 'bounce';
  await waitFor(() => expect(root).toHaveAttribute('data-animation', 'bounce'));
});

test('preserves Ark lazy mounting and exit unmounting', async () => {
  const Harness = defineComponent({
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

  render(Harness);

  expect(screen.getByText('Off')).toBeInTheDocument();
  expect(screen.queryByText('On')).not.toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));

  await waitFor(() => expect(screen.getByText('On')).toHaveAttribute('data-state', 'open'));
  await waitFor(() => expect(screen.queryByText('Off')).not.toBeInTheDocument());
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
  const Harness = defineComponent({
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

  render(Harness);

  const root = screen.getByTestId('provider-root');
  expect(screen.getByText('Swap: true')).toBeInTheDocument();
  expect(root).toHaveAttribute('data-animation', 'fade');
  expect(root).toHaveAttribute('data-slot', 'swap-root-provider');
  expect(providerRootRef.value?.$el).toBe(root);

  await fireEvent.click(root);
  expect(clicks.value).toBe(1);
});

test('preserves asChild hosts and refs for roots and indicators', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);

  const root = screen.getByTestId('custom-root');
  const indicator = screen.getByTestId('custom-indicator');
  expect(root).toHaveAttribute('data-animation', 'rotate');
  expect(rootRef.value?.$el).toBe(root);
  expect(indicator).toHaveAttribute('data-slot', 'swap-indicator');
  expect(indicator).toHaveAttribute('data-type', 'on');
  expect(indicatorRef.value?.$el).toBe(indicator);
});

test('renders and hydrates the public anatomy without replacing hosts', async () => {
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const App = defineComponent({
    components: swapComponents,
    template: `
      <Swap swap>
        <SwapIndicator type="off">Off</SwapIndicator>
        <SwapIndicator type="on">On</SwapIndicator>
      </Swap>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="swap-root"');
  expect(html).toContain('data-slot="swap-indicator"');
  expect(html).toContain('data-type="on"');
  expect(html).toContain('hidden');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="swap-root"]');
  const serverIndicator = host.querySelector('[data-type="on"]');
  const app = createSSRApp(App);
  app.mount(host);
  await nextTick();

  expect(host.querySelector('[data-slot="swap-root"]')).toBe(serverRoot);
  expect(host.querySelector('[data-type="on"]')).toBe(serverIndicator);
  expect(warn).not.toHaveBeenCalled();
  expect(error).not.toHaveBeenCalled();

  app.unmount();
  host.remove();
  warn.mockRestore();
  error.mockRestore();
});

test('keeps a computed provider store reactive', async () => {
  const Harness = defineComponent({
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

  render(Harness);
  await fireEvent.click(screen.getByRole('button', { name: 'Toggle provider' }));
  await waitFor(() => expect(screen.getByText('On')).toHaveAttribute('data-state', 'open'));
  expect(screen.queryByText('Off')).toHaveAttribute('data-state', 'closed');
});
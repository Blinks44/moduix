import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Swap, SwapIndicator, SwapRootProvider, useSwap, useSwapContext } from '../src';

function ProviderSwapValue() {
  const swap = useSwapContext();

  return <output>Swap: {String(swap().swap)}</output>;
}

test('uses the scale animation by default and supports named presets', async () => {
  const [swapped, setSwapped] = createSignal(false);
  const [animation, setAnimation] = createSignal<'scale' | 'flip' | 'bounce'>('scale');

  render(() => (
    <Swap animation={animation()} data-animation="rotate" data-testid="swap" swap={swapped()}>
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>
  ));

  const root = screen.getByTestId('swap');

  expect(root.getAttribute('data-animation')).toBe('scale');
  expect(root.getAttribute('data-swap')).toBe('off');
  expect(root.getAttribute('data-slot')).toBe('swap-root');

  setAnimation('flip');
  setSwapped(true);

  await expect.element(page.getByTestId('swap')).toHaveAttribute('data-animation', 'flip');
  await expect.element(page.getByTestId('swap')).toHaveAttribute('data-swap', 'on');

  setAnimation('bounce');

  await expect.element(page.getByTestId('swap')).toHaveAttribute('data-animation', 'bounce');
});

test('preserves Ark lazy mounting and exit unmounting', async () => {
  function LazySwap() {
    const [swapped, setSwapped] = createSignal(false);

    return (
      <>
        <button type="button" onClick={() => setSwapped((value) => !value)}>
          Toggle
        </button>
        <Swap lazyMount swap={swapped()} unmountOnExit>
          <SwapIndicator type="off">Off</SwapIndicator>
          <SwapIndicator type="on">On</SwapIndicator>
        </Swap>
      </>
    );
  }

  render(() => <LazySwap />);

  await expect.element(page.getByText('Off', { exact: true })).toBeVisible();
  await expect.element(page.getByText('On', { exact: true })).toHaveCount(0);

  await page.getByRole('button', { name: 'Toggle' }).click();

  await expect.element(page.getByText('On', { exact: true })).toHaveAttribute('data-state', 'open');
  await expect.element(page.getByText('Off', { exact: true })).toHaveCount(0);
});

test('keeps root provider, context, and asChild composition connected', () => {
  function ProviderSwap() {
    const swap = useSwap({ swap: true });

    return (
      <SwapRootProvider
        asChild={(props) => <button {...props()} data-testid="provider-root" type="button" />}
        value={swap}
        animation="fade"
      >
        <SwapIndicator type="off">Off</SwapIndicator>
        <SwapIndicator type="on">
          <ProviderSwapValue />
        </SwapIndicator>
      </SwapRootProvider>
    );
  }

  render(() => <ProviderSwap />);

  expect(screen.getByText('Swap: true')?.isConnected).toBe(true);
  expect(screen.getByTestId('provider-root')!.getAttribute('data-animation')).toBe('fade');
  expect(screen.getByTestId('provider-root')!.getAttribute('data-slot')).toBe('swap-root-provider');
});

test('forwards refs on native roots', () => {
  let rootRef!: HTMLSpanElement;
  let providerRootRef!: HTMLSpanElement;

  render(() => (
    <>
      <Swap ref={(element) => (rootRef = element)}>
        <SwapIndicator type="off">Off</SwapIndicator>
        <SwapIndicator type="on">On</SwapIndicator>
      </Swap>
      <SwapRootProvider ref={(element) => (providerRootRef = element)} value={useSwap()}>
        <SwapIndicator type="off">Off</SwapIndicator>
        <SwapIndicator type="on">On</SwapIndicator>
      </SwapRootProvider>
    </>
  ));

  expect(rootRef.getAttribute('data-slot')).toBe('swap-root');
  expect(providerRootRef.getAttribute('data-slot')).toBe('swap-root-provider');
});

test('preserves asChild composition', () => {
  render(() => (
    <Swap
      asChild={(props) => <span {...props()} data-testid="custom-root" />}
      animation="rotate"
      swap
    >
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator
        asChild={(props) => <output {...props()} data-testid="custom-indicator" />}
        type="on"
      >
        On
      </SwapIndicator>
    </Swap>
  ));

  expect(screen.getByTestId('custom-root')!.getAttribute('data-animation')).toBe('rotate');
  expect(screen.getByTestId('custom-indicator')!.getAttribute('data-slot')).toBe('swap-indicator');
  expect(screen.getByTestId('custom-indicator')!.getAttribute('data-type')).toBe('on');
});

test('does not forward refs through native Solid asChild composition', () => {
  let rootRef: HTMLSpanElement | undefined;

  render(() => (
    <Swap
      ref={(element) => (rootRef = element)}
      asChild={(props) => <span {...props()} data-testid="custom-root" />}
      swap
    >
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>
  ));

  expect(rootRef).toBeUndefined();
});
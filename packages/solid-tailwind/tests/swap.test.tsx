import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
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
    <Swap animation={animation()} data-testid="swap" swap={swapped()}>
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>
  ));

  const root = screen.getByTestId('swap');

  expect(root).toHaveAttribute('data-animation', 'scale');
  expect(root).toHaveAttribute('data-swap', 'off');
  expect(root).toHaveAttribute('data-slot', 'swap-root');

  setAnimation('flip');
  setSwapped(true);

  await waitFor(() => {
    expect(root).toHaveAttribute('data-animation', 'flip');
    expect(root).toHaveAttribute('data-swap', 'on');
  });

  setAnimation('bounce');

  await waitFor(() => expect(root).toHaveAttribute('data-animation', 'bounce'));
});

test('maps the animation prop to data-animation after consumer props', () => {
  render(() => (
    <Swap animation="flip" data-animation="rotate" data-testid="swap" swap>
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>
  ));

  expect(screen.getByTestId('swap')).toHaveAttribute('data-animation', 'flip');
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

  expect(screen.getByText('Off')).toBeInTheDocument();
  expect(screen.queryByText('On')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));

  await waitFor(() => expect(screen.getByText('On')).toHaveAttribute('data-state', 'open'));
  await waitFor(() => expect(screen.queryByText('Off')).not.toBeInTheDocument());
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

  expect(screen.getByText('Swap: true')).toBeInTheDocument();
  expect(screen.getByTestId('provider-root')).toHaveAttribute('data-animation', 'fade');
  expect(screen.getByTestId('provider-root')).toHaveAttribute('data-slot', 'swap-root-provider');
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

  expect(rootRef).toHaveAttribute('data-slot', 'swap-root');
  expect(providerRootRef).toHaveAttribute('data-slot', 'swap-root-provider');
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

  expect(screen.getByTestId('custom-root')).toHaveAttribute('data-animation', 'rotate');
  expect(screen.getByTestId('custom-indicator')).toHaveAttribute('data-slot', 'swap-indicator');
  expect(screen.getByTestId('custom-indicator')).toHaveAttribute('data-type', 'on');
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

test('applies owning Tailwind utilities to visual parts', () => {
  render(() => (
    <Swap data-testid="swap">
      <SwapIndicator data-testid="indicator" type="off" />
    </Swap>
  ));

  expect(screen.getByTestId('swap')).toHaveClass(
    'group/swap',
    'place-items-center',
    'align-middle',
  );
  expect(screen.getByTestId('indicator')).toHaveClass(
    'items-center',
    'justify-center',
    'text-inherit',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Swap class="place-items-start" data-testid="swap">
      <SwapIndicator class="items-start" data-testid="indicator" type="off" />
    </Swap>
  ));

  expect(screen.getByTestId('swap')).toHaveClass('place-items-start');
  expect(screen.getByTestId('swap')).not.toHaveClass('place-items-center');
  expect(screen.getByTestId('indicator')).toHaveClass('items-start');
  expect(screen.getByTestId('indicator')).not.toHaveClass('items-center');
});
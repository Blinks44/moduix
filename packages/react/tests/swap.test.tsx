import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import { Swap, SwapIndicator, SwapRootProvider, useSwap, useSwapContext } from '../src';

function ProviderSwapValue() {
  const { swap } = useSwapContext();

  return <output>Swap: {String(swap)}</output>;
}

test('uses the scale animation by default and supports named presets', () => {
  const { rerender } = render(
    <Swap swap={false} data-testid="swap">
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')).toHaveAttribute('data-animation', 'scale');
  expect(screen.getByTestId('swap')).toHaveAttribute('data-swap', 'off');
  expect(screen.getByTestId('swap')).toHaveAttribute('data-slot', 'swap-root');

  rerender(
    <Swap animation="flip" data-testid="swap" swap>
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')).toHaveAttribute('data-animation', 'flip');
  expect(screen.getByTestId('swap')).toHaveAttribute('data-swap', 'on');

  rerender(
    <Swap animation="bounce" data-testid="swap" swap>
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')).toHaveAttribute('data-animation', 'bounce');
});

test('maps the animation prop to data-animation after consumer props', () => {
  render(
    <Swap animation="flip" data-animation="rotate" data-testid="swap" swap>
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')).toHaveAttribute('data-animation', 'flip');
});

test('preserves Ark lazy mounting and exit unmounting', async () => {
  function LazySwap() {
    const [swap, setSwap] = useState(false);

    return (
      <>
        <button type="button" onClick={() => setSwap((value) => !value)}>
          Toggle
        </button>
        <Swap lazyMount swap={swap} unmountOnExit>
          <SwapIndicator type="off">Off</SwapIndicator>
          <SwapIndicator type="on">On</SwapIndicator>
        </Swap>
      </>
    );
  }

  render(<LazySwap />);

  expect(screen.getByText('Off')).toBeInTheDocument();
  expect(screen.queryByText('On')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));

  await waitFor(() => expect(screen.getByText('On')).toHaveAttribute('data-state', 'open'));
  await waitFor(() => expect(screen.queryByText('Off')).not.toBeInTheDocument());
});

test('keeps root provider, context, refs, and asChild composition connected', () => {
  const rootProviderRef = createRef<HTMLSpanElement>();

  function ProviderSwap() {
    const swap = useSwap({ swap: true });

    return (
      <SwapRootProvider asChild ref={rootProviderRef} value={swap} animation="fade">
        <button data-testid="provider-root" type="button">
          <SwapIndicator type="off">Off</SwapIndicator>
          <SwapIndicator type="on">
            <ProviderSwapValue />
          </SwapIndicator>
        </button>
      </SwapRootProvider>
    );
  }

  render(<ProviderSwap />);

  expect(screen.getByText('Swap: true')).toBeInTheDocument();
  expect(screen.getByTestId('provider-root')).toHaveAttribute('data-animation', 'fade');
  expect(screen.getByTestId('provider-root')).toHaveAttribute('data-slot', 'swap-root-provider');
  expect(rootProviderRef.current).toBe(screen.getByTestId('provider-root'));
});

test('preserves asChild composition', () => {
  const rootRef = createRef<HTMLSpanElement>();

  render(
    <Swap asChild ref={rootRef} animation="rotate" swap>
      <span data-testid="custom-root">
        <SwapIndicator type="off">Off</SwapIndicator>
        <SwapIndicator asChild type="on">
          <output data-testid="custom-indicator">On</output>
        </SwapIndicator>
      </span>
    </Swap>,
  );

  expect(screen.getByTestId('custom-root')).toHaveAttribute('data-animation', 'rotate');
  expect(rootRef.current).toBe(screen.getByTestId('custom-root'));
  expect(screen.getByTestId('custom-indicator')).toHaveAttribute('data-slot', 'swap-indicator');
  expect(screen.getByTestId('custom-indicator')).toHaveAttribute('data-type', 'on');
});
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { Swap, useSwapContext } from '../src';

function ProviderSwapValue() {
  const { swap } = useSwapContext();

  return <output>Swap: {String(swap)}</output>;
}

test('uses the scale animation by default and supports named presets', () => {
  const { rerender } = render(
    <Swap swap={false} data-testid="swap">
      <Swap.Indicator type="off">Off</Swap.Indicator>
      <Swap.Indicator type="on">On</Swap.Indicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')).toHaveAttribute('data-animation', 'scale');
  expect(screen.getByTestId('swap')).toHaveAttribute('data-swap', 'off');

  rerender(
    <Swap animation="flip" data-testid="swap" swap>
      <Swap.Indicator type="off">Off</Swap.Indicator>
      <Swap.Indicator type="on">On</Swap.Indicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')).toHaveAttribute('data-animation', 'flip');
  expect(screen.getByTestId('swap')).toHaveAttribute('data-swap', 'on');
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
          <Swap.Indicator type="off">Off</Swap.Indicator>
          <Swap.Indicator type="on">On</Swap.Indicator>
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

test('keeps root provider and context composition connected', () => {
  function ProviderSwap() {
    const swap = Swap.useSwap({ swap: true });

    return (
      <Swap.RootProvider value={swap} animation="fade">
        <Swap.Indicator type="off">Off</Swap.Indicator>
        <Swap.Indicator type="on">
          <ProviderSwapValue />
        </Swap.Indicator>
      </Swap.RootProvider>
    );
  }

  render(<ProviderSwap />);

  expect(screen.getByText('Swap: true')).toBeInTheDocument();
});

test('preserves asChild composition', () => {
  render(
    <Swap asChild animation="rotate" swap>
      <span data-testid="custom-root">
        <Swap.Indicator type="off">Off</Swap.Indicator>
        <Swap.Indicator type="on">On</Swap.Indicator>
      </span>
    </Swap>,
  );

  expect(screen.getByTestId('custom-root')).toHaveAttribute('data-animation', 'rotate');
  expect(screen.getByText('On').closest('[data-slot="swap-indicator"]')).toHaveAttribute(
    'data-type',
    'on',
  );
});
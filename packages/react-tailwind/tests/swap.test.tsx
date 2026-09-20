import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
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
  expect(screen.getByTestId('swap')).toHaveAttribute('data-slot', 'swap-root');

  rerender(
    <Swap animation="flip" data-testid="swap" swap>
      <Swap.Indicator type="off">Off</Swap.Indicator>
      <Swap.Indicator type="on">On</Swap.Indicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')).toHaveAttribute('data-animation', 'flip');
  expect(screen.getByTestId('swap')).toHaveAttribute('data-swap', 'on');

  rerender(
    <Swap animation="bounce" data-testid="swap" swap>
      <Swap.Indicator type="off">Off</Swap.Indicator>
      <Swap.Indicator type="on">On</Swap.Indicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')).toHaveAttribute('data-animation', 'bounce');
});

test('maps the animation prop to data-animation after consumer props', () => {
  render(
    <Swap animation="flip" data-animation="rotate" data-testid="swap" swap>
      <Swap.Indicator type="off">Off</Swap.Indicator>
      <Swap.Indicator type="on">On</Swap.Indicator>
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

test('keeps root provider, context, refs, and asChild composition connected', () => {
  const rootProviderRef = createRef<HTMLSpanElement>();

  function ProviderSwap() {
    const swap = Swap.useSwap({ swap: true });

    return (
      <Swap.RootProvider asChild ref={rootProviderRef} value={swap} animation="fade">
        <button data-testid="provider-root" type="button">
          <Swap.Indicator type="off">Off</Swap.Indicator>
          <Swap.Indicator type="on">
            <ProviderSwapValue />
          </Swap.Indicator>
        </button>
      </Swap.RootProvider>
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
        <Swap.Indicator type="off">Off</Swap.Indicator>
        <Swap.Indicator asChild type="on">
          <output data-testid="custom-indicator">On</output>
        </Swap.Indicator>
      </span>
    </Swap>,
  );

  expect(screen.getByTestId('custom-root')).toHaveAttribute('data-animation', 'rotate');
  expect(rootRef.current).toBe(screen.getByTestId('custom-root'));
  expect(screen.getByTestId('custom-indicator')).toHaveAttribute('data-slot', 'swap-indicator');
  expect(screen.getByTestId('custom-indicator')).toHaveAttribute('data-type', 'on');
});

test('applies owning Tailwind utilities to visual parts', () => {
  render(
    <Swap data-testid="swap">
      <Swap.Indicator data-testid="indicator" type="off" />
    </Swap>,
  );

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
  render(
    <Swap className="place-items-start" data-testid="swap">
      <Swap.Indicator className="items-start" data-testid="indicator" type="off" />
    </Swap>,
  );

  expect(screen.getByTestId('swap')).toHaveClass('place-items-start');
  expect(screen.getByTestId('swap')).not.toHaveClass('place-items-center');
  expect(screen.getByTestId('indicator')).toHaveClass('items-start');
  expect(screen.getByTestId('indicator')).not.toHaveClass('items-center');
});
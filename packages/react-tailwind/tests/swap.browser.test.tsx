import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import { Swap, SwapIndicator, SwapRootProvider, useSwap, useSwapContext } from '../src';

function ProviderSwapValue() {
  const { swap } = useSwapContext();

  return <output>Swap: {String(swap)}</output>;
}

test('uses the scale animation by default and supports named presets', () => {
  const { rerender } = render(
    <Swap swap={false} data-testid="swap" data-animation="rotate">
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')!.getAttribute('data-animation')).toBe('scale');
  expect(screen.getByTestId('swap')!.getAttribute('data-swap')).toBe('off');
  expect(screen.getByTestId('swap')!.getAttribute('data-slot')).toBe('swap-root');

  rerender(
    <Swap animation="flip" data-animation="rotate" data-testid="swap" swap>
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')!.getAttribute('data-animation')).toBe('flip');
  expect(screen.getByTestId('swap')!.getAttribute('data-swap')).toBe('on');

  rerender(
    <Swap animation="bounce" data-testid="swap" swap>
      <SwapIndicator type="off">Off</SwapIndicator>
      <SwapIndicator type="on">On</SwapIndicator>
    </Swap>,
  );

  expect(screen.getByTestId('swap')!.getAttribute('data-animation')).toBe('bounce');
  expect([...screen.getByTestId('swap')!.classList]).toEqual(
    expect.arrayContaining(['group/swap', 'place-items-center', 'align-middle']),
  );
  expect([...screen.getByText('Off')!.classList]).toEqual(
    expect.arrayContaining(['items-center', 'justify-center', 'text-inherit']),
  );
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

  await expect.element(page.getByText('Off', { exact: true })).toBeVisible();
  await expect.element(page.getByText('On', { exact: true })).toHaveCount(0);

  await page.getByRole('button', { name: 'Toggle' }).click();

  await expect.element(page.getByText('On', { exact: true })).toHaveAttribute('data-state', 'open');
  await expect.element(page.getByText('Off', { exact: true })).toHaveCount(0);
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

  expect(screen.getByText('Swap: true')?.isConnected).toBe(true);
  expect(screen.getByTestId('provider-root')!.getAttribute('data-animation')).toBe('fade');
  expect(screen.getByTestId('provider-root')!.getAttribute('data-slot')).toBe('swap-root-provider');
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

  expect(screen.getByTestId('custom-root')!.getAttribute('data-animation')).toBe('rotate');
  expect(rootRef.current).toBe(screen.getByTestId('custom-root'));
  expect(screen.getByTestId('custom-indicator')!.getAttribute('data-slot')).toBe('swap-indicator');
  expect(screen.getByTestId('custom-indicator')!.getAttribute('data-type')).toBe('on');
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <Swap className="place-items-start" data-testid="swap">
      <SwapIndicator className="items-start" data-testid="indicator" type="off" />
    </Swap>,
  );

  expect([...screen.getByTestId('swap')!.classList]).toEqual(
    expect.arrayContaining(['place-items-start']),
  );
  expect(screen.getByTestId('swap')!.classList.contains('place-items-center')).toBe(false);
  expect([...screen.getByTestId('indicator')!.classList]).toEqual(
    expect.arrayContaining(['items-start']),
  );
  expect(screen.getByTestId('indicator')!.classList.contains('items-center')).toBe(false);
  await expect.element(page.getByTestId('swap')).toHaveCSS('place-items', 'start');
  await expect.element(page.getByTestId('indicator')).toHaveCSS('align-items', 'flex-start');
});
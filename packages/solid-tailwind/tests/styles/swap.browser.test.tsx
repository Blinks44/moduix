import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Swap, SwapIndicator } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <Swap class="place-items-start" data-testid="swap">
      <SwapIndicator class="items-baseline" data-testid="indicator" type="off" />
    </Swap>
  ));

  expect([...screen.getByTestId('swap')!.classList]).toEqual(
    expect.arrayContaining(['place-items-start']),
  );
  expect([...screen.getByTestId('indicator')!.classList]).toEqual(
    expect.arrayContaining(['items-baseline']),
  );
  await expect.element(page.getByTestId('swap')).toHaveCSS('place-items', 'start');
  await expect.element(page.getByTestId('indicator')).toHaveCSS('align-items', 'baseline');
});
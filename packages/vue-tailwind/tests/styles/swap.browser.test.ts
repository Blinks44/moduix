import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { Swap, SwapIndicator, SwapRootProvider } from '@/index';

const swapComponents = { Swap, SwapIndicator, SwapRootProvider };

test('applies owning Tailwind utilities and lets consumer classes override them', async () => {
  render({
    components: swapComponents,
    template: `
      <Swap class="place-items-start" data-testid="swap">
        <SwapIndicator class="items-baseline" data-testid="indicator" type="off" />
      </Swap>
    `,
  });
  await expect.element(page.getByTestId('swap')).toHaveCSS('place-items', 'start');
  await expect.element(page.getByTestId('indicator')).toHaveCSS('align-items', 'baseline');
});
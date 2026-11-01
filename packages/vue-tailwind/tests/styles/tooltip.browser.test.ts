import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipBody,
  TooltipContent,
  TooltipContext,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipTrigger,
} from '@/components/tooltip';

const tooltipComponents = {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipBody,
  TooltipContent,
  TooltipContext,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipTrigger,
};

test('applies Tailwind defaults and lets consumer utilities override them', async () => {
  const App = defineComponent({
    components: tooltipComponents,
    template: `
      <Tooltip open :portalled="false">
        <TooltipTrigger class="px-2 text-primary">Save</TooltipTrigger>
        <TooltipPositioner class="max-w-none">
          <TooltipContent data-testid="content" class="bg-card px-6 text-left">
            <TooltipArrow><TooltipArrowTip class="border-primary" /></TooltipArrow>
            Save changes
          </TooltipContent>
        </TooltipPositioner>
      </Tooltip>
    `,
  });
  render(App);
  await expect.element(page.getByRole('tooltip')).toBeVisible();
  const trigger = document.querySelector('[data-slot="tooltip-trigger"]')!;
  expect([...trigger.classList]).toEqual(expect.arrayContaining(['px-2', 'text-primary']));
  expect([...document.querySelector('[data-slot="tooltip-positioner"]')!.classList]).toContain(
    'max-w-none',
  );
  expect([...document.querySelector('[data-slot="tooltip-arrow-tip"]')!.classList]).toContain(
    'border-primary',
  );
  await expect.element(page.getByTestId('content')).toHaveCSS('padding-left', '24px');
  await expect.element(page.getByTestId('content')).toHaveCSS('text-align', 'left');
  await expect.element(page.getByRole('button', { name: 'Save' })).toHaveCSS('padding-left', '8px');
});
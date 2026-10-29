import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '@/index';

test('applies Tailwind defaults to visual parts and lets consumer utilities override them', async () => {
  render(() => (
    <Tooltip open portalled={false}>
      <TooltipTrigger class="px-2 text-primary">Save</TooltipTrigger>
      <TooltipPositioner class="max-w-none">
        <TooltipContent data-testid="content" class="bg-card px-6 text-left">
          <TooltipArrow>
            <TooltipArrowTip class="border-primary" />
          </TooltipArrow>
          Save changes
        </TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  ));

  const trigger = document.querySelector('[data-slot="tooltip-trigger"]')!;
  const positioner = document.querySelector('[data-slot="tooltip-positioner"]');
  const arrowTip = document.querySelector('[data-slot="tooltip-arrow-tip"]');

  expect(Array.from(trigger!.classList)).toEqual(expect.arrayContaining(['px-2', 'text-primary']));
  expect(Array.from(positioner!.classList)).toContain('max-w-none');
  expect(Array.from(arrowTip!.classList)).toContain('border-primary');
  await expect.element(page.getByTestId('content')).toHaveCSS('padding-left', '24px');
  await expect.element(page.getByTestId('content')).toHaveCSS('text-align', 'left');
  await expect.element(page.getByRole('button', { name: 'Save' })).toHaveCSS('padding-left', '8px');
});
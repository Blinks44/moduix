import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  Popover,
  PopoverArrow,
  PopoverArrowTip,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@/index';

test('closes with CloseIcon and restores focus to its trigger', async () => {
  render(
    <Popover portalled={false}>
      <PopoverTrigger>Open preferences</PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>Preferences</PopoverTitle>
          <PopoverCloseIcon />
        </PopoverContent>
      </PopoverPositioner>
    </Popover>,
  );

  const trigger = page.getByRole('button', { name: 'Open preferences' });
  await trigger.click();
  await page.getByRole('button', { name: 'Close popover' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});

test('applies Tailwind defaults to visual parts and lets consumer utilities override them', async () => {
  render(
    <Popover defaultOpen portalled={false}>
      <PopoverTrigger className="px-2 text-primary">Open preferences</PopoverTrigger>
      <PopoverPositioner className="max-w-none">
        <PopoverContent data-testid="content" className="bg-card p-6">
          <PopoverCloseIcon className="top-2" />
          <PopoverHeader>
            <PopoverTitle className="text-lg">Preferences</PopoverTitle>
            <PopoverDescription>Description</PopoverDescription>
          </PopoverHeader>
          <PopoverBody className="overflow-hidden">Body</PopoverBody>
          <PopoverFooter className="justify-start">
            <PopoverCloseTrigger className="px-2">Close</PopoverCloseTrigger>
          </PopoverFooter>
          <PopoverArrow>
            <PopoverArrowTip className="border-primary" />
          </PopoverArrow>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>,
  );

  const trigger = document.querySelector('[data-slot="popover-trigger"]')!;
  const content = document.querySelector('[data-testid="content"]')!;
  const positioner = document.querySelector('[data-slot="popover-positioner"]');
  const title = document.querySelector('[data-slot="popover-title"]');
  const footer = document.querySelector('[data-slot="popover-footer"]');
  const closeTrigger = document.querySelector('[data-slot="popover-close-trigger"]')!;
  const arrowTip = document.querySelector('[data-slot="popover-arrow-tip"]');

  expect(Array.from(trigger!.classList)).toEqual(expect.arrayContaining(['px-2', 'text-primary']));
  expect(Array.from(positioner!.classList)).toContain('max-w-none');
  expect(Array.from(content!.classList)).toEqual(expect.arrayContaining(['bg-card', 'p-6']));
  expect(Array.from(title!.classList)).toContain('text-lg');
  expect(Array.from(footer!.classList)).toContain('justify-start');
  expect(Array.from(closeTrigger!.classList)).toContain('px-2');
  expect(Array.from(arrowTip!.classList)).toContain('border-primary');
  await expect.element(page.getByTestId('content')).toHaveCSS('padding', '24px');
  await expect
    .element(page.getByRole('button', { name: 'Open preferences' }))
    .toHaveCSS('padding-left', '8px');
});
// Zag 1.43.3 checks the title before lazy content mounts; enable after the upstream fix.
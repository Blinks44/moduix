import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Button } from '@/components/button';
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipTrigger,
} from '@/components/tooltip';

test('forwards refs on native parts and keeps asChild composition native', () => {
  const triggerRef = createRef<HTMLButtonElement>();
  const disabledTriggerRef = createRef<HTMLSpanElement>();
  const positionerRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const arrowRef = createRef<HTMLDivElement>();
  const arrowTipRef = createRef<HTMLDivElement>();
  const composedTriggerRef = createRef<HTMLButtonElement>();

  render(
    <Tooltip open portalled={false}>
      <TooltipTrigger ref={triggerRef}>Save</TooltipTrigger>
      <TooltipTrigger ref={composedTriggerRef} asChild aria-label="Composed save">
        <a href="#save">Composed save</a>
      </TooltipTrigger>
      <TooltipDisabledTrigger ref={disabledTriggerRef} aria-label="Disabled save">
        <Button disabled>Disabled save</Button>
      </TooltipDisabledTrigger>
      <TooltipPositioner ref={positionerRef}>
        <TooltipContent ref={contentRef}>
          <TooltipArrow ref={arrowRef}>
            <TooltipArrowTip ref={arrowTipRef} />
          </TooltipArrow>
          Explicit content
        </TooltipContent>
      </TooltipPositioner>
    </Tooltip>,
  );

  expect(triggerRef.current?.getAttribute('data-slot')).toBe('tooltip-trigger');
  expect(disabledTriggerRef.current?.getAttribute('data-slot')).toBe('tooltip-disabled-trigger');
  expect(positionerRef.current?.getAttribute('data-slot')).toBe('tooltip-positioner');
  expect(contentRef.current?.getAttribute('data-slot')).toBe('tooltip-content');
  expect(arrowRef.current?.getAttribute('data-slot')).toBe('tooltip-arrow');
  expect(arrowTipRef.current?.getAttribute('data-slot')).toBe('tooltip-arrow-tip');
  expect(composedTriggerRef.current?.getAttribute('href')).toBe('#save');
});

test('applies Tailwind defaults to visual parts and lets consumer utilities override them', async () => {
  render(
    <Tooltip open portalled={false}>
      <TooltipTrigger className="px-2 text-primary">Save</TooltipTrigger>
      <TooltipPositioner className="max-w-none">
        <TooltipContent data-testid="content" className="bg-card px-6 text-left">
          <TooltipArrow>
            <TooltipArrowTip className="border-primary" />
          </TooltipArrow>
          Save changes
        </TooltipContent>
      </TooltipPositioner>
    </Tooltip>,
  );

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
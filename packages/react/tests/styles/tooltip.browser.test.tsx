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
  const composedTriggerRef = createRef<HTMLElement>();

  render(
    <Tooltip open portalled={false}>
      <TooltipTrigger ref={triggerRef}>Save</TooltipTrigger>
      <TooltipTrigger
        asChild
        aria-label="Composed save"
        ref={(element) => {
          composedTriggerRef.current = element;
        }}
      >
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
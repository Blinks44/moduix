import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverIndicator,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@/index';

test('forwards refs through native parts and keeps asChild composition native', () => {
  let anchorRef!: HTMLDivElement;
  let triggerRef!: HTMLButtonElement;
  let indicatorRef!: HTMLDivElement;
  let positionerRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  let arrowRef!: HTMLDivElement;
  let arrowTipRef!: HTMLDivElement;
  let titleRef!: HTMLDivElement;
  let descriptionRef!: HTMLDivElement;
  let closeTriggerRef!: HTMLButtonElement;
  let headerRef!: HTMLDivElement;
  let bodyRef!: HTMLDivElement;
  let footerRef!: HTMLDivElement;
  let composedTriggerRef: HTMLButtonElement | undefined;
  let closeIconRef: HTMLButtonElement | undefined;

  render(() => (
    <Popover defaultOpen portalled={false}>
      <PopoverAnchor ref={(element) => (anchorRef = element)} />
      <PopoverTrigger ref={(element) => (triggerRef = element)}>
        Open popover
        <PopoverIndicator ref={(element) => (indicatorRef = element)} />
      </PopoverTrigger>
      <PopoverTrigger
        ref={(element) => (composedTriggerRef = element)}
        asChild={(props) => <button {...props()}>Composed trigger</button>}
      />
      <PopoverPositioner ref={(element) => (positionerRef = element)}>
        <PopoverContent ref={(element) => (contentRef = element)}>
          <PopoverArrow ref={(element) => (arrowRef = element)}>
            <PopoverArrowTip ref={(element) => (arrowTipRef = element)} />
          </PopoverArrow>
          <PopoverTitle ref={(element) => (titleRef = element)}>Preferences</PopoverTitle>
          <PopoverDescription ref={(element) => (descriptionRef = element)}>
            Description
          </PopoverDescription>
          <PopoverCloseTrigger ref={(element) => (closeTriggerRef = element)}>
            Close
          </PopoverCloseTrigger>
          <PopoverCloseIcon ref={(element) => (closeIconRef = element)} />
          <PopoverHeader ref={(element) => (headerRef = element)} />
          <PopoverBody ref={(element) => (bodyRef = element)} />
          <PopoverFooter ref={(element) => (footerRef = element)} />
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  ));

  expect(anchorRef?.getAttribute('data-slot')).toBe('popover-anchor');
  expect(triggerRef?.getAttribute('data-slot')).toBe('popover-trigger');
  expect(indicatorRef?.getAttribute('data-slot')).toBe('popover-indicator');
  expect(positionerRef?.getAttribute('data-slot')).toBe('popover-positioner');
  expect(contentRef?.getAttribute('data-slot')).toBe('popover-content');
  expect(arrowRef?.getAttribute('data-slot')).toBe('popover-arrow');
  expect(arrowTipRef?.getAttribute('data-slot')).toBe('popover-arrow-tip');
  expect(titleRef?.getAttribute('data-slot')).toBe('popover-title');
  expect(descriptionRef?.getAttribute('data-slot')).toBe('popover-description');
  expect(closeTriggerRef?.getAttribute('data-slot')).toBe('popover-close-trigger');
  expect(headerRef?.getAttribute('data-slot')).toBe('popover-header');
  expect(bodyRef?.getAttribute('data-slot')).toBe('popover-body');
  expect(footerRef?.getAttribute('data-slot')).toBe('popover-footer');
  expect(composedTriggerRef).toBeUndefined();
  expect(closeIconRef).toBeUndefined();
});

test('applies Tailwind defaults to visual parts and lets consumer utilities override them', async () => {
  render(() => (
    <Popover defaultOpen portalled={false}>
      <PopoverTrigger class="px-2 text-primary">Open preferences</PopoverTrigger>
      <PopoverPositioner class="max-w-none">
        <PopoverContent data-testid="content" class="bg-card p-6">
          <PopoverCloseIcon class="top-2" />
          <PopoverHeader>
            <PopoverTitle class="text-lg">Preferences</PopoverTitle>
            <PopoverDescription>Description</PopoverDescription>
          </PopoverHeader>
          <PopoverBody class="overflow-hidden">Body</PopoverBody>
          <PopoverFooter class="justify-start">
            <PopoverCloseTrigger class="px-2">Close</PopoverCloseTrigger>
          </PopoverFooter>
          <PopoverArrow>
            <PopoverArrowTip class="border-primary" />
          </PopoverArrow>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  ));

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
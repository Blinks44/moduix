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

// Zag 1.43.3 checks the title before lazy content mounts; enable after the upstream fix.
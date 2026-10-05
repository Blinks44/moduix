import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef, useState } from 'react';
import { Button } from '../src/components/button';
import {
  Tooltip,
  useTooltip,
  useTooltipContext,
  TooltipArrow,
  TooltipArrowTip,
  TooltipBody,
  TooltipContent,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipTrigger,
} from '../src/components/tooltip';

test('preserves Ark open-change details and keeps trigger focus after Escape', async () => {
  const details: Array<{ open: boolean }> = [];

  function ControlledTooltip() {
    const [open, setOpen] = useState(false);

    return (
      <Tooltip
        open={open}
        openDelay={0}
        portalled={false}
        onOpenChange={(detail) => {
          details.push(detail);
          setOpen(detail.open);
        }}
      >
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
      </Tooltip>
    );
  }

  render(<ControlledTooltip />);

  const trigger = page.getByRole('button', { name: 'Save' });
  await trigger.focus();
  await trigger.hover();
  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
  expect(details).toEqual([{ open: true }]);
  await trigger.press('Escape');
  await expect.element(page.getByRole('tooltip')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
});

test('keeps a disabled control discoverable through DisabledTrigger', async () => {
  render(
    <>
      <button>Before tooltip</button>
      <Tooltip openDelay={0} portalled={false}>
        <TooltipDisabledTrigger aria-label="Create project is unavailable">
          <Button disabled>Create project</Button>
        </TooltipDisabledTrigger>
        <TooltipBody>Projects are unavailable while offline.</TooltipBody>
      </Tooltip>
    </>,
  );

  const trigger = page.getByLabel('Create project is unavailable');
  await expect.element(trigger).toHaveAttribute('data-slot', 'tooltip-disabled-trigger');
  await expect.element(trigger).toHaveAttribute('tabindex', '0');
  await expect.element(page.getByRole('button', { name: 'Create project' })).toBeDisabled();
  await page.getByRole('button', { name: 'Before tooltip' }).press('Tab');
  await expect.element(trigger).toBeFocused();
  await expect
    .element(page.getByRole('tooltip'))
    .toHaveText('Projects are unavailable while offline.');
});

test('preserves Body content/ref, default portal, inline rendering and fallback arrow', async () => {
  const bodyRef = createRef<HTMLDivElement>();
  const { container, unmount } = render(
    <Tooltip open>
      <TooltipTrigger>Save</TooltipTrigger>
      <TooltipBody ref={bodyRef}>Save changes</TooltipBody>
    </Tooltip>,
  );

  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
  expect(container.querySelector('[role="tooltip"]')).toBeNull();
  expect(bodyRef.current).toBe(document.querySelector('[role="tooltip"]'));
  expect(bodyRef.current?.getAttribute('data-slot')).toBe('tooltip-content');
  unmount();

  const inlineTooltip = render(
    <Tooltip open portalled={false}>
      <TooltipTrigger>Save</TooltipTrigger>
      <TooltipBody>
        <TooltipArrow />
        Save changes
      </TooltipBody>
    </Tooltip>,
  );

  await expect.element(page.getByRole('tooltip')).toBeVisible();
  expect(inlineTooltip.container.querySelector('[role="tooltip"]')).toBe(
    document.querySelector('[role="tooltip"]'),
  );
  await expect.element(page.locator('[data-slot="tooltip-arrow-tip"]')).toBeAttached();
});

test('keeps RootProvider state available through the moduix context hook', async () => {
  function ContextValue() {
    const tooltip = useTooltipContext();

    return <output>{tooltip.open ? 'open' : 'closed'}</output>;
  }

  function ProviderTooltip() {
    const tooltip = useTooltip({ openDelay: 0 });

    return (
      <TooltipRootProvider value={tooltip} portalled={false}>
        <button>Before tooltip</button>
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
        <ContextValue />
      </TooltipRootProvider>
    );
  }

  render(<ProviderTooltip />);

  await expect.element(page.getByText('closed', { exact: true })).toBeAttached();
  await page.getByRole('button', { name: 'Before tooltip' }).press('Tab');
  await expect.element(page.getByRole('button', { name: 'Save' })).toBeFocused();
  await expect.element(page.getByText('open', { exact: true })).toBeVisible();
  await expect.element(page.getByRole('tooltip')).toBeVisible();
});

test('reports the active value when moving between triggers', async () => {
  function MultipleTriggersTooltip() {
    const [value, setValue] = useState('');

    return (
      <>
        <output>{value}</output>
        <Tooltip
          openDelay={0}
          portalled={false}
          onTriggerValueChange={(detail) => setValue(detail.value ?? '')}
        >
          <TooltipTrigger value="save">Save</TooltipTrigger>
          <TooltipTrigger value="share">Share</TooltipTrigger>
          <TooltipBody>Action tooltip</TooltipBody>
        </Tooltip>
      </>
    );
  }

  render(<MultipleTriggersTooltip />);

  await page.getByRole('button', { name: 'Share' }).hover();
  await expect.element(page.getByText('share', { exact: true })).toBeVisible();
  await expect.element(page.getByRole('tooltip')).toBeVisible();
  await page.getByRole('button', { name: 'Save' }).hover();
  await expect.element(page.getByText('save', { exact: true })).toBeVisible();
});

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
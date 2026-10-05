import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Button,
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
} from '../src';

test('preserves Ark open-change details and keeps trigger focus after Escape', async () => {
  const details: Array<{ open: boolean }> = [];

  function ControlledTooltip() {
    const [open, setOpen] = createSignal(false);

    return (
      <Tooltip
        open={open()}
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

  render(() => <ControlledTooltip />);

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
  render(() => (
    <>
      <button>Before tooltip</button>
      <Tooltip openDelay={0} portalled={false}>
        <TooltipDisabledTrigger aria-label="Create project is unavailable">
          <Button disabled>Create project</Button>
        </TooltipDisabledTrigger>
        <TooltipBody>Projects are unavailable while offline.</TooltipBody>
      </Tooltip>
    </>
  ));

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
  let bodyRef!: HTMLDivElement;
  const { container, unmount } = render(() => (
    <Tooltip open>
      <TooltipTrigger>Save</TooltipTrigger>
      <TooltipBody ref={(element) => (bodyRef = element)}>Save changes</TooltipBody>
    </Tooltip>
  ));

  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
  expect(container.querySelector('[role="tooltip"]')).toBeNull();
  expect(bodyRef).toBe(document.querySelector('[role="tooltip"]'));
  expect(bodyRef?.getAttribute('data-slot')).toBe('tooltip-content');
  unmount();

  const inlineTooltip = render(() => (
    <Tooltip open portalled={false}>
      <TooltipTrigger>Save</TooltipTrigger>
      <TooltipBody>
        <TooltipArrow />
        Save changes
      </TooltipBody>
    </Tooltip>
  ));

  await expect.element(page.getByRole('tooltip')).toBeVisible();
  expect(inlineTooltip.container.querySelector('[role="tooltip"]')).toBe(
    document.querySelector('[role="tooltip"]'),
  );
  await expect.element(page.locator('[data-slot="tooltip-arrow-tip"]')).toBeAttached();
});

test('keeps RootProvider state available through the moduix context hook', async () => {
  function ContextValue() {
    const tooltip = useTooltipContext();

    return <output>{tooltip().open ? 'open' : 'closed'}</output>;
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

  render(() => <ProviderTooltip />);

  await expect.element(page.getByText('closed', { exact: true })).toBeAttached();
  await page.getByRole('button', { name: 'Before tooltip' }).press('Tab');
  await expect.element(page.getByRole('button', { name: 'Save' })).toBeFocused();
  await expect.element(page.getByText('open', { exact: true })).toBeVisible();
  await expect.element(page.getByRole('tooltip')).toBeVisible();
});

test('reports the active value when moving between triggers', async () => {
  function MultipleTriggersTooltip() {
    const [value, setValue] = createSignal('');

    return (
      <>
        <output>{value()}</output>
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

  render(() => <MultipleTriggersTooltip />);

  await page.getByRole('button', { name: 'Share' }).hover();
  await expect.element(page.getByText('share', { exact: true })).toBeVisible();
  await expect.element(page.getByRole('tooltip')).toBeVisible();
  await page.getByRole('button', { name: 'Save' }).hover();
  await expect.element(page.getByText('save', { exact: true })).toBeVisible();
});

test('forwards refs on native parts and keeps asChild composition native', () => {
  let triggerRef!: HTMLButtonElement;
  let disabledTriggerRef!: HTMLSpanElement;
  let positionerRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  let arrowRef!: HTMLDivElement;
  let arrowTipRef!: HTMLDivElement;
  let composedTriggerRef: HTMLButtonElement | undefined;

  render(() => (
    <Tooltip open portalled={false}>
      <TooltipTrigger ref={(element) => (triggerRef = element)}>Save</TooltipTrigger>
      <TooltipTrigger
        ref={(element) => (composedTriggerRef = element)}
        asChild={(props) => (
          <a {...props()} href="#save">
            Composed save
          </a>
        )}
      />
      <TooltipDisabledTrigger
        ref={(element) => (disabledTriggerRef = element)}
        aria-label="Disabled save"
      >
        <Button disabled>Disabled save</Button>
      </TooltipDisabledTrigger>
      <TooltipPositioner ref={(element) => (positionerRef = element)}>
        <TooltipContent ref={(element) => (contentRef = element)}>
          <TooltipArrow ref={(element) => (arrowRef = element)}>
            <TooltipArrowTip ref={(element) => (arrowTipRef = element)} />
          </TooltipArrow>
          Explicit content
        </TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  ));

  expect(triggerRef?.getAttribute('data-slot')).toBe('tooltip-trigger');
  expect(disabledTriggerRef?.getAttribute('data-slot')).toBe('tooltip-disabled-trigger');
  expect(positionerRef?.getAttribute('data-slot')).toBe('tooltip-positioner');
  expect(contentRef?.getAttribute('data-slot')).toBe('tooltip-content');
  expect(arrowRef?.getAttribute('data-slot')).toBe('tooltip-arrow');
  expect(arrowTipRef?.getAttribute('data-slot')).toBe('tooltip-arrow-tip');
  expect(composedTriggerRef).toBeUndefined();
});

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
  const content = document.querySelector('[data-testid="content"]')!;
  const positioner = document.querySelector('[data-slot="tooltip-positioner"]');
  const arrow = document.querySelector('[data-slot="tooltip-arrow"]');
  const arrowTip = document.querySelector('[data-slot="tooltip-arrow-tip"]');

  expect(Array.from(trigger!.classList)).toEqual(expect.arrayContaining(['px-2', 'text-primary']));
  expect(Array.from(trigger!.classList)).not.toContain('px-3.5');
  expect(Array.from(trigger!.classList)).not.toContain('text-foreground');
  expect(Array.from(positioner!.classList)).toContain('max-w-none');
  expect(Array.from(content!.classList)).toEqual(
    expect.arrayContaining(['bg-card', 'px-6', 'text-left', 'shadow-md']),
  );
  expect(Array.from(content!.classList)).not.toContain('shadow-lg');
  expect(Array.from(content!.classList)).not.toContain('bg-popover');
  expect(Array.from(content!.classList)).not.toContain('px-2');
  expect(Array.from(content!.classList)).not.toContain('text-center');
  expect(Array.from(arrow!.classList)).toContain('[--arrow-size:var(--spacing-2_5)]');
  expect(Array.from(arrowTip!.classList)).toContain('border-primary');
  await expect.element(page.getByTestId('content')).toHaveCSS('padding-left', '24px');
  await expect.element(page.getByTestId('content')).toHaveCSS('text-align', 'left');
  await expect.element(page.getByRole('button', { name: 'Save' })).toHaveCSS('padding-left', '8px');
});
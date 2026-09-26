import { describe, expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
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

describe('Tooltip', () => {
  test('preserves Ark open-change details and returns focus after Escape', async () => {
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

    const trigger = screen.getByRole('button', { name: 'Save' });
    trigger.focus();
    fireEvent.pointerOver(trigger);

    const content = await screen.findByRole('tooltip');
    expect(details).toEqual([{ open: true }]);

    fireEvent.keyDown(content, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
    expect(details).toEqual([{ open: true }, { open: false }]);
  });

  test('renders controlled content and forwards the Body ref to it', async () => {
    const ref = { current: null as HTMLDivElement | null };

    render(
      <Tooltip open>
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody ref={ref}>Save changes</TooltipBody>
      </Tooltip>,
    );

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveTextContent('Save changes');
    });

    expect(ref.current).toHaveAttribute('data-slot', 'tooltip-content');
  });

  test('keeps a disabled control discoverable through DisabledTrigger', async () => {
    render(
      <Tooltip openDelay={0} portalled={false}>
        <TooltipDisabledTrigger aria-label="Create project is unavailable">
          <Button disabled>Create project</Button>
        </TooltipDisabledTrigger>
        <TooltipBody>Projects are unavailable while offline.</TooltipBody>
      </Tooltip>,
    );

    const trigger = screen.getByLabelText('Create project is unavailable');

    expect(trigger).toHaveAttribute('data-slot', 'tooltip-disabled-trigger');
    expect(trigger).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('button', { name: 'Create project' })).toBeDisabled();

    fireEvent.keyDown(document, { key: 'Tab' });
    trigger.focus();

    await expect(screen.findByRole('tooltip')).resolves.toHaveTextContent(
      'Projects are unavailable while offline.',
    );
  });

  test('portals the positioner by default and can render it inline', async () => {
    const { container, unmount } = render(
      <Tooltip open>
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
      </Tooltip>,
    );

    const portalledContent = await screen.findByRole('tooltip');
    expect(container).not.toContainElement(portalledContent);

    unmount();

    const inlineTooltip = render(
      <Tooltip open portalled={false}>
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
      </Tooltip>,
    );

    const inlineContent = await screen.findByRole('tooltip');
    expect(inlineTooltip.container).toContainElement(inlineContent);
  });

  test('renders the moduix arrow tip when TooltipArrow has no child', async () => {
    render(
      <Tooltip open portalled={false}>
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>
          <TooltipArrow />
          Save changes
        </TooltipBody>
      </Tooltip>,
    );

    await screen.findByRole('tooltip');
    expect(document.querySelector('[data-slot="tooltip-arrow-tip"]')).toBeInTheDocument();
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
          <TooltipTrigger>Save</TooltipTrigger>
          <TooltipBody>Save changes</TooltipBody>
          <ContextValue />
        </TooltipRootProvider>
      );
    }

    render(<ProviderTooltip />);

    const trigger = screen.getByRole('button', { name: 'Save' });
    fireEvent.keyDown(document, { key: 'Tab' });
    trigger.focus();

    await waitFor(() => expect(screen.getByText('open')).toBeVisible());
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

    fireEvent.pointerOver(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() => expect(screen.getByText('share')).toBeVisible());
  });

  test('forwards refs on native parts and keeps asChild composition native', () => {
    const triggerRef = { current: null as HTMLButtonElement | null };
    const disabledTriggerRef = { current: null as HTMLSpanElement | null };
    const bodyRef = { current: null as HTMLDivElement | null };
    const positionerRef = { current: null as HTMLDivElement | null };
    const contentRef = { current: null as HTMLDivElement | null };
    const arrowRef = { current: null as HTMLDivElement | null };
    const arrowTipRef = { current: null as HTMLDivElement | null };
    const composedTriggerRef = { current: null as HTMLButtonElement | null };

    render(
      <Tooltip open portalled={false}>
        <TooltipTrigger ref={triggerRef}>Save</TooltipTrigger>
        <TooltipTrigger ref={composedTriggerRef} asChild aria-label="Composed save">
          <a href="#save">Composed save</a>
        </TooltipTrigger>
        <TooltipDisabledTrigger ref={disabledTriggerRef} aria-label="Disabled save">
          <Button disabled>Disabled save</Button>
        </TooltipDisabledTrigger>
        <TooltipBody ref={bodyRef}>Body ref</TooltipBody>
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

    expect(triggerRef.current).toHaveAttribute('data-slot', 'tooltip-trigger');
    expect(disabledTriggerRef.current).toHaveAttribute('data-slot', 'tooltip-disabled-trigger');
    expect(bodyRef.current).toHaveAttribute('data-slot', 'tooltip-content');
    expect(positionerRef.current).toHaveAttribute('data-slot', 'tooltip-positioner');
    expect(contentRef.current).toHaveAttribute('data-slot', 'tooltip-content');
    expect(arrowRef.current).toHaveAttribute('data-slot', 'tooltip-arrow');
    expect(arrowTipRef.current).toHaveAttribute('data-slot', 'tooltip-arrow-tip');
    expect(composedTriggerRef.current).toHaveAttribute('href', '#save');
  });

  test('applies Tailwind defaults to visual parts and lets consumer utilities override them', () => {
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

    const trigger = screen.getByRole('button', { name: 'Save' });
    const content = screen.getByTestId('content');
    const positioner = document.querySelector('[data-slot="tooltip-positioner"]');
    const arrow = document.querySelector('[data-slot="tooltip-arrow"]');
    const arrowTip = document.querySelector('[data-slot="tooltip-arrow-tip"]');

    expect(trigger).toHaveClass('px-2', 'text-primary');
    expect(trigger).not.toHaveClass('px-3.5', 'text-foreground');
    expect(positioner).toHaveClass('max-w-none');
    expect(content).toHaveClass('bg-card', 'px-6', 'text-left', 'shadow-md');
    expect(content).not.toHaveClass('shadow-lg');
    expect(content).not.toHaveClass('bg-popover', 'px-2', 'text-center');
    expect(arrow).toHaveClass('[--arrow-size:var(--spacing-2_5)]');
    expect(arrowTip).toHaveClass('border-primary');
  });
});
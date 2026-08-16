import { describe, expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { Button } from '../src/components/button';
import { Tooltip, useTooltip, useTooltipContext } from '../src/components/tooltip';

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
          <Tooltip.Trigger>Save</Tooltip.Trigger>
          <Tooltip.Body>Save changes</Tooltip.Body>
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
        <Tooltip.Trigger>Save</Tooltip.Trigger>
        <Tooltip.Body ref={ref}>Save changes</Tooltip.Body>
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
        <Tooltip.DisabledTrigger aria-label="Create project is unavailable">
          <Button disabled>Create project</Button>
        </Tooltip.DisabledTrigger>
        <Tooltip.Body>Projects are unavailable while offline.</Tooltip.Body>
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
        <Tooltip.Trigger>Save</Tooltip.Trigger>
        <Tooltip.Body>Save changes</Tooltip.Body>
      </Tooltip>,
    );

    const portalledContent = await screen.findByRole('tooltip');
    expect(container).not.toContainElement(portalledContent);

    unmount();

    const inlineTooltip = render(
      <Tooltip open portalled={false}>
        <Tooltip.Trigger>Save</Tooltip.Trigger>
        <Tooltip.Body>Save changes</Tooltip.Body>
      </Tooltip>,
    );

    const inlineContent = await screen.findByRole('tooltip');
    expect(inlineTooltip.container).toContainElement(inlineContent);
  });

  test('renders the moduix arrow tip when Tooltip.Arrow has no child', async () => {
    render(
      <Tooltip open portalled={false}>
        <Tooltip.Trigger>Save</Tooltip.Trigger>
        <Tooltip.Body>
          <Tooltip.Arrow />
          Save changes
        </Tooltip.Body>
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
        <Tooltip.RootProvider value={tooltip} portalled={false}>
          <Tooltip.Trigger>Save</Tooltip.Trigger>
          <Tooltip.Body>Save changes</Tooltip.Body>
          <ContextValue />
        </Tooltip.RootProvider>
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
            <Tooltip.Trigger value="save">Save</Tooltip.Trigger>
            <Tooltip.Trigger value="share">Share</Tooltip.Trigger>
            <Tooltip.Body>Action tooltip</Tooltip.Body>
          </Tooltip>
        </>
      );
    }

    render(<MultipleTriggersTooltip />);

    fireEvent.pointerOver(screen.getByRole('button', { name: 'Share' }));

    await waitFor(() => expect(screen.getByText('share')).toBeVisible());
  });
});
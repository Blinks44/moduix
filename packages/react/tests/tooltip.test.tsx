import { describe, expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@testing-library/react';
import { Button } from '../src/components/button';
import { Tooltip } from '../src/components/tooltip';

describe('Tooltip', () => {
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

  test('keeps a disabled control discoverable through DisabledTrigger', () => {
    render(
      <Tooltip openDelay={0}>
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
  });
});
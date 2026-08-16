import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Menu, SplitButton } from '../src';

function TestSplitButton({
  onOpenChange,
  primaryDisabled = false,
  triggerDisabled = false,
}: {
  onOpenChange?: (details: { open: boolean }) => void;
  primaryDisabled?: boolean;
  triggerDisabled?: boolean;
}) {
  return (
    <SplitButton aria-label="Save actions" portalled={false} onOpenChange={onOpenChange}>
      <SplitButton.Action disabled={primaryDisabled}>Save Changes</SplitButton.Action>
      <SplitButton.Trigger disabled={triggerDisabled} />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="save-draft">Save as Draft</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

test('keeps the default trigger accessible and restores focus after Escape', async () => {
  const openChanges: boolean[] = [];

  render(<TestSplitButton onOpenChange={(details) => openChanges.push(details.open)} />);

  expect(screen.getByRole('group', { name: 'Save actions' })).toHaveAttribute(
    'data-slot',
    'split-button-root',
  );

  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(trigger).toHaveAttribute('data-slot', 'split-button-trigger');
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(trigger);

  const menu = await screen.findByRole('menu');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(openChanges).toEqual([true]);

  fireEvent.keyDown(menu, { key: 'Escape' });

  await waitFor(() => {
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  expect(openChanges).toEqual([true, false]);
});

test('keeps the menu trigger available when only the primary action is disabled', async () => {
  render(<TestSplitButton primaryDisabled />);

  expect(screen.getByRole('button', { name: 'Save Changes' })).toBeDisabled();

  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(trigger).not.toBeDisabled();

  fireEvent.click(trigger);

  expect(await screen.findByRole('menuitem', { name: 'Save as Draft' })).toBeVisible();
});

test('keeps the menu closed when its trigger is disabled', () => {
  render(<TestSplitButton triggerDisabled />);

  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(trigger).toBeDisabled();

  fireEvent.click(trigger);

  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('forwards refs and shares root variant and size defaults', () => {
  const rootRef = createRef<HTMLDivElement>();
  const actionRef = createRef<HTMLButtonElement>();
  const triggerRef = createRef<HTMLButtonElement>();

  render(
    <SplitButton.Root ref={rootRef} aria-label="Project actions" size="lg" variant="destructive">
      <SplitButton.Action ref={actionRef}>Delete project</SplitButton.Action>
      <SplitButton.Trigger ref={triggerRef} aria-label="More project actions" />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="archive">Archive project</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton.Root>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'split-button-root');
  expect(rootRef.current).toHaveAttribute('role', 'group');
  expect(actionRef.current).toBe(screen.getByRole('button', { name: 'Delete project' }));
  expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'More project actions' }));
  expect(actionRef.current).toHaveAttribute('data-size', 'lg');
  expect(actionRef.current).toHaveAttribute('data-variant', 'destructive');
  expect(triggerRef.current).toHaveAttribute('data-size', 'lg');
  expect(triggerRef.current).toHaveAttribute('data-variant', 'destructive');
});

test('keeps the primary action independent and exposes stable popup slots', async () => {
  const actions: string[] = [];
  const user = userEvent.setup();

  render(
    <SplitButton
      aria-labelledby="document-actions-label"
      portalled={false}
      onSelect={(details) => actions.push(details.value)}
    >
      <span id="document-actions-label">Document actions</span>
      <SplitButton.Action onClick={() => actions.push('save')}>Save</SplitButton.Action>
      <SplitButton.Trigger>Options</SplitButton.Trigger>
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="duplicate">Duplicate</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>,
  );

  const group = screen.getByRole('group', { name: 'Document actions' });
  const primaryAction = screen.getByRole('button', { name: 'Save' });
  const trigger = screen.getByRole('button', { name: 'Options' });

  expect(group).toHaveAttribute('aria-labelledby', 'document-actions-label');
  expect(primaryAction).toHaveAttribute('data-slot', 'split-button-action');

  fireEvent.click(primaryAction);

  expect(actions).toEqual(['save']);
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();

  fireEvent.click(trigger);

  const menu = await screen.findByRole('menu');
  expect(menu).toHaveAttribute('data-slot', 'split-button-content');
  expect(menu.parentElement).toHaveAttribute('data-slot', 'split-button-positioner');

  await user.click(screen.getByRole('menuitem', { name: 'Duplicate' }));

  await waitFor(() => expect(actions).toEqual(['save', 'duplicate']));
});
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { Menu, SplitButton } from '../src';

function TestSplitButton(props: {
  onOpenChange?: (details: { open: boolean }) => void;
  primaryDisabled?: boolean;
  triggerDisabled?: boolean;
}) {
  return (
    <SplitButton aria-label="Save actions" portalled={false} onOpenChange={props.onOpenChange}>
      <SplitButton.Action disabled={props.primaryDisabled ?? false}>
        Save Changes
      </SplitButton.Action>
      <SplitButton.Trigger disabled={props.triggerDisabled ?? false} />
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

  render(() => <TestSplitButton onOpenChange={(details) => openChanges.push(details.open)} />);

  expect(screen.getByRole('group', { name: 'Save actions' })).toHaveAttribute(
    'data-slot',
    'split-button-root',
  );

  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(trigger).toHaveAttribute('data-slot', 'split-button-trigger');
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(trigger);

  await screen.findByRole('menu');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(openChanges).toEqual([true]);

  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  fireEvent.keyDown(trigger, { key: 'Escape' });

  await waitFor(() => {
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  expect(openChanges).toEqual([true, false]);
});

test('keeps the menu trigger available when only the primary action is disabled', async () => {
  render(() => <TestSplitButton primaryDisabled />);

  expect(screen.getByRole('button', { name: 'Save Changes' })).toBeDisabled();

  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(trigger).not.toBeDisabled();

  fireEvent.click(trigger);

  expect(await screen.findByRole('menuitem', { name: 'Save as Draft' })).toBeVisible();
});

test('keeps the menu closed when its trigger is disabled', () => {
  render(() => <TestSplitButton triggerDisabled />);

  const trigger = screen.getByRole('button', { name: 'More actions' });
  expect(trigger).toBeDisabled();

  fireEvent.click(trigger);

  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('forwards refs and shares root variant and size defaults', () => {
  let rootRef!: HTMLDivElement;
  let actionRef!: HTMLButtonElement;
  let triggerRef!: HTMLButtonElement;

  render(() => (
    <SplitButton.Root
      ref={(element: HTMLDivElement) => (rootRef = element)}
      aria-label="Project actions"
      size="lg"
      variant="destructive"
    >
      <SplitButton.Action ref={(element) => (actionRef = element)}>
        Delete project
      </SplitButton.Action>
      <SplitButton.Trigger
        ref={(element) => (triggerRef = element)}
        aria-label="More project actions"
      />
      <SplitButton.Positioner>
        <SplitButton.Content>
          <Menu.Item value="archive">Archive project</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton.Root>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'split-button-root');
  expect(rootRef).toHaveAttribute('role', 'group');
  expect(actionRef).toBe(screen.getByRole('button', { name: 'Delete project' }));
  expect(triggerRef).toBeUndefined();
  const trigger = screen.getByRole('button', { name: 'More project actions' });
  expect(actionRef).toHaveAttribute('data-size', 'lg');
  expect(actionRef).toHaveAttribute('data-variant', 'destructive');
  expect(trigger).toHaveAttribute('data-size', 'lg');
  expect(trigger).toHaveAttribute('data-variant', 'destructive');
});

test('keeps the primary action independent and exposes stable popup slots', async () => {
  const actions: string[] = [];

  render(() => (
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
    </SplitButton>
  ));

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

  const item = screen.getByRole('menuitem', { name: 'Duplicate' });
  fireEvent.pointerDown(item);
  fireEvent.click(item);

  await waitFor(() => expect(actions).toEqual(['save', 'duplicate']));
});

test('keeps component-owned utilities visible and lets consumers replace conflicts', () => {
  render(() => (
    <SplitButton aria-label="Project actions">
      <SplitButton.Action class="rounded-md p-0 text-xs">Save</SplitButton.Action>
      <SplitButton.Trigger size="lg" class="px-0" />
    </SplitButton>
  ));

  const action = screen.getByRole('button', { name: 'Save' });
  const trigger = screen.getByRole('button', { name: 'More actions' });

  expect(action).toHaveClass('inline-flex', 'items-center', 'rounded-md');
  expect(action).not.toHaveClass('rounded-e-none', 'px-4', 'text-sm');
  expect(trigger).toHaveClass(
    'relative',
    'min-w-0',
    'rounded-s-none',
    'before:absolute',
    'before:w-px',
  );
  expect(trigger).toHaveClass('px-0');
  expect(trigger).not.toHaveClass('px-3.5', 'px-5');
});
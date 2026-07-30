import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Menu, SplitButton } from '../src';

function TestSplitButton({
  onOpenChange,
  primaryDisabled = false,
}: {
  onOpenChange?: (details: { open: boolean }) => void;
  primaryDisabled?: boolean;
}) {
  return (
    <SplitButton portalled={false} onOpenChange={onOpenChange}>
      <SplitButton.Action disabled={primaryDisabled}>Save Changes</SplitButton.Action>
      <SplitButton.Trigger />
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
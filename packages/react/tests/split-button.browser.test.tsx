import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  MenuItem,
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '../src';

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
      <SplitButtonAction disabled={primaryDisabled}>Save Changes</SplitButtonAction>
      <SplitButtonTrigger disabled={triggerDisabled} />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="save-draft">Save as Draft</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>
  );
}

test('keeps the default trigger accessible and restores focus after Escape', async () => {
  const openChanges: boolean[] = [];

  render(<TestSplitButton onOpenChange={(details) => openChanges.push(details.open)} />);

  await expect
    .element(page.getByRole('group', { name: 'Save actions' }))
    .toHaveAttribute('data-slot', 'split-button-root');

  const trigger = page.getByRole('button', { name: 'More actions' });
  await expect.element(trigger).toHaveAttribute('data-slot', 'split-button-trigger');
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');

  await trigger.click();

  const menu = page.getByRole('menu');
  await expect.element(menu).toBeVisible();

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(openChanges).toEqual([true]);

  await expect.element(menu).toBeFocused();
  await menu.press('Escape');

  await expect.element(menu).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(openChanges).toEqual([true, false]);
});

test('keeps the menu trigger available when only the primary action is disabled', async () => {
  render(<TestSplitButton primaryDisabled />);

  await expect.element(page.getByRole('button', { name: 'Save Changes' })).toBeDisabled();

  await expect.element(page.getByRole('button', { name: 'More actions' })).not.toBeDisabled();

  await page.getByRole('button', { name: 'More actions' }).click();

  await expect.element(page.getByRole('menuitem', { name: 'Save as Draft' })).toBeVisible();
});

test('keeps the menu closed when its trigger is disabled', async () => {
  render(<TestSplitButton triggerDisabled />);

  await expect.element(page.getByRole('button', { name: 'More actions' })).toBeDisabled();

  await expect.element(page.getByRole('menu')).toHaveCount(0);
});

test('forwards refs and shares root variant and size defaults', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const actionRef = createRef<HTMLButtonElement>();
  const triggerRef = createRef<HTMLButtonElement>();

  render(
    <SplitButton ref={rootRef} aria-label="Project actions" size="lg" variant="destructive">
      <SplitButtonAction ref={actionRef}>Delete project</SplitButtonAction>
      <SplitButtonTrigger ref={triggerRef} aria-label="More project actions" />
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="archive">Archive project</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>,
  );

  expect(rootRef.current?.getAttribute('data-slot')).toBe('split-button-root');
  expect(rootRef.current?.getAttribute('role')).toBe('group');
  expect(actionRef.current).toBe(screen.getByRole('button', { name: 'Delete project' }));
  expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'More project actions' }));
  expect(actionRef.current?.getAttribute('data-size')).toBe('lg');
  expect(actionRef.current?.getAttribute('data-variant')).toBe('destructive');
  expect(triggerRef.current?.getAttribute('data-size')).toBe('lg');
  expect(triggerRef.current?.getAttribute('data-variant')).toBe('destructive');
});

test('keeps the primary action independent and exposes stable popup slots', async () => {
  const actions: string[] = [];

  render(
    <SplitButton
      aria-labelledby="document-actions-label"
      portalled={false}
      onSelect={(details) => actions.push(details.value)}
    >
      <span id="document-actions-label">Document actions</span>
      <SplitButtonAction onClick={() => actions.push('save')}>Save</SplitButtonAction>
      <SplitButtonTrigger>Options</SplitButtonTrigger>
      <SplitButtonPositioner>
        <SplitButtonContent>
          <MenuItem value="duplicate">Duplicate</MenuItem>
        </SplitButtonContent>
      </SplitButtonPositioner>
    </SplitButton>,
  );

  await expect
    .element(page.getByRole('group', { name: 'Document actions' }))
    .toHaveAttribute('aria-labelledby', 'document-actions-label');
  await expect
    .element(page.getByRole('button', { name: 'Save' }))
    .toHaveAttribute('data-slot', 'split-button-action');

  await page.getByRole('button', { name: 'Save' }).click();

  expect(actions).toEqual(['save']);
  const menu = page.getByRole('menu');
  await expect.element(menu).toHaveCount(0);

  await page.getByRole('button', { name: 'Options' }).click();

  await expect.element(menu).toBeVisible();

  await expect.element(menu).toHaveAttribute('data-slot', 'split-button-content');
  await expect.element(menu.locator('..')).toHaveAttribute('data-slot', 'split-button-positioner');

  await page.getByRole('menuitem', { name: 'Duplicate' }).click();

  await expect.poll(() => actions).toEqual(['save', 'duplicate']);
});
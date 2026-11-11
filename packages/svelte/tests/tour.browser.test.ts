import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import CloseTour from './tour/CloseTour.svelte';
import ControlledTour from './tour/ControlledTour.svelte';
import CustomActionTour from './tour/CustomActionTour.svelte';
import DialogTour from './tour/DialogTour.svelte';
import InlineTour from './tour/InlineTour.svelte';
import LifecycleTour from './tour/LifecycleTour.svelte';
import OptionalTour from './tour/OptionalTour.svelte';
import PortalTour from './tour/PortalTour.svelte';
import TooltipStepTour from './tour/TooltipStepTour.svelte';

test('renders the inline anatomy, fallback content, refs, and consumer classes', async () => {
  const { component, rerender } = render(InlineTour);
  await page.getByRole('button', { name: 'Start tour', exact: true }).click();

  const content = screen.getByRole('dialog', { name: 'Welcome' });
  await expect
    .element(page.getByRole('dialog', { name: 'Welcome', exact: true }))
    .toHaveAttribute('data-slot', 'tour-content');
  expect([...content.classList]).toEqual(expect.arrayContaining(['consumer-content']));
  expect(Boolean(content.querySelector('[data-slot="tour-body"]')?.isConnected)).toBe(true);
  await expect.element(page.locator('[data-slot="tour-backdrop"]')).toBeAttached();
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toHaveAttribute('data-slot', 'tour-close-icon');
  expect(screen.getAllByText('Continue')).toHaveLength(2);
  const refs = component.getRefs();
  expect(refs.positionerRef?.getAttribute('data-slot')).toBe('tour-positioner');
  expect(refs.contentRef).toBe(content);
  for (const action of screen.getAllByText('Continue')) {
    expect([...action.classList]).toContain('consumer-action');
  }

  await rerender({ actionClass: ['consumer-array', 'px-6', { 'font-normal': true }] });
  for (const action of screen.getAllByText('Continue')) {
    expect([...action.classList]).toEqual(
      expect.arrayContaining(['consumer-array', 'px-6', 'font-normal']),
    );
  }

  await rerender({ actionClass: { 'consumer-object': true, 'px-4': true } });
  for (const action of screen.getAllByText('Continue')) {
    expect([...action.classList]).toEqual(expect.arrayContaining(['consumer-object', 'px-4']));
  }
});

test('portals overlay parts by default and supports duplicate action labels', async () => {
  const { container } = render(PortalTour);

  await page.getByRole('button', { name: 'Start tour', exact: true }).click();

  const content = screen.getByRole('dialog', { name: 'Welcome' });
  expect(container.contains(content)).not.toBe(true);

  const actions = screen.getAllByText('Continue');
  expect(actions).toHaveLength(2);
  await expect.element(page.getByText('Continue').nth(0)).toBeDisabled();
  await expect.element(page.getByText('Continue').nth(1)).not.toBeDisabled();
});

test('preserves hook lifecycle callbacks and keeps the public actions snippet connected', async () => {
  const statuses: string[] = [];
  const changes: Array<{ stepId: string | null }> = [];
  render(LifecycleTour, { props: { statuses, changes } });
  await page.getByRole('button', { name: 'Start events tour', exact: true }).click();
  await expect.element(page.getByTestId('action-count')).toContainText('2');
  expect(statuses).toEqual(['started']);
  expect(changes.at(-1)).toEqual(expect.objectContaining({ stepId: 'welcome' }));
});

test('switches optional content snippets without changing native fallback semantics', async () => {
  const { component, rerender } = render(OptionalTour);
  await page.getByRole('button', { name: 'Start slot tour', exact: true }).click();
  screen.getByRole('dialog', { name: 'Welcome' });
  const ids = ['title', 'description', 'progress', 'arrow'];
  const hosts = ids.map((id) => screen.getByTestId(id));
  await expect.element(page.getByTestId('description')).toContainText('Start the tour.');
  const progress = screen.getByTestId('progress').textContent;
  expect(progress).toBeTruthy();
  expect(
    Boolean(screen.getByTestId('arrow').querySelector('[data-slot="tour-arrow-tip"]')?.isConnected),
  ).toBe(true);

  await rerender({ custom: true });
  await expect.element(page.getByTestId('title')).toContainText('Custom title');
  ids.forEach((id, index) => {
    expect(screen.getByTestId(id)).toBe(hosts[index]);
  });
  expect(component.getTitleRef()).toBe(hosts[0]);
  await expect.element(page.getByTestId('description')).toContainText('Custom description');
  await expect.element(page.getByTestId('progress')).toContainText('Custom progress');
  await expect.element(page.getByTestId('arrow')).toContainText('Custom arrow');
  expect(screen.getByTestId('arrow').querySelector('[data-slot="tour-arrow-tip"]')).toBeNull();
  await rerender({ custom: true, emptyArrow: true });
  await expect.poll(() => screen.getByTestId('arrow').textContent?.trim()).toBe('');
  expect(screen.getByTestId('arrow').querySelector('[data-slot="tour-arrow-tip"]')).toBeNull();

  await rerender({ custom: false, emptyArrow: true });
  await expect.element(page.getByTestId('title')).toContainText('Welcome');
  ids.forEach((id, index) => {
    expect(screen.getByTestId(id)).toBe(hosts[index]);
  });
  await expect.element(page.getByTestId('description')).toContainText('Start the tour.');
  expect(screen.getByTestId('progress').textContent).toBe(progress);
  expect(
    Boolean(screen.getByTestId('arrow').querySelector('[data-slot="tour-arrow-tip"]')?.isConnected),
  ).toBe(true);
  const title = screen.getByTestId('title');
  await expect.element(page.getByTestId('title')).toHaveAttribute('data-slot', 'tour-title');
  expect([...title.classList]).toEqual(expect.arrayContaining(['consumer-title']));
  expect(component.getTitleRef()).toBe(title);
});

test('preserves close-icon fallback, reactive labels, native refs, and a single exit event', async () => {
  const exitComplete = rs.fn();
  const click = rs.fn();
  const { component, rerender } = render(CloseTour, {
    props: { onExitComplete: exitComplete, onclick: click },
  });
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Start dismiss tour', exact: true }).click();
  const close = screen.getByRole('button', { name: 'Close tour' });
  expect(Boolean(close.querySelector('svg')?.isConnected)).toBe(true);
  expect(component.getCloseRef()).toBe(close);
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toHaveAttribute('data-slot', 'tour-close-icon');
  expect([...close.classList]).toEqual(expect.arrayContaining(['consumer-close']));
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toHaveAttribute('title', 'Dismiss walkthrough');

  await rerender({ label: 'Dismiss walkthrough' });
  await expect
    .element(page.getByRole('button', { name: 'Dismiss walkthrough', exact: true }))
    .toBeAttached();
  await rerender({ label: '' });
  await expect
    .element(page.locator('[data-slot="tour-close-icon"]'))
    .toHaveAttribute('aria-label', '');
  await rerender({ label: undefined });
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toBeAttached();
  await rerender({ labelledby: 'dismiss-label' });
  await expect
    .element(page.getByRole('button', { name: 'Dismiss with label', exact: true }))
    .toBeAttached();
  await rerender({ labelledby: undefined, customIcon: true });
  await expect
    .element(page.getByRole('button', { name: 'Close tour', exact: true }))
    .toContainText('Custom close');
  expect(close.querySelector('svg')).toBeNull();
  await rerender({ customIcon: false });
  await expect.poll(() => Boolean(close.querySelector('svg')?.isConnected)).toBe(true);
  expect(component.getCloseRef()).toBe(close);
  await page.getByRole('button', { name: 'Close tour', exact: true }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  expect(click).toHaveBeenCalledTimes(1);
  expect(exitComplete).toHaveBeenCalledTimes(1);
});

test('keeps controlled hook state, scoped context, snippets, and asChild refs reactive', async () => {
  let stepId: string | undefined;
  const changes = rs.fn();
  const { component } = render(ControlledTour, {
    props: { changes, onStepId: (value: string | undefined) => (stepId = value) },
  });
  await page.getByRole('button', { name: 'Start controlled tour', exact: true }).click();
  screen.getByRole('dialog', { name: 'Welcome' });
  await expect.element(page.getByText('Custom progress')).toBeAttached();
  expect(component.getActionRef()).toBe(screen.getByTestId('custom-action'));
  await expect.element(page.getByTestId('current-step')).toContainText('welcome');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  screen.getByRole('dialog', { name: 'Complete' });
  expect(stepId).toBe('finish');
  await expect.element(page.getByTestId('current-step')).toContainText('finish');
  await expect
    .element(page.getByTestId('custom-action'))
    .toHaveAttribute('data-slot', 'tour-action-trigger');
  expect(changes.mock.calls.map(([details]) => details.stepId)).toEqual([
    null,
    'welcome',
    'finish',
  ]);
});

test('stacks a tooltip step above its spotlight and backdrop', async () => {
  render(TooltipStepTour);
  await page.getByRole('button', { name: 'Start tooltip tour', exact: true }).click();
  await expect.element(page.getByRole('dialog', { name: 'Tooltip' })).toBeVisible();

  const zIndex = (slot: string) =>
    Number(getComputedStyle(document.querySelector('[data-slot="tour-' + slot + '"]')!).zIndex);
  expect(zIndex('spotlight')).toBeGreaterThan(zIndex('backdrop'));
  expect(zIndex('positioner')).toBeGreaterThan(zIndex('spotlight'));
});

test('shows a tour started from an open dialog above that dialog', async () => {
  render(DialogTour);
  await page.getByRole('button', { name: 'Start dialog tour', exact: true }).click();
  await expect.element(page.getByRole('dialog', { name: 'Welcome' })).toBeVisible();

  const content = document.querySelector('[data-slot="tour-content"]')!;
  const rect = content.getBoundingClientRect();
  const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
  expect(content.contains(hit)).toBe(true);
});

test('preserves Ark action behavior for custom markup with asChild', async () => {
  render(CustomActionTour);
  await page.getByRole('button', { name: 'Start custom action tour', exact: true }).click();

  await expect
    .element(page.getByText('Continue').nth(0))
    .toHaveAttribute('data-slot', 'tour-action-trigger');
  await expect.element(page.getByText('Continue').nth(0)).toBeDisabled();
  await expect.element(page.getByText('Continue').nth(1)).not.toBeDisabled();
});
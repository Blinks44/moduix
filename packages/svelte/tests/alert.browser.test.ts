import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildAlert from './alert/AsChildAlert.svelte';
import PartsAlert from './alert/PartsAlert.svelte';
import PlainAlert from './alert/PlainAlert.svelte';

test('preserves semantic children and refs with asChild', async () => {
  const { component } = render(AsChildAlert);

  await expect.element(page.getByRole('status', { name: 'Release notes' })).toHaveCount(1);
  const root = screen.getByRole('status', { name: 'Release notes' });
  const title = screen.getByRole('heading', { name: 'Update available', level: 2 });
  const refs = component.getRefs();

  expect(root.tagName).toBe('SECTION');
  expect(refs.rootRef).toBe(root);
  expect(refs.titleRef).toBe(title);
  expect(title.getAttribute('data-part')).toBe('title');
});

test('forwards refs and data hooks for every optional part', async () => {
  const { component } = render(PartsAlert, { props: { role: 'note' } });

  await expect.element(page.getByRole('note')).toHaveCount(1);
  const root = screen.getByRole('note');
  const refs = component.getRefs();

  expect(refs.rootRef).toBe(root);
  expect(root.getAttribute('data-status')).toBe('info');
  expect(refs.indicatorRef?.getAttribute('data-slot')).toBe('alert-indicator');
  expect(refs.indicatorRef?.getAttribute('aria-hidden')).toBe('false');
  expect(refs.contentRef?.getAttribute('data-slot')).toBe('alert-content');
  expect(refs.descriptionRef?.getAttribute('data-slot')).toBe('alert-description');
  expect(refs.actionsRef?.getAttribute('data-slot')).toBe('alert-actions');
});

test('does not add a live-region role by default', async () => {
  render(PlainAlert, { props: { status: 'error', 'data-testid': 'plain-alert' } });

  await expect.element(page.getByTestId('plain-alert')).toHaveAttribute('data-status', 'error');
  expect(screen.getByTestId('plain-alert').hasAttribute('role')).toBe(false);
});
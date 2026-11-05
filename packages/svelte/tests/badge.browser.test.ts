import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildBadge from './badge/AsChildBadge.svelte';
import ButtonBadge from './badge/ButtonBadge.svelte';
import HooksBadge from './badge/HooksBadge.svelte';
import PartsBadge from './badge/PartsBadge.svelte';
import TestBadge from './badge/TestBadge.svelte';

test('protects variants, accessibility, and stable data hooks', async () => {
  render(HooksBadge);

  await expect.element(page.getByTestId('badge')).toHaveCount(1);
  const badge = screen.getByTestId('badge');
  const dot = screen.getByTestId('dot');

  expect(badge.tagName).toBe('SPAN');
  expect(badge.getAttribute('data-scope')).toBe('badge');
  expect(badge.getAttribute('data-part')).toBe('root');
  expect(badge.getAttribute('data-slot')).toBe('badge-root');
  expect(badge.getAttribute('data-variant')).toBe('secondary');
  expect(dot.getAttribute('data-part')).toBe('dot');
  expect(dot.getAttribute('data-slot')).toBe('badge-dot');
  expect(dot.getAttribute('aria-hidden')).toBe('true');
});

test('forwards attributes, native events, and consumer classes', async () => {
  const state = { clicks: 0 };

  render(TestBadge, {
    props: {
      id: 'release-badge',
      'data-probe': 'root',
      class: 'consumer-class',
      role: 'status',
      onclick: () => {
        state.clicks += 1;
      },
    },
  });

  await expect.element(page.getByRole('status')).toHaveCount(1);
  const badge = screen.getByRole('status');

  expect(badge.getAttribute('id')).toBe('release-badge');
  expect(badge.getAttribute('data-probe')).toBe('root');
  expect(badge.classList.contains('consumer-class')).toBe(true);

  expect(badge.firstElementChild).toBeNull();
  expect(badge.textContent).toContain('Ready for stakeholder review');
  await page.getByRole('status').click();
  expect(state.clicks).toBe(1);
});

test('exposes bound refs for the root and each part', async () => {
  const { component } = render(PartsBadge);

  await expect.element(page.getByText('Production ready')).toHaveCount(1);
  const root = screen.getByText('Production ready').parentElement!;
  const dot = root.querySelector('[data-part="dot"]');
  const label = screen.getByText('Production ready');
  const refs = component.getRefs();

  expect(refs.rootRef).toBe(root);
  expect(refs.dotRef).toBe(dot);
  expect(refs.labelRef).toBe(label);
  expect(label.dataset).toMatchObject({
    scope: 'badge',
    part: 'label',
    slot: 'badge-label',
  });
});

test('preserves semantic asChild hosts and component refs', async () => {
  const { component } = render(AsChildBadge);

  await expect.element(page.getByRole('link', { name: 'Badge styling guidance' })).toHaveCount(1);
  const link = screen.getByRole('link', { name: 'Badge styling guidance' });
  const label = screen.getByText('Open guide');
  const refs = component.getRefs();

  expect(link.tagName).toBe('A');
  expect(link.getAttribute('href')).toBe('#styling');
  expect(link.dataset).toMatchObject({
    slot: 'badge-root',
    variant: 'link',
  });
  expect(refs.rootRef).toBe(link);
  expect(label.tagName).toBe('STRONG');
  expect(label.dataset).toMatchObject({
    scope: 'badge',
    part: 'label',
    slot: 'badge-label',
  });
  expect(refs.labelRef).toBe(label);
});

test('preserves native disabled button semantics with asChild', async () => {
  render(ButtonBadge);

  await expect.element(page.getByRole('button', { name: 'Archived' })).toBeDisabled();
});
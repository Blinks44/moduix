import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildHarness from './breadcrumbs/AsChildHarness.svelte';
import OwnedHarness from './breadcrumbs/OwnedHarness.svelte';
import PathHarness from './breadcrumbs/PathHarness.svelte';
import SnippetPathHarness from './breadcrumbs/SnippetPathHarness.svelte';

test('forwards Path list props and Svelte refs', async () => {
  const { component } = render(PathHarness);

  const navigation = screen.getByRole('navigation', { name: 'Breadcrumb' });
  const list = screen.getByRole('list', { name: 'Current path' });
  const refs = component.getRefs();

  expect(refs.rootRef).toBe(navigation);
  expect(refs.pathRef).toBe(list);
  expect(navigation.dataset).toMatchObject({ probe: 'root', slot: 'breadcrumbs-root' });
  expect(list.getAttribute('data-slot')).toBe('breadcrumbs-list');
  expect(document.querySelector('[data-slot="breadcrumbs-separator"] svg')).not.toBeNull();
  await expect.element(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  await expect.element(page.getByText('Breadcrumbs')).toHaveAttribute('aria-current', 'page');
  expect(
    document.querySelector('[data-slot="breadcrumbs-separator"]')?.getAttribute('aria-hidden'),
  ).toBe('true');
  expect(document.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
});

test('renders snippet values passed through Path props', async () => {
  const { rerender } = render(SnippetPathHarness, { props: { separatorKind: 'custom' } });

  const home = screen.getByText('Home');
  const pageLabel = screen.getByText('Overview');

  expect(home.tagName).toBe('EM');
  expect(home.getAttribute('data-label')).toBe('home');
  expect(pageLabel.tagName).toBe('SPAN');
  await expect.element(page.getByText('Overview')).toHaveAttribute('title', 'Current page detail');
  expect(screen.getByText('·').getAttribute('data-separator')).toBe('custom');

  for (const separatorKind of ['default', 'null'] as const) {
    await rerender({ separatorKind });
    await expect.poll(() => screen.queryByText('·')).toBeNull();
    expect(document.querySelector('[data-slot="breadcrumbs-separator"] svg')).not.toBeNull();
  }
  for (const separatorKind of ['empty', 'zero'] as const) {
    await rerender({ separatorKind });
    const host = document.querySelector('[data-slot="breadcrumbs-separator"]');
    expect(host?.querySelector('svg')).toBeNull();
    expect(host?.textContent?.trim()).toBe(separatorKind === 'zero' ? '0' : '');
    expect(host?.getAttribute('aria-hidden')).toBe('true');
  }
  await rerender({ separatorKind: 'updated' });
  await expect.poll(() => screen.getByText('/').tagName).toBe('STRONG');
  expect(screen.getByText('/').getAttribute('data-separator')).toBe('updated');
});

test('preserves consumer labels and native listeners while keeping owned ARIA attributes', async () => {
  const clicks: MouseEvent[] = [];
  render(OwnedHarness, { props: { onclick: (event: MouseEvent) => clicks.push(event) } });

  await page.getByRole('navigation', { name: 'Project breadcrumbs' }).click();

  expect(clicks).toHaveLength(1);
  await expect.element(page.getByText('Current')).toHaveAttribute('aria-current', 'page');
  expect(
    document.querySelector('[data-slot="breadcrumbs-separator"]')?.getAttribute('aria-hidden'),
  ).toBe('true');
  await expect.element(page.getByText('More')).toHaveAttribute('aria-hidden', 'true');
});

test('keeps the semantic link child with asChild and exposes its host through the Svelte ref', async () => {
  const { component } = render(AsChildHarness);

  const link = screen.getByRole('link', { name: 'Docs' });

  expect(component.getRefs().linkRef).toBe(link);
  await expect.element(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  expect(link.getAttribute('data-slot')).toBe('breadcrumbs-link');
});
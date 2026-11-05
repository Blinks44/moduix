import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import * as typesetExports from '@/components/typeset';
import AsChildTypeset from './typeset/AsChildTypeset.svelte';
import HooksTypeset from './typeset/HooksTypeset.svelte';
import ListenerTypeset from './typeset/ListenerTypeset.svelte';
import ScrollersTypeset from './typeset/ScrollersTypeset.svelte';
import TestTypesetScroll from './typeset/TestTypesetScroll.svelte';

test('renders stable data hooks without allowing consumer overrides', async () => {
  render(HooksTypeset);

  expect(screen.getByTestId('root').dataset).toMatchObject({
    scope: 'typeset',
    part: 'root',
    slot: 'typeset',
  });

  expect(screen.getByTestId('scroll').dataset).toMatchObject({
    scope: 'typeset',
    part: 'scroll',
    slot: 'typeset-scroll',
  });
  await expect.element(page.getByText('Readable content')).toBeAttached();
  expect(typesetExports).not.toHaveProperty('TypesetRoot');
});

test('keeps scrollable content reachable by keyboard by default', async () => {
  render(TestTypesetScroll, {
    props: { 'aria-label': 'Wide comparison table', 'data-testid': 'scroll' },
  });

  const scrollLocator = page.getByTestId('scroll');
  await expect.element(scrollLocator).toHaveAttribute('tabindex', '0');
  await expect.element(scrollLocator).toHaveAttribute('role', 'region');
  await page.getByRole('button', { name: 'Before table' }).click();
  await page.getByRole('button', { name: 'Before table' }).press('Tab');
  await expect.element(scrollLocator).toBeFocused();
});

test('keeps an unnamed scroller generic and preserves explicit semantics', async () => {
  render(ScrollersTypeset);

  await expect.element(page.getByTestId('unnamed-scroll')).not.toHaveAttribute('role');
  await expect.element(page.getByTestId('unnamed-scroll')).toHaveAttribute('tabindex', '0');
  await expect.element(page.getByTestId('custom-scroll')).toHaveAttribute('role', 'group');
  await expect.element(page.getByTestId('custom-scroll')).toHaveAttribute('tabindex', '-1');
});

test('scrolls wide content without a Typeset root', () => {
  render(TestTypesetScroll, { props: { 'data-testid': 'scroll' } });

  const scroll = screen.getByTestId('scroll');
  expect(getComputedStyle(scroll).overflowX).toBe('auto');
});

test('updates native tabindex and named-region semantics with parent props', async () => {
  const { rerender } = render(TestTypesetScroll, { props: { 'data-testid': 'scroll' } });

  const scroll = page.getByTestId('scroll');
  await expect.element(scroll).not.toHaveAttribute('role');
  await expect.element(scroll).toHaveAttribute('tabindex', '0');

  await rerender({ 'aria-label': 'Wide table', tabindex: -1 });
  await expect.element(scroll).toHaveAttribute('role', 'region');
  await expect.element(page.getByRole('region', { name: 'Wide table' })).toBeAttached();
  await expect.element(scroll).toHaveAttribute('tabindex', '-1');

  await rerender({ 'aria-label': undefined, 'aria-labelledby': 'comparison-label', tabindex: 2 });
  await expect.element(scroll).toHaveAttribute('role', 'region');
  await expect.element(page.getByRole('region', { name: 'Comparison table' })).toBeAttached();
  await expect.element(scroll).toHaveAttribute('tabindex', '2');

  await rerender({ role: 'group' });
  await expect.element(scroll).toHaveAttribute('role', 'group');

  await rerender({ role: undefined, 'aria-labelledby': undefined, tabindex: undefined });
  await expect.element(scroll).not.toHaveAttribute('role');
  await expect.element(scroll).not.toHaveAttribute('aria-label');
  await expect.element(scroll).not.toHaveAttribute('aria-labelledby');
  await expect.element(scroll).toHaveAttribute('tabindex', '0');
});

test('forwards native listeners and keeps consumer classes last', async () => {
  const { component } = render(ListenerTypeset);

  const root = screen.getByTestId('root');
  const scroll = screen.getByTestId('scroll');
  await page.getByTestId('root').click();
  await page.getByTestId('scroll').click();

  expect(root.classList.contains('consumer-root')).toBe(true);
  expect(scroll.classList.contains('consumer-scroll')).toBe(true);
  const refs = component.getRefs();
  expect(refs.rootRef).toBe(root);
  expect(refs.scrollRef).toBe(scroll);
  expect(root.style.color).toBe('red');
  expect(root.style.getPropertyValue('--moduix-typeset-flow')).toBe('2em');
  await expect.element(page.getByText('2')).toBeAttached();
});

test('preserves semantic hosts and Svelte refs with asChild', () => {
  const { component } = render(AsChildTypeset);

  const article = screen.getByRole('article');
  const scroll = screen.getByRole('region', { name: 'Wide comparison table' });
  const refs = component.getRefs();

  expect(article.tagName).toBe('ARTICLE');
  expect(refs.rootRef).toBe(article);
  expect(scroll.tagName).toBe('SECTION');
  expect(refs.scrollRef).toBe(scroll);
  expect(article.getAttribute('data-slot')).toBe('typeset');
  expect(scroll.getAttribute('data-slot')).toBe('typeset-scroll');
});
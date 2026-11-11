import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AlignText from './text/AlignText.svelte';
import AsChildText from './text/AsChildText.svelte';
import DefaultsText from './text/DefaultsText.svelte';
import TestText from './text/TestText.svelte';

test.each([false, true])(
  'keeps the host and ref stable between semantic changes, asChild=%s',
  async (asChild) => {
    const { component, rerender } = render(TestText, {
      props: { asChild, title: 'Initial', 'data-testid': 'root' },
    });
    for (const as of ['p', 'span', 'small', 'strong', 'em', 'div'] as const) {
      await rerender({ as });
      const host = screen.getByTestId('root');
      expect(host.tagName).toBe(asChild ? 'SPAN' : as.toUpperCase());
      expect(component.getRef()).toBe(host);
      await rerender({ title: as });
      expect(screen.getByTestId('root')).toBe(host);
      expect(component.getRef()).toBe(host);
      expect(host.getAttribute('title')).toBe(as);
      expect(host.textContent).toContain('Content');
    }
    await rerender({ as: undefined });
    expect(screen.getByTestId('root').tagName).toBe(asChild ? 'SPAN' : 'P');
  },
);

test('renders semantic defaults and stable data hooks', () => {
  render(DefaultsText);

  const text = screen.getByTestId('default');
  expect(text.tagName).toBe('P');
  expect(text.getAttribute('data-scope')).toBe('text');
  expect(text.getAttribute('data-part')).toBe('root');
  expect(text.getAttribute('data-slot')).toBe('text-root');
  expect(text.getAttribute('data-size')).toBe('md');
  expect(text.getAttribute('data-weight')).toBe('regular');
  expect(text.getAttribute('data-tone')).toBe('default');
  expect(screen.getByTestId('small').tagName).toBe('SMALL');
  expect(screen.getByTestId('small').getAttribute('data-size')).toBe('sm');
  expect(screen.getByTestId('strong').tagName).toBe('STRONG');
  expect(screen.getByTestId('strong').getAttribute('data-weight')).toBe('semibold');
  expect(text.getAttribute('data-tone')).toBe('default');
  expect(text.hasAttribute('data-align')).toBe(false);
  expect(text.hasAttribute('data-truncate')).toBe(false);
  expect(text.hasAttribute('data-line-clamp')).toBe(false);
  expect(getComputedStyle(text)).toMatchObject({
    fontSize: '16px',
    fontWeight: '400',
    textAlign: 'start',
    overflowWrap: 'anywhere',
  });
  expect(getComputedStyle(screen.getByTestId('small')).fontSize).toBe('14px');
  expect(getComputedStyle(screen.getByTestId('strong')).fontWeight).toBe('600');
});

test('supports every semantic host and keeps visual props independent', () => {
  for (const as of ['p', 'span', 'small', 'strong', 'em', 'div'] as const) {
    const { unmount } = render(TestText, {
      props: { as, size: 'xl', weight: 'bold', tone: 'muted', align: 'end', label: 'Copy' },
    });
    const text = screen.getByText('Copy');
    expect(text.tagName).toBe(as.toUpperCase());
    expect(text.getAttribute('data-size')).toBe('xl');
    expect(text.getAttribute('data-weight')).toBe('bold');
    expect(text.getAttribute('data-tone')).toBe('muted');
    expect(text.getAttribute('data-align')).toBe('end');
    unmount();
  }
});

test('preserves semantic children and native refs with asChild', () => {
  const { component } = render(AsChildText);
  const link = screen.getByRole('link', { name: 'Read Text guidance' });
  expect(component.getRef()).toBe(link);
  expect(link.getAttribute('href')).toBe('#text');
  expect([...link.classList]).toEqual(expect.arrayContaining(['consumer-text']));
  expect(link.getAttribute('data-slot')).toBe('text-root');
  expect(link.getAttribute('data-tone')).toBe('primary');
  expect(link.getAttribute('data-weight')).toBe('medium');
});

test('forwards native attrs, listeners, classes, and an ordinary host ref once', async () => {
  const handleClick = rs.fn();
  const { component } = render(TestText, {
    props: {
      id: 'body-copy',
      'aria-label': 'Supporting text',
      class: ['consumer-text', { 'active-text': true }],
      style: 'color: red',
      onclick: handleClick,
      label: 'Body copy',
    },
  });
  const text = screen.getByText('Body copy');
  expect(component.getRef()).toBe(text);
  expect(text.getAttribute('id')).toBe('body-copy');
  expect(text.getAttribute('aria-label')).toBe('Supporting text');
  expect([...text.classList]).toEqual(expect.arrayContaining(['consumer-text', 'active-text']));
  expect(text.style.color).toBe('red');
  await page.getByText('Body copy', { exact: true }).click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('uses only positive integer line-clamp values and removes stale clamp styles', async () => {
  const { rerender } = render(TestText, { props: { lineClamp: 2, label: 'Clamped copy' } });
  const text = screen.getByText('Clamped copy');
  expect(text.hasAttribute('data-line-clamp')).toBe(true);
  expect(getComputedStyle(text).webkitLineClamp).toBe('2');
  expect(text.style.webkitLineClamp).toBe('2');
  for (const lineClamp of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, undefined]) {
    await rerender({ lineClamp });
    expect(text.hasAttribute('data-line-clamp')).toBe(false);
    expect(text.style.webkitLineClamp).toBe('');
  }
  await rerender({ lineClamp: 3 });
  expect(text.hasAttribute('data-line-clamp')).toBe(true);
  expect(text.style.webkitLineClamp).toBe('3');
});

test('reacts to semantic and typography prop changes', async () => {
  const { rerender } = render(TestText, { props: { label: 'Reactive copy' } });
  await rerender({ as: 'small', tone: 'muted', align: 'justify', truncate: true });
  let text = screen.getByText('Reactive copy');
  expect(text.tagName).toBe('SMALL');
  expect(text.getAttribute('data-size')).toBe('sm');
  expect(text.getAttribute('data-weight')).toBe('regular');
  expect(text.getAttribute('data-tone')).toBe('muted');
  expect(text.getAttribute('data-align')).toBe('justify');
  expect(text.hasAttribute('data-truncate')).toBe(true);
  await rerender({ as: 'strong', tone: 'destructive', align: undefined, truncate: false });
  text = screen.getByText('Reactive copy');
  expect(text.tagName).toBe('STRONG');
  expect(text.getAttribute('data-size')).toBe('md');
  expect(text.getAttribute('data-weight')).toBe('semibold');
  expect(text.getAttribute('data-tone')).toBe('destructive');
  expect(text.hasAttribute('data-align')).toBe(false);
  expect(text.hasAttribute('data-truncate')).toBe(false);
});

test('inherits the parent alignment unless align is set', () => {
  render(AlignText);
  expect(getComputedStyle(screen.getByText('Inherited copy')).textAlign).toBe('center');
  expect(getComputedStyle(screen.getByText('Aligned copy')).textAlign).toBe('end');
});
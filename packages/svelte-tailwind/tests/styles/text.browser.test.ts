import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
// The shared harness resolves `@/` to this package's source.
import TestText from '../../../svelte/tests/text/TestText.svelte';

test('preserves string styles while required clamp values win', () => {
  render(TestText, {
    props: { lineClamp: 2, style: 'color:red;-webkit-line-clamp:9', label: 'Copy' },
  });
  const text = screen.getByText('Copy');
  expect(text.style.color).toBe('red');
  expect(text.style.webkitLineClamp).toBe('2');
  expect(getComputedStyle(text).webkitLineClamp).toBe('2');
});

test('keeps line clamp effective when truncate is also set', () => {
  render(TestText, { props: { truncate: true, lineClamp: 2, label: 'Clamped copy' } });
  const text = screen.getByText('Clamped copy');
  expect(text.hasAttribute('data-truncate')).toBe(true);
  expect(text.hasAttribute('data-line-clamp')).toBe(true);
  expect(getComputedStyle(text).webkitLineClamp).toBe('2');
  expect(getComputedStyle(text)).toMatchObject({
    overflow: 'hidden',
    whiteSpace: 'normal',
    webkitLineClamp: '2',
  });
});

test('lets consumer utilities override typography defaults', () => {
  render(TestText, {
    props: { class: 'text-center text-xl font-bold text-primary', label: 'Customized copy' },
  });
  const text = screen.getByText('Customized copy');
  expect([...text.classList]).toEqual(
    expect.arrayContaining(['text-xl', 'font-bold', 'text-primary', 'text-center']),
  );
  expect(getComputedStyle(text)).toMatchObject({
    fontSize: '20px',
    fontWeight: '700',
    textAlign: 'center',
  });
});
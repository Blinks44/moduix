import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Text } from '@/index';

test('uses only positive integer line-clamp values', async () => {
  const [lineClamp, setLineClamp] = createSignal(2);
  render(() => <Text lineClamp={lineClamp()}>Clamped copy</Text>);
  const text = screen.getByText('Clamped copy');

  expect(text.hasAttribute('data-line-clamp')).toBe(true);
  expect(getComputedStyle(text).webkitLineClamp).toBe('2');
  expect(text.style.webkitLineClamp).toBe('2');

  setLineClamp(0);
  await expect.poll(() => text.hasAttribute('data-line-clamp')).toBe(false);

  setLineClamp(1.5);
  await expect.poll(() => text.hasAttribute('data-line-clamp')).toBe(false);
});

test('keeps line clamp effective when truncate is also set', () => {
  render(() => (
    <Text truncate lineClamp={2}>
      Clamped and truncated copy
    </Text>
  ));

  const text = screen.getByText('Clamped and truncated copy');

  expect(text.hasAttribute('data-truncate')).toBe(true);
  expect(text.hasAttribute('data-line-clamp')).toBe(true);
  expect(getComputedStyle(text)).toMatchObject({
    overflow: 'hidden',
    whiteSpace: 'normal',
    webkitLineClamp: '2',
  });
});
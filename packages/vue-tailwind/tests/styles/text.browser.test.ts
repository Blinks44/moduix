import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Text } from '@/components/text';

test('preserves string, object, and array styles while required clamp values win', () => {
  for (const style of [
    'color:red;-webkit-line-clamp:9',
    { color: 'red', '-webkit-line-clamp': 9 },
    ['color:red', { '-webkit-line-clamp': 9 }],
  ]) {
    const { unmount } = render(Text, {
      props: { lineClamp: 2, style },
      slots: { default: () => 'Copy' },
    });
    const text = screen.getByText('Copy');
    expect(text.style.color).toBe('red');
    expect(text.style.webkitLineClamp).toBe('2');
    expect(getComputedStyle(text).webkitLineClamp).toBe('2');
    unmount();
  }
});

test('keeps line clamp effective when truncate is also set', () => {
  render(Text, {
    props: { truncate: true, lineClamp: 2 },
    slots: { default: () => 'Clamped copy' },
  });
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
  render(Text, {
    props: { class: 'text-center text-xl font-bold text-primary' },
    slots: { default: () => 'Customized copy' },
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
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import type { JSX } from 'solid-js';
import { Text } from '../src';

test('renders semantic defaults and stable data hooks', () => {
  render(() => (
    <>
      <Text
        data-testid="default"
        data-align="end"
        data-line-clamp=""
        data-part="custom-part"
        data-scope="custom-scope"
        data-size="xs"
        data-slot="custom-slot"
        data-tone="primary"
        data-truncate=""
        data-weight="bold"
      >
        Body copy
      </Text>
      <Text as="small" data-testid="small">
        Supporting copy
      </Text>
      <Text as="strong" data-testid="strong">
        Important copy
      </Text>
    </>
  ));

  const defaultText = screen.getByTestId('default');
  const small = screen.getByTestId('small');
  const strong = screen.getByTestId('strong');

  expect(defaultText.tagName).toBe('P');
  expect(defaultText.getAttribute('data-scope')).toBe('text');
  expect(defaultText.getAttribute('data-part')).toBe('root');
  expect(defaultText.getAttribute('data-slot')).toBe('text-root');
  expect(defaultText.getAttribute('data-size')).toBe('md');
  expect(defaultText.getAttribute('data-weight')).toBe('regular');
  expect(small.getAttribute('data-size')).toBe('sm');
  expect(strong.getAttribute('data-weight')).toBe('semibold');
  expect(defaultText.getAttribute('data-tone')).toBe('default');
  expect(defaultText.hasAttribute('data-align')).toBe(false);
  expect(defaultText.hasAttribute('data-truncate')).toBe(false);
  expect(defaultText.hasAttribute('data-line-clamp')).toBe(false);
  expect(getComputedStyle(defaultText)).toMatchObject({
    fontSize: '16px',
    fontWeight: '400',
    textAlign: 'start',
    overflowWrap: 'anywhere',
  });
  expect(getComputedStyle(screen.getByTestId('small')).fontSize).toBe('14px');
  expect(getComputedStyle(screen.getByTestId('strong')).fontWeight).toBe('600');
});

test('preserves semantic children and refs with asChild', () => {
  let ref!: HTMLAnchorElement;

  render(() => (
    <Text
      tone="primary"
      weight="medium"
      asChild={(props) => (
        <a {...props()} ref={(element) => (ref = element)} href="#text">
          Read Text guidance
        </a>
      )}
    />
  ));

  const link = screen.getByRole('link', { name: 'Read Text guidance' });

  expect(ref).toBe(link);
  expect(link.getAttribute('href')).toBe('#text');
  expect(link.getAttribute('data-slot')).toBe('text-root');
  expect(link.getAttribute('data-tone')).toBe('primary');
  expect(link.getAttribute('data-weight')).toBe('medium');
});

test('uses only positive integer line-clamp values', async () => {
  const [lineClamp, setLineClamp] = createSignal(2);
  render(() => <Text lineClamp={lineClamp()}>Clamped copy</Text>);
  const text = screen.getByText('Clamped copy');

  expect(text.hasAttribute('data-line-clamp')).toBe(true);
  expect(getComputedStyle(text).webkitLineClamp).toBe('2');
  expect(text.style.getPropertyValue('--_text-line-clamp')).toBe('2');

  setLineClamp(0);
  await expect.poll(() => text.hasAttribute('data-line-clamp')).toBe(false);

  setLineClamp(1.5);
  await expect.poll(() => text.hasAttribute('data-line-clamp')).toBe(false);
});

test('keeps the public line-clamp variable available as an override', () => {
  render(() => (
    <Text lineClamp={2} style={{ '--moduix-text-line-clamp': 3 } as JSX.CSSProperties}>
      The public CSS variable takes precedence over the prop fallback.
    </Text>
  ));

  expect(
    screen
      .getByText('The public CSS variable takes precedence over the prop fallback.')
      .style.getPropertyValue('--_text-line-clamp'),
  ).toBe('2');
  expect(
    screen
      .getByText('The public CSS variable takes precedence over the prop fallback.')
      .style.getPropertyValue('--moduix-text-line-clamp'),
  ).toBe('3');
  expect(
    getComputedStyle(
      screen.getByText('The public CSS variable takes precedence over the prop fallback.'),
    ).webkitLineClamp,
  ).toBe('3');
});
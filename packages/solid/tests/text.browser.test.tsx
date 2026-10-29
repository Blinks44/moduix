import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Text } from '@/index';

test('renders semantic defaults and stable data hooks', () => {
  render(() => (
    <>
      <Text
        data-testid="default"
        data-part="custom-part"
        data-scope="custom-scope"
        data-size="xs"
        data-slot="custom-slot"
        data-tone="primary"
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

test('inherits the parent alignment unless align is set', () => {
  render(() => (
    <div style={{ 'text-align': 'center' }}>
      <Text>Inherited copy</Text>
      <Text align="end">Aligned copy</Text>
    </div>
  ));

  expect(getComputedStyle(screen.getByText('Inherited copy')).textAlign).toBe('center');
  expect(getComputedStyle(screen.getByText('Aligned copy')).textAlign).toBe('end');
});
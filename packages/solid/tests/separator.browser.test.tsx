import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Separator } from '../src';

test('keeps ARIA metadata and stable data hooks aligned with public props', async () => {
  render(() => (
    <Separator
      aria-orientation="vertical"
      data-testid="separator"
      data-orientation="vertical"
      data-part="custom"
      data-scope="custom"
      data-size="xs"
      data-slot="custom"
      data-variant="solid"
      orientation="horizontal"
      size="lg"
      variant="dotted"
    />
  ));

  await expect.element(page.getByTestId('separator')).toHaveCount(1);
  const separator = screen.getByTestId('separator');

  expect(separator.getAttribute('role')).toBe('separator');
  expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
  expect(separator.dataset).toMatchObject({
    scope: 'separator',
    part: 'root',
    slot: 'separator-root',
    orientation: 'horizontal',
    size: 'lg',
    variant: 'dotted',
  });
});

test('applies the public defaults and direct styling props', async () => {
  let rootRef: HTMLSpanElement | undefined;
  render(() => (
    <Separator
      ref={(element) => (rootRef = element)}
      data-testid="separator"
      class="custom-separator"
      style={{ color: 'red' }}
    />
  ));

  await expect.element(page.getByTestId('separator')).toHaveCount(1);
  const separator = screen.getByTestId('separator');
  expect(rootRef).toBe(separator);

  expect(separator.getAttribute('role')).toBe('separator');
  expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
  expect(separator.dataset).toMatchObject({
    orientation: 'horizontal',
    size: 'sm',
    variant: 'solid',
  });
  expect(separator.classList.contains('custom-separator')).toBe(true);
  expect(separator.style).toMatchObject({ color: 'red' });
});

test('supports decorative separators and semantic asChild hosts', async () => {
  let rootRef: HTMLSpanElement | undefined;
  render(() => (
    <>
      <Separator data-testid="decorative" role="presentation" aria-orientation="vertical" />
      <Separator
        ref={(element) => (rootRef = element)}
        data-testid="native-rule"
        asChild={(props) => <hr {...props()} />}
      />
    </>
  ));
  await expect.element(page.getByTestId('native-rule')).toHaveCount(1);
  const decorative = screen.getByTestId('decorative');
  const nativeRule = screen.getByTestId('native-rule');
  expect(decorative.getAttribute('role')).toBe('presentation');
  expect(decorative.hasAttribute('aria-orientation')).toBe(false);
  expect(rootRef).toBeUndefined();
  expect(nativeRule.getAttribute('data-slot')).toBe('separator-root');
});
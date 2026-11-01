import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Separator } from '@/index';

test('keeps ARIA metadata and stable data hooks aligned with public props', async () => {
  render(
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
    />,
  );

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

test('supports decorative separators and semantic asChild hosts', async () => {
  const ref = createRef<HTMLSpanElement>();

  render(
    <>
      <Separator data-testid="decorative" role="presentation" aria-orientation="vertical" />
      <Separator ref={ref} asChild>
        <hr data-testid="native-rule" />
      </Separator>
    </>,
  );

  await expect.element(page.getByTestId('decorative')).toHaveCount(1);
  const decorative = screen.getByTestId('decorative');
  const nativeRule = screen.getByTestId('native-rule');

  expect(decorative.getAttribute('role')).toBe('presentation');
  expect(decorative.hasAttribute('aria-orientation')).toBe(false);
  expect(ref.current).toBe(nativeRule);
  expect(nativeRule.getAttribute('data-slot')).toBe('separator-root');
});
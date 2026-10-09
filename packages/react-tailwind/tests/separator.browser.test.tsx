import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Separator } from '../src';

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

test('allows consumer utilities to replace selected defaults', async () => {
  render(<Separator data-testid="separator" className="w-32 border-t-2 border-primary" />);

  await expect.element(page.getByTestId('separator')).toHaveCount(1);
  const separator = screen.getByTestId('separator');

  expect([...separator.classList]).toEqual(
    expect.arrayContaining(['w-32', 'border-primary', 'border-t-2']),
  );
  for (const className of ['w-full', 'border-border', 'border-t']) {
    expect(separator.classList.contains(className)).toBe(false);
  }
  await expect.element(page.getByTestId('separator')).toHaveCSS('width', '128px');
  await expect.element(page.getByTestId('separator')).toHaveCSS('border-top-width', '2px');
});

test('applies the public defaults and direct styling props', async () => {
  render(
    <Separator data-testid="separator" className="custom-separator" style={{ color: 'red' }} />,
  );

  await expect.element(page.getByTestId('separator')).toHaveCount(1);
  const separator = screen.getByTestId('separator');

  expect(separator.getAttribute('role')).toBe('separator');
  expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
  expect(separator.dataset).toMatchObject({
    orientation: 'horizontal',
    size: 'sm',
    variant: 'solid',
  });
  expect(separator.classList.contains('custom-separator')).toBe(true);
  expect(separator.style).toMatchObject({ color: 'red' });
  await expect.element(page.getByTestId('separator')).toHaveCSS('display', 'block');
  await expect.element(page.getByTestId('separator')).toHaveCSS('border-top-width', '1px');
  await expect.element(page.getByTestId('separator')).toHaveCSS('border-top-style', 'solid');
  await expect.element(page.getByTestId('separator')).toHaveCSS('margin', '0px');
  await expect.element(page.getByTestId('separator')).toHaveCSS('flex-shrink', '0');
  expect(separator.getBoundingClientRect().width).toBe(separator.parentElement!.clientWidth);
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
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Stack } from '@/index';

test('reads spacing steps from the spacing tokens', () => {
  render(
    <>
      <Stack gap="2" data-testid="step" />
      <Stack gap="1.5" data-testid="half-step" />
      <Stack gap="2rem" data-testid="length" />
    </>,
  );

  expect(screen.getByTestId('step').style.gap).toBe('var(--moduix-spacing-2)');
  expect(screen.getByTestId('half-step').style.gap).toBe('var(--moduix-spacing-1-5)');
  expect(screen.getByTestId('length').style.gap).toBe('2rem');
});

test('does not pass direction or fill to nested roots', () => {
  render(
    <Stack direction="row" fill data-testid="outer">
      <Stack data-testid="inner" />
    </Stack>,
  );

  const inner = screen.getByTestId('inner');

  expect(getComputedStyle(inner).flexDirection).toBe('column');
  expect(getComputedStyle(inner).flexGrow).toBe('0');
});

test('forwards an HTMLElement ref and merges root props onto an asChild element', () => {
  const ref = createRef<HTMLElement>();

  render(
    <Stack asChild ref={ref} gap={12} className="stack-class">
      <section aria-label="Project updates" className="section-class" style={{ color: 'red' }} />
    </Stack>,
  );

  const section = screen.getByRole('region', { name: 'Project updates' });

  expect(ref.current).toBe(section);
  expect(section.style.gap).toBe('12px');
  expect([...section.classList]).toEqual(expect.arrayContaining(['section-class', 'stack-class']));
  expect(section.style).toMatchObject({ color: 'red' });
  expect(section.getAttribute('data-slot')).toBe('stack-root');
});
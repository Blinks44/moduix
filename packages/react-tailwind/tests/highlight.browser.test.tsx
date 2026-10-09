import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { Highlight } from '../src';

const hasRootRef: 'ref' extends keyof ComponentProps<typeof Highlight> ? true : false = false;

test('renders matched text as styled marks without a wrapper', () => {
  expect(hasRootRef).toBe(false);
  const { container } = render(
    <Highlight
      className="custom-highlight"
      data-part="consumer-part"
      data-scope="consumer-scope"
      data-slot="consumer-slot"
      data-testid="highlight"
      query="component"
      text="Each component is tested before a component release."
      title="Matched query"
    />,
  );

  const mark = screen.getByTestId('highlight');

  expect(container.childNodes).toHaveLength(3);
  expect(mark.tagName).toBe('MARK');
  expect(mark.textContent).toBe('component');
  expect([...mark.classList]).toEqual(expect.arrayContaining(['custom-highlight']));
  expect(mark.getAttribute('data-scope')).toBe('highlight');
  expect(mark.getAttribute('data-part')).toBe('root');
  expect(mark.getAttribute('data-slot')).toBe('highlight-root');
  expect(mark.getAttribute('title')).toBe('Matched query');
  expect([...screen.getByTestId('highlight')!.classList]).toEqual(
    expect.arrayContaining([
      'px-1',
      'py-px',
      'rounded-xs',
      'bg-[color-mix(in_oklab,var(--color-warning)_40%,var(--color-accent))]',
      'font-medium',
      'text-foreground',
      'no-underline',
      'shadow-none',
      'box-decoration-clone',
    ]),
  );
});

test('keeps unmatched text plain and renders no mark', () => {
  const { container } = render(<Highlight query="missing" text="No highlighted value." />);

  expect(container.textContent).toBe('No highlighted value.');
  expect(container.querySelector('mark')).toBeNull();
});

test('uses the first string match by default and every match when requested', async () => {
  const { rerender } = render(<Highlight query="component" text="component component" />);

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['component']);

  rerender(<Highlight matchAll query="component" text="component component" />);

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['component', 'component']);
});

test('enables all matches for string-array queries', async () => {
  render(<Highlight query={['React', 'Vue']} text="React Vue React" />);

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['React', 'Vue', 'React']);
});

test('rejects string-array queries when matchAll is false', () => {
  expect(() => {
    render(<Highlight matchAll={false} query={['React', 'Vue']} text="React Vue" />);
  }).toThrow('matchAll must be true when using multiple queries');
});

test('preserves Ark case-insensitive and exact Latin matching', async () => {
  const { rerender } = render(
    <Highlight ignoreCase matchAll query="typescript" text="TypeScript typescript" />,
  );

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['TypeScript', 'typescript']);

  rerender(<Highlight exactMatch matchAll query="box" text="box checkbox box" />);

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['box', 'box']);
});

test('lets consumer utilities replace conflicting defaults', async () => {
  render(
    <Highlight
      className="rounded-none bg-primary px-4 py-2 font-bold text-primary"
      data-testid="highlight"
      query="text"
      text="Highlight text"
    />,
  );

  const mark = screen.getByTestId('highlight');

  expect([...mark.classList]).toEqual(
    expect.arrayContaining([
      'px-4',
      'py-2',
      'rounded-none',
      'bg-primary',
      'font-bold',
      'text-primary',
    ]),
  );
  expect(
    [
      'px-1',
      'py-px',
      'rounded-xs',
      'bg-[color-mix(in_oklab,var(--color-warning)_40%,var(--color-accent))]',
      'font-medium',
      'text-foreground',
    ].some((name) => mark.classList.contains(name)),
  ).toBe(false);
  await expect.element(page.getByTestId('highlight')).toHaveCSS('padding', '8px 16px');
  await expect.element(page.getByTestId('highlight')).toHaveCSS('border-radius', '0px');
  await expect.element(page.getByTestId('highlight')).toHaveCSS('font-weight', '700');
});
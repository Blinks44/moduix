import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Highlight } from '../src';

test('renders matched text as styled marks without a wrapper', () => {
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
  expect(mark).toHaveTextContent('component');
  expect(mark).toHaveClass('custom-highlight');
  expect(mark).toHaveAttribute('data-scope', 'highlight');
  expect(mark).toHaveAttribute('data-part', 'root');
  expect(mark).toHaveAttribute('data-slot', 'highlight-root');
  expect(mark).toHaveAttribute('title', 'Matched query');
});

test('keeps unmatched text plain and renders no mark', () => {
  const { container } = render(<Highlight query="missing" text="No highlighted value." />);

  expect(container).toHaveTextContent('No highlighted value.');
  expect(container.querySelector('mark')).toBeNull();
});

test('uses the first string match by default and every match when requested', () => {
  const { rerender } = render(<Highlight query="component" text="component component" />);

  expect(screen.getAllByText('component', { selector: 'mark' })).toHaveLength(1);

  rerender(<Highlight matchAll query="component" text="component component" />);

  expect(screen.getAllByText('component', { selector: 'mark' })).toHaveLength(2);
});

test('enables all matches for string-array queries', () => {
  render(<Highlight query={['React', 'Vue']} text="React Vue React" />);

  expect(screen.getAllByText(/React|Vue/, { selector: 'mark' })).toHaveLength(3);
});

test('rejects string-array queries when matchAll is false', () => {
  expect(() => {
    render(<Highlight matchAll={false} query={['React', 'Vue']} text="React Vue" />);
  }).toThrow('matchAll must be true when using multiple queries');
});

test('preserves Ark case-insensitive and exact Latin matching', () => {
  const { rerender } = render(
    <Highlight ignoreCase matchAll query="typescript" text="TypeScript typescript" />,
  );

  expect(screen.getAllByText(/typescript/i, { selector: 'mark' })).toHaveLength(2);

  rerender(<Highlight exactMatch matchAll query="box" text="box checkbox box" />);

  expect(screen.getAllByText('box', { selector: 'mark' })).toHaveLength(2);
});

test('applies the component-owned Tailwind defaults', () => {
  render(<Highlight data-testid="highlight" query="text" text="Highlight text" />);

  expect(screen.getByTestId('highlight')).toHaveClass(
    'px-1',
    'py-px',
    'rounded-xs',
    'bg-[color-mix(in_oklab,var(--color-warning)_40%,var(--color-accent))]',
    'font-medium',
    'text-foreground',
    'no-underline',
    'shadow-none',
    '[box-decoration-break:clone]',
    '[-webkit-box-decoration-break:clone]',
  );
});

test('lets consumer utilities replace conflicting defaults', () => {
  render(
    <Highlight
      className="rounded-none bg-primary px-4 py-2 font-bold text-primary"
      data-testid="highlight"
      query="text"
      text="Highlight text"
    />,
  );

  const mark = screen.getByTestId('highlight');

  expect(mark).toHaveClass(
    'px-4',
    'py-2',
    'rounded-none',
    'bg-primary',
    'font-bold',
    'text-primary',
  );
  expect(mark).not.toHaveClass(
    'px-1',
    'py-px',
    'rounded-xs',
    'bg-[color-mix(in_oklab,var(--color-warning)_40%,var(--color-accent))]',
    'font-medium',
    'text-foreground',
  );
});
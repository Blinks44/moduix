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
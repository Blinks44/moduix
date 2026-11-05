import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import * as highlightExports from '@/components/highlight';
import { Highlight } from '@/components/highlight';
import ReactiveHighlight from './highlight/ReactiveHighlight.svelte';

const markTexts = () => [...document.querySelectorAll('mark')].map((mark) => mark.textContent);

test('exports a flat root without compound aliases', () => {
  expect(highlightExports).not.toHaveProperty('HighlightRoot');
  expect(Highlight).not.toHaveProperty('Root');
});

test('renders matched text as styled marks without a wrapper', () => {
  const { container } = render(Highlight, {
    props: {
      class: 'custom-highlight',
      'data-part': 'consumer-part',
      'data-scope': 'consumer-scope',
      'data-slot': 'consumer-slot',
      'data-testid': 'highlight',
      query: 'component',
      text: 'Each component is tested before a component release.',
      title: 'Matched query',
    },
  });

  const mark = screen.getByTestId('highlight');

  expect(mark.parentElement).toBe(container);
  expect(container.querySelectorAll('mark')).toHaveLength(1);
  expect(mark.tagName).toBe('MARK');
  expect(mark.textContent).toBe('component');
  expect([...mark.classList]).toEqual(expect.arrayContaining(['custom-highlight']));
  expect(mark.getAttribute('data-scope')).toBe('highlight');
  expect(mark.getAttribute('data-part')).toBe('root');
  expect(mark.getAttribute('data-slot')).toBe('highlight-root');
  expect(mark.getAttribute('title')).toBe('Matched query');
});

test('keeps unmatched text plain and renders no mark', () => {
  const { container } = render(Highlight, {
    props: { query: 'missing', text: 'No highlighted value.' },
  });

  expect(container.textContent).toBe('No highlighted value.');
  expect(container.querySelector('mark')).toBeNull();
});

test('uses the first string match by default and every match when requested', async () => {
  const { rerender } = render(Highlight, {
    props: { matchAll: false, query: 'component', text: 'component component' },
  });

  await expect.poll(markTexts).toEqual(['component']);

  await rerender({ matchAll: true });

  await expect.poll(markTexts).toEqual(['component', 'component']);
});

test('enables all matches for string-array queries', async () => {
  render(Highlight, {
    props: { query: ['React', 'Vue'], text: 'React Vue React' },
  });

  await expect.poll(markTexts).toEqual(['React', 'Vue', 'React']);
});

test('rejects string-array queries when matchAll is false', () => {
  expect(() => {
    render(Highlight, {
      props: { matchAll: false, query: ['React', 'Vue'], text: 'React Vue' },
    });
  }).toThrow('matchAll must be true when using multiple queries');
});

test('preserves Ark case-insensitive and exact Latin matching', async () => {
  const { rerender } = render(Highlight, {
    props: {
      ignoreCase: true,
      matchAll: true,
      query: 'typescript',
      text: 'TypeScript typescript',
    },
  });

  await expect.poll(markTexts).toEqual(['TypeScript', 'typescript']);

  await rerender({
    exactMatch: true,
    ignoreCase: undefined,
    matchAll: true,
    query: 'box',
    text: 'box checkbox box',
  });

  await expect.poll(markTexts).toEqual(['box', 'box']);
});

test('keeps Boolean options and source text reactive', async () => {
  const { container, rerender } = render(ReactiveHighlight, {
    props: { text: 'BOX checkbox box' },
  });
  expect([...container.querySelectorAll('mark')].map((mark) => mark.textContent)).toEqual([
    'BOX',
    'box',
  ]);
  await rerender({ text: 'box box' });
  expect([...container.querySelectorAll('mark')].map((mark) => mark.textContent)).toEqual([
    'box',
    'box',
  ]);
});
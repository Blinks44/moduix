import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Highlight } from '../src';

test('renders matched text as styled marks without a wrapper', () => {
  const { container } = render(() => (
    <Highlight
      class="custom-highlight"
      data-part="consumer-part"
      data-scope="consumer-scope"
      data-slot="consumer-slot"
      data-testid="highlight"
      query="component"
      text="Each component is tested before a component release."
      title="Matched query"
    />
  ));

  const mark = screen.getByTestId('highlight');

  expect(container.childNodes).toHaveLength(3);
  expect(mark.tagName).toBe('MARK');
  expect(mark.textContent).toBe('component');
  expect([...mark.classList]).toEqual(expect.arrayContaining(['custom-highlight']));
  expect(mark.getAttribute('data-scope')).toBe('highlight');
  expect(mark.getAttribute('data-part')).toBe('root');
  expect(mark.getAttribute('data-slot')).toBe('highlight-root');
  expect(mark.getAttribute('title')).toBe('Matched query');
});

test('keeps unmatched text plain and renders no mark', () => {
  const { container } = render(() => <Highlight query="missing" text="No highlighted value." />);

  expect(container.textContent).toBe('No highlighted value.');
  expect(container.querySelector('mark')).toBeNull();
});

test('uses the first string match by default and every match when requested', async () => {
  const [matchAll, setMatchAll] = createSignal(false);

  render(() => <Highlight matchAll={matchAll()} query="component" text="component component" />);

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['component']);

  setMatchAll(true);

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['component', 'component']);
});

test('enables all matches for string-array queries', async () => {
  render(() => <Highlight query={['React', 'Vue']} text="React Vue React" />);

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['React', 'Vue', 'React']);
});

test('rejects string-array queries when matchAll is false', () => {
  expect(() => {
    render(() => <Highlight matchAll={false} query={['React', 'Vue']} text="React Vue" />);
  }).toThrow('matchAll must be true when using multiple queries');
});

test('preserves Ark case-insensitive and exact Latin matching', async () => {
  const [exactMatch, setExactMatch] = createSignal(false);
  const [query, setQuery] = createSignal<string | string[]>('typescript');
  const [text, setText] = createSignal('TypeScript typescript');

  render(() => (
    <Highlight
      exactMatch={exactMatch()}
      ignoreCase={!exactMatch()}
      matchAll
      query={query()}
      text={text()}
    />
  ));

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['TypeScript', 'typescript']);

  setExactMatch(true);
  setQuery('box');
  setText('box checkbox box');

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['box', 'box']);
});
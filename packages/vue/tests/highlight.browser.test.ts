import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import { Highlight } from '../src';
import SsrHighlight from './fixtures/SsrHighlight.vue';

test('exports a flat root without compound aliases', () => {
  expect(Highlight).not.toHaveProperty('Root');
});

test('renders matched text as styled marks without a wrapper', () => {
  const { container } = render({
    components: { Highlight },
    template: `
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
    `,
  });

  const mark = screen.getByTestId('highlight');

  expect(container.children).toHaveLength(1);
  expect(mark.parentElement).toBe(container);
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
  const matchAll = ref(false);
  render({
    components: { Highlight },
    setup: () => ({ matchAll }),
    template: '<Highlight :match-all="matchAll" query="component" text="component component" />',
  });

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['component']);

  matchAll.value = true;
  await nextTick();

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['component', 'component']);
});

test('enables all matches for string-array queries', async () => {
  render(Highlight, {
    props: { query: ['React', 'Vue'], text: 'React Vue React' },
  });

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['React', 'Vue', 'React']);
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

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['TypeScript', 'typescript']);

  await rerender({
    exactMatch: true,
    ignoreCase: undefined,
    matchAll: true,
    query: 'box',
    text: 'box checkbox box',
  });

  await expect
    .poll(() => [...document.querySelectorAll('mark')].map((mark) => mark.textContent))
    .toEqual(['box', 'box']);
});

test('forwards mark attrs and native listeners to every matched segment', async () => {
  let clicks = 0;
  render({
    components: { Highlight },
    setup: () => ({ handleClick: () => clicks++ }),
    template: `
      <Highlight
        class="custom-highlight"
        data-testid="highlight"
        match-all
        query="component"
        text="component component"
        title="Matched query"
        style="color: red"
        @click="handleClick"
      />
    `,
  });

  const marks = screen.getAllByTestId('highlight');

  expect(marks).toHaveLength(2);
  for (const [index, mark] of marks.entries()) {
    expect([...mark.classList]).toEqual(expect.arrayContaining(['custom-highlight']));
    expect(mark.getAttribute('title')).toBe('Matched query');
    expect(getComputedStyle(mark).color).toBe('rgb(255, 0, 0)');
    await page.getByTestId('highlight').nth(index).click();
  }
  expect(clicks).toBe(2);
});

test('hydrates highlight without replacing hosts or IDs', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrHighlight));
  document.body.append(host);
  const nodes = [...host.querySelectorAll('mark')];
  const ids = [...host.querySelectorAll('[id]')].map((node) => node.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrHighlight);
  try {
    app.mount(host);
    await nextTick();
    const hydrated = [...host.querySelectorAll('mark')];
    expect(hydrated).toHaveLength(nodes.length);
    hydrated.forEach((node, index) => expect(node).toBe(nodes[index]));
    expect([...host.querySelectorAll('[id]')].map((node) => node.id)).toEqual(ids);
    expect(hydrated[0]?.getAttribute('data-probe')).toBe('highlight');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('keeps bare Boolean options and source text reactive', async () => {
  const text = ref('BOX checkbox box');
  const { container } = render(
    defineComponent({
      components: { Highlight },
      setup: () => ({ text }),
      template: '<Highlight ignore-case exact-match match-all query="box" :text="text" />',
    }),
  );
  expect([...container.querySelectorAll('mark')].map((mark) => mark.textContent)).toEqual([
    'BOX',
    'box',
  ]);
  text.value = 'box box';
  await nextTick();
  expect([...container.querySelectorAll('mark')].map((mark) => mark.textContent)).toEqual([
    'box',
    'box',
  ]);
});
import { Highlight as ArkHighlight } from '@ark-ui/vue/highlight';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import { Highlight } from '../src';

test('exports a flat root without compound aliases', () => {
  expect(Highlight).not.toHaveProperty('Root');
});

// Ark Vue 5.39.2 drops attrs on its fragment. Re-enable after the upstream fix.
test.skip('renders matched text as styled marks without a wrapper', () => {
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
  expect(mark).toHaveTextContent('component');
  expect(mark).toHaveClass('custom-highlight');
  expect(mark).toHaveAttribute('data-scope', 'highlight');
  expect(mark).toHaveAttribute('data-part', 'root');
  expect(mark).toHaveAttribute('data-slot', 'highlight-root');
  expect(mark).toHaveAttribute('title', 'Matched query');
});

test('keeps unmatched text plain and renders no mark', () => {
  const { container } = render(Highlight, {
    props: { query: 'missing', text: 'No highlighted value.' },
  });

  expect(container).toHaveTextContent('No highlighted value.');
  expect(container.querySelector('mark')).toBeNull();
});

test('uses the first string match by default and every match when requested', async () => {
  const matchAll = ref(false);
  const Harness = defineComponent({
    components: { Highlight },
    setup: () => ({ matchAll }),
    template: '<Highlight :match-all="matchAll" query="component" text="component component" />',
  });

  render(Harness);

  expect(screen.getAllByText('component', { selector: 'mark' })).toHaveLength(1);

  matchAll.value = true;
  await nextTick();

  expect(screen.getAllByText('component', { selector: 'mark' })).toHaveLength(2);
});

test('enables all matches for string-array queries', () => {
  render(Highlight, {
    props: { query: ['React', 'Vue'], text: 'React Vue React' },
  });

  expect(screen.getAllByText(/React|Vue/, { selector: 'mark' })).toHaveLength(3);
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

  expect(screen.getAllByText(/typescript/i, { selector: 'mark' })).toHaveLength(2);

  await rerender({
    exactMatch: true,
    ignoreCase: undefined,
    matchAll: true,
    query: 'box',
    text: 'box checkbox box',
  });

  expect(screen.getAllByText('box', { selector: 'mark' })).toHaveLength(2);
});

test.skip('forwards mark attrs and native listeners to every matched segment', async () => {
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
  for (const mark of marks) {
    expect(mark).toHaveClass('custom-highlight');
    expect(mark).toHaveAttribute('title', 'Matched query');
    expect(mark).toHaveStyle({ color: 'red' });
    await fireEvent.click(mark);
  }
  expect(clicks).toBe(2);
});

test.skip('renders and hydrates the fragment anatomy without replacing marks', async () => {
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const App = defineComponent({
    components: { Highlight },
    template: `
      <Highlight
        match-all
        query="component"
        text="component component"
        data-probe="highlight"
      />
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<mark');
  expect(html).toContain('data-slot="highlight-root"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverMarks = [...host.querySelectorAll('mark')];
  const app = createSSRApp(App);
  app.mount(host);
  await nextTick();

  const hydratedMarks = [...host.querySelectorAll('mark')];
  expect(hydratedMarks).toHaveLength(serverMarks.length);
  hydratedMarks.forEach((mark, index) => expect(mark).toBe(serverMarks[index]));
  expect(hydratedMarks[0]).toHaveAttribute('data-probe', 'highlight');
  expect(warn).not.toHaveBeenCalled();
  expect(error).not.toHaveBeenCalled();

  app.unmount();
  host.remove();
  warn.mockRestore();
  error.mockRestore();
});

test.each([
  ['Ark', ArkHighlight],
  ['moduix', Highlight],
])('%s keeps the bare Boolean options and reactive source text', async (_name, Root) => {
  const text = ref('BOX checkbox box');
  const { container } = render(
    defineComponent({
      components: { Root },
      setup: () => ({ text }),
      template: '<Root ignore-case exact-match match-all query="box" :text="text" />',
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

// Direct Ark reproduction: matching succeeds but mark attrs/listeners are lost.
test.skip('upstream Highlight forwards mark attributes and listeners', async () => {
  const handleClick = rs.fn();
  const { container } = render(ArkHighlight, {
    props: { text: 'text', query: 'text' },
    attrs: { class: 'consumer', title: 'Matched query', onClick: handleClick },
  });
  const mark = container.querySelector('mark');
  expect(mark).toHaveClass('consumer');
  expect(mark).toHaveAttribute('title', 'Matched query');
  await fireEvent.click(mark!);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
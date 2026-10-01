import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Typeset, TypesetScroll } from '../src/components/typeset';

const typesetComponents = { Typeset, TypesetScroll };

test('renders stable data hooks without allowing consumer overrides', () => {
  render({
    components: typesetComponents,
    template: `
      <Typeset
        data-part="overridden-root"
        data-scope="overridden"
        data-slot="overridden-root"
        data-testid="root"
      >
        <p>Readable content</p>
      </Typeset>
      <TypesetScroll
        data-part="overridden-scroll"
        data-scope="overridden"
        data-slot="overridden-scroll"
        data-testid="scroll"
      >
        <table>
          <tbody>
            <tr><td>Wide content</td></tr>
          </tbody>
        </table>
      </TypesetScroll>
    `,
  });

  const root = screen.getByTestId('root');
  const scroll = screen.getByTestId('scroll');

  expect(root).toHaveAttribute('data-scope', 'typeset');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'typeset');
  expect(scroll).toHaveAttribute('data-scope', 'typeset');
  expect(scroll).toHaveAttribute('data-part', 'scroll');
  expect(scroll).toHaveAttribute('data-slot', 'typeset-scroll');
});

test('keeps scrollable content reachable by keyboard by default', () => {
  render(TypesetScroll, {
    props: { 'aria-label': 'Wide comparison table' },
    attrs: { 'data-testid': 'scroll' },
    slots: { default: '<table><tbody><tr><td>Wide content</td></tr></tbody></table>' },
  });

  const scroll = screen.getByTestId('scroll');

  expect(scroll).toHaveAttribute('tabindex', '0');
  expect(scroll).toHaveAttribute('role', 'region');
  scroll.focus();
  expect(scroll).toHaveFocus();
});

test('keeps an unnamed scroller generic and preserves explicit semantics', () => {
  render({
    components: typesetComponents,
    template: `
      <TypesetScroll data-testid="unnamed-scroll">Wide content</TypesetScroll>
      <TypesetScroll
        aria-label="Custom scroller"
        data-testid="custom-scroll"
        role="group"
        :tabindex="-1"
      >
        Wide content
      </TypesetScroll>
    `,
  });

  const unnamedScroll = screen.getByTestId('unnamed-scroll');
  const customScroll = screen.getByTestId('custom-scroll');

  expect(unnamedScroll).not.toHaveAttribute('role');
  expect(unnamedScroll).toHaveAttribute('tabindex', '0');
  expect(customScroll).toHaveAttribute('role', 'group');
  expect(customScroll).toHaveAttribute('tabindex', '-1');
});

test('updates native tabindex and named-region semantics with parent props', async () => {
  const label = ref<string>();
  const labelledby = ref<string>();
  const role = ref<string>();
  const tabindex = ref<number>();
  render({
    components: typesetComponents,
    setup: () => ({ label, labelledby, role, tabindex }),
    template: `
      <h2 id="comparison-label">Comparison table</h2>
      <TypesetScroll
        :aria-label="label"
        :aria-labelledby="labelledby"
        :role="role"
        :tabindex="tabindex"
        data-testid="scroll"
      >Wide content</TypesetScroll>
    `,
  });

  const scroll = screen.getByTestId('scroll');
  expect(scroll).not.toHaveAttribute('role');
  expect(scroll).toHaveAttribute('tabindex', '0');

  label.value = 'Wide table';
  tabindex.value = -1;
  await nextTick();
  expect(scroll).toHaveAttribute('role', 'region');
  expect(scroll).toHaveAccessibleName('Wide table');
  expect(scroll).toHaveAttribute('tabindex', '-1');

  label.value = undefined;
  labelledby.value = 'comparison-label';
  tabindex.value = 2;
  await nextTick();
  expect(scroll).toHaveAttribute('role', 'region');
  expect(scroll).toHaveAccessibleName('Comparison table');
  expect(scroll).toHaveAttribute('tabindex', '2');

  role.value = 'group';
  await nextTick();
  expect(scroll).toHaveAttribute('role', 'group');

  role.value = undefined;
  labelledby.value = undefined;
  tabindex.value = undefined;
  await nextTick();
  expect(scroll).not.toHaveAttribute('role');
  expect(scroll).not.toHaveAttribute('aria-label');
  expect(scroll).not.toHaveAttribute('aria-labelledby');
  expect(scroll).toHaveAttribute('tabindex', '0');
});

test('forwards native listeners and keeps consumer classes last', async () => {
  const clicks = ref(0);
  const rootRef = ref<ComponentPublicInstance>();
  const scrollRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: typesetComponents,
    setup() {
      return { clicks, rootRef, scrollRef };
    },
    template: `
      <Typeset
        ref="rootRef"
        class="consumer-root"
        data-testid="root"
        :style="[{ color: 'red' }, { '--moduix-typeset-flow': '2em' }]"
        @click="clicks += 1"
      >
        Readable content
      </Typeset>
      <TypesetScroll
        ref="scrollRef"
        class="consumer-scroll"
        data-testid="scroll"
        @click="clicks += 1"
      >
        Wide content
      </TypesetScroll>
      <output>{{ clicks }}</output>
    `,
  });

  render(Harness);

  const root = screen.getByTestId('root');
  const scroll = screen.getByTestId('scroll');
  await fireEvent.click(root);
  await fireEvent.click(scroll);

  expect(root).toHaveClass('consumer-root');
  expect(scroll).toHaveClass('consumer-scroll');
  expect(root.className).toMatch(/consumer-root$/);
  expect(scroll.className).toMatch(/consumer-scroll$/);
  expect(rootRef.value?.$el).toBe(root);
  expect(scrollRef.value?.$el).toBe(scroll);
  expect(root.style.color).toBe('red');
  expect(root.style.getPropertyValue('--moduix-typeset-flow')).toBe('2em');
  expect(screen.getByText('2')).toBeInTheDocument();
});

test('preserves semantic hosts and Vue refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const scrollRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: typesetComponents,
    setup() {
      return { rootRef, scrollRef };
    },
    template: `
      <Typeset ref="rootRef" as-child>
        <article>
          <TypesetScroll
            ref="scrollRef"
            as-child
            aria-label="Wide comparison table"
          >
            <section>Scrollable content</section>
          </TypesetScroll>
        </article>
      </Typeset>
    `,
  });

  render(Harness);

  const article = screen.getByRole('article');
  const scroll = screen.getByRole('region', { name: 'Wide comparison table' });

  expect(article.tagName).toBe('ARTICLE');
  expect(rootRef.value?.$el).toBe(article);
  expect(scroll.tagName).toBe('SECTION');
  expect(scrollRef.value?.$el).toBe(scroll);
  expect(article).toHaveAttribute('data-slot', 'typeset');
  expect(scroll).toHaveAttribute('data-slot', 'typeset-scroll');
});

test('renders and hydrates the public anatomy without replacing server nodes', async () => {
  const App = defineComponent({
    components: typesetComponents,
    template: `
      <Typeset as-child>
        <article>
          <h1>Readable content</h1>
          <TypesetScroll aria-label="Wide comparison table">
            <table><tbody><tr><td>Wide content</td></tr></tbody></table>
          </TypesetScroll>
        </article>
      </Typeset>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-scope="typeset"');
  expect(html).toContain('data-part="root"');
  expect(html).toContain('data-slot="typeset-scroll"');
  expect(html).toContain('role="region"');
  expect(html).toContain('tabindex="0"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="typeset"]');
  const serverScroll = host.querySelector('[data-slot="typeset-scroll"]');
  const warnings: string[] = [];
  const originalWarn = console.warn;
  const originalError = console.error;
  console.warn = (...args) => warnings.push(args.join(' '));
  console.error = (...args) => warnings.push(args.join(' '));

  const app = createSSRApp(App);
  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="typeset"]')).toBe(serverRoot);
    expect(host.querySelector('[data-slot="typeset-scroll"]')).toBe(serverScroll);
    expect(warnings).toEqual([]);
  } finally {
    app.unmount();
    console.warn = originalWarn;
    console.error = originalError;
    host.remove();
  }
});

test('renders through the flat root export', () => {
  expect(Typeset).not.toHaveProperty('Root');
  expect(TypesetScroll).not.toHaveProperty('Root');

  render(Typeset, {
    attrs: { 'data-testid': 'root' },
    slots: { default: 'Readable content' },
  });

  expect(screen.getByTestId('root')).toHaveTextContent('Readable content');
});
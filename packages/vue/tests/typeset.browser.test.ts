import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Typeset, TypesetScroll } from '../src/components/typeset';
import SsrTypeset from './fixtures/SsrTypeset.vue';

const typesetComponents = { Typeset, TypesetScroll };

test('renders stable data hooks without allowing consumer overrides', async () => {
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

  expect(screen.getByTestId('root').dataset).toMatchObject({
    scope: 'typeset',
    part: 'root',
    slot: 'typeset',
  });

  expect(screen.getByTestId('scroll').dataset).toMatchObject({
    scope: 'typeset',
    part: 'scroll',
    slot: 'typeset-scroll',
  });
  await expect.element(page.getByText('Readable content')).toBeAttached();
  expect(Typeset).not.toHaveProperty('Root');
  expect(TypesetScroll).not.toHaveProperty('Root');
});

test('keeps scrollable content reachable by keyboard by default', async () => {
  render({
    components: typesetComponents,
    template:
      '<button type="button">Before table</button><TypesetScroll aria-label="Wide comparison table" data-testid="scroll"><table><tbody><tr><td>Wide content</td></tr></tbody></table></TypesetScroll>',
  });

  const scrollLocator = page.getByTestId('scroll');
  await expect.element(scrollLocator).toHaveAttribute('tabindex', '0');
  await expect.element(scrollLocator).toHaveAttribute('role', 'region');
  await page.getByRole('button', { name: 'Before table' }).click();
  await page.getByRole('button', { name: 'Before table' }).press('Tab');
  await expect.element(scrollLocator).toBeFocused();
});

test('keeps an unnamed scroller generic and preserves explicit semantics', async () => {
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

  await expect.element(page.getByTestId('unnamed-scroll')).not.toHaveAttribute('role');
  await expect.element(page.getByTestId('unnamed-scroll')).toHaveAttribute('tabindex', '0');
  await expect.element(page.getByTestId('custom-scroll')).toHaveAttribute('role', 'group');
  await expect.element(page.getByTestId('custom-scroll')).toHaveAttribute('tabindex', '-1');
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

  const scroll = page.getByTestId('scroll');
  await expect.element(scroll).not.toHaveAttribute('role');
  await expect.element(scroll).toHaveAttribute('tabindex', '0');

  label.value = 'Wide table';
  tabindex.value = -1;
  await nextTick();
  await expect.element(scroll).toHaveAttribute('role', 'region');
  await expect.element(page.getByRole('region', { name: 'Wide table' })).toBeAttached();
  await expect.element(scroll).toHaveAttribute('tabindex', '-1');

  label.value = undefined;
  labelledby.value = 'comparison-label';
  tabindex.value = 2;
  await nextTick();
  await expect.element(scroll).toHaveAttribute('role', 'region');
  await expect.element(page.getByRole('region', { name: 'Comparison table' })).toBeAttached();
  await expect.element(scroll).toHaveAttribute('tabindex', '2');

  role.value = 'group';
  await nextTick();
  await expect.element(scroll).toHaveAttribute('role', 'group');

  role.value = undefined;
  labelledby.value = undefined;
  tabindex.value = undefined;
  await nextTick();
  await expect.element(scroll).not.toHaveAttribute('role');
  await expect.element(scroll).not.toHaveAttribute('aria-label');
  await expect.element(scroll).not.toHaveAttribute('aria-labelledby');
  await expect.element(scroll).toHaveAttribute('tabindex', '0');
});

test('forwards native listeners and keeps consumer classes last', async () => {
  const clicks = ref(0);
  const rootRef = ref<ComponentPublicInstance>();
  const scrollRef = ref<ComponentPublicInstance>();

  render({
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

  const root = screen.getByTestId('root');
  const scroll = screen.getByTestId('scroll');
  await page.getByTestId('root').click();
  await page.getByTestId('scroll').click();

  expect(root?.classList.contains('consumer-root')).toBe(true);
  expect(scroll?.classList.contains('consumer-scroll')).toBe(true);
  expect(root.className).toMatch(/consumer-root$/);
  expect(scroll.className).toMatch(/consumer-scroll$/);
  expect(rootRef.value?.$el).toBe(root);
  expect(scrollRef.value?.$el).toBe(scroll);
  expect(root.style.color).toBe('red');
  expect(root.style.getPropertyValue('--moduix-typeset-flow')).toBe('2em');
  await expect.element(page.getByText('2')).toBeAttached();
});

test('preserves semantic hosts and Vue refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const scrollRef = ref<ComponentPublicInstance>();

  render({
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

  const article = screen.getByRole('article');
  const scroll = screen.getByRole('region', { name: 'Wide comparison table' });

  expect(article.tagName).toBe('ARTICLE');
  expect(rootRef.value?.$el).toBe(article);
  expect(scroll.tagName).toBe('SECTION');
  expect(scrollRef.value?.$el).toBe(scroll);
  expect(article.getAttribute('data-slot')).toBe('typeset');
  expect(scroll.getAttribute('data-slot')).toBe('typeset-scroll');
});

test('renders and hydrates the public anatomy without replacing server nodes', async () => {
  const html = await renderToString(createSSRApp(SsrTypeset));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverHosts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrTypeset);
  try {
    app.mount(host);
    await nextTick();
    expect([...host.querySelectorAll('[data-slot]')]).toHaveLength(serverHosts.length);
    [...host.querySelectorAll('[data-slot]')].forEach((element, index) =>
      expect(element).toBe(serverHosts[index]),
    );
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
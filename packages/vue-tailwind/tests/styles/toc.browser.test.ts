import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Toc,
  TocContent,
  TocContext,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRail,
  TocRootProvider,
  TocTitle,
} from '@/index';

const tocComponents = {
  Toc,
  TocContent,
  TocContext,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRail,
  TocRootProvider,
  TocTitle,
};

const items = [
  { value: 'introduction', depth: 2 },
  { value: 'configuration', depth: 3 },
];

const renderToc = (template: string, setup?: () => Record<string, unknown>) =>
  render(
    defineComponent({
      components: tocComponents,
      setup() {
        return { ...setup?.() };
      },
      template,
    }),
  );

test('preserves Ark navigation semantics, active state, anatomy, and Tailwind parts', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const contentRef = ref<ComponentPublicInstance | null>(null);

  const { container } = renderToc(
    `
      <Toc ref="rootRef" :items="items" :default-active-ids="['introduction']" data-probe="root">
        <TocContent ref="contentRef">
          <h2 id="introduction">Introduction</h2>
          <h3 id="configuration">Configuration</h3>
        </TocContent>
        <TocNav>
          <TocTitle>On this page</TocTitle>
          <TocList>
            <TocIndicator />
            <TocItem v-for="item in items" :key="item.value" :item="item">
              <TocLink :href="\`#\${item.value}\`">
                <TocRail v-if="item.value === 'configuration'" :depth="item.depth" :previous-depth="2" :next-depth="2" />
                {{ item.value }}
              </TocLink>
            </TocItem>
          </TocList>
        </TocNav>
      </Toc>
    `,
    () => ({ items, rootRef, contentRef }),
  );

  const root = rootRef.value?.$el as HTMLElement;
  const activeLink = page.getByRole('link', { name: 'introduction' });
  const nestedItem = page
    .locator('[data-slot="toc-item"]')
    .filter({ has: page.getByRole('link', { name: 'configuration' }) });
  const rail = container.querySelector('[data-slot="toc-rail"]');

  expect(root?.getAttribute('data-probe')).toBe('root');
  expect(contentRef.value?.$el?.getAttribute('data-slot')).toBe('toc-content');
  await expect.element(activeLink).toHaveAttribute('aria-current', 'location');
  await expect.element(activeLink).toHaveAttribute('data-active');
  await expect.element(nestedItem).toHaveAttribute('data-depth', '3');
  expect(rail?.getAttribute('aria-hidden')).toBe('true');
});

test('keeps the flat API and lets consumer Tailwind classes override defaults', async () => {
  renderToc(
    `
      <Toc class="w-auto" :items="items">
        <TocNav class="p-0"><TocTitle>On this page</TocTitle></TocNav>
      </Toc>
    `,
    () => ({ items }),
  );

  const root = document.querySelector('[data-slot="toc-root"]')!;

  expect(Toc).not.toHaveProperty('Root');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-auto']));
  expect([...document.querySelector('[data-slot="toc-nav"]')!.classList]).toEqual(
    expect.arrayContaining(['p-0']),
  );
});
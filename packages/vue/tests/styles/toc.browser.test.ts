import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
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

test('keeps the flat API and merges consumer classes after CSS Modules defaults', async () => {
  renderToc(
    `
      <Toc class="consumer-root" :items="items">
        <TocNav class="consumer-nav"><TocTitle>On this page</TocTitle></TocNav>
      </Toc>
    `,
    () => ({ items }),
  );

  const root = document.querySelector('[data-slot="toc-root"]')!;

  expect(Toc).not.toHaveProperty('Root');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  expect([...document.querySelector('[data-slot="toc-nav"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-nav']),
  );
});
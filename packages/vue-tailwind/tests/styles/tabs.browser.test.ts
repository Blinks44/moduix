import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Tabs,
  TabsContext,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
} from '@/index';

const tabsComponents = {
  Tabs,
  TabsContext,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
};

test('preserves Ark semantics, Vue refs, anatomy, attrs, and Tailwind hooks', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const listRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: tabsComponents,
    setup() {
      return { contentRef, indicatorRef, listRef, rootRef, triggerRef };
    },
    template: `
      <Tabs ref="rootRef" default-value="overview" data-probe="root">
        <TabsList ref="listRef">
          <TabsTrigger ref="triggerRef" value="overview">Overview</TabsTrigger>
          <TabsIndicator ref="indicatorRef" />
        </TabsList>
        <TabsContent ref="contentRef" value="overview">Overview content</TabsContent>
      </Tabs>
    `,
  });

  render(Harness);

  const root = screen.getByRole('tablist').parentElement;
  const list = screen.getByRole('tablist');
  const trigger = screen.getByRole('tab', { name: 'Overview' });
  const indicator = list.querySelector('[data-slot="tabs-indicator"]');
  const content = screen.getByText('Overview content');

  expect(rootRef.value?.$el).toBe(root);
  expect(root!.getAttribute('data-slot')).toBe('tabs-root');
  expect(root!.getAttribute('data-scope')).toBe('tabs');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect(listRef.value?.$el).toBe(list);
  await expect.element(page.getByRole('tablist')).toHaveAttribute('data-slot', 'tabs-list');
  expect(triggerRef.value?.$el).toBe(trigger);
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('data-slot', 'tabs-trigger');
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  expect(indicatorRef.value?.$el).toBe(indicator);
  expect(indicator!.getAttribute('data-slot')).toBe('tabs-indicator');
  expect(contentRef.value?.$el).toBe(content);
  await expect
    .element(page.getByText('Overview content'))
    .toHaveAttribute('data-slot', 'tabs-content');
});

test('merges consumer utilities after Tailwind defaults', async () => {
  render(
    defineComponent({
      components: tabsComponents,
      template: `
        <Tabs default-value="overview" class="flex-row">
          <TabsList class="w-full bg-card">
            <TabsTrigger value="overview" class="h-10">Overview</TabsTrigger>
            <TabsIndicator />
          </TabsList>
          <TabsContent value="overview" class="p-6">Overview content</TabsContent>
        </Tabs>
      `,
    }),
  );

  const root = screen.getByRole('tablist').parentElement;
  const list = screen.getByRole('tablist');
  const trigger = screen.getByRole('tab', { name: 'Overview' });
  const content = screen.getByText('Overview content');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['flex-row']));
  expect([...list!.classList]).toEqual(expect.arrayContaining(['w-full', 'bg-card']));
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['h-10']));
  expect([...content!.classList]).toEqual(expect.arrayContaining(['p-6']));
  await expect
    .element(page.getByRole('tab', { name: 'Overview', exact: true }))
    .toHaveCSS('height', '40px');
  await expect
    .element(page.getByText('Overview content', { exact: true }))
    .toHaveCSS('padding', '24px');
});
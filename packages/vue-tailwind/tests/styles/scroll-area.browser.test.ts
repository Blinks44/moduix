import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  ScrollArea,
  ScrollAreaContext,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/index';

const scrollAreaComponents = {
  ScrollArea,
  ScrollAreaContext,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
};

test('renders Ark anatomy with Tailwind defaults and forwarded refs', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const viewportRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: scrollAreaComponents,
    setup() {
      return { rootRef, viewportRef };
    },
    template: `
      <ScrollArea
        ref="rootRef"
        data-slot="consumer-root"
        data-variant="consumer"
        fade
        variant="always"
      >
        <ScrollAreaViewport ref="viewportRef" data-slot="consumer-viewport">
          <ScrollAreaContent>Scrollable content</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollArea>
    `,
  });

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;
  const viewport = viewportRef.value?.$el as HTMLElement;

  expect('Root' in ScrollArea).toBe(false);
  expect(root!.getAttribute('data-scope')).toBe('scroll-area');
  expect(root!.getAttribute('data-part')).toBe('root');
  expect(root!.getAttribute('data-slot')).toBe('scroll-area-root');
  expect(root!.hasAttribute('data-fade')).toBe(true);
  expect(root!.getAttribute('data-variant')).toBe('always');
  expect(viewport!.getAttribute('data-part')).toBe('viewport');
  expect(viewport!.getAttribute('data-slot')).toBe('scroll-area-viewport');
  await expect
    .element(page.getByText('Scrollable content'))
    .toHaveAttribute('data-slot', 'scroll-area-content');
});

test('lets consumer Tailwind classes override component defaults', async () => {
  const Harness = defineComponent({
    components: scrollAreaComponents,
    template: `
      <ScrollArea class="h-20">
        <ScrollAreaViewport class="rounded-none">
          <ScrollAreaContent>Scrollable content</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar class="opacity-100">
          <ScrollAreaThumb class="bg-primary" />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollArea>
    `,
  });

  render(Harness);

  const root = document.querySelector('[data-slot="scroll-area-root"]')!;
  const viewport = document.querySelector('[data-slot="scroll-area-viewport"]')!;
  const scrollbar = document.querySelector('[data-slot="scroll-area-scrollbar"]')!;
  const thumb = document.querySelector('[data-slot="scroll-area-thumb"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['h-20']));
  expect([...viewport.classList]).toEqual(expect.arrayContaining(['rounded-none']));
  expect([...scrollbar.classList]).toEqual(expect.arrayContaining(['opacity-100']));
  expect([...thumb.classList]).toEqual(expect.arrayContaining(['bg-primary']));

  await expect.element(page.locator('[data-slot="scroll-area-root"]')).toHaveCSS('height', '80px');
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveCSS('border-radius', '0px');
  await expect
    .element(page.locator('[data-slot="scroll-area-scrollbar"]'))
    .toHaveCSS('opacity', '1');
});
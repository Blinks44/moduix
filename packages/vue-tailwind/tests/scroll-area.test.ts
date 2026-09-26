import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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
  useScrollArea,
} from '../src';

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

test('renders Ark anatomy with Tailwind defaults and forwarded refs', () => {
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
  const content = screen.getByText('Scrollable content');
  const scrollbar = document.querySelector('[data-slot="scroll-area-scrollbar"]')!;
  const thumb = document.querySelector('[data-slot="scroll-area-thumb"]')!;
  const corner = document.querySelector('[data-slot="scroll-area-corner"]')!;

  expect('Root' in ScrollArea).toBe(false);
  expect(root).toHaveAttribute('data-scope', 'scroll-area');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'scroll-area-root');
  expect(root).toHaveAttribute('data-fade');
  expect(root).toHaveAttribute('data-variant', 'always');
  expect(root).toHaveClass('group/scroll-area', 'relative', 'h-full', 'w-full', 'text-foreground');
  expect(viewport).toHaveAttribute('data-part', 'viewport');
  expect(viewport).toHaveAttribute('data-slot', 'scroll-area-viewport');
  expect(viewport).toHaveClass('rounded-md', '[scrollbar-width:none]');
  expect(content).toHaveAttribute('data-slot', 'scroll-area-content');
  expect(content).toHaveClass('block');
  expect(scrollbar).toHaveClass('rounded-md', 'opacity-0', 'pointer-events-none');
  expect(thumb).toHaveClass('rounded-full', 'bg-border');
  expect(corner).toHaveClass('bg-transparent');
});

test('keeps RootProvider composition and context connected', () => {
  const Harness = defineComponent({
    components: scrollAreaComponents,
    setup() {
      return { scrollArea: useScrollArea() };
    },
    template: `
      <ScrollAreaRootProvider :value="scrollArea" data-slot="consumer-provider">
        <ScrollAreaViewport>
          <ScrollAreaContent>Provider content</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
        <ScrollAreaCorner />
        <ScrollAreaContext v-slot="context">
          <output>{{ String(context.isAtTop) }}</output>
        </ScrollAreaContext>
      </ScrollAreaRootProvider>
    `,
  });

  render(Harness);

  expect(document.querySelector('[data-slot="scroll-area-root-provider"]')).toHaveAttribute(
    'data-scope',
    'scroll-area',
  );
  expect(screen.getByText('Provider content')).toBeInTheDocument();
  expect(screen.getByText('true')).toBeInTheDocument();
});

test('preserves asChild composition and refs for every visible part', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const viewportRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const scrollbarRef = ref<ComponentPublicInstance>();
  const thumbRef = ref<ComponentPublicInstance>();
  const cornerRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: scrollAreaComponents,
    setup() {
      return { contentRef, cornerRef, rootRef, scrollbarRef, thumbRef, viewportRef };
    },
    template: `
      <ScrollArea ref="rootRef" as-child>
        <section aria-label="Related articles" role="region">
          <ScrollAreaViewport ref="viewportRef">
            <ScrollAreaContent ref="contentRef">Article list</ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar ref="scrollbarRef"><ScrollAreaThumb ref="thumbRef" /></ScrollAreaScrollbar>
          <ScrollAreaCorner ref="cornerRef" />
        </section>
      </ScrollArea>
    `,
  });

  render(Harness);

  const root = screen.getByRole('region', { name: 'Related articles' });

  expect(rootRef.value?.$el).toBe(root);
  expect(root).toHaveAttribute('data-slot', 'scroll-area-root');
  expect(root).not.toHaveAttribute('data-fade');
  expect(root).toHaveAttribute('data-variant', 'hover');
  expect(root).toHaveClass('group/scroll-area', 'relative', 'h-full', 'w-full');
  expect(viewportRef.value?.$el).toHaveAttribute('data-slot', 'scroll-area-viewport');
  expect(contentRef.value?.$el).toHaveAttribute('data-slot', 'scroll-area-content');
  expect(scrollbarRef.value?.$el).toHaveAttribute('data-slot', 'scroll-area-scrollbar');
  expect(thumbRef.value?.$el).toHaveAttribute('data-slot', 'scroll-area-thumb');
  expect(cornerRef.value?.$el).toHaveAttribute('data-slot', 'scroll-area-corner');
});

test('lets consumer Tailwind classes override component defaults', () => {
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

  expect(root).toHaveClass('h-20');
  expect(root).not.toHaveClass('h-full');
  expect(viewport).toHaveClass('rounded-none');
  expect(viewport).not.toHaveClass('rounded-md');
  expect(scrollbar).toHaveClass('opacity-100');
  expect(scrollbar).not.toHaveClass('opacity-0');
  expect(thumb).toHaveClass('bg-primary');
  expect(thumb).not.toHaveClass('bg-border');
});

test('renders and hydrates the public anatomy on the server', async () => {
  const App = defineComponent({
    components: scrollAreaComponents,
    template: `
      <ScrollArea>
        <ScrollAreaViewport>
          <ScrollAreaContent>Server content</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollArea>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="scroll-area-root"');
  expect(html).toContain('data-slot="scroll-area-viewport"');
  expect(html).toContain('data-slot="scroll-area-content"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('[data-slot="scroll-area-root"]')).toHaveLength(1);
  expect(host.querySelector('[data-slot="scroll-area-content"]')).toHaveTextContent(
    'Server content',
  );

  app.unmount();
  host.remove();
});
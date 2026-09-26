import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  SplitterRootProvider,
  useSplitter,
  useSplitterContext,
} from '../src';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

const splitterComponents = {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  SplitterRootProvider,
};

const TestSplitter = defineComponent({
  components: splitterComponents,
  setup() {
    return { panels };
  },
  template: `
    <Splitter :panels="panels" :default-size="[40, 60]">
      <SplitterPanel id="a">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b">B</SplitterPanel>
    </Splitter>
  `,
});

test('preserves Ark keyboard affordances and Tailwind trigger defaults', async () => {
  const { container } = render(TestSplitter);

  const root = container.querySelector('[data-slot="splitter-root"]');
  const trigger = screen.getByRole('separator', { name: 'Resize panels' });
  const indicator = container.querySelector('[data-slot="splitter-resize-trigger-indicator"]');

  expect(root).toHaveClass('h-112', 'w-full', 'rounded-md', 'bg-card');
  expect(trigger).toHaveClass(
    'w-px',
    'min-w-px',
    'before:w-[0.5px]',
    'before:h-full',
    'data-dragging:before:bg-muted-foreground/40',
    '[@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground/40',
    'motion-reduce:transition-none',
    'motion-reduce:before:transition-none',
  );
  expect(indicator).toHaveClass(
    'h-control-xs',
    'w-1.5',
    'rounded-full',
    'bg-background',
    'group-hover/trigger:border-muted-foreground/40',
    'motion-reduce:transition-none',
  );
  expect(indicator).not.toHaveClass('data-dragging:border-border');
  expect(indicator).toBeVisible();
  expect(trigger).toHaveAttribute('aria-valuenow', '40');
  expect(trigger).toHaveAttribute('aria-valuemin', '20');
  expect(trigger).toHaveAttribute('aria-valuemax', '80');
  expect(trigger).toHaveAttribute('tabindex', '0');

  trigger.focus();
  await fireEvent.focusIn(trigger);
  await waitFor(() => expect(trigger).toHaveAttribute('data-focus'));
});

test('preserves anatomy, fallthrough attrs, and refs for every styled part', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const panelRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: splitterComponents,
    setup() {
      return { indicatorRef, panelRef, rootRef, triggerRef, panels };
    },
    template: `
      <Splitter ref="rootRef" :panels="panels" :default-size="[40, 60]" data-probe="root">
        <SplitterPanel ref="panelRef" id="a">A</SplitterPanel>
        <SplitterResizeTrigger ref="triggerRef" id="a:b" aria-label="Resize panels">
          <SplitterResizeTriggerIndicator ref="indicatorRef" />
        </SplitterResizeTrigger>
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    `,
  });

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;
  const panel = panelRef.value?.$el as HTMLElement;
  const trigger = triggerRef.value?.$el as HTMLElement;
  const indicator = indicatorRef.value?.$el as HTMLElement;

  expect(root).toHaveAttribute('data-slot', 'splitter-root');
  expect(root).toHaveAttribute('data-scope', 'splitter');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(panel).toHaveAttribute('data-slot', 'splitter-panel');
  expect(trigger).toHaveAttribute('data-slot', 'splitter-resize-trigger');
  expect(indicator).toHaveAttribute('data-slot', 'splitter-resize-trigger-indicator');
  expect(rootRef.value?.$el).toBe(root);
  expect(panelRef.value?.$el).toBe(panel);
  expect(triggerRef.value?.$el).toBe(trigger);
  expect(indicatorRef.value?.$el).toBe(indicator);
});

test('keeps custom trigger content and disabled behavior intact', () => {
  const { container } = render({
    components: splitterComponents,
    setup() {
      return { panels };
    },
    template: `
      <Splitter :panels="panels" :default-size="[40, 60]">
        <SplitterPanel id="a">A</SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Disabled resize" disabled>
          <span>Grip</span>
        </SplitterResizeTrigger>
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    `,
  });

  const trigger = screen.getByRole('separator', { name: 'Disabled resize' });

  expect(screen.getByText('Grip')).toBeVisible();
  expect(
    container.querySelector('[data-slot="splitter-resize-trigger-indicator"]'),
  ).not.toBeInTheDocument();
  expect(trigger).toHaveAttribute('data-disabled');
  expect(trigger).not.toHaveAttribute('tabindex');
});

test('keeps an asChild resize trigger as the interactive host', () => {
  const { container } = render({
    components: splitterComponents,
    setup() {
      return { panels };
    },
    template: `
      <Splitter :panels="panels" :default-size="[40, 60]">
        <SplitterPanel id="a">A</SplitterPanel>
        <SplitterResizeTrigger as-child id="a:b" aria-label="Resize panels">
          <button type="button">Resize panels</button>
        </SplitterResizeTrigger>
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    `,
  });

  const trigger = screen.getByRole('separator', { name: 'Resize panels' });

  expect(trigger.tagName).toBe('BUTTON');
  expect(trigger).toHaveAttribute('data-slot', 'splitter-resize-trigger');
  expect(
    container.querySelector('[data-slot="splitter-resize-trigger-indicator"]'),
  ).not.toBeInTheDocument();
});

test('lets consumer utilities replace fixed defaults', () => {
  const { container } = render({
    components: splitterComponents,
    setup() {
      return { panels };
    },
    template: `
      <Splitter class="h-64 w-96 border-2 bg-muted" :panels="panels" :default-size="[40, 60]">
        <SplitterPanel id="a" class="min-h-0 p-6">A</SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Resize panels" class="w-2 min-w-2" />
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    `,
  });

  const root = container.querySelector('[data-slot="splitter-root"]');
  const panel = container.querySelector('[data-slot="splitter-panel"]');
  const trigger = screen.getByRole('separator', { name: 'Resize panels' });

  expect(root).toHaveClass('h-64', 'w-96', 'border-2', 'bg-muted');
  expect(root).not.toHaveClass('h-112', 'w-full', 'border-0', 'bg-card');
  expect(panel).toHaveClass('min-h-0', 'p-6');
  expect(panel).not.toHaveClass('min-h-50', 'p-4');
  expect(trigger).toHaveClass('w-2', 'min-w-2');
  expect(trigger).not.toHaveClass('w-px', 'min-w-px');
});

test('keeps the provider and context connected to the Vue splitter store', async () => {
  const ContextControls = defineComponent({
    setup() {
      const splitter = useSplitterContext();
      const resizeFirstPanel = () => splitter.value.setSizes([25, 75]);
      return { resizeFirstPanel };
    },
    template: '<button type="button" @click="resizeFirstPanel">Set A to 25%</button>',
  });
  const Harness = defineComponent({
    components: { ...splitterComponents, ContextControls },
    setup() {
      const splitter = useSplitter({ panels, defaultSize: [50, 50] });
      const sizes = computed(() => splitter.value.getSizes().join(' / '));
      return { sizes, splitter };
    },
    template: `
      <SplitterRootProvider :value="splitter">
        <ContextControls />
        <SplitterPanel id="a">A</SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
        <SplitterPanel id="b">B</SplitterPanel>
      </SplitterRootProvider>
      <output>Sizes: {{ sizes }}</output>
    `,
  });

  render(Harness);

  expect(screen.getByText('Sizes: 50 / 50')).toBeInTheDocument();
  await fireEvent.click(screen.getByRole('button', { name: 'Set A to 25%' }));
  await waitFor(() => expect(screen.getByText('Sizes: 25 / 75')).toBeInTheDocument());
});

test('renders and hydrates the public anatomy on the server', async () => {
  const html = await renderToString(createSSRApp(TestSplitter));

  expect(html).toContain('data-slot="splitter-root"');
  expect(html).toContain('data-slot="splitter-panel"');
  expect(html).toContain('data-slot="splitter-resize-trigger"');
  expect(html).toContain('role="separator"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(TestSplitter);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});
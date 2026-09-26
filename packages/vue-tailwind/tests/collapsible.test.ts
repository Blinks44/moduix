import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
  useCollapsible,
  useCollapsibleContext,
} from '../src';

const collapsibleComponents = {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
};

const TestCollapsible = defineComponent({
  components: collapsibleComponents,
  props: {
    disabled: Boolean,
    lazyMount: Boolean,
    open: { type: Boolean, default: undefined },
  },
  emits: ['update:open', 'openChange'],
  template: `
    <Collapsible
      :disabled="disabled"
      :lazy-mount="lazyMount"
      unmount-on-exit
      :open="open"
      @update:open="$emit('update:open', $event)"
      @open-change="$emit('openChange', $event)"
    >
      <CollapsibleTrigger>Recovery details</CollapsibleTrigger>
      <CollapsibleContent>Keep this safe.</CollapsibleContent>
    </Collapsible>
  `,
});

test('preserves Ark trigger semantics and lazy unmounting', async () => {
  render(TestCollapsible, { props: { lazyMount: true } });

  const trigger = screen.getByRole('button', { name: 'Recovery details' });

  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByText('Keep this safe.')).not.toBeInTheDocument();

  await fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
  expect(screen.getByText('Keep this safe.')).toBeInTheDocument();

  await fireEvent.click(trigger);

  await waitFor(() => expect(screen.queryByText('Keep this safe.')).not.toBeInTheDocument());
});

test('supports v-model:open and forwards the controlled callback details object', async () => {
  const details: boolean[] = [];
  const Harness = defineComponent({
    components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
    setup() {
      const open = ref(false);
      return { details, open };
    },
    template: `
      <Collapsible v-model:open="open" @open-change="details.push($event.open)">
        <CollapsibleTrigger>Controlled details</CollapsibleTrigger>
        <CollapsibleContent>Controlled content.</CollapsibleContent>
      </Collapsible>
      <output>Open: {{ open }}</output>
    `,
  });

  render(Harness);

  await fireEvent.click(screen.getByRole('button', { name: 'Controlled details' }));

  await waitFor(() => expect(screen.getByText('Open: true')).toBeInTheDocument());
  expect(details).toEqual([true]);
});

test('preserves disabled state', async () => {
  render(TestCollapsible, { props: { disabled: true } });

  const trigger = screen.getByRole('button', { name: 'Recovery details' });
  await fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  expect(trigger).toHaveAttribute('data-disabled');
});

test('keeps interactive content inert while partially collapsed', async () => {
  const Harness = defineComponent({
    components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
    template: `
      <Collapsible collapsed-height="2rem">
        <CollapsibleTrigger>Partial details</CollapsibleTrigger>
        <CollapsibleContent data-testid="partial-content">
          <button type="button">Nested action</button>
        </CollapsibleContent>
      </Collapsible>
    `,
  });

  render(Harness);

  const trigger = screen.getByRole('button', { name: 'Partial details' });
  const content = screen.getByTestId('partial-content');
  const nestedAction = screen.getByText('Nested action');

  expect(content).toHaveAttribute('data-has-collapsed-size');
  expect(content).not.toHaveAttribute('hidden');
  await waitFor(() => expect(nestedAction).toHaveAttribute('inert'));

  await fireEvent.click(trigger);

  await waitFor(() => expect(nestedAction).not.toHaveAttribute('inert'));
});

test('preserves consumer-owned trigger refs and behavior with asChild', async () => {
  const triggerRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: { Collapsible, CollapsibleContent, CollapsibleTrigger },
    setup() {
      return { triggerRef };
    },
    template: `
      <Collapsible>
        <CollapsibleTrigger ref="triggerRef" as-child>
          <button type="button" class="consumer-trigger">Composed details</button>
        </CollapsibleTrigger>
        <CollapsibleContent>Composed content.</CollapsibleContent>
      </Collapsible>
    `,
  });

  render(Harness);

  const trigger = screen.getByRole('button', { name: 'Composed details' });

  expect(triggerRef.value?.$el).toBe(trigger);
  expect(trigger).toHaveClass('consumer-trigger');
  expect(trigger).toHaveAttribute('data-slot', 'collapsible-trigger');
  expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
});

test('preserves Vue refs, anatomy, attrs, and Tailwind hooks', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const bodyRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: collapsibleComponents,
    setup() {
      return { bodyRef, contentRef, indicatorRef, rootRef, triggerRef };
    },
    template: `
      <Collapsible ref="rootRef" :default-open="true" data-probe="root">
        <CollapsibleTrigger ref="triggerRef">
          Details
          <CollapsibleIndicator ref="indicatorRef" />
        </CollapsibleTrigger>
        <CollapsibleContent ref="contentRef">
          <CollapsibleBody ref="bodyRef">Content</CollapsibleBody>
        </CollapsibleContent>
      </Collapsible>
    `,
  });

  render(Harness);

  const trigger = screen.getByRole('button', { name: 'Details' });
  const body = screen.getByText('Content');
  const content = body.parentElement;
  const root = rootRef.value?.$el as HTMLElement;

  expect(root).toHaveAttribute('data-slot', 'collapsible-root');
  expect(root).toHaveAttribute('data-scope', 'collapsible');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(triggerRef.value?.$el).toBe(trigger);
  expect(trigger).toHaveAttribute('type', 'button');
  expect(trigger).toHaveAttribute('data-slot', 'collapsible-trigger');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(trigger).toHaveAttribute('aria-controls', content?.id);
  expect(trigger.querySelector('[data-slot="collapsible-indicator"] svg')).toBeInTheDocument();
  expect(indicatorRef.value?.$el).toHaveAttribute('data-slot', 'collapsible-indicator');
  expect(contentRef.value?.$el).toBe(content);
  expect(content).toHaveAttribute('data-slot', 'collapsible-content');
  expect(bodyRef.value?.$el).toBe(body);
  expect(body).toHaveClass('grid', 'min-w-0', 'gap-2');
  expect(content).toHaveClass('box-border', 'overflow-hidden', 'text-sm');
});

test('keeps provider and descendant context composition connected', async () => {
  const RootState = defineComponent({
    setup() {
      const collapsible = useCollapsibleContext();
      const close = () => collapsible.value.setOpen(false);
      return { close };
    },
    template: '<button type="button" @click="close">Close from context</button>',
  });
  const Harness = defineComponent({
    components: { ...collapsibleComponents, RootState },
    setup() {
      return { collapsible: useCollapsible({ defaultOpen: true }) };
    },
    template: `
      <CollapsibleRootProvider :value="collapsible">
        <RootState />
        <CollapsibleTrigger>Provider details</CollapsibleTrigger>
        <CollapsibleContent><CollapsibleBody>Provider content.</CollapsibleBody></CollapsibleContent>
      </CollapsibleRootProvider>
    `,
  });

  render(Harness);

  const trigger = screen.getByRole('button', { name: 'Provider details' });
  expect(trigger).toHaveAttribute('aria-expanded', 'true');

  await fireEvent.click(screen.getByRole('button', { name: 'Close from context' }));

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  expect(trigger.closest('[data-slot="collapsible-root-provider"]')).toBeInTheDocument();
});

test('renders and hydrates the public anatomy on the server', async () => {
  const App = defineComponent({
    components: collapsibleComponents,
    template: `
      <Collapsible :default-open="true">
        <CollapsibleTrigger>Server details</CollapsibleTrigger>
        <CollapsibleContent><CollapsibleBody>Server content.</CollapsibleBody></CollapsibleContent>
      </Collapsible>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="collapsible-root"');
  expect(html).toContain('data-slot="collapsible-trigger"');
  expect(html).toContain('aria-expanded="true"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});

test('exposes component-owned Tailwind defaults on every visual part', () => {
  render(
    defineComponent({
      components: collapsibleComponents,
      template: `
        <Collapsible :default-open="true" data-testid="collapsible-root">
          <CollapsibleTrigger>
            Recovery details
            <CollapsibleIndicator />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CollapsibleBody>Keep this safe.</CollapsibleBody>
          </CollapsibleContent>
        </Collapsible>
      `,
    }),
  );

  const root = screen.getByTestId('collapsible-root');
  const trigger = screen.getByRole('button', { name: 'Recovery details' });
  const indicator = root.querySelector('[data-slot="collapsible-indicator"]');
  const content = root.querySelector('[data-slot="collapsible-content"]');
  const body = root.querySelector('[data-slot="collapsible-body"]');

  expect(root).toHaveClass('box-border', 'flex', 'w-full', 'max-w-full', 'min-w-0', 'flex-col');
  expect(trigger).toHaveClass(
    'flex',
    'w-full',
    'gap-2',
    'bg-transparent',
    'px-0',
    'py-1',
    'text-sm',
  );
  expect(indicator).toHaveClass('inline-flex', 'size-3', 'shrink-0', 'transition-transform');
  expect(content).toHaveClass('box-border', 'overflow-hidden', 'text-sm', 'text-muted-foreground');
  expect(body).toHaveClass('grid', 'min-w-0', 'gap-2');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const Harness = defineComponent({
    components: collapsibleComponents,
    template: `
      <Collapsible class="w-1/2 text-primary" data-testid="collapsible-root">
        <CollapsibleTrigger class="gap-6 py-4 text-lg">
          Recovery details
          <CollapsibleIndicator class="size-5" />
        </CollapsibleTrigger>
        <CollapsibleContent class="text-lg">
          <CollapsibleBody class="gap-6 p-6">Keep this safe.</CollapsibleBody>
        </CollapsibleContent>
      </Collapsible>
    `,
  });

  render(Harness);

  const root = screen.getByTestId('collapsible-root');
  const trigger = screen.getByRole('button', { name: 'Recovery details' });
  const indicator = root.querySelector('[data-slot="collapsible-indicator"]');
  const content = root.querySelector('[data-slot="collapsible-content"]');
  const body = root.querySelector('[data-slot="collapsible-body"]');

  expect(root).toHaveClass('w-1/2', 'text-primary');
  expect(root).not.toHaveClass('w-full', 'text-foreground');
  expect(trigger).toHaveClass('gap-6', 'py-4', 'text-lg');
  expect(trigger).not.toHaveClass('gap-2', 'py-1', 'text-sm');
  expect(indicator).toHaveClass('size-5');
  expect(indicator).not.toHaveClass('size-3');
  expect(content).toHaveClass('text-lg');
  expect(content).not.toHaveClass('text-sm');
  expect(body).toHaveClass('gap-6', 'p-6');
  expect(body).not.toHaveClass('gap-2');
});
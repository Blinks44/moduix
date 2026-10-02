import {
  JsonTreeViewRoot as ArkJsonTreeView,
  JsonTreeViewTree as ArkJsonTreeViewTree,
  useJsonTreeView as useArkJsonTreeView,
} from '@ark-ui/vue/json-tree-view';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { JsonTreeView, JsonTreeViewRootProvider, JsonTreeViewTree, useJsonTreeView } from '../src';

const data = {
  release: {
    status: 'ready',
    version: '2.3.0',
  },
};

const jsonTreeViewComponents = {
  JsonTreeView,
  JsonTreeViewRootProvider,
  JsonTreeViewTree,
};

test('renders a styled Ark tree with generated JSON nodes and preserves attrs/ref', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: jsonTreeViewComponents,
    setup() {
      return { data, rootRef };
    },
    template: `
      <JsonTreeView
        ref="rootRef"
        :data="data"
        :default-expanded-depth="1"
        data-probe="root"
      >
        <JsonTreeViewTree />
      </JsonTreeView>
    `,
  });

  render(Harness);

  const tree = screen.getByRole('tree');
  const rootBranch = screen.getAllByRole('button')[0];
  const root = rootRef.value?.$el as HTMLElement;

  expect(root).toHaveAttribute('data-slot', 'json-tree-view-root');
  expect(root).toHaveAttribute('data-scope', 'json-tree-view');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(tree).toHaveAttribute('data-slot', 'json-tree-view-tree');
  expect(rootBranch.querySelector('svg')).not.toBeNull();

  await fireEvent.click(rootBranch);

  await waitFor(() => expect(rootBranch).toHaveAttribute('data-state', 'closed'));
});

test('supports the native Vue arrow slot while preserving Ark generated nodes', () => {
  const Harness = defineComponent({
    components: jsonTreeViewComponents,
    setup() {
      return { data };
    },
    template: `
      <JsonTreeView :data="data" :default-expanded-depth="1">
        <JsonTreeViewTree>
          <template #arrow><span data-testid="custom-arrow">+</span></template>
        </JsonTreeViewTree>
      </JsonTreeView>
    `,
  });

  render(Harness);

  expect(screen.getAllByTestId('custom-arrow').length).toBeGreaterThan(0);
});

test('preserves semantic hosts with as-child', () => {
  const Harness = defineComponent({
    components: jsonTreeViewComponents,
    setup() {
      return { data };
    },
    template: `
      <JsonTreeView as-child :data="data">
        <section aria-label="Release data">
          <JsonTreeViewTree />
        </section>
      </JsonTreeView>
    `,
  });

  render(Harness);

  const root = screen.getByRole('tree').parentElement;
  expect(root).toHaveAttribute('data-slot', 'json-tree-view-root');
  expect(root?.tagName).toBe('SECTION');
});

test('lets consumer Tailwind classes override conflicting root defaults', () => {
  const Harness = defineComponent({
    components: jsonTreeViewComponents,
    setup() {
      return { data };
    },
    template: `
      <JsonTreeView :class="'w-1/2'" :data="data">
        <JsonTreeViewTree />
      </JsonTreeView>
    `,
  });

  render(Harness);

  const root = screen.getByRole('tree').parentElement;
  expect(root).toHaveClass('w-1/2');
  expect(root).not.toHaveClass('w-full');
});

test('renders the public anatomy on the server and hydrates generated ids', async () => {
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const App = defineComponent({
    components: jsonTreeViewComponents,
    setup() {
      return { data };
    },
    template: `
      <JsonTreeView :data="data" :default-expanded-depth="1">
        <JsonTreeViewTree />
      </JsonTreeView>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="json-tree-view-root"');
  expect(html).toContain('data-slot="json-tree-view-tree"');
  expect(html).toContain('data-scope="json-tree-view"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverTree = host.querySelector('[role="tree"]');
  const serverItems = [...host.querySelectorAll('[role="treeitem"]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  await nextTick();
  expect(host.querySelector('[role="tree"]')).toBe(serverTree);
  expect([...host.querySelectorAll('[role="treeitem"]')]).toEqual(serverItems);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  expect(warn).not.toHaveBeenCalled();
  expect(error).not.toHaveBeenCalled();
  app.unmount();
  host.remove();
  warn.mockRestore();
  error.mockRestore();
});

test('connects the provider store, native refs, attrs and listeners', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const treeRef = ref<ComponentPublicInstance>();
  const handleClick = rs.fn();
  render(
    defineComponent({
      components: jsonTreeViewComponents,
      setup: () => ({
        rootRef,
        treeRef,
        handleClick,
        tree: useJsonTreeView({ data, defaultExpandedDepth: 1 }),
      }),
      template: `
      <JsonTreeViewRootProvider ref="rootRef" :value="tree" data-probe="provider" @click="handleClick">
        <JsonTreeViewTree ref="treeRef" />
      </JsonTreeViewRootProvider>
    `,
    }),
  );
  const tree = screen.getByRole('tree');
  const root = rootRef.value?.$el;
  expect(root).toBe(tree.parentElement);
  expect(root).toHaveAttribute('data-slot', 'json-tree-view-root-provider');
  expect(root).toHaveAttribute('data-probe', 'provider');
  expect(treeRef.value?.$el).toBe(tree);
  await new Promise((resolve) => setTimeout(resolve, 0));
  await fireEvent.click(root);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('forwards indent guides and scoped value slots without replacing generated nodes', () => {
  render(
    defineComponent({
      components: jsonTreeViewComponents,
      setup: () => ({ data }),
      template: `
      <JsonTreeView :data="data" :default-expanded-depth="3">
        <JsonTreeViewTree indent-guide>
          <template #indentGuide><span data-testid="guide">|</span></template>
          <template #renderValue="{ node }"><span data-testid="value">{{ node.value }}</span></template>
        </JsonTreeViewTree>
      </JsonTreeView>
    `,
    }),
  );
  expect(screen.getAllByTestId('guide').length).toBeGreaterThan(0);
  expect(screen.getAllByTestId('value').map((node) => node.textContent)).toContain('"ready"');
  expect(screen.getByRole('tree')).toHaveAttribute('data-scope', 'json-tree-view');
});

// Ark supplies an empty indentGuide slot even when omitted, suppressing the
// node's built-in indentGuide fallback. A custom named slot works.
test.skip.each([
  ['Ark', ArkJsonTreeView, ArkJsonTreeViewTree],
  ['moduix', JsonTreeView, JsonTreeViewTree],
])('%s renders built-in indentation guides when requested', (_name, Root, Tree) => {
  const { container } = render(
    defineComponent({
      components: { Root, Tree },
      setup: () => ({ data }),
      template: '<Root :data="data" :default-expanded-depth="3"><Tree indent-guide /></Root>',
    }),
  );
  expect(container.querySelector('[data-part="branch-indent-guide"]')).not.toBeNull();
});

// Ark Vue 5.39.2 snapshots data before creating its computed collection.
// Keep the direct Ark reproduction and re-enable after the upstream fix.
test.skip.each([
  ['Ark', ArkJsonTreeView, ArkJsonTreeViewTree],
  ['moduix', JsonTreeView, JsonTreeViewTree],
])('%s updates rendered nodes when data is replaced', async (_name, Root, Tree) => {
  const currentData = ref({ status: 'before' });
  render(
    defineComponent({
      components: { Root, Tree },
      setup: () => ({ currentData }),
      template: '<Root :data="currentData" :default-expanded-depth="2"><Tree /></Root>',
    }),
  );
  expect(screen.getByText('"before"')).toBeInTheDocument();
  currentData.value = { status: 'after' };
  await waitFor(() => expect(screen.getByText('"after"')).toBeInTheDocument());
  expect(screen.queryByText('"before"')).not.toBeInTheDocument();
});

// Ark's hook snapshots toValue(props), including data and preview options.
test.skip.each([
  ['Ark', useArkJsonTreeView],
  ['moduix', useJsonTreeView],
])('%s hook tracks replaced data and preview options', async (_name, useTree) => {
  const currentData = ref({ status: 'before' });
  const maxPreviewItems = ref(1);
  let tree: ReturnType<typeof useJsonTreeView> | undefined;
  render(
    defineComponent({
      setup() {
        tree = useTree(
          computed(() => ({ data: currentData.value, maxPreviewItems: maxPreviewItems.value })),
        );
        return {};
      },
      template: '<div />',
    }),
  );
  const initialCollection = tree?.value.collection;
  currentData.value = { status: 'after' };
  maxPreviewItems.value = 2;
  await nextTick();
  expect(tree?.value.collection).not.toBe(initialCollection);
  expect(tree?.value.options.maxPreviewItems).toBe(2);
});

test.each([
  ['Ark', ArkJsonTreeView, ArkJsonTreeViewTree],
  ['moduix', JsonTreeView, JsonTreeViewTree],
])('%s forwards expansion events from the root', async (_name, Root, Tree) => {
  const handleExpandedChange = rs.fn();
  render(
    defineComponent({
      components: { Root, Tree },
      setup: () => ({ data, handleExpandedChange }),
      template:
        '<Root :data="data" :default-expanded-depth="1" @expanded-change="handleExpandedChange"><Tree /></Root>',
    }),
  );
  const rootBranch = screen.getAllByRole('button')[0];
  await fireEvent.click(rootBranch);
  await waitFor(() => expect(rootBranch).toHaveAttribute('data-state', 'closed'));
  expect(handleExpandedChange).toHaveBeenCalledTimes(1);
});

// JsonTreeViewRoot declares model props but no emits; Vue filters model listeners
// before forwarding attrs to TreeViewRoot. The direct Ark path fails identically.
test.skip.each([
  ['Ark', ArkJsonTreeView, ArkJsonTreeViewTree],
  ['moduix', JsonTreeView, JsonTreeViewTree],
])('%s reflects controlled selection updates in the DOM', async (_name, Root, Tree) => {
  const selected = ref<string[]>([]);
  render(
    defineComponent({
      components: { Root, Tree },
      setup: () => ({ data, selected }),
      template:
        '<Root :data="data" :default-expanded-depth="3" v-model:selected-value="selected"><Tree /></Root>',
    }),
  );
  const item = screen.getByRole('treeitem', { name: 'status: "ready"' });
  await new Promise((resolve) => setTimeout(resolve, 0));
  await fireEvent.click(item, { button: 0 });
  expect(selected.value).toEqual([item.getAttribute('data-value')]);
  await waitFor(() => expect(item).toHaveAttribute('aria-selected', 'true'));
});
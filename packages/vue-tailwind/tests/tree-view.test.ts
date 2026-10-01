import {
  TreeViewNodeCheckboxIndicator as ArkTreeViewNodeCheckboxIndicator,
  TreeViewNodeProvider as ArkTreeViewNodeProvider,
  TreeViewRoot as ArkTreeViewRoot,
} from '@ark-ui/vue/tree-view';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref, shallowRef } from 'vue';
import type { Component, ComponentPublicInstance, PropType } from 'vue';
import {
  TreeView,
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewBranchIndicator,
  TreeViewBranchIndentGuide,
  TreeViewBranchText,
  TreeViewItem,
  TreeViewItemText,
  TreeViewLabel,
  TreeViewNode,
  TreeViewNodeCheckbox,
  TreeViewNodeCheckboxIndicator,
  TreeViewNodeProvider,
  TreeViewNodeRenameInput,
  TreeViewRootProvider,
  TreeViewTree,
  createTreeCollection,
  useTreeView,
} from '../src/components/tree-view';

interface FileNode {
  children?: FileNode[];
  childrenCount?: number;
  disabled?: boolean;
  id: string;
  name: string;
}

const collection = createTreeCollection<FileNode>({
  nodeToString: (node) => node.name,
  nodeToValue: (node) => node.id,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'src', name: 'src', children: [{ id: 'src/App.tsx', name: 'App.tsx' }] },
      { id: 'README.md', name: 'README.md' },
    ],
  },
});

const treeComponents = {
  TreeView,
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewBranchIndicator,
  TreeViewBranchIndentGuide,
  TreeViewBranchText,
  TreeViewItem,
  TreeViewItemText,
  TreeViewLabel,
  TreeViewNode,
  TreeViewNodeCheckbox,
  TreeViewNodeCheckboxIndicator,
  TreeViewNodeProvider,
  TreeViewNodeRenameInput,
  TreeViewRootProvider,
  TreeViewTree,
} as unknown as Record<string, Component>;

const FileTreeNode = defineComponent({
  name: 'FileTreeNode',
  components: treeComponents,
  props: {
    node: { type: Object as PropType<FileNode>, required: true },
    indexPath: { type: Array as PropType<number[]>, required: true },
  },
  template: `
    <TreeViewNode :node="node" :index-path="indexPath" v-slot="{ node: currentNode, indexPath: currentIndexPath, state }">
      <TreeViewBranch v-if="state.isBranch">
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>{{ currentNode.name }}</TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewBranchIndentGuide />
          <FileTreeNode
            v-for="(child, index) in currentNode.children"
            :key="child.id"
            :node="child"
            :index-path="[...currentIndexPath, index]"
          />
        </TreeViewBranchContent>
      </TreeViewBranch>
      <TreeViewItem v-else>
        <TreeViewItemText>{{ currentNode.name }}</TreeViewItemText>
      </TreeViewItem>
    </TreeViewNode>
  `,
});

const storyComponents = { ...treeComponents, FileTreeNode };

const TreeParts = defineComponent({
  components: { ...storyComponents },
  setup() {
    return { collection };
  },
  template: `
    <TreeViewLabel>Project files</TreeViewLabel>
    <TreeViewTree>
      <FileTreeNode
        v-for="(node, index) in collection.rootNode.children"
        :key="node.id"
        :node="node"
        :index-path="[index]"
      />
    </TreeViewTree>
  `,
});

const TestTree = defineComponent({
  components: { ...storyComponents, TreeParts },
  setup() {
    return { collection };
  },
  template: `
    <TreeView :collection="collection">
      <TreeParts />
    </TreeView>
  `,
});

test('preserves TreeView anatomy, labels, refs, attrs, and the Node convenience helper', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: { ...storyComponents, TreeParts },
    setup() {
      return { collection, rootRef };
    },
    template: `
      <TreeView ref="rootRef" :collection="collection" :default-expanded-value="['src']" data-probe="root">
        <TreeParts />
      </TreeView>
    `,
  });

  render(Harness);

  const tree = screen.getByRole('tree', { name: 'Project files' });
  const root = rootRef.value?.$el as HTMLElement;

  expect(root).toHaveAttribute('data-slot', 'tree-view-root');
  expect(root).toHaveAttribute('data-scope', 'tree-view');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(tree).toHaveAttribute('data-slot', 'tree-view-tree');
  expect(screen.getByRole('button', { name: 'src' })).toHaveAttribute(
    'data-slot',
    'tree-view-branch-control',
  );
  expect(screen.getByRole('treeitem', { name: 'App.tsx' })).toHaveAttribute(
    'data-slot',
    'tree-view-item',
  );
});

test('wraps the checkbox indicator with its data-slot and consumer class', () => {
  const Harness = defineComponent({
    components: storyComponents,
    setup() {
      return { collection };
    },
    template: `
      <TreeView :collection="collection">
        <TreeViewLabel>Checked files</TreeViewLabel>
        <TreeViewTree>
          <TreeViewNode :node="collection.rootNode.children[1]" :index-path="[1]" v-slot="{ node }">
            <TreeViewItem>
              <TreeViewNodeCheckbox>
                <TreeViewNodeCheckboxIndicator class="indicator-class" />
              </TreeViewNodeCheckbox>
              <TreeViewItemText>{{ node.name }}</TreeViewItemText>
            </TreeViewItem>
          </TreeViewNode>
        </TreeViewTree>
      </TreeView>
    `,
  });

  render(Harness);

  const indicator = document.querySelector('[data-slot="tree-view-node-checkbox-indicator"]');

  expect(indicator?.tagName).toBe('SPAN');
  expect(indicator).toHaveClass('indicator-class');
});

test('keeps component-owned utilities on empty visual parts', () => {
  render(
    defineComponent({
      components: { ...storyComponents, TreeParts },
      setup() {
        return { collection };
      },
      template: `
        <TreeView :collection="collection" :default-expanded-value="['src']">
          <TreeParts />
        </TreeView>
      `,
    }),
  );

  expect(document.querySelector('[data-slot="tree-view-branch-indicator"]')).toHaveClass(
    'inline-flex',
    'size-4',
    'shrink-0',
  );
  expect(document.querySelector('[data-slot="tree-view-branch-indent-guide"]')).toHaveClass(
    'absolute',
    'inset-y-0',
    'w-px',
    'bg-border',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const Harness = defineComponent({
    components: { ...storyComponents, TreeParts },
    setup() {
      return { collection };
    },
    template: `
      <TreeView class="w-96" :collection="collection">
        <TreeParts />
      </TreeView>
    `,
  });

  const { container } = render(Harness);
  const root = container.firstElementChild;

  expect(root).toHaveClass('w-96');
  expect(root).not.toHaveClass('w-80');
});

test('keeps controlled expansion and Ark callback details available through Vue events', async () => {
  const events: string[][] = [];
  const Harness = defineComponent({
    components: { ...storyComponents, TreeParts },
    setup() {
      const expandedValue = ref<string[]>([]);
      return { collection, events, expandedValue };
    },
    template: `
      <TreeView
        v-model:expanded-value="expandedValue"
        :collection="collection"
        @expanded-change="events.push($event.expandedValue)"
      >
        <TreeParts />
      </TreeView>
      <output>Expanded: {{ expandedValue.join(', ') }}</output>
    `,
  });

  render(Harness);

  await fireEvent.click(screen.getByRole('button', { name: 'src' }));
  await waitFor(() => expect(screen.getByRole('treeitem', { name: 'App.tsx' })).toBeVisible());
  expect(screen.getByText('Expanded: src')).toBeInTheDocument();
  expect(events).toEqual([['src']]);
});

test('preserves Ark keyboard expansion and roving focus', async () => {
  render(TestTree);

  const src = screen.getByRole('button', { name: 'src' });
  src.focus();
  await fireEvent.focusIn(src);
  await fireEvent.keyDown(src, { key: 'ArrowRight' });

  const app = await screen.findByRole('treeitem', { name: 'App.tsx' });
  expect(src).toHaveAttribute('data-state', 'open');

  await fireEvent.keyDown(src, { key: 'ArrowDown' });
  await waitFor(() => expect(app).toHaveFocus());
});

test('preserves disabled node semantics', () => {
  const disabledCollection = createTreeCollection<FileNode>({
    isNodeDisabled: (node) => node.disabled === true,
    nodeToString: (node) => node.name,
    nodeToValue: (node) => node.id,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [{ disabled: true, id: 'archive', name: 'Archived files' }],
    },
  });

  const Harness = defineComponent({
    components: storyComponents,
    setup() {
      return { disabledCollection };
    },
    template: `
      <TreeView :collection="disabledCollection">
        <TreeViewLabel>Archives</TreeViewLabel>
        <TreeViewTree>
          <TreeViewNode :node="disabledCollection.rootNode.children[0]" :index-path="[0]" v-slot="{ node }">
            <TreeViewItem><TreeViewItemText>{{ node.name }}</TreeViewItemText></TreeViewItem>
          </TreeViewNode>
        </TreeViewTree>
      </TreeView>
    `,
  });

  render(Harness);

  const archive = screen.getByRole('treeitem', { name: 'Archived files' });

  expect(archive).toHaveAttribute('data-disabled');
  fireEvent.click(archive);
  expect(archive).not.toHaveAttribute('data-selected');
});

test('keeps RootProvider, context boundaries, and semantic item composition available', () => {
  const providerRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: storyComponents,
    setup() {
      return { collection, providerRef, itemRef, treeView: useTreeView({ collection }) };
    },
    template: `
      <TreeViewRootProvider ref="providerRef" :value="treeView" as-child>
        <section data-probe="provider-host">
        <TreeViewLabel>Documentation</TreeViewLabel>
        <TreeViewTree>
          <TreeViewNodeProvider :node="collection.rootNode.children[1]" :index-path="[1]">
            <TreeViewItem ref="itemRef" as-child><a href="/docs">README.md</a></TreeViewItem>
          </TreeViewNodeProvider>
        </TreeViewTree>
        </section>
      </TreeViewRootProvider>
    `,
  });

  render(Harness);

  expect(screen.getByRole('tree', { name: 'Documentation' })).toHaveAttribute(
    'data-slot',
    'tree-view-tree',
  );
  const linkItem = screen.getByRole('treeitem', { name: 'README.md' });
  expect(linkItem.tagName).toBe('A');
  expect(linkItem).toHaveAttribute('href', '/docs');
  expect(linkItem).toHaveAttribute('data-slot', 'tree-view-item');
  expect(itemRef.value?.$el).toBe(linkItem);
  expect(providerRef.value?.$el.tagName).toBe('SECTION');
  expect(providerRef.value?.$el).toHaveAttribute('data-probe', 'provider-host');
  expect(providerRef.value?.$el).toHaveAttribute('data-slot', 'tree-view-root-provider');
});

test('keeps selection and focus models controlled with single native event delivery', async () => {
  const selectedValue = ref<string[]>([]);
  const focusedValue = ref<string>();
  const selectionChange = rs.fn();
  const focusChange = rs.fn();
  render(
    defineComponent({
      components: { ...storyComponents, TreeParts },
      setup: () => ({ collection, selectedValue, focusedValue, selectionChange, focusChange }),
      template: `
      <TreeView :collection="collection" v-model:selected-value="selectedValue" v-model:focused-value="focusedValue"
        @selection-change="selectionChange" @focus-change="focusChange">
        <TreeParts />
      </TreeView>
    `,
    }),
  );

  const readme = screen.getByRole('treeitem', { name: 'README.md' });
  await fireEvent.click(readme);
  await waitFor(() => expect(selectedValue.value).toEqual(['README.md']));
  expect(readme).toHaveAttribute('aria-selected', 'true');
  expect(selectionChange).toHaveBeenCalledTimes(1);
  expect(selectionChange.mock.calls[0][0]).toMatchObject({
    selectedValue: ['README.md'],
    selectedNodes: [collection.rootNode.children![1]],
  });

  readme.focus();
  await fireEvent.focusIn(readme);
  await waitFor(() => expect(focusedValue.value).toBe('README.md'));
  expect(focusChange).toHaveBeenCalledTimes(1);
});

test('renders checked, mixed, and unchecked indicator slots as the controlled model changes', async () => {
  const checkedValue = ref<string[]>([]);
  const checkedChange = rs.fn();
  render(
    defineComponent({
      components: storyComponents,
      setup: () => ({ collection, checkedValue, checkedChange }),
      template: `
      <TreeView :collection="collection" v-model:checked-value="checkedValue" @checked-change="checkedChange">
        <TreeViewLabel>Checkbox files</TreeViewLabel>
        <TreeViewTree>
          <TreeViewNodeProvider :node="collection.rootNode.children[1]" :index-path="[1]">
            <TreeViewItem>
              <TreeViewNodeCheckbox aria-label="Check README">
                <TreeViewNodeCheckboxIndicator>
                  <template #default><span>Checked icon</span></template>
                  <template #fallback><span>Unchecked icon</span></template>
                </TreeViewNodeCheckboxIndicator>
              </TreeViewNodeCheckbox>
              <TreeViewItemText>README.md</TreeViewItemText>
            </TreeViewItem>
          </TreeViewNodeProvider>
        </TreeViewTree>
      </TreeView>
    `,
    }),
  );

  const checkbox = screen.getByRole('checkbox', { name: 'Check README' });
  expect(checkbox).toHaveAttribute('aria-checked', 'false');
  expect(screen.getByText('Unchecked icon')).toBeInTheDocument();
  await fireEvent.click(checkbox);
  await waitFor(() => expect(checkedValue.value).toEqual(['README.md']));
  expect(checkbox).toHaveAttribute('aria-checked', 'true');
  expect(screen.getByText('Checked icon')).toBeInTheDocument();
  expect(screen.queryByText('Unchecked icon')).not.toBeInTheDocument();
  expect(checkedChange).toHaveBeenCalledTimes(1);

  checkedValue.value = [];
  await nextTick();
  expect(checkbox).toHaveAttribute('aria-checked', 'false');
  expect(screen.getByText('Unchecked icon')).toBeInTheDocument();
});

test('preserves the mixed-state slot and default mixed/check icons', async () => {
  const checkboxCollection = createTreeCollection<FileNode>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [
        {
          id: 'src',
          name: 'src',
          children: [
            { id: 'src/App.tsx', name: 'App.tsx' },
            { id: 'src/main.tsx', name: 'main.tsx' },
          ],
        },
      ],
    },
  });
  const checkedValue = ref(['src/App.tsx']);
  render(
    defineComponent({
      components: storyComponents,
      setup: () => ({ checkboxCollection, checkedValue }),
      template: `
      <TreeView :collection="checkboxCollection" :checked-value="checkedValue">
        <TreeViewNodeProvider :node="checkboxCollection.rootNode.children[0]" :index-path="[0]">
          <TreeViewBranch>
            <TreeViewBranchControl>
              <TreeViewNodeCheckbox aria-label="Check source">
                <TreeViewNodeCheckboxIndicator data-testid="default-indicator" />
                <TreeViewNodeCheckboxIndicator>
                  <template #indeterminate><span>Mixed icon</span></template>
                </TreeViewNodeCheckboxIndicator>
              </TreeViewNodeCheckbox>
              <TreeViewBranchText>src</TreeViewBranchText>
            </TreeViewBranchControl>
          </TreeViewBranch>
        </TreeViewNodeProvider>
      </TreeView>
    `,
    }),
  );
  const checkbox = screen.getByRole('checkbox', { name: 'Check source' });
  expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  expect(screen.getByText('Mixed icon')).toBeInTheDocument();
  expect(screen.getByTestId('default-indicator').querySelector('svg')).toBeInTheDocument();
  checkedValue.value = ['src/App.tsx', 'src/main.tsx'];
  await nextTick();
  expect(checkbox).toHaveAttribute('aria-checked', 'true');
  expect(screen.queryByText('Mixed icon')).not.toBeInTheDocument();
  expect(screen.getByTestId('default-indicator').querySelector('svg')).toBeInTheDocument();
});

// Ark Vue 5.39.2 declares these props but its implementation only renders named slots.
test.skip('upstream: native Ark renders declared checkbox indicator fallback and indeterminate props', async () => {
  const checkedValue = ref<string[]>([]);
  render(
    defineComponent({
      components: { ArkTreeViewRoot, ArkTreeViewNodeProvider, ArkTreeViewNodeCheckboxIndicator },
      setup: () => ({ collection, checkedValue }),
      template: `
      <ArkTreeViewRoot :collection="collection" :checked-value="checkedValue">
        <ArkTreeViewNodeProvider :node="collection.rootNode.children[1]" :index-path="[1]">
          <ArkTreeViewNodeCheckboxIndicator fallback="Unchecked fallback" indeterminate="Mixed fallback" />
        </ArkTreeViewNodeProvider>
      </ArkTreeViewRoot>
    `,
    }),
  );
  expect(screen.getByText('Unchecked fallback')).toBeInTheDocument();
});

test('preserves rename input asChild refs, attrs, and native rename completion', async () => {
  const renameComplete = rs.fn();
  const inputRef = ref<ComponentPublicInstance>();
  render(
    defineComponent({
      components: storyComponents,
      setup: () => ({ collection, inputRef, renameComplete }),
      template: `
      <TreeView :collection="collection" :can-rename="() => true" @rename-complete="renameComplete">
        <TreeViewLabel>Rename files</TreeViewLabel>
        <TreeViewTree>
          <TreeViewNodeProvider :node="collection.rootNode.children[1]" :index-path="[1]">
            <TreeViewItem>
              <TreeViewItemText>README.md</TreeViewItemText>
              <TreeViewNodeRenameInput ref="inputRef" as-child data-probe="rename">
                <input aria-label="File name" />
              </TreeViewNodeRenameInput>
            </TreeViewItem>
          </TreeViewNodeProvider>
        </TreeViewTree>
      </TreeView>
    `,
    }),
  );
  const item = screen.getByRole('treeitem', { name: 'README.md' });
  item.focus();
  await fireEvent.focusIn(item);
  await fireEvent.keyDown(item, { key: 'F2' });
  const input = await screen.findByRole('textbox', { name: 'File name' });
  expect(inputRef.value?.$el).toBe(input);
  expect(input).toHaveAttribute('data-probe', 'rename');
  expect(input).toHaveAttribute('data-slot', 'tree-view-node-rename-input');
  await waitFor(() => expect(input).toHaveFocus());
  await fireEvent.update(input, 'GUIDE.md');
  await fireEvent.keyDown(input, { key: 'Enter' });
  expect(renameComplete).toHaveBeenCalledTimes(1);
  expect(renameComplete.mock.calls[0][0]).toMatchObject({ value: 'README.md', label: 'GUIDE.md' });
});

test('loads children through native events and a replaced shallow collection', async () => {
  const lazyCollection = shallowRef(
    createTreeCollection<FileNode & { childrenCount?: number }>({
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
      rootNode: { id: 'ROOT', name: '', children: [{ id: 'src', name: 'src', childrenCount: 1 }] },
    }),
  );
  const loadChildren = rs.fn(async () => [{ id: 'src/App.tsx', name: 'App.tsx' }]);
  const complete = rs.fn((details: { collection: typeof lazyCollection.value }) => {
    lazyCollection.value = details.collection;
  });
  render(
    defineComponent({
      components: storyComponents,
      setup: () => ({ lazyCollection, loadChildren, complete }),
      template: `
      <TreeView :collection="lazyCollection" :load-children="loadChildren" @load-children-complete="complete">
        <TreeViewLabel>Lazy files</TreeViewLabel>
        <TreeViewTree>
          <FileTreeNode v-for="(node, index) in lazyCollection.rootNode.children"
            :key="node.id" :node="node" :index-path="[index]" />
        </TreeViewTree>
      </TreeView>
    `,
    }),
  );
  await fireEvent.click(screen.getByRole('button', { name: 'src' }));
  expect(await screen.findByRole('treeitem', { name: 'App.tsx' })).toBeVisible();
  expect(loadChildren).toHaveBeenCalledTimes(1);
  expect(complete).toHaveBeenCalledTimes(1);
  expect(lazyCollection.value.rootNode.children![0].children).toEqual([
    { id: 'src/App.tsx', name: 'App.tsx' },
  ]);
});

test('renders the public anatomy on the server and hydrates stable ids', async () => {
  const App = defineComponent({
    components: { ...storyComponents, TreeParts },
    setup() {
      return { collection };
    },
    template: `
      <TreeView :collection="collection" :default-expanded-value="['src']" as-child>
        <section><TreeParts /></section>
      </TreeView>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="tree-view-root"');
  expect(html).toContain('data-slot="tree-view-tree"');
  expect(html).toContain('data-slot="tree-view-item"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const serverNodes = [...host.querySelectorAll('*')];
  const consoleError = rs.spyOn(console, 'error').mockImplementation(() => {});
  const consoleWarn = rs.spyOn(console, 'warn').mockImplementation(() => {});
  const app = createSSRApp(App);
  app.mount(host);
  await nextTick();
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  expect([...host.querySelectorAll('*')]).toEqual(serverNodes);
  expect(consoleError).not.toHaveBeenCalled();
  expect(consoleWarn).not.toHaveBeenCalled();
  app.unmount();
  consoleError.mockRestore();
  consoleWarn.mockRestore();
  host.remove();
});
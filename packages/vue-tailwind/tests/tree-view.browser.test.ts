import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref, shallowRef } from 'vue';
import type { Component, ComponentPublicInstance, PropType } from 'vue';
import type {
  TreeViewRenameCompleteDetails,
  TreeViewRenameStartDetails,
} from '../src/components/tree-view';
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
import SsrTreeView from './fixtures/SsrTreeView.vue';

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

test('preserves TreeView anatomy, labels, refs, attrs, and the Node convenience helper', async () => {
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

  const root = rootRef.value?.$el as HTMLElement;

  expect(root!.getAttribute('data-slot')).toBe('tree-view-root');
  expect(root!.getAttribute('data-scope')).toBe('tree-view');
  expect(root!.getAttribute('data-probe')).toBe('root');
  await expect
    .element(page.getByRole('tree', { name: 'Project files', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-tree');
  await expect
    .element(page.getByRole('button', { name: 'src', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-branch-control');
  await expect
    .element(page.getByRole('treeitem', { name: 'App.tsx', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-item');
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
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['indicator-class']));
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

  expect([
    ...document.querySelector('[data-slot="tree-view-branch-indicator"]')!.classList,
  ]).toEqual(expect.arrayContaining(['inline-flex', 'size-4', 'shrink-0']));
  expect([
    ...document.querySelector('[data-slot="tree-view-branch-indent-guide"]')!.classList,
  ]).toEqual(expect.arrayContaining(['absolute', 'inset-y-0', 'w-px', 'bg-border']));
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
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

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-96']));
  expect(root!.classList.contains('w-80')).toBe(false);
  await expect.element(page.locator('[data-slot="tree-view-root"]')).toHaveCSS('width', '384px');
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

  await page.getByRole('button', { name: 'src', exact: true }).click();
  await expect.element(page.getByRole('treeitem', { name: 'App.tsx', exact: true })).toBeVisible();
  await expect.element(page.getByText('Expanded: src')).toBeAttached();
  expect(events).toEqual([['src']]);
});

test('preserves Ark keyboard expansion and roving focus', async () => {
  render(TestTree);

  const button = page.getByRole('button', { name: 'src', exact: true });
  await button.press('ArrowRight');

  await expect.element(button).toHaveAttribute('data-state', 'open');

  await button.press('ArrowDown');
  await expect.element(page.getByRole('treeitem', { name: 'App.tsx', exact: true })).toBeFocused();
});

test('preserves disabled node semantics', async () => {
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

  await expect
    .element(page.getByRole('treeitem', { name: 'Archived files', exact: true }))
    .toHaveAttribute('data-disabled');
  // Dispatch checks the event guard; native clicks reject aria-disabled nodes.
  screen
    .getByRole('treeitem', { name: 'Archived files' })
    .dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  await expect
    .element(page.getByRole('treeitem', { name: 'Archived files', exact: true }))
    .not.toHaveAttribute('data-selected');
});

test('keeps RootProvider, context boundaries, and semantic item composition available', async () => {
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

  await expect
    .element(page.getByRole('tree', { name: 'Documentation', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-tree');
  const linkItem = screen.getByRole('treeitem', { name: 'README.md' });
  expect(linkItem.tagName).toBe('A');
  await expect
    .element(page.getByRole('treeitem', { name: 'README.md', exact: true }))
    .toHaveAttribute('href', '/docs');
  await expect
    .element(page.getByRole('treeitem', { name: 'README.md', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-item');
  expect(itemRef.value?.$el).toBe(linkItem);
  expect(providerRef.value?.$el.tagName).toBe('SECTION');
  expect(providerRef.value!.$el.getAttribute('data-probe')).toBe('provider-host');
  expect(providerRef.value!.$el.getAttribute('data-slot')).toBe('tree-view-root-provider');
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

  await page.getByRole('treeitem', { name: 'README.md', exact: true }).click();
  await expect.poll(() => selectedValue.value).toEqual(['README.md']);
  await expect
    .element(page.getByRole('treeitem', { name: 'README.md', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  expect(selectionChange).toHaveBeenCalledTimes(1);
  expect(selectionChange.mock.calls[0][0]).toMatchObject({
    selectedValue: ['README.md'],
    selectedNodes: [collection.rootNode.children![1]],
  });

  await expect.poll(() => focusedValue.value).toBe('README.md');
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

  const rootLocator = page.getByRole('checkbox', { name: 'Check README', exact: true });
  await expect.element(rootLocator).toHaveAttribute('aria-checked', 'false');
  const textLocator = page.getByText('Unchecked icon');
  await expect.element(textLocator).toBeAttached();
  await rootLocator.click();
  await expect.poll(() => checkedValue.value).toEqual(['README.md']);
  await expect.element(rootLocator).toHaveAttribute('aria-checked', 'true');
  await expect.element(page.getByText('Checked icon')).toBeAttached();
  await expect.element(textLocator).toHaveCount(0);
  expect(checkedChange).toHaveBeenCalledTimes(1);

  checkedValue.value = [];
  await nextTick();
  await expect.element(rootLocator).toHaveAttribute('aria-checked', 'false');
  await expect.element(textLocator).toBeAttached();
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

  await expect
    .element(page.getByRole('checkbox', { name: 'Check source', exact: true }))
    .toHaveAttribute('aria-checked', 'mixed');
  await expect.element(page.getByText('Mixed icon')).toBeAttached();
  expect(Boolean(screen.getByTestId('default-indicator').querySelector('svg')?.isConnected)).toBe(
    true,
  );
  checkedValue.value = ['src/App.tsx', 'src/main.tsx'];
  await nextTick();
  await expect
    .element(page.getByRole('checkbox', { name: 'Check source', exact: true }))
    .toHaveAttribute('aria-checked', 'true');
  await expect.element(page.getByText('Mixed icon')).toHaveCount(0);
  expect(Boolean(screen.getByTestId('default-indicator').querySelector('svg')?.isConnected)).toBe(
    true,
  );
});

// Zag focuses the rename input before Vue removes `hidden`.
// Bare Ark reproduces this. Re-enable after upstream fixes post-render rename focus.
test.skip('preserves rename input asChild refs, attrs, and native rename completion', async () => {
  const order: string[] = [];
  const renameStart = rs.fn((_details: TreeViewRenameStartDetails<FileNode>) =>
    order.push('start'),
  );
  const beforeRename = rs.fn((_details: TreeViewRenameCompleteDetails) => order.push('before'));
  const renameComplete = rs.fn((_details: TreeViewRenameCompleteDetails) => order.push('complete'));
  const inputRef = ref<ComponentPublicInstance>();
  render(
    defineComponent({
      components: storyComponents,
      setup: () => ({ collection, inputRef, renameStart, beforeRename, renameComplete }),
      template: `
      <TreeView :collection="collection" :can-rename="() => true"
        @rename-start="renameStart" @before-rename="beforeRename" @rename-complete="renameComplete">
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

  await page.getByRole('treeitem', { name: 'README.md', exact: true }).press('F2');
  const input = screen.getByRole('textbox', { name: 'File name' });
  expect(inputRef.value?.$el).toBe(input);
  const inputLocator = page.getByRole('textbox', { name: 'File name', exact: true });
  await expect.element(inputLocator).toHaveAttribute('data-probe', 'rename');
  await expect.element(inputLocator).toHaveAttribute('data-slot', 'tree-view-node-rename-input');
  await expect.element(inputLocator).toBeFocused();
  await inputLocator.fill('GUIDE.md');
  await inputLocator.press('Enter');
  expect(renameComplete).toHaveBeenCalledTimes(1);
  expect(renameComplete.mock.calls[0][0]).toMatchObject({ value: 'README.md', label: 'GUIDE.md' });
  expect(renameStart).toHaveBeenCalledTimes(1);
  expect(renameStart.mock.calls[0][0]).toMatchObject({
    value: 'README.md',
    node: collection.rootNode.children![1],
    indexPath: [1],
  });
  expect(beforeRename).toHaveBeenCalledTimes(1);
  expect(beforeRename.mock.calls[0][0]).toEqual(renameComplete.mock.calls[0][0]);
  expect(order).toEqual(['start', 'before', 'complete']);
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
  await page.getByRole('button', { name: 'src', exact: true }).click();
  await expect.element(page.getByRole('treeitem', { name: 'App.tsx', exact: true })).toBeVisible();
  expect(loadChildren).toHaveBeenCalledTimes(1);
  expect(complete).toHaveBeenCalledTimes(1);
  expect(lazyCollection.value.rootNode.children![0].children).toEqual([
    { id: 'src/App.tsx', name: 'App.tsx' },
  ]);
});

test('delivers native lazy-loading errors once without replacing the collection', async () => {
  const lazyCollection = createTreeCollection<FileNode>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: { id: 'ROOT', name: '', children: [{ id: 'src', name: 'src', childrenCount: 1 }] },
  });
  const error = new Error('Cannot load files');
  const loadChildren = rs.fn().mockRejectedValue(error);
  const failed = rs.fn();
  const complete = rs.fn();
  render(
    defineComponent({
      components: storyComponents,
      setup: () => ({ lazyCollection, loadChildren, failed, complete }),
      template: `
      <TreeView :collection="lazyCollection" :load-children="loadChildren"
        @load-children-error="failed" @load-children-complete="complete">
        <TreeViewLabel>Lazy files</TreeViewLabel>
        <TreeViewTree>
          <FileTreeNode v-for="(node, index) in lazyCollection.rootNode.children"
            :key="node.id" :node="node" :index-path="[index]" />
        </TreeViewTree>
      </TreeView>
    `,
    }),
  );

  await page.getByRole('button', { name: 'src', exact: true }).click();
  await expect.poll(() => failed).toHaveBeenCalledTimes(1);
  expect(failed.mock.calls[0][0]).toMatchObject({
    nodes: [{ node: lazyCollection.rootNode.children![0], error, indexPath: [0] }],
  });
  expect(loadChildren).toHaveBeenCalledTimes(1);
  expect(complete).not.toHaveBeenCalled();
  expect(lazyCollection.rootNode.children![0].children).toBeUndefined();
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrTreeView));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const root = host.querySelector('[data-slot="tree-view-root"]');
  const serverNodes = [...host.querySelectorAll('*')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(root).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrTreeView);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('[data-slot="tree-view-root"]')).toBe(root);
    expect([...host.querySelectorAll('*')]).toEqual(serverNodes);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('button', { name: 'src', exact: true }).click();
    await expect
      .element(page.getByRole('button', { name: 'src', exact: true }))
      .toHaveAttribute('data-state', 'closed');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
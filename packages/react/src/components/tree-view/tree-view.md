# TreeView

## Upstream reference (reviewed 2026-10-24)

- Ark UI: https://ark-ui.com/docs/components/tree-view
- Chakra UI: https://chakra-ui.com/docs/components/tree-view
- Zag: https://zagjs.com/components/react/tree-view
- shadcn/ui: https://ui.shadcn.com/llms.txt (no first-party tree view)

## Purpose

`TreeView` displays hierarchical data such as file systems, navigation structures, and nested
resource lists.

## Upstream model to preserve

The wrapper follows Ark UI's React `@ark-ui/react/tree-view` primitive. Preserve the collection
model, explicit `TreeViewNodeProvider` per node, branch/item split, controlled value arrays, callback detail
objects, `TreeViewRootProvider`, context hooks, async loading, checkbox trees, and rename behavior.

## Current behavior contract

- `TreeView` is the styled root component.
- Consumers must pass a `TreeCollection` created by `createTreeCollection` or
  `createFileTreeCollection`.
- Nodes render by mapping `collection.rootNode.children` with `TreeViewNode`, or with the explicit
  `TreeViewNodeProvider node={node} indexPath={indexPath}` path.
- Branches use `TreeViewBranch`, `TreeViewBranchControl`, `TreeViewBranchIndicator`,
  `TreeViewBranchText`, `TreeViewBranchContent`, and optional `TreeViewBranchIndentGuide`.
- Leaves use `TreeViewItem`, `TreeViewItemText`, and optional `TreeViewItemIndicator`.
- `expandedValue`, `selectedValue`, `checkedValue`, and `focusedValue` keep Ark controlled and
  uncontrolled behavior intact.
- `TreeViewBranchIndicator`, `TreeViewBranchTrigger`, `TreeViewItemIndicator`, and
  `TreeViewNodeCheckboxIndicator` render moduix default icons when children are omitted.
- `TreeViewRootProvider`, `useTreeView`, the context hooks, and Ark's part props, callback details,
  and hook types are re-exported from `@moduix/react` with their Ark contracts.
- `TreeViewNode` provides `{ node, indexPath, state }` to its child function without hiding the
  branch/item composition.
- `TreeViewNodeProps<T>` describes that generic `TreeViewNode` shortcut, including its required
  render child; use `TreeViewNodeProviderProps<T>` for a low-level recursive component.

## Anatomy and exported parts

```text
TreeView
├─ TreeViewLabel
└─ TreeViewTree
   └─ TreeViewNode[node, indexPath] or TreeViewNodeProvider[node, indexPath]
      ├─ TreeViewBranch
      │  ├─ TreeViewBranchControl
      │  │  ├─ TreeViewBranchIndicator
      │  │  ├─ TreeViewNodeCheckbox (optional)
      │  │  └─ TreeViewBranchText
      │  └─ TreeViewBranchContent
      │     ├─ TreeViewBranchIndentGuide
      │     └─ nested nodes
      └─ TreeViewItem
         ├─ TreeViewNodeCheckbox (optional)
         ├─ TreeViewItemText
         └─ TreeViewItemIndicator (optional)
```

| Export                          | `data-slot`                         | Notes                          |
| ------------------------------- | ----------------------------------- | ------------------------------ |
| `TreeView`                      | `tree-view-root`                    | Ark root with moduix styling.  |
| `TreeViewRootProvider`          | `tree-view-root-provider`           | RootProvider styled like root. |
| `TreeViewLabel`                 | `tree-view-label`                   | Accessible label.              |
| `TreeViewTree`                  | `tree-view-tree`                    | Tree container.                |
| `TreeViewNode`                  | -                                   | Recursive-renderer shortcut.   |
| `TreeViewNodeProvider`          | -                                   | Ark node/indexPath context.    |
| `TreeViewBranch`                | `tree-view-branch`                  | Expandable node wrapper.       |
| `TreeViewBranchControl`         | `tree-view-branch-control`          | Interactive branch row.        |
| `TreeViewBranchTrigger`         | `tree-view-branch-trigger`          | Dedicated expand trigger.      |
| `TreeViewBranchIndicator`       | `tree-view-branch-indicator`        | Default chevron icon.          |
| `TreeViewBranchText`            | `tree-view-branch-text`             | Branch label content.          |
| `TreeViewBranchContent`         | `tree-view-branch-content`          | Collapsible child region.      |
| `TreeViewBranchIndentGuide`     | `tree-view-branch-indent-guide`     | Optional nesting guide.        |
| `TreeViewItem`                  | `tree-view-item`                    | Leaf node row.                 |
| `TreeViewItemText`              | `tree-view-item-text`               | Leaf label content.            |
| `TreeViewItemIndicator`         | `tree-view-item-indicator`          | Default check icon.            |
| `TreeViewNodeCheckbox`          | `tree-view-node-checkbox`           | Checkbox for node checking.    |
| `TreeViewNodeCheckboxIndicator` | `tree-view-node-checkbox-indicator` | Default checked/mixed icons.   |
| `TreeViewNodeRenameInput`       | `tree-view-node-rename-input`       | Inline rename input.           |

## Composition

```tsx
import {
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewBranchIndentGuide,
  TreeViewBranchIndicator,
  TreeViewBranchText,
  TreeViewItem,
  TreeViewItemText,
  TreeViewNode,
  createTreeCollection,
} from '@moduix/react/tree-view';
import { File as FileIcon, Folder as FolderIcon, FolderOpen as FolderOpenIcon } from 'lucide-react';

const collection = createTreeCollection({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [{ id: 'src', name: 'src', children: [{ id: 'src/main.tsx', name: 'main.tsx' }] }],
  },
});

function TreeNode({ node, indexPath }) {
  return (
    <TreeViewNode node={node} indexPath={indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) =>
        state.isBranch ? (
          <TreeViewBranch>
            <TreeViewBranchControl>
              <TreeViewBranchIndicator />
              <TreeViewBranchText>
                {state.expanded ? <FolderOpenIcon /> : <FolderIcon />}
                {currentNode.name}
              </TreeViewBranchText>
            </TreeViewBranchControl>
            <TreeViewBranchContent>
              <TreeViewBranchIndentGuide />
              {currentNode.children?.map((child, index) => (
                <TreeNode key={child.id} node={child} indexPath={[...currentIndexPath, index]} />
              ))}
            </TreeViewBranchContent>
          </TreeViewBranch>
        ) : (
          <TreeViewItem>
            <TreeViewItemText>
              <FileIcon />
              {currentNode.name}
            </TreeViewItemText>
          </TreeViewItem>
        )
      }
    </TreeViewNode>
  );
}
```

## Upstream feature coverage

- Basic file tree, controlled expanded state, controlled selected state, checkbox trees, async
  loading, rename, link composition with `asChild`, lazy mount, and root provider patterns are
  represented in docs.
- Filtering, expand/collapse all, mutation, disabled node, and virtualized rendering are supported by
  the underlying Ark API but do not require extra moduix wrapper props.
- `createFileTreeCollection` is re-exported for consumers who prefer Ark's file tree helper.

## Accessibility and state

- Ark owns the tree ARIA pattern, roving focus, typeahead, Home/End navigation, arrow-key
  navigation, expand/collapse behavior, checkbox state propagation, and rename keyboard flow.
- Use `TreeViewLabel` to label the tree and `ids` when external composition needs deterministic
  element IDs.
- Branch parts expose `data-state="open|closed"`; checkbox parts expose
  `data-state="checked|unchecked|indeterminate"`; node parts expose `data-focus`, `data-selected`,
  `data-disabled`, `data-loading`, `data-renaming`, `data-depth`, `data-path`, and `data-value`.
- `TreeViewBranchContent` uses Ark's shared collapsible `--height` runtime variable for open/closed
  animation.
- Branch-content animation respects `prefers-reduced-motion`, and `TreeViewBranchIndentGuide` remains
  decorative without receiving pointer interaction.
- `TreeViewBranch`, `TreeViewBranchControl`, `TreeViewItem`, and `TreeViewBranchIndentGuide` use Ark's `--depth` runtime variable
  for indentation.
- Use Ark `useTreeView` with `TreeViewRootProvider`; do not render `TreeView` for the same
  state instance.
- Use `asChild` only with a single semantic child that can receive the required Ark props.
- When a branch uses a separate `TreeViewBranchTrigger`, set `role="none"` on `TreeViewBranchControl` to avoid
  nesting the trigger in another interactive tree item.

## Defaults and styling

- Moduix styling is applied through CSS Modules plus stable `data-slot` hooks.
- CSS Modules expose only `--moduix-tree-view-width` (default `20rem`) and
  `--moduix-tree-view-indent` (default `var(--moduix-spacing-4)`); everything else comes from
  foundation tokens. Override a part with a class or a `data-slot` selector.
- Branch and item rows share hover, selected, focus, disabled, and indentation styling. A private
  `--_tree-view-indent` derives the nesting offset from Ark's `--depth`. The highlight starts
  `--moduix-spacing-1` past it, clear of the parent's indent guide, and the content starts
  `--moduix-spacing-2` past it, so the indicator keeps room inside the highlight; leaf
  rows add `--moduix-spacing-2` so their text lines up under the parent branch text.
- `TreeViewBranchIndentGuide` sits under the center of the branch indicator.
- `TreeViewBranchText` and `TreeViewItemText` are block containers so long names truncate with an
  ellipsis; icons inside them are inline and centered on the text line.
- `TreeViewBranchIndicator` and `TreeViewBranchTrigger` rotate on `data-state="open"`.
- Branch content uses the shared `moduix-collapsible-content-*` keyframes with
  `--moduix-transition-default` and is disabled for reduced-motion preferences.
- A checkbox inside a disabled row does not dim a second time.
- Ark's tree root has no disabled state; disable nodes through the collection's `isNodeDisabled`.

## Intentional sugar and differences from upstream

- Default icons are added for branch indicators, item indicators, and checkbox indicators; use an
  empty `TreeViewNodeCheckboxIndicator` unless the checked or indeterminate icons need customization.
- The docs "Root provider" example is the full low-level composition: `TreeViewNodeProvider` plus
  `TreeViewNodeContext` instead of `TreeViewNode`. Keep it free of the shortcut.
- `TreeViewNode` removes repeated provider/context plumbing while preserving an explicit branch/item
  choice. `TreeViewNodeProvider` remains available for the low-level Ark composition path.
- Put decorative file and folder icons inside `TreeViewBranchText` or `TreeViewItemText`; keep `TreeViewBranchIndicator`
  separate as the expand/collapse affordance.

## Agent notes

- Keep docs imports from `@moduix/react`, including TreeView hooks and types; direct Ark imports are
  escape hatches only.
- Keep `TreeViewNodeProvider` unstyled; it is the context boundary and does not render a public styling slot.
- When registry-shipped tree-view source changes, run `pnpm run build:registry`.
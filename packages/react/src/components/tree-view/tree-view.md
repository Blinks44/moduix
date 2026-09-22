# TreeView

## Upstream reference (reviewed 2026-08-14)

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
- `TreeViewRootProvider`, `useTreeView`, `useTreeViewNodeContext`, `TreeViewNodeProviderProps`, and
  `TreeViewLoadChildrenDetails` are re-exported from `@moduix/react` with their Ark contracts.
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
  TreeViewNodeContext,
  TreeViewContext,
  TreeViewNodeRenameInput,
  TreeViewRootProvider,
  TreeViewItemText,
  TreeViewItem,
  TreeViewBranchIndentGuide,
  TreeViewBranchContent,
  TreeViewBranchText,
  TreeViewNodeCheckbox,
  TreeViewBranchControl,
  TreeViewBranch,
  TreeViewTree,
  TreeViewLabel,
  TreeViewNodeCheckboxIndicator,
  TreeViewItemIndicator,
  TreeViewBranchTrigger,
  TreeViewBranchIndicator,
  TreeViewNodeProvider,
  TreeViewNode,
  TreeView,
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
- Default root width is `20rem` through `--moduix-tree-view-width`.
- Branch and item rows share hover, selected, focus, disabled, and indentation styling.
- Rows have a small `--moduix-tree-view-row-gap` gap so adjacent hover backgrounds stay distinct.
- `TreeViewBranchIndicator` and `TreeViewBranchTrigger` rotate on `data-state="open"`.
- Branch-content animation is disabled for reduced-motion preferences.
- `NodeCheckboxIndicator` renders default check and indeterminate icons when omitted.
- Public `--moduix-tree-view-*` variables are documented in `variables-moduix.css`.

## Intentional sugar and differences from upstream

- Default icons are added for branch indicators, item indicators, and checkbox indicators; use an
  empty `NodeCheckboxIndicator` unless the checked or indeterminate icons need customization.
- File/folder icons are exported from the shared icon pack for examples and consumer convenience.
- `TreeViewNode` removes repeated provider/context plumbing while preserving an explicit branch/item
  choice. `TreeViewNodeProvider` remains available for the low-level Ark composition path.
- Put decorative file and folder icons inside `TreeViewBranchText` or `TreeViewItemText`; keep `TreeViewBranchIndicator`
  separate as the expand/collapse affordance.

## Agent notes

- Keep docs imports from `@moduix/react`, including TreeView hooks and types; direct Ark imports are
  escape hatches only.
- Keep `TreeViewNodeProvider` unstyled; it is the context boundary and does not render a public styling slot.
- When registry-shipped tree-view source changes, run `pnpm run build:registry`.

## Local changelog

- 2026-09-22: Migrated TreeView to the flat public API. The root is `TreeView`, while parts,
  contexts, and the provider use family-prefixed exports; legacy static members are removed.
- 2026-08-14: Corrected `TreeViewNodeProps<T>` to describe the actual generic `TreeViewNode`
  render callback, made disabled rows ignore hover styling, and documented the exact Ark state
  attributes by part.
- 2026-08-01: Added `TreeViewNode`, reduced-motion-safe branch animation, non-interactive
  indent guides, and a configurable row gap.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-12: Re-exported the TreeView hooks and normal recursive-renderer types from moduix, and
  documented the default checkbox-indicator icons as the recommended path.

- 2026-07-03: Removed moduix re-exports for `TreeViewContext`, `TreeViewNodeContext`,
  `useTreeView`, context hooks, and duplicate Ark types. Keep `RootProvider`, recursive
  composition, and icon sugar; import advanced Ark state APIs directly from
  `@ark-ui/react/tree-view`.

- 2026-06-29: Audited Ark UI migration, simplified docs examples to keep explicit recursive
  composition visible, and clarified mutation/virtualization notes.
- 2026-06-23: Added Ark UI `TreeView` wrapper with CSS Modules styling, icon defaults, stories,
  local docs, site docs, and registry metadata.
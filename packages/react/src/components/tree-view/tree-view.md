# TreeView

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tree-view
- Zag: https://zagjs.com/components/react/tree-view

## Purpose

`TreeView` displays hierarchical data such as file systems, navigation structures, and nested
resource lists.

## Upstream model to preserve

The wrapper follows Ark UI's React `@ark-ui/react/tree-view` primitive. Preserve the collection
model, explicit `NodeProvider` per node, branch/item split, controlled value arrays, callback detail
objects, `RootProvider`, context hooks, async loading, checkbox trees, and rename behavior.

## Current behavior contract

- `TreeView` is the short root form and is equivalent to `TreeView.Root`.
- Consumers must pass a `TreeCollection` created by `createTreeCollection` or
  `createFileTreeCollection`.
- Nodes render by mapping `collection.rootNode.children` and wrapping each recursive node with
  `TreeView.NodeProvider node={node} indexPath={indexPath}`.
- Branches use `Branch`, `BranchControl`, `BranchIndicator`, `BranchText`, `BranchContent`, and
  optional `BranchIndentGuide`.
- Leaves use `Item`, `ItemText`, and optional `ItemIndicator`.
- `expandedValue`, `selectedValue`, `checkedValue`, and `focusedValue` keep Ark controlled and
  uncontrolled behavior intact.
- `TreeView.BranchIndicator`, `TreeView.BranchTrigger`, `TreeView.ItemIndicator`, and
  `TreeView.NodeCheckboxIndicator` render moduix default icons when children are omitted.
- `RootProvider` stays available, but advanced hooks such as `useTreeView` and
  `useTreeViewNodeContext` should be imported directly from `@ark-ui/react/tree-view`.

## Anatomy and exported parts

```text
TreeView / TreeView.Root
├─ TreeView.Label
└─ TreeView.Tree
   └─ TreeView.NodeProvider[node, indexPath]
      ├─ TreeView.Branch
      │  ├─ TreeView.BranchControl
      │  │  ├─ TreeView.BranchIndicator
      │  │  ├─ TreeView.NodeCheckbox (optional)
      │  │  └─ TreeView.BranchText
      │  └─ TreeView.BranchContent
      │     ├─ TreeView.BranchIndentGuide
      │     └─ nested nodes
      └─ TreeView.Item
         ├─ TreeView.NodeCheckbox (optional)
         ├─ TreeView.ItemText
         └─ TreeView.ItemIndicator (optional)
```

| Export                           | `data-slot`                         | Notes                          |
| -------------------------------- | ----------------------------------- | ------------------------------ |
| `TreeView` / `TreeView.Root`     | `tree-view-root`                    | Ark root with moduix styling.  |
| `TreeView.RootProvider`          | `tree-view-root-provider`           | RootProvider styled like root. |
| `TreeView.Label`                 | `tree-view-label`                   | Accessible label.              |
| `TreeView.Tree`                  | `tree-view-tree`                    | Tree container.                |
| `TreeView.NodeProvider`          | -                                   | Ark node/indexPath context.    |
| `TreeView.Branch`                | `tree-view-branch`                  | Expandable node wrapper.       |
| `TreeView.BranchControl`         | `tree-view-branch-control`          | Interactive branch row.        |
| `TreeView.BranchTrigger`         | `tree-view-branch-trigger`          | Dedicated expand trigger.      |
| `TreeView.BranchIndicator`       | `tree-view-branch-indicator`        | Default chevron icon.          |
| `TreeView.BranchText`            | `tree-view-branch-text`             | Branch label content.          |
| `TreeView.BranchContent`         | `tree-view-branch-content`          | Collapsible child region.      |
| `TreeView.BranchIndentGuide`     | `tree-view-branch-indent-guide`     | Optional nesting guide.        |
| `TreeView.Item`                  | `tree-view-item`                    | Leaf node row.                 |
| `TreeView.ItemText`              | `tree-view-item-text`               | Leaf label content.            |
| `TreeView.ItemIndicator`         | `tree-view-item-indicator`          | Default check icon.            |
| `TreeView.NodeCheckbox`          | `tree-view-node-checkbox`           | Checkbox for node checking.    |
| `TreeView.NodeCheckboxIndicator` | `tree-view-node-checkbox-indicator` | Default checked/mixed icons.   |
| `TreeView.NodeRenameInput`       | `tree-view-node-rename-input`       | Inline rename input.           |

## Composition

```tsx
import {
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  TreeView,
  createTreeCollection,
} from '@moduix/react';

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
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <TreeNodeContent node={node} indexPath={indexPath} />
    </TreeView.NodeProvider>
  );
}

function TreeNodeContent({ node, indexPath }) {
  const state = useTreeViewNodeContext();

  return node.children ? (
    <TreeView.Branch>
      <TreeView.BranchControl>
        <TreeView.BranchIndicator />
        <TreeView.BranchText>
          {state.expanded ? <FolderOpenIcon /> : <FolderIcon />}
          {node.name}
        </TreeView.BranchText>
      </TreeView.BranchControl>
      <TreeView.BranchContent>
        <TreeView.BranchIndentGuide />
        {node.children.map((child, index) => (
          <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
        ))}
      </TreeView.BranchContent>
    </TreeView.Branch>
  ) : (
    <TreeView.Item>
      <TreeView.ItemText>
        <FileIcon />
        {node.name}
      </TreeView.ItemText>
    </TreeView.Item>
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
- Use `TreeView.Label` to label the tree and `ids` when external composition needs deterministic
  element IDs.
- Preserve Ark state attributes including `data-state`, `data-focus`, `data-selected`,
  `data-disabled`, `data-loading`, `data-renaming`, `data-checked`, `data-indeterminate`,
  `data-depth`, `data-path`, and `data-value`.
- `BranchContent` uses Ark's shared collapsible `--height` runtime variable for open/closed
  animation.
- `Branch`, `BranchControl`, `Item`, and `BranchIndentGuide` use Ark's `--depth` runtime variable
  for indentation.
- Use Ark `useTreeView` with `TreeView.RootProvider`; do not render `TreeView.Root` for the same
  state instance.
- Use `asChild` only with a single semantic child that can receive the required Ark props.

## Defaults and styling

- Moduix styling is applied through CSS Modules plus stable `data-slot` hooks.
- Default root width is `20rem` through `--tree-view-width`.
- Branch and item rows share hover, selected, focus, disabled, and indentation styling.
- `BranchIndicator` and `BranchTrigger` rotate on `data-state="open"`.
- `NodeCheckboxIndicator` renders default check and indeterminate icons when omitted.
- Public `--tree-view-*` variables are documented in `theme.css`.

## Intentional sugar and differences from upstream

- Default icons are added for branch indicators, item indicators, and checkbox indicators.
- File/folder icons are exported from the shared icon pack for examples and consumer convenience.
- No convenience wrapper hides Ark recursive rendering; consumers keep the explicit `NodeProvider`
  and branch/item composition.

## Agent notes

- Keep docs imports from `@moduix/react`, not local component paths.
- Keep `NodeProvider` unstyled; it is the context boundary and does not render a public styling slot.
- When registry-shipped tree-view source changes, run `npm run build:registry`.

## Local changelog

- 2026-07-03: Removed moduix re-exports for `TreeView.Context`, `TreeView.NodeContext`,
  `useTreeView`, context hooks, and duplicate Ark types. Keep `RootProvider`, recursive
  composition, and icon sugar; import advanced Ark state APIs directly from
  `@ark-ui/react/tree-view`.

- 2026-06-29: Audited Ark UI migration, simplified docs examples to keep explicit recursive
  composition visible, and clarified mutation/virtualization notes.
- 2026-06-23: Added Ark UI `TreeView` wrapper with CSS Modules styling, icon defaults, stories,
  local docs, site docs, and registry metadata.
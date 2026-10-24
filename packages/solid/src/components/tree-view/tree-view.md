# TreeView (Solid)

`TreeView` displays hierarchical data such as file systems, navigation structures, and nested
resource lists. It is the native Solid wrapper around Ark UI Solid Tree View.

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/tree-view
- Zag: https://zagjs.com/components/solid/tree-view

## Public contract

`TreeView` is the styled root component. Pass a collection created by `createTreeCollection` or
`createFileTreeCollection`, then compose `TreeViewLabel`, `TreeViewTree`, `TreeViewNode`,
`TreeViewBranch`, and `TreeViewItem` parts.

`TreeViewNode` keeps the recursive-renderer shortcut from the React component. Its render callback
receives `{ node, indexPath, state }`; because Ark Solid state is reactive, read node state as
`state().expanded`, `state().isBranch`, and so on:

```tsx
<TreeViewNode node={node} indexPath={indexPath}>
  {({ node: currentNode, state }) => (
    <Show when={state().isBranch} fallback={<TreeViewItem>{currentNode.name}</TreeViewItem>}>
      <TreeViewBranch>
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>{currentNode.name}</TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent />
      </TreeViewBranch>
    </Show>
  )}
</TreeViewNode>
```

`TreeViewRootProvider` accepts the accessor returned by `useTreeView()`. `TreeViewContext`,
`TreeViewNodeContext`, `useTreeViewContext`, `useTreeViewNodeContext`, and the collection helpers are
re-exported from the component entry point and package root, together with Ark's part props,
callback details, and hook types.

## Anatomy and styling

```text
TreeView
├─ TreeViewLabel
└─ TreeViewTree
   └─ TreeViewNode or TreeViewNodeProvider
      ├─ TreeViewBranch
      │  ├─ TreeViewBranchControl
      │  ├─ TreeViewBranchContent
      │  └─ TreeViewBranchIndentGuide
      └─ TreeViewItem
         ├─ TreeViewItemText
         └─ TreeViewItemIndicator
```

The wrapper adds the same `tree-view-*` `data-slot` hooks and CSS Module as the React component.
Ark retains tree roles, roving focus, keyboard navigation, state attributes, collection behavior,
controlled and uncontrolled values, async loading, checkbox propagation, and rename behavior.

The Solid `NodeCheckboxIndicator` wraps Ark's fragment-only indicator in a styled `span`, because
the installed Ark Solid primitive does not accept DOM props. This keeps the public data slot and
CSS hook available while preserving Ark's checked, indeterminate, and fallback selection.

## Styling

The CSS Module matches React: only `--moduix-tree-view-width` and `--moduix-tree-view-indent` are
public variables, row indentation follows Ark's `--depth`, and branch and item text truncate with an
ellipsis. Ark Solid exports `TreeViewNodeCheckboxIndicatorProps` without DOM props, so the moduix
`TreeViewNodeCheckboxIndicatorProps` adds the `span` props of the wrapper.
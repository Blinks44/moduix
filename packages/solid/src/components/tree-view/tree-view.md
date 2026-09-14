# TreeView (Solid)

`TreeView` displays hierarchical data such as file systems, navigation structures, and nested
resource lists. It is the native Solid wrapper around Ark UI Solid Tree View.

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/tree-view
- Zag: https://zagjs.com/components/solid/tree-view

## Public contract

`TreeView` is the styled root and is equivalent to `TreeView.Root`. Pass a collection created by
`createTreeCollection` or `createFileTreeCollection`, then compose `Label`, `Tree`, `Node`,
`Branch`, and `Item` parts.

`TreeView.Node` keeps the recursive-renderer shortcut from the React component. Its render callback
receives `{ node, indexPath, state }`; because Ark Solid state is reactive, read node state as
`state().expanded`, `state().isBranch`, and so on:

```tsx
<TreeView.Node node={node} indexPath={indexPath}>
  {({ node: currentNode, state }) => (
    <Show when={state().isBranch} fallback={<TreeView.Item>{currentNode.name}</TreeView.Item>}>
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchIndicator />
          <TreeView.BranchText>{currentNode.name}</TreeView.BranchText>
        </TreeView.BranchControl>
        <TreeView.BranchContent />
      </TreeView.Branch>
    </Show>
  )}
</TreeView.Node>
```

`RootProvider` accepts the accessor returned by `useTreeView()`. `Context`,
`NodeContext`, `useTreeViewContext`, `useTreeViewNodeContext`, and the collection helpers are
re-exported from the component entry point and package root.

## Anatomy and styling

```text
TreeView / TreeView.Root
├─ TreeView.Label
└─ TreeView.Tree
   └─ TreeView.Node or TreeView.NodeProvider
      ├─ TreeView.Branch
      │  ├─ TreeView.BranchControl
      │  ├─ TreeView.BranchContent
      │  └─ TreeView.BranchIndentGuide
      └─ TreeView.Item
         ├─ TreeView.ItemText
         └─ TreeView.ItemIndicator
```

The wrapper adds the same `tree-view-*` `data-slot` hooks and CSS Module as the React component.
Ark retains tree roles, roving focus, keyboard navigation, state attributes, collection behavior,
controlled and uncontrolled values, async loading, checkbox propagation, and rename behavior.

The Solid `NodeCheckboxIndicator` wraps Ark's fragment-only indicator in a styled `span`, because
the installed Ark Solid primitive does not accept DOM props. This keeps the public data slot and
CSS hook available while preserving Ark's checked, indeterminate, and fallback selection.
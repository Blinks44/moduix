import {
  JsonTreeView as JsonTreeViewPrimitive,
  useJsonTreeView,
  type JsonTreeViewRootProps,
  type JsonTreeViewRootProviderProps,
  type JsonTreeViewTreeProps,
  type UseJsonTreeViewProps,
  type UseJsonTreeViewReturn,
} from '@ark-ui/solid/json-tree-view';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './JsonTreeView.module.css';

function JsonTreeView(props: JsonTreeViewRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <JsonTreeViewPrimitive.Root
      asChild={local.asChild}
      {...others}
      data-slot="json-tree-view-root"
      class={clsx(styles.root, local.class)}
    >
      {local.children}
    </JsonTreeViewPrimitive.Root>
  );
}

function JsonTreeViewRootProvider(props: JsonTreeViewRootProviderProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <JsonTreeViewPrimitive.RootProvider
      asChild={local.asChild}
      {...others}
      data-slot="json-tree-view-root-provider"
      class={clsx(styles.root, local.class)}
    >
      {local.children}
    </JsonTreeViewPrimitive.RootProvider>
  );
}

function JsonTreeViewTree(props: JsonTreeViewTreeProps) {
  const [local, others] = splitProps(props, ['arrow', 'class']);

  return (
    <JsonTreeViewPrimitive.Tree
      {...others}
      arrow={local.arrow ?? <ChevronRightIcon aria-hidden="true" />}
      data-slot="json-tree-view-tree"
      class={clsx(styles.tree, local.class)}
    />
  );
}

export { JsonTreeView, JsonTreeViewRootProvider, JsonTreeViewTree, useJsonTreeView };
export type {
  JsonTreeViewRootProps,
  JsonTreeViewRootProviderProps,
  JsonTreeViewTreeProps,
  UseJsonTreeViewProps,
  UseJsonTreeViewReturn,
};
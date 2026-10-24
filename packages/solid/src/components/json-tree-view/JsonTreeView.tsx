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
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
import styles from './JsonTreeView.module.css';

function JsonTreeView(props: JsonTreeViewRootProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <JsonTreeViewPrimitive.Root
      {...others}
      class={clsx(styles.root, local.class)}
      data-slot="json-tree-view-root"
    />
  );
}

function JsonTreeViewRootProvider(props: JsonTreeViewRootProviderProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <JsonTreeViewPrimitive.RootProvider
      {...others}
      class={clsx(styles.root, local.class)}
      data-slot="json-tree-view-root-provider"
    />
  );
}

function JsonTreeViewTree(props: JsonTreeViewTreeProps) {
  const [local, others] = splitProps(props, ['arrow', 'class']);

  return (
    <JsonTreeViewPrimitive.Tree
      {...others}
      arrow={local.arrow ?? <ChevronRightIcon aria-hidden="true" />}
      class={clsx(styles.tree, local.class)}
      data-slot="json-tree-view-tree"
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
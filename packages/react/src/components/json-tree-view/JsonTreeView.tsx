'use client';

import {
  JsonTreeView as JsonTreeViewPrimitive,
  useJsonTreeView,
  type JsonTreeViewRootProps,
  type JsonTreeViewRootProviderProps,
  type JsonTreeViewTreeProps,
  type UseJsonTreeViewProps,
  type UseJsonTreeViewReturn,
} from '@ark-ui/react/json-tree-view';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
import styles from './JsonTreeView.module.css';

const JsonTreeView = forwardRef<HTMLDivElement, JsonTreeViewRootProps>(function JsonTreeView(
  { className, ...props },
  ref,
) {
  return (
    <JsonTreeViewPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="json-tree-view-root"
    />
  );
});

const JsonTreeViewRootProvider = forwardRef<HTMLDivElement, JsonTreeViewRootProviderProps>(
  function JsonTreeViewRootProvider({ className, ...props }, ref) {
    return (
      <JsonTreeViewPrimitive.RootProvider
        ref={ref}
        className={clsx(styles.root, className)}
        {...props}
        data-slot="json-tree-view-root-provider"
      />
    );
  },
);

const JsonTreeViewTree = forwardRef<HTMLDivElement, JsonTreeViewTreeProps>(
  function JsonTreeViewTree({ arrow, className, ...props }, ref) {
    return (
      <JsonTreeViewPrimitive.Tree
        ref={ref}
        arrow={arrow ?? <ChevronRightIcon aria-hidden="true" />}
        className={clsx(styles.tree, className)}
        {...props}
        data-slot="json-tree-view-tree"
      />
    );
  },
);

export { JsonTreeView, JsonTreeViewRootProvider, JsonTreeViewTree, useJsonTreeView };
export type {
  JsonTreeViewRootProps,
  JsonTreeViewRootProviderProps,
  JsonTreeViewTreeProps,
  UseJsonTreeViewProps,
  UseJsonTreeViewReturn,
};
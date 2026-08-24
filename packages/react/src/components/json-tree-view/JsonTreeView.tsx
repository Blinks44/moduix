'use client';

import {
  JsonTreeView as JsonTreeViewPrimitive,
  useJsonTreeView,
} from '@ark-ui/react/json-tree-view';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './JsonTreeView.module.css';

const JsonTreeViewRoot = forwardRef<
  ComponentRef<typeof JsonTreeViewPrimitive.Root>,
  ComponentProps<typeof JsonTreeViewPrimitive.Root>
>(function JsonTreeViewRoot({ className, ...props }, ref) {
  return (
    <JsonTreeViewPrimitive.Root
      ref={ref}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
      data-slot="json-tree-view-root"
    />
  );
});

const JsonTreeViewRootProvider = forwardRef<
  ComponentRef<typeof JsonTreeViewPrimitive.RootProvider>,
  ComponentProps<typeof JsonTreeViewPrimitive.RootProvider>
>(function JsonTreeViewRootProvider({ className, ...props }, ref) {
  return (
    <JsonTreeViewPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
      data-slot="json-tree-view-root-provider"
    />
  );
});

const JsonTreeViewTree = forwardRef<
  ComponentRef<typeof JsonTreeViewPrimitive.Tree>,
  ComponentProps<typeof JsonTreeViewPrimitive.Tree>
>(function JsonTreeViewTree({ arrow, className, ...props }, ref) {
  return (
    <JsonTreeViewPrimitive.Tree
      ref={ref}
      arrow={arrow ?? <ChevronRightIcon aria-hidden="true" />}
      className={clsx(styles.tree, normalizeClassName(className))}
      {...props}
      data-slot="json-tree-view-tree"
    />
  );
});

const JsonTreeView = Object.assign(JsonTreeViewRoot, {
  Root: JsonTreeViewRoot,
  RootProvider: JsonTreeViewRootProvider,
  Tree: JsonTreeViewTree,
});

export { JsonTreeView, useJsonTreeView };
export type {
  JsonTreeViewRootProps,
  JsonTreeViewRootProviderProps,
  JsonTreeViewTreeProps,
  UseJsonTreeViewProps,
  UseJsonTreeViewReturn,
} from '@ark-ui/react/json-tree-view';
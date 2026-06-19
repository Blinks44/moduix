import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './List.module.css';

type ListMarker = 'disc' | 'decimal' | 'none';
type ListResolvedMarker = ListMarker | 'auto';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';

type ListRootProps = HTMLArkProps<'ul'> & {
  marker?: ListMarker;
  gap?: ListGap;
  size?: ListSize;
  tone?: ListTone;
};

type ListItemProps = HTMLArkProps<'li'>;

const ListRoot = forwardRef<HTMLUListElement, ListRootProps>(function ListRoot(
  { asChild, className, gap = 'sm', marker, role, size = 'md', tone = 'default', ...props },
  ref,
) {
  const resolvedMarker: ListResolvedMarker = marker ?? 'auto';

  return (
    <ark.ul
      ref={ref}
      asChild={asChild}
      role={role ?? (resolvedMarker === 'none' ? 'list' : undefined)}
      data-scope="list"
      data-part="root"
      data-slot="list-root"
      data-gap={gap}
      data-marker={resolvedMarker}
      data-size={size}
      data-tone={tone}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { asChild, className, ...props },
  ref,
) {
  return (
    <ark.li
      ref={ref}
      asChild={asChild}
      data-scope="list"
      data-part="item"
      data-slot="list-item"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const List = Object.assign(ListRoot, {
  Root: ListRoot,
  Item: ListItem,
});

export { List };
export type { ListGap, ListItemProps, ListMarker, ListRootProps, ListSize, ListTone };
import type { HTMLArkProps } from '@ark-ui/react/factory';
import type { ForwardedRef } from 'react';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './List.module.css';

type ListMarker = 'disc' | 'decimal' | 'none';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListElement = 'ul' | 'ol';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';

type ListBaseProps = {
  marker?: ListMarker;
  gap?: ListGap;
  size?: ListSize;
  tone?: ListTone;
};
type ListRootProps =
  | (HTMLArkProps<'ul'> & ListBaseProps & { as?: 'ul' })
  | (HTMLArkProps<'ol'> & ListBaseProps & { as: 'ol' });

type ListItemProps = HTMLArkProps<'li'>;

const ListRoot = forwardRef<HTMLUListElement | HTMLOListElement, ListRootProps>(function ListRoot(
  { as, asChild, className, gap = 'sm', marker, role, size = 'md', tone = 'default', ...props },
  ref,
) {
  const markerValue = marker ?? 'auto';
  const rootProps = {
    asChild,
    role: role ?? (markerValue === 'none' ? 'list' : undefined),
    ...props,
    'data-scope': 'list',
    'data-part': 'root',
    'data-slot': 'list-root',
    'data-gap': gap,
    'data-marker': markerValue,
    'data-size': size,
    'data-tone': tone,
    className: clsx(styles.root, normalizeClassName(className)),
  };

  if (as === 'ol') {
    return <ark.ol ref={ref as ForwardedRef<HTMLOListElement>} {...rootProps} />;
  }

  return <ark.ul ref={ref as ForwardedRef<HTMLUListElement>} {...rootProps} />;
});

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { asChild, className, ...props },
  ref,
) {
  return (
    <ark.li
      ref={ref}
      asChild={asChild}
      {...props}
      data-scope="list"
      data-part="item"
      data-slot="list-item"
      className={normalizeClassName(className)}
    />
  );
});

const List = Object.assign(ListRoot, {
  Root: ListRoot,
  Item: ListItem,
});

export { List };
export type { ListElement, ListGap, ListItemProps, ListMarker, ListRootProps, ListSize, ListTone };
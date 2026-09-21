import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import styles from './List.module.css';

type ListMarker = 'disc' | 'decimal' | 'none';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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

const List = forwardRef<HTMLUListElement | HTMLOListElement, ListRootProps>(function List(
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
    className: clsx(styles.root, className),
  };

  if (as === 'ol') {
    return <ark.ol ref={ref as ForwardedRef<HTMLOListElement>} {...rootProps} />;
  }

  return <ark.ul ref={ref as ForwardedRef<HTMLUListElement>} {...rootProps} />;
});

const ListItem = forwardRef<HTMLLIElement, HTMLArkProps<'li'>>(function ListItem(
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
      className={className}
    />
  );
});

export { List, ListItem };

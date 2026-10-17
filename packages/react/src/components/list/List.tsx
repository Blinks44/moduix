import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import styles from './List.module.css';

type ListElement = 'ul' | 'ol';
type ListMarker = 'disc' | 'decimal' | 'none';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';

type ListRootProps = HTMLArkProps<'ol'> & {
  as?: ListElement;
  marker?: ListMarker;
  gap?: ListGap;
  size?: ListSize;
  tone?: ListTone;
};

const List = forwardRef<HTMLUListElement | HTMLOListElement, ListRootProps>(function List(
  {
    as = 'ul',
    marker = as === 'ol' ? 'decimal' : 'disc',
    gap = 'sm',
    size = 'md',
    tone = 'default',
    role = marker === 'none' ? 'list' : undefined,
    className,
    ...props
  },
  ref,
) {
  const Element = ark[as] as typeof ark.ol;

  return (
    <Element
      {...props}
      ref={ref as ForwardedRef<HTMLOListElement>}
      role={role}
      data-scope="list"
      data-part="root"
      data-slot="list-root"
      data-gap={gap}
      data-marker={marker}
      data-size={size}
      data-tone={tone}
      className={clsx(styles.root, className)}
    />
  );
});

const ListItem = forwardRef<HTMLLIElement, HTMLArkProps<'li'>>(function ListItem(props, ref) {
  return <ark.li {...props} ref={ref} data-scope="list" data-part="item" data-slot="list-item" />;
});

const ListIndicator = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function ListIndicator(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      {...props}
      ref={ref}
      data-scope="list"
      data-part="indicator"
      data-slot="list-indicator"
      className={clsx(styles.indicator, className)}
    />
  );
});

export { List, ListIndicator, ListItem };
export type { ListElement, ListGap, ListMarker, ListRootProps, ListSize, ListTone };
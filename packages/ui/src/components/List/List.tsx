import clsx from 'clsx';
import * as React from 'react';
import styles from './List.module.css';

type ListAs = 'ul' | 'ol';
type ListMarker = 'none' | 'disc' | 'decimal' | 'bullet';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';

type ListProps = React.ComponentPropsWithoutRef<ListAs> & {
  as?: ListAs;
  marker?: ListMarker;
  gap?: ListGap;
  size?: ListSize;
  tone?: ListTone;
};

type ListItemProps = React.ComponentProps<'li'>;

const defaultMarkerByElement: Record<ListAs, ListMarker> = {
  ul: 'disc',
  ol: 'decimal',
};

function List({
  as = 'ul',
  marker,
  gap = 'sm',
  size = 'md',
  tone = 'default',
  className,
  ...props
}: ListProps) {
  const Component = as;
  const resolvedMarker = marker ?? defaultMarkerByElement[as];

  return (
    <Component
      data-slot="list-root"
      data-gap={gap}
      data-marker={resolvedMarker}
      data-size={size}
      data-tone={tone}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function ListItem({ className, ...props }: ListItemProps) {
  return <li data-slot="list-item" className={clsx(styles.item, className)} {...props} />;
}

export { List, ListItem };

export type { ListProps, ListItemProps, ListAs, ListMarker, ListGap, ListSize, ListTone };
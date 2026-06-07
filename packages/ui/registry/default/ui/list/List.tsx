import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './List.module.css';

type ListAs = 'ul' | 'ol';
type ListMarker = 'none' | 'disc' | 'decimal';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';

type ListOwnProps = {
  as?: ListAs;
  marker?: ListMarker;
  gap?: ListGap;
  size?: ListSize;
  tone?: ListTone;
};

type UnorderedListProps = ListOwnProps &
  ComponentPropsWithoutRef<'ul'> & {
    as?: 'ul';
  };

type OrderedListProps = ListOwnProps &
  ComponentPropsWithoutRef<'ol'> & {
    as: 'ol';
  };

type ListProps = UnorderedListProps | OrderedListProps;
type ListItemProps = ComponentPropsWithoutRef<'li'>;

function List({
  as = 'ul',
  marker,
  gap = 'sm',
  size = 'md',
  tone = 'default',
  className,
  role,
  ...props
}: ListProps) {
  const Component = as;
  const resolvedMarker = marker ?? (as === 'ol' ? 'decimal' : 'disc');
  const markerMode = marker === undefined ? 'auto' : 'explicit';

  return (
    <Component
      data-slot="list-root"
      data-gap={gap}
      data-marker={resolvedMarker}
      data-marker-mode={markerMode}
      data-size={size}
      data-tone={tone}
      role={role ?? (resolvedMarker === 'none' ? 'list' : undefined)}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function ListItem({ className, ...props }: ListItemProps) {
  return <li data-slot="list-item" className={className} {...props} />;
}

export { List, ListItem };
export type { ListAs, ListGap, ListItemProps, ListMarker, ListProps, ListSize, ListTone };
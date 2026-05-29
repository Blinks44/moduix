import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './List.module.css';

type ListOwnProps = {
  as?: 'ul' | 'ol';
  marker?: 'none' | 'disc' | 'decimal';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
};

type UnorderedListProps = ListOwnProps &
  ComponentPropsWithoutRef<'ul'> & {
    as?: 'ul';
  };

type OrderedListProps = ListOwnProps &
  ComponentPropsWithoutRef<'ol'> & {
    as: 'ol';
  };

function List({
  as = 'ul',
  marker,
  gap = 'sm',
  size = 'md',
  tone = 'default',
  className,
  ...props
}: UnorderedListProps | OrderedListProps) {
  const Component = as;
  const resolvedMarker = marker ?? (as === 'ol' ? 'decimal' : 'disc');

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

function ListItem({ className, ...props }: ComponentPropsWithoutRef<'li'>) {
  return <li data-slot="list-item" className={className} {...props} />;
}

export { List, ListItem };
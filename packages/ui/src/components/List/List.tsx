import clsx from 'clsx';
import * as React from 'react';
import styles from './List.module.css';

function List({
  as = 'ul',
  marker,
  gap = 'sm',
  size = 'md',
  tone = 'default',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & {
  as?: 'ul' | 'ol';
  marker?: 'none' | 'disc' | 'decimal';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';
}) {
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

function ListItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="list-item" className={clsx(styles.item, className)} {...props} />;
}

export { List, ListItem };
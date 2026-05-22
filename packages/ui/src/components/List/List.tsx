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

type ListItemClassNames = {
  marker?: string;
  content?: string;
};

type ListItemProps = React.ComponentProps<'li'> & {
  marker?: React.ReactNode;
  classNames?: ListItemClassNames;
};

const DEFAULT_AS: ListAs = 'ul';
const DEFAULT_GAP: ListGap = 'sm';
const DEFAULT_SIZE: ListSize = 'md';
const DEFAULT_TONE: ListTone = 'default';

const DEFAULT_MARKER_BY_ELEMENT: Record<ListAs, ListMarker> = {
  ul: 'disc',
  ol: 'decimal',
};

function List({
  as = DEFAULT_AS,
  marker,
  gap = DEFAULT_GAP,
  size = DEFAULT_SIZE,
  tone = DEFAULT_TONE,
  className,
  ...props
}: ListProps) {
  const Component = as;
  const resolvedMarker = marker ?? DEFAULT_MARKER_BY_ELEMENT[as];

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

function ListItem({ className, classNames, marker, children, ...props }: ListItemProps) {
  return (
    <li data-slot="list-item" className={clsx(styles.item, className)} {...props}>
      <span
        data-slot="list-item-marker"
        aria-hidden
        className={clsx(styles.marker, classNames?.marker)}
      >
        {marker}
      </span>
      <span data-slot="list-item-content" className={clsx(styles.content, classNames?.content)}>
        {children}
      </span>
    </li>
  );
}

export { List, ListItem };

export type {
  ListProps,
  ListItemProps,
  ListItemClassNames,
  ListAs,
  ListMarker,
  ListGap,
  ListSize,
  ListTone,
};
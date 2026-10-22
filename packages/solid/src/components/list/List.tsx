import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import styles from './List.module.css';

type ListElement = 'ul' | 'ol';
type ListMarker = 'disc' | 'decimal' | 'none';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'primary' | 'destructive';

type ListRootProps = HTMLArkProps<'ol'> & {
  as?: ListElement;
  marker?: ListMarker;
  gap?: ListGap;
  size?: ListSize;
  tone?: ListTone;
};

function List(props: ListRootProps) {
  const [local, others] = splitProps(props, [
    'as',
    'class',
    'gap',
    'marker',
    'role',
    'size',
    'tone',
  ]);
  const as = () => local.as ?? 'ul';
  const marker = () => local.marker ?? (as() === 'ol' ? 'decimal' : 'disc');

  return (
    <Dynamic
      component={ark[as()]}
      {...others}
      role={local.role ?? (marker() === 'none' ? 'list' : undefined)}
      data-scope="list"
      data-part="root"
      data-slot="list-root"
      data-gap={local.gap ?? 'sm'}
      data-marker={marker()}
      data-size={local.size ?? 'md'}
      data-tone={local.tone ?? 'default'}
      class={clsx(styles.root, local.class)}
    />
  );
}

function ListItem(props: HTMLArkProps<'li'>) {
  return <ark.li {...props} data-scope="list" data-part="item" data-slot="list-item" />;
}

function ListIndicator(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="list"
      data-part="indicator"
      data-slot="list-indicator"
      class={clsx(styles.indicator, local.class)}
    />
  );
}

export { List, ListIndicator, ListItem };
export type { ListElement, ListGap, ListMarker, ListRootProps, ListSize, ListTone };
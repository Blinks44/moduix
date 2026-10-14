import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { ValidComponent } from 'solid-js';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
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

type ListDataProps = {};

type ListRootProps =
  | (HTMLArkProps<'ul'> &
      ListBaseProps &
      ListDataProps & {
        as?: 'ul';
      })
  | (HTMLArkProps<'ol'> &
      ListBaseProps &
      ListDataProps & {
        as: 'ol';
      });

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

  return (
    <Dynamic
      component={(local.as === 'ol' ? ark.ol : ark.ul) as ValidComponent}
      {...others}
      role={local.role ?? (local.marker === 'none' ? 'list' : undefined)}
      data-scope="list"
      data-part="root"
      data-slot="list-root"
      data-gap={local.gap ?? 'sm'}
      data-marker={local.marker ?? 'auto'}
      data-size={local.size ?? 'md'}
      data-tone={local.tone ?? 'default'}
      class={clsx(styles.root, local.class)}
    />
  );
}

function ListItem(props: HTMLArkProps<'li'> & ListDataProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.li
      {...others}
      data-scope="list"
      data-part="item"
      data-slot="list-item"
      class={local.class}
    />
  );
}

export { List, ListItem };
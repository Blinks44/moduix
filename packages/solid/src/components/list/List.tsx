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

type ListDataProps = {
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

type ListRootProps =
  | (HTMLArkProps<'ul'> &
      ListBaseProps &
      ListDataProps & {
        as?: 'ul';
        'data-gap'?: string;
        'data-marker'?: string;
        'data-size'?: string;
        'data-tone'?: string;
      })
  | (HTMLArkProps<'ol'> &
      ListBaseProps &
      ListDataProps & {
        as: 'ol';
        'data-gap'?: string;
        'data-marker'?: string;
        'data-size'?: string;
        'data-tone'?: string;
      });

function List(props: ListRootProps) {
  const [local, others] = splitProps(props, [
    'as',
    'asChild',
    'class',
    'gap',
    'marker',
    'role',
    'size',
    'tone',
    'data-scope',
    'data-part',
    'data-slot',
    'data-gap',
    'data-marker',
    'data-size',
    'data-tone',
  ]);

  return (
    <Dynamic
      component={(local.as === 'ol' ? ark.ol : ark.ul) as ValidComponent}
      asChild={local.asChild}
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
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-scope',
    'data-part',
    'data-slot',
  ]);

  return (
    <ark.li
      asChild={local.asChild}
      {...others}
      data-scope="list"
      data-part="item"
      data-slot="list-item"
      class={local.class}
    />
  );
}

export { List, ListItem };
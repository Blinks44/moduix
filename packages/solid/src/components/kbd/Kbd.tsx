import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Kbd.module.css';

function Kbd(props: HTMLArkProps<'kbd'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.kbd
      {...others}
      data-scope="kbd"
      data-part="root"
      class={clsx(styles.root, local.class)}
      data-slot="kbd-root"
    />
  );
}

function KbdGroup(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      role="group"
      data-scope="kbd"
      data-part="group"
      class={clsx(styles.group, local.class)}
      data-slot="kbd-group"
    />
  );
}

export { Kbd, KbdGroup };

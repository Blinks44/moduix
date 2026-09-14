import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Kbd.module.css';

function KbdRoot(props: HTMLArkProps<'kbd'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.kbd
      data-scope="kbd"
      data-part="root"
      data-slot="kbd-root"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function KbdGroupPart(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      role="group"
      data-scope="kbd"
      data-part="group"
      data-slot="kbd-group"
      class={clsx(styles.group, local.class)}
      {...others}
    />
  );
}

const Kbd = Object.assign(KbdRoot, {
  Root: KbdRoot,
  Group: KbdGroupPart,
});

export { Kbd };
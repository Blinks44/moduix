import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import styles from './Typeset.module.css';

type TypesetProps = HTMLArkProps<'div'>;

function Typeset(props: TypesetProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      {...others}
      data-scope="typeset"
      data-part="root"
      data-slot="typeset"
      class={cn(styles.root, local.class)}
    />
  );
}

type TypesetScrollProps = HTMLArkProps<'div'>;

function TypesetScroll(props: TypesetScrollProps) {
  const [local, others] = splitProps(props, ['class', 'role', 'tabIndex']);

  return (
    <ark.div
      {...others}
      data-scope="typeset"
      data-part="scroll"
      data-slot="typeset-scroll"
      class={cn(styles.scroll, local.class)}
      role={
        local.role ?? (others['aria-label'] || others['aria-labelledby'] ? 'region' : undefined)
      }
      tabIndex={local.tabIndex ?? 0}
    />
  );
}

export { Typeset, TypesetScroll };
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Typeset.module.css';

type TypesetDataProps = {};

type TypesetProps = HTMLArkProps<'div'> & TypesetDataProps;

function Typeset(props: TypesetProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      {...others}
      data-scope="typeset"
      data-part="root"
      data-slot="typeset"
      class={clsx(styles.root, local.class)}
    />
  );
}

type TypesetScrollProps = HTMLArkProps<'div'> & TypesetDataProps;

function TypesetScroll(props: TypesetScrollProps) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'class',
    'role',
    'tabIndex',
  ]);

  return (
    <ark.div
      {...others}
      aria-label={local['aria-label']}
      aria-labelledby={local['aria-labelledby']}
      data-scope="typeset"
      data-part="scroll"
      data-slot="typeset-scroll"
      class={clsx(styles.scroll, local.class)}
      role={local.role ?? (local['aria-label'] || local['aria-labelledby'] ? 'region' : undefined)}
      tabIndex={local.tabIndex ?? 0}
    />
  );
}

export { Typeset, TypesetScroll };
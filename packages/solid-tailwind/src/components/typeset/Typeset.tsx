import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import styles from './Typeset.module.css';

type TypesetDataProps = {
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

type TypesetProps = HTMLArkProps<'div'> & TypesetDataProps;

function Typeset(props: TypesetProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-scope',
    'data-part',
    'data-slot',
  ]);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="typeset"
      data-part="root"
      data-slot="typeset"
      class={cn(styles.root, local.class)}
    />
  );
}

type TypesetScrollProps = HTMLArkProps<'div'> & TypesetDataProps;

function TypesetScroll(props: TypesetScrollProps) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'class',
    'data-scope',
    'data-part',
    'data-slot',
    'role',
    'tabIndex',
  ]);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      aria-label={local['aria-label']}
      aria-labelledby={local['aria-labelledby']}
      data-scope="typeset"
      data-part="scroll"
      data-slot="typeset-scroll"
      class={cn(styles.scroll, local.class)}
      role={local.role ?? (local['aria-label'] || local['aria-labelledby'] ? 'region' : undefined)}
      tabIndex={local.tabIndex ?? 0}
    />
  );
}

export { Typeset, TypesetScroll };

import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Bleed.module.css';

type BleedAmount = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedInline = BleedAmount | 'full';
type BleedRootProps = HTMLArkProps<'div'> & {
  inline?: BleedInline;
  block?: BleedAmount;
};

function Bleed(props: BleedRootProps) {
  const [local, others] = splitProps(props, ['block', 'class', 'inline']);

  return (
    <ark.div
      {...others}
      data-scope="bleed"
      data-part="root"
      data-slot="bleed-root"
      data-inline={local.inline ?? 'full'}
      data-block={local.block ?? 'none'}
      class={clsx(styles.root, local.class)}
    />
  );
}

export { Bleed };
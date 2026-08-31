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
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
  'data-inline'?: string;
  'data-block'?: string;
};

function BleedRoot(props: BleedRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'block',
    'class',
    'inline',
    'data-scope',
    'data-part',
    'data-slot',
    'data-inline',
    'data-block',
  ]);

  return (
    <ark.div
      asChild={local.asChild}
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

const Bleed = Object.assign(BleedRoot, {
  Root: BleedRoot,
});

export { Bleed };
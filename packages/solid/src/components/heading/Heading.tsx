import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import styles from './Heading.module.css';

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingRootProps = HTMLArkProps<'h1'> & {
  as?: HeadingElement;
  size?: HeadingSize;
  weight?: HeadingWeight;
};

const defaultSizes: Record<HeadingElement, HeadingSize> = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
  h5: 'sm',
  h6: 'xs',
};

function Heading(props: HeadingRootProps) {
  const [local, others] = splitProps(props, ['as', 'class', 'size', 'weight']);
  const as = () => local.as ?? 'h1';

  return (
    <Dynamic
      component={ark[as()]}
      {...others}
      data-scope="heading"
      data-part="root"
      data-slot="heading-root"
      data-size={local.size ?? defaultSizes[as()]}
      data-weight={local.weight ?? 'semibold'}
      class={clsx(styles.root, local.class)}
    />
  );
}

export { Heading };
export type { HeadingElement, HeadingRootProps, HeadingSize, HeadingWeight };
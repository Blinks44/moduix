import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import styles from './Heading.module.css';

const elements = {
  h1: ark.h1,
  h2: ark.h2,
  h3: ark.h3,
  h4: ark.h4,
  h5: ark.h5,
  h6: ark.h6,
} as const;

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps = HTMLArkProps<'h1'> & {
  as?: HeadingElement;
  size?: HeadingSize;
  weight?: HeadingWeight;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
  'data-size'?: string;
  'data-weight'?: string;
};

function Heading(props: HeadingProps) {
  const [local, others] = splitProps(props, [
    'as',
    'asChild',
    'size',
    'weight',
    'class',
    'data-scope',
    'data-part',
    'data-slot',
    'data-size',
    'data-weight',
  ]);
  const Element = () => elements[local.as ?? 'h1'] as typeof ark.h1;

  return (
    <Dynamic
      component={Element()}
      asChild={local.asChild}
      {...others}
      data-scope="heading"
      data-part="root"
      data-slot="heading-root"
      data-size={local.size}
      data-weight={local.weight ?? 'semibold'}
      class={clsx(styles.root, local.class)}
    />
  );
}

export { Heading };
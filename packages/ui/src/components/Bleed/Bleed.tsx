import clsx from 'clsx';
import * as React from 'react';
import styles from './Bleed.module.css';

type BleedSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedInline = BleedSize | 'full';
type BleedBlock = BleedSize;
type BleedAs = React.ElementType;

type BleedOwnProps<TElement extends BleedAs = 'div'> = {
  as?: TElement;
  inline?: BleedInline;
  block?: BleedBlock;
};

type BleedProps<TElement extends BleedAs = 'div'> = BleedOwnProps<TElement> &
  Omit<React.ComponentPropsWithoutRef<TElement>, keyof BleedOwnProps<TElement>>;

type BleedComponent = <TElement extends BleedAs = 'div'>(
  props: BleedProps<TElement> & {
    ref?: React.Ref<React.ComponentRef<TElement>>;
  },
) => React.ReactElement | null;

const Bleed = React.forwardRef(function Bleed<TElement extends BleedAs = 'div'>(
  { as, inline = 'full', block = 'none', className, ...props }: BleedProps<TElement>,
  ref: React.ForwardedRef<Element>,
) {
  const Component = (as ?? 'div') as BleedAs;

  return React.createElement(Component, {
    ...props,
    ref,
    'data-slot': 'bleed-root',
    'data-inline': inline,
    'data-block': block,
    className: clsx(styles.root, className),
  });
}) as BleedComponent;

export { Bleed };

export type { BleedProps, BleedAs, BleedSize, BleedInline, BleedBlock };
import clsx from 'clsx';
import * as React from 'react';
import styles from './Bleed.module.css';

type BleedSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedInline = BleedSize | 'full';
type BleedBlock = BleedSize;
type BleedAs =
  | 'div'
  | 'main'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'nav'
  | 'aside'
  | 'figure';

type BleedProps = React.ComponentPropsWithoutRef<'div'> & {
  as?: BleedAs;
  inline?: BleedInline;
  block?: BleedBlock;
};

const Bleed = React.forwardRef(function Bleed(
  { as, inline = 'full', block = 'none', className, ...props }: BleedProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const Component = as ?? 'div';

  return React.createElement(Component, {
    ...props,
    ref,
    'data-slot': 'bleed-root',
    'data-inline': inline,
    'data-block': block,
    className: clsx(styles.root, className),
  });
});

export { Bleed };

export type { BleedProps, BleedAs, BleedSize, BleedInline, BleedBlock };
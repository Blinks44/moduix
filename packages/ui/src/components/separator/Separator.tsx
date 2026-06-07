import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { forwardRef, type ComponentProps, type ComponentRef } from 'react';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Separator.module.css';

const Separator = forwardRef<
  ComponentRef<typeof SeparatorPrimitive>,
  ComponentProps<typeof SeparatorPrimitive>
>(function Separator({ className, ...props }, ref) {
  return (
    <SeparatorPrimitive
      ref={ref}
      data-slot="separator-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

export { Separator };
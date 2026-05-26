import { Input as InputPrimitive } from '@base-ui/react/input';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Input.module.css';

type InputVisualSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const Input = React.forwardRef<
  React.ComponentRef<typeof InputPrimitive>,
  Omit<InputPrimitive.Props, 'size'> & {
    size?: InputVisualSize;
    htmlSize?: React.ComponentProps<'input'>['size'];
  }
>(function Input({ className, size = 'md', htmlSize, ...props }, ref) {
  return (
    <InputPrimitive
      ref={ref}
      data-slot="input-root"
      data-size={size}
      className={mergeClassName(className, styles.root)}
      size={htmlSize}
      {...props}
    />
  );
});

export { Input };
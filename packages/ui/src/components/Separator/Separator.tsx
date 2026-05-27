import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Separator.module.css';

function Separator({ className, ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

export { Separator };
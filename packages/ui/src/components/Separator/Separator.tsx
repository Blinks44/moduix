import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Separator.module.css';

type SeparatorProps = SeparatorPrimitive.Props;

function Separator({ className, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

export { Separator };

export type { SeparatorProps };
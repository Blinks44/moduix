import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Fieldset.module.css';

function Fieldset({ className, ...props }: FieldsetPrimitive.Root.Props) {
  return (
    <FieldsetPrimitive.Root
      data-slot="fieldset-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function FieldsetLegend({ className, ...props }: FieldsetPrimitive.Legend.Props) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="fieldset-legend"
      className={mergeClassName(className, styles.legend)}
      {...props}
    />
  );
}

export { Fieldset, FieldsetLegend };
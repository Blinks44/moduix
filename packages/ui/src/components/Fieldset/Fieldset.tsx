import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset';
import { mergeClassName } from '@/utils/mergeClassName';
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

type FieldsetProps = FieldsetPrimitive.Root.Props;
type FieldsetState = FieldsetPrimitive.Root.State;
type FieldsetLegendProps = FieldsetPrimitive.Legend.Props;
type FieldsetLegendState = FieldsetPrimitive.Legend.State;

export { Fieldset, FieldsetLegend };

export type { FieldsetProps, FieldsetState, FieldsetLegendProps, FieldsetLegendState };
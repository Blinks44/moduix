import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Fieldset.module.css';

function Fieldset({ className, disabled, render, ...props }: FieldsetPrimitive.Root.Props) {
  return (
    <FieldsetPrimitive.Root
      data-slot="fieldset-root"
      className={mergeClassName(className, styles.root)}
      disabled={disabled}
      render={render ?? <fieldset disabled={disabled} />}
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
type FieldsetLegendProps = FieldsetPrimitive.Legend.Props;

export { Fieldset, FieldsetLegend };

export type { FieldsetProps, FieldsetLegendProps };
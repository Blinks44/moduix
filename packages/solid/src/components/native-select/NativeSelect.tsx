import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import type { FieldSelectProps } from '@ark-ui/solid/field';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './NativeSelect.module.css';

type NativeSelectProps = FieldSelectProps & {
  controlProps?: JSX.HTMLAttributes<HTMLSpanElement>;
};

function NativeSelect(props: NativeSelectProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'controlProps']);

  return (
    <span
      {...local.controlProps}
      data-scope="native-select"
      data-part="control"
      data-slot="native-select-control"
      class={clsx(styles.control, local.controlProps?.class)}
    >
      <FieldPrimitive.Select
        asChild={local.asChild}
        {...others}
        data-scope="field"
        data-part="select"
        data-slot="native-select-root"
        class={clsx(styles.root, local.class)}
      />
      <span
        aria-hidden="true"
        data-scope="native-select"
        data-part="indicator"
        data-slot="native-select-indicator"
        class={styles.indicator}
      >
        <ChevronDownIcon />
      </span>
    </span>
  );
}

export { NativeSelect };
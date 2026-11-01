import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import type { FieldSelectProps } from '@ark-ui/solid/field';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { onMount, splitProps } from 'solid-js';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import styles from './NativeSelect.module.css';

type NativeSelectProps = FieldSelectProps & {
  controlProps?: JSX.HTMLAttributes<HTMLSpanElement>;
};

function NativeSelect(props: NativeSelectProps) {
  const [local, others] = splitProps(props, ['class', 'controlProps']);
  let indicator: HTMLSpanElement | undefined;

  // Solid's spread inserts the options before it sets `multiple`, so the browser keeps only one
  // selected option. Restore the selection declared by the `selected` attributes.
  onMount(() => {
    const select = indicator?.previousElementSibling;
    if (!(select instanceof HTMLSelectElement) || !select.multiple) return;
    for (const option of select.options) option.selected = option.defaultSelected;
  });

  return (
    <span
      {...local.controlProps}
      data-scope="native-select"
      data-part="control"
      data-slot="native-select-control"
      class={clsx(styles.control, local.controlProps?.class)}
    >
      <FieldPrimitive.Select
        {...others}
        data-scope="field"
        data-part="select"
        data-slot="native-select-root"
        class={clsx(styles.root, local.class)}
      />
      <span
        ref={(element) => (indicator = element)}
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
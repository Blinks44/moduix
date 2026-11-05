<script module lang="ts">
  import type { FieldSelectProps } from '@ark-ui/svelte/field';
  import type { HTMLAttributes } from 'svelte/elements';

  export interface NativeSelectProps extends FieldSelectProps {
    controlProps?: HTMLAttributes<HTMLSpanElement>;
  }
</script>

<script lang="ts">
  import { FieldSelect } from '@ark-ui/svelte/field';
  import { clsx } from 'clsx';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import styles from './NativeSelect.module.css';

  let {
    class: className,
    controlProps,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: NativeSelectProps = $props();
  const { class: controlClassName, ...controlRest } = $derived(controlProps ?? {});
</script>

<span
  {...controlRest}
  class={clsx(styles.control, controlClassName)}
  data-scope="native-select"
  data-part="control"
  data-slot="native-select-control"
>
  <FieldSelect
    {...props}
    bind:ref
    bind:value
    class={clsx(styles.root, className)}
    data-scope="field"
    data-part="select"
    data-slot="native-select-root"
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
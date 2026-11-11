<script module lang="ts">
  import type { FieldInputProps as ArkFieldInputProps } from '@ark-ui/svelte/field';

  export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface InputRootProps extends Omit<ArkFieldInputProps, 'size'> {
    htmlSize?: ArkFieldInputProps['size'];
    size?: InputSize;
  }
</script>

<script lang="ts">
  import { FieldInput } from '@ark-ui/svelte/field';
  import { clsx } from 'clsx';
  import styles from './Input.module.css';

  let {
    class: className,
    htmlSize,
    ref = $bindable(null),
    size = 'md',
    value = $bindable(),
    ...props
  }: InputRootProps = $props();
</script>

<FieldInput
  {...props}
  bind:ref
  bind:value
  size={htmlSize}
  class={clsx(styles.root, className)}
  data-scope="field"
  data-part="input"
  data-slot="input-root"
  data-size={size}
/>
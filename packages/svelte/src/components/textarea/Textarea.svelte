<script module lang="ts">
  import type { FieldTextareaProps as ArkFieldTextareaProps } from '@ark-ui/svelte/field';

  export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface TextareaRootProps extends ArkFieldTextareaProps {
    size?: TextareaSize;
  }
</script>

<script lang="ts">
  import { FieldTextarea } from '@ark-ui/svelte/field';
  import { clsx } from 'clsx';
  import styles from './Textarea.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    value = $bindable(),
    ...props
  }: TextareaRootProps = $props();
</script>

<FieldTextarea
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.root, className)}
  data-scope="field"
  data-part="textarea"
  data-slot="textarea-root"
  data-size={size}
/>
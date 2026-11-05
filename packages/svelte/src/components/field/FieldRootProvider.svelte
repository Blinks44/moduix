<script lang="ts">
  import { FieldRootProvider, type FieldRootProviderProps } from '@ark-ui/svelte/field';
  import { clsx } from 'clsx';
  import styles from './Field.module.css';

  let { class: className, ...props }: FieldRootProviderProps = $props();
</script>

<FieldRootProvider
  {...props}
  class={clsx(styles.root, className)}
  data-slot="field-root-provider"
/>
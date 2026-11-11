<script lang="ts">
  import { FieldsetRoot, type FieldsetRootProps } from '@ark-ui/svelte/fieldset';
  import { clsx } from 'clsx';
  import styles from './Fieldset.module.css';

  let { class: className, ref = $bindable(null), ...props }: FieldsetRootProps = $props();
</script>

<FieldsetRoot {...props} bind:ref class={clsx(styles.root, className)} data-slot="fieldset-root" />
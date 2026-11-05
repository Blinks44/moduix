<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import styles from './TempInput.module.css';

  // Temporary stand-in until the moduix Input is ported (group B). Replace with `@/components/input`.
  let { class: className, value = $bindable(), ...props }: HTMLInputAttributes = $props();
</script>

<input
  {...props}
  bind:value
  class={[styles.root, className]}
  data-scope="field"
  data-part="input"
  data-slot="input-root"
  data-size="md"
/>
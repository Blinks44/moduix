<script lang="ts">
  import { Textarea } from '@moduix/svelte/textarea';
  import styles from '@/components/examples/textarea/textarea-disabled-and-readonly.module.css';
</script>

<div class={styles.root}>
  <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
  <Textarea aria-label="Read-only textarea" readonly value="Read-only text value" />
</div>
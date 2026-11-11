<script lang="ts">
  import { Text } from '@moduix/svelte/text';
</script>

<Text tone="primary" weight="medium">
  {#snippet asChild(props)}
    <a {...props()} href="/docs">Read the documentation</a>
  {/snippet}
</Text>
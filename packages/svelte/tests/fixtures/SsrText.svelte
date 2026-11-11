<script lang="ts">
  import { Text } from '@/components/text';
</script>

<Text tone="primary" lineClamp={2} class="hydrated-text">
  {#snippet asChild(props)}
    <a {...props()} href="#text">Hydrated copy</a>
  {/snippet}
</Text>
<script lang="ts">
  import { Stack } from '@/components/stack';
</script>

<Stack direction="row" class="figure">
  {#snippet asChild(props)}
    <figure {...props()} aria-label="Project updates">Project updates</figure>
  {/snippet}
</Stack>
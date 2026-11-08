<script lang="ts">
  import { Tag, TagLabel } from '@moduix/svelte/tag';
</script>

<Tag variant="outline">
  {#snippet asChild(props)}
    <button type="button" {...props()}>
      <TagLabel>Open filter</TagLabel>
    </button>
  {/snippet}
</Tag>
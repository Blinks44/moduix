<script lang="ts">
  import { Tag, TagLabel, TagStartElement } from '@/components/tag';
</script>

<Tag variant="outline">
  {#snippet asChild(props)}
    <button {...props()} type="button">
      <TagStartElement><span aria-hidden="true">+</span></TagStartElement>
      <TagLabel>Open filters</TagLabel>
    </button>
  {/snippet}
</Tag>
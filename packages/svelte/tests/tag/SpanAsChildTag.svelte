<script lang="ts">
  import { Tag, TagEndElement, TagLabel, TagStartElement } from '@/components/tag';
</script>

<Tag>
  <TagStartElement>
    {#snippet asChild(props)}<i {...props()} data-testid="start">+</i>{/snippet}
  </TagStartElement>
  <TagLabel>
    {#snippet asChild(props)}<strong {...props()} data-testid="label">Draft</strong>{/snippet}
  </TagLabel>
  <TagEndElement>
    {#snippet asChild(props)}<i {...props()} data-testid="end">!</i>{/snippet}
  </TagEndElement>
</Tag>
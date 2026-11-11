<script lang="ts">
  import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '@/components/tag';

  const refs: Record<'root' | 'label' | 'close', Element | null> = $state({
    root: null,
    label: null,
    close: null,
  });

  export const getRefs = () => refs;
</script>

<Tag bind:ref={refs.root} class="consumer-tag" data-testid="root" size="sm" variant="secondary">
  <TagStartElement data-testid="start">+</TagStartElement>
  <TagLabel bind:ref={refs.label} data-testid="label">Draft</TagLabel>
  <TagEndElement data-testid="end">
    <TagCloseTrigger bind:ref={refs.close} data-testid="close" />
  </TagEndElement>
</Tag>
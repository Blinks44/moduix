<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import { Stack } from '@moduix/svelte/stack';
  import {
    Tag,
    TagCloseTrigger,
    TagEndElement,
    TagLabel,
    TagStartElement,
  } from '@moduix/svelte/tag';

  const tags = [
    { label: 'Selected', variant: 'default', removable: false },
    { label: 'Deployed', variant: 'outline', removable: true },
  ] as const;
</script>

<Stack direction="row" align="center" wrap="wrap" gap="3">
  {#each tags as tag (tag.label)}
    <Tag variant={tag.variant}>
      <TagStartElement><CheckIcon /></TagStartElement>
      <TagLabel>{tag.label}</TagLabel>
      {#if tag.removable}
        <TagEndElement>
          <TagCloseTrigger aria-label={`Remove ${tag.label} tag`} />
        </TagEndElement>
      {/if}
    </Tag>
  {/each}
</Stack>
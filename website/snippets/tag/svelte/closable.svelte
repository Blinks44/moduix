<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Tag, TagCloseTrigger, TagEndElement, TagLabel } from '@moduix/svelte/tag';

  type TagVariant = 'default' | 'secondary' | 'outline';
  type DemoTag = {
    label: string;
    variant: TagVariant;
    disabled?: boolean;
  };

  const tags: DemoTag[] = [
    { label: 'TypeScript', variant: 'default' },
    { label: 'Design review', variant: 'secondary' },
    { label: 'Needs approval', variant: 'outline', disabled: true },
  ];
  let visibleTags = $state(tags);

  const removeTag = (label: string) => {
    visibleTags = visibleTags.filter((tag) => tag.label !== label);
  };
</script>

<Stack direction="row" align="center" wrap="wrap" gap="3">
  {#each visibleTags as tag (tag.label)}
    <Tag variant={tag.variant}>
      <TagLabel>{tag.label}</TagLabel>
      <TagEndElement>
        <TagCloseTrigger
          disabled={tag.disabled}
          aria-label={`Remove ${tag.label} tag`}
          onclick={() => removeTag(tag.label)}
        />
      </TagEndElement>
    </Tag>
  {/each}
</Stack>
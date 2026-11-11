<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '@/components/tag';
  import { CheckIcon } from '@/lib/moduix/icons/ui';

  const { Story } = defineMeta({
    title: 'Components/Tag',
    component: Tag,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;
  type TagVariant = (typeof variants)[number];
  type RemovableTag = { label: string; variant: TagVariant; disabled?: boolean };

  const removableTags: RemovableTag[] = [
    { label: 'TypeScript', variant: 'default' },
    { label: 'Design review', variant: 'secondary' },
    { label: 'Needs approval', variant: 'outline', disabled: true },
  ];
</script>

<script lang="ts">
  let tags = $state(removableTags);
  const removeTag = (label: string) => {
    tags = tags.filter((tag) => tag.label !== label);
  };
</script>

<Story name="Basic" asChild>
  <Tag>TypeScript</Tag>
</Story>

<Story name="Variants" asChild>
  <div class="flex flex-wrap items-center gap-3">
    {#each variants as variant (variant)}
      <Tag {variant}>
        <TagLabel>{variant}</TagLabel>
      </Tag>
    {/each}
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class="flex flex-wrap items-center gap-3">
    <Tag size="sm"><TagLabel>Compact</TagLabel></Tag>
    <Tag size="md"><TagLabel>Default</TagLabel></Tag>
    <Tag size="lg"><TagLabel>Large</TagLabel></Tag>
  </div>
</Story>

<Story name="Removable" asChild>
  <div class="flex flex-wrap items-center gap-3">
    {#each tags as tag (tag.label)}
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
  </div>
</Story>

<Story name="With Leading Icon" exportName="WithLeadingIcon" asChild>
  <div class="flex flex-wrap items-center gap-3">
    <Tag>
      <TagStartElement><CheckIcon /></TagStartElement>
      <TagLabel>Selected</TagLabel>
    </Tag>
    <Tag variant="outline">
      <TagStartElement><CheckIcon /></TagStartElement>
      <TagLabel>Deployed</TagLabel>
      <TagEndElement><TagCloseTrigger aria-label="Remove deployed tag" /></TagEndElement>
    </Tag>
  </div>
</Story>

<Story name="Truncated Label" exportName="TruncatedLabel" asChild>
  <Tag class="max-w-72">
    <TagLabel title="Ready for stakeholder review after legal approval">
      Ready for stakeholder review after legal approval
    </TagLabel>
    <TagEndElement><TagCloseTrigger aria-label="Remove long tag" /></TagEndElement>
  </Tag>
</Story>

<Story name="Render As Button" exportName="RenderAsButton" asChild>
  <Tag variant="outline">
    {#snippet asChild(props)}
      <button {...props()} type="button"><TagLabel>Open filter</TagLabel></button>
    {/snippet}
  </Tag>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <div class="flex flex-wrap items-center gap-3">
    <Tag class="border-primary/35 bg-primary/15 text-primary">
      <TagStartElement><CheckIcon /></TagStartElement>
      <TagLabel>Priority</TagLabel>
      <TagEndElement><TagCloseTrigger aria-label="Remove priority tag" /></TagEndElement>
    </Tag>
    <Tag class="border-foreground/20 text-primary" variant="outline">
      <TagLabel>Customer-facing</TagLabel>
    </Tag>
  </div>
</Story>
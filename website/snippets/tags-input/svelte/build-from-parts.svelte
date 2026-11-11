<script lang="ts">
  import XIcon from '@lucide/svelte/icons/x';
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputContext,
    TagsInputControl,
    TagsInputHiddenInput,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDeleteTrigger,
    TagsInputItemInput,
    TagsInputItemPreview,
    TagsInputItemText,
    TagsInputLabel,
  } from '@moduix/svelte/tags-input';

  const initialTags = ['React', 'TypeScript'];
</script>

<TagsInput defaultValue={initialTags} name="frameworks">
  <TagsInputLabel>Frameworks</TagsInputLabel>
  <TagsInputControl>
    <TagsInputContext>
      {#snippet render(tagsInput)}
        {#each tagsInput().value as value, index (`${value}-${index}`)}
          <TagsInputItem {index} {value}>
            <TagsInputItemPreview>
              <TagsInputItemText>{value}</TagsInputItemText>
              <TagsInputItemDeleteTrigger><XIcon strokeWidth={3} /></TagsInputItemDeleteTrigger>
            </TagsInputItemPreview>
            <TagsInputItemInput />
          </TagsInputItem>
        {/each}
      {/snippet}
    </TagsInputContext>
    <TagsInputInput placeholder="Add framework" />
    <TagsInputClearTrigger aria-label="Clear frameworks">
      <XIcon strokeWidth={3} />
    </TagsInputClearTrigger>
  </TagsInputControl>
  <TagsInputHiddenInput />
</TagsInput>
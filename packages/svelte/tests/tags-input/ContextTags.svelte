<script lang="ts">
  import {
    TagsInput,
    TagsInputContext,
    TagsInputControl,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemContext,
    TagsInputItemPreview,
    TagsInputItemText,
  } from '@/components/tags-input';
</script>

<TagsInput defaultValue={['React']}>
  <TagsInputContext>
    {#snippet render(context)}
      <output>Tags: {context().value.join(', ')}</output>
      <TagsInputControl>
        {#each context().value as item, index (item)}
          <TagsInputItem {index} value={item}>
            <TagsInputItemPreview>
              <TagsInputItemText>{item}</TagsInputItemText>
              <TagsInputItemContext>
                {#snippet render(itemContext)}
                  <span>Highlighted: {itemContext().highlighted}</span>
                {/snippet}
              </TagsInputItemContext>
            </TagsInputItemPreview>
          </TagsInputItem>
        {/each}
        <TagsInputInput />
      </TagsInputControl>
    {/snippet}
  </TagsInputContext>
</TagsInput>
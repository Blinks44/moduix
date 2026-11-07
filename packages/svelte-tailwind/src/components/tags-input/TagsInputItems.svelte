<script lang="ts">
  import { useTagsInputContext } from '@ark-ui/svelte/tags-input';
  import TagsInputItem from './TagsInputItem.svelte';
  import TagsInputItemDeleteTrigger from './TagsInputItemDeleteTrigger.svelte';
  import TagsInputItemInput from './TagsInputItemInput.svelte';
  import TagsInputItemPreview from './TagsInputItemPreview.svelte';
  import TagsInputItemText from './TagsInputItemText.svelte';

  const tagsInput = useTagsInputContext();
</script>

{#each tagsInput().value as value, index (`${value}-${index}`)}
  <TagsInputItem {index} {value}>
    <TagsInputItemPreview>
      <TagsInputItemText>{value}</TagsInputItemText>
      <TagsInputItemDeleteTrigger />
    </TagsInputItemPreview>
    <TagsInputItemInput />
  </TagsInputItem>
{/each}
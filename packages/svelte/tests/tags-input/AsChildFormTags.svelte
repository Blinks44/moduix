<script lang="ts">
  import {
    TagsInput,
    TagsInputControl,
    TagsInputHiddenInput,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@/components/tags-input';
</script>

<form>
  <TagsInput defaultValue={['React']} name="frameworks">
    {#snippet asChild(props)}
      <section {...props()} aria-label="Frameworks">
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput />
        </TagsInputControl>
        <TagsInputHiddenInput />
      </section>
    {/snippet}
  </TagsInput>
</form>
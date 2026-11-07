<script lang="ts">
  import {
    TagsInput,
    TagsInputControl,
    TagsInputInput,
    TagsInputLabel,
  } from '@/components/tags-input';

  const refs: Record<'root' | 'label' | 'input' | 'asChildRoot', Element | null> = $state({
    root: null,
    label: null,
    input: null,
    asChildRoot: null,
  });

  export const getRefs = () => refs;
</script>

<TagsInput bind:ref={refs.root}>
  <TagsInputLabel bind:ref={refs.label}>Frameworks</TagsInputLabel>
  <TagsInputControl><TagsInputInput bind:ref={refs.input} /></TagsInputControl>
</TagsInput>
<TagsInput bind:ref={refs.asChildRoot}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Composed frameworks">
      <TagsInputControl><TagsInputInput /></TagsInputControl>
    </section>
  {/snippet}
</TagsInput>
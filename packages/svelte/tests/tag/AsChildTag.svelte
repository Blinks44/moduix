<script lang="ts">
  import { Tag, TagCloseTrigger } from '@/components/tag';

  const refs: Record<'root' | 'close', Element | null> = $state({ root: null, close: null });

  export const getRefs = () => refs;
</script>

<Tag bind:ref={refs.root} variant="outline">
  {#snippet asChild(props)}<a {...props()} href="#filters">Open filters</a>{/snippet}
</Tag>
<TagCloseTrigger bind:ref={refs.close} aria-label="Remove Draft tag">
  {#snippet asChild(props)}
    <button {...props()} type="button" data-owner="consumer"><svg aria-hidden="true"></svg></button>
  {/snippet}
</TagCloseTrigger>
<script lang="ts">
  import { Editable, EditableArea, EditableInput, EditablePreview } from '@/components/editable';

  let rootRef: Element | null = $state(null);

  export const getRootRef = () => rootRef;
</script>

<Editable bind:ref={rootRef} defaultValue="Layer name">
  {#snippet asChild(props)}
    <section {...props()} aria-label="Editable section">
      <EditableArea><EditableInput /><EditablePreview /></EditableArea>
    </section>
  {/snippet}
</Editable>
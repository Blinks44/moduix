<script lang="ts">
  import { useEditableContext, type EditableControlProps } from '@ark-ui/svelte/editable';
  import EditableCancelTrigger from './EditableCancelTrigger.svelte';
  import EditableControl from './EditableControl.svelte';
  import EditableEditTrigger from './EditableEditTrigger.svelte';
  import EditableSubmitTrigger from './EditableSubmitTrigger.svelte';

  let { ref = $bindable(null), ...props }: Omit<EditableControlProps, 'asChild' | 'children'> =
    $props();
  const editable = useEditableContext();
</script>

<EditableControl {...props} bind:ref>
  {#if editable().editing}
    <EditableSubmitTrigger />
    <EditableCancelTrigger />
  {:else}
    <EditableEditTrigger />
  {/if}
</EditableControl>
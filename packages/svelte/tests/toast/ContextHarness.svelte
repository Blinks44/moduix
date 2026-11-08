<script lang="ts">
  import {
    Toast,
    ToastCloseTrigger,
    ToastToaster,
    type CreateToasterReturn,
  } from '@/components/toast';
  import ContextTitle from './ContextTitle.svelte';

  let { toaster }: { toaster: CreateToasterReturn } = $props();
</script>

<ToastToaster {toaster} portalled={false}>
  {#snippet children()}
    <Toast>
      <ContextTitle />
      <ToastCloseTrigger aria-label="Dismiss custom toast">
        {#snippet asChild(props)}<button {...props()} type="button">Dismiss</button>{/snippet}
      </ToastCloseTrigger>
    </Toast>
  {/snippet}
</ToastToaster>
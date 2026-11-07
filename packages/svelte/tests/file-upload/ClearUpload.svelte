<script lang="ts">
  import type { PropsFn } from '@ark-ui/svelte';
  import { FileUpload, FileUploadClearTrigger } from '@/components/file-upload';

  let {
    asChild = false,
    changes,
    click,
    disabled = true,
  }: {
    asChild?: boolean;
    changes?: (details: unknown) => void;
    click?: () => void;
    disabled?: boolean;
  } = $props();

  const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
  let acceptedFiles = $state([file]);
  let triggerRef = $state<HTMLElement | null>(null);

  export const getState = () => ({ acceptedFiles, triggerRef });
</script>

{#snippet clearButton(props: PropsFn<'button'>)}
  <button {...props()} type="button">Clear files</button>
{/snippet}

<FileUpload bind:acceptedFiles {disabled} onFileChange={changes}>
  <FileUploadClearTrigger
    bind:ref={triggerRef}
    asChild={asChild ? clearButton : undefined}
    class="consumer-clear"
    title="Clear attachments"
    data-testid="clear"
    onclick={click}
  >
    {#if !asChild}Clear files{/if}
  </FileUploadClearTrigger>
</FileUpload>
<script lang="ts">
  import {
    Dialog,
    DialogCloseIcon,
    DialogCloseTrigger,
    DialogContent,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
    type DialogRootProps,
  } from '@/components/dialog';

  let {
    closeIcon = false,
    closeTrigger = false,
    open = $bindable(),
    ...props
  }: DialogRootProps & { closeIcon?: boolean; closeTrigger?: boolean } = $props();
</script>

<div data-testid="dialog-host">
  <Dialog {...props} bind:open>
    <DialogTrigger>Open dialog</DialogTrigger>
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Preferences</DialogTitle>
        {#if closeTrigger}<DialogCloseTrigger>Close dialog</DialogCloseTrigger>{/if}
        {#if closeIcon}<DialogCloseIcon />{/if}
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</div>
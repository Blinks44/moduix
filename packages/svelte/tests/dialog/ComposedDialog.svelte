<script lang="ts">
  import {
    Dialog,
    DialogBackdrop,
    DialogBody,
    DialogCloseIcon,
    DialogCloseTrigger,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
    type DialogOpenChangeDetails,
  } from '@/components/dialog';

  let { details }: { details: DialogOpenChangeDetails[] } = $props();
  let open = $state(false);
</script>

<Dialog bind:open portalled={false} onOpenChange={(detail) => details.push(detail)}>
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Preferences</DialogTitle>
        <DialogCloseIcon />
        <DialogDescription>Description</DialogDescription>
      </DialogHeader>
      <DialogBody>Body</DialogBody>
      <DialogFooter><DialogCloseTrigger>Close dialog</DialogCloseTrigger></DialogFooter>
    </DialogContent>
  </DialogPositioner>
</Dialog>
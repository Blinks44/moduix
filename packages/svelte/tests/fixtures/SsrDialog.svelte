<script lang="ts">
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseIcon,
    DialogContent,
    DialogDescription,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@/components/dialog';
</script>

<Dialog defaultOpen portalled={false}>
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Preferences</DialogTitle>
      <DialogDescription>Description</DialogDescription>
      <DialogCloseIcon />
    </DialogContent>
  </DialogPositioner>
</Dialog>
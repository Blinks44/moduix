<script lang="ts">
  import {
    Dialog,
    DialogCloseIcon,
    DialogContent,
    DialogPositioner,
    DialogTitle,
  } from '@/components/dialog';
</script>

<Dialog defaultOpen portalled={false}>
  <DialogPositioner>
    <DialogContent class="p-4">
      <DialogTitle>Preferences</DialogTitle>
      <DialogCloseIcon class="size-8" />
    </DialogContent>
  </DialogPositioner>
</Dialog>
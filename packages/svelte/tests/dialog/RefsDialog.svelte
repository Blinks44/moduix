<script lang="ts">
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseIcon,
    DialogCloseTrigger,
    DialogContent,
    DialogDescription,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@/components/dialog';

  const refs: Record<string, Element | null> = $state({
    trigger: null,
    backdrop: null,
    positioner: null,
    content: null,
    title: null,
    description: null,
    closeTrigger: null,
    closeIcon: null,
  });

  export const getRefs = () => refs;
</script>

<Dialog defaultOpen portalled={false}>
  <DialogTrigger bind:ref={refs.trigger}>Open dialog</DialogTrigger>
  <DialogTrigger>
    {#snippet asChild(props)}<button {...props()}>Composed trigger</button>{/snippet}
  </DialogTrigger>
  <DialogBackdrop bind:ref={refs.backdrop} />
  <DialogPositioner bind:ref={refs.positioner}>
    <DialogContent bind:ref={refs.content}>
      <DialogTitle bind:ref={refs.title}>Preferences</DialogTitle>
      <DialogDescription bind:ref={refs.description}>Description</DialogDescription>
      <DialogCloseTrigger bind:ref={refs.closeTrigger}>Close</DialogCloseTrigger>
      <DialogCloseIcon bind:ref={refs.closeIcon} />
    </DialogContent>
  </DialogPositioner>
</Dialog>
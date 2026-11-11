<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
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
    DialogRootProvider,
    DialogTitle,
    DialogTrigger,
    useDialog,
  } from '@/components/dialog';
  import {
    ScrollArea,
    ScrollAreaContent,
    ScrollAreaCorner,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
  } from '@/components/scroll-area';
  import { insideScrollSections } from '../data/insideScrollSections';
  import storyStyles from './Dialog.stories.module.css';
  import DialogStatusText from './DialogStatusText.svelte';
  import DialogSurface from './DialogSurface.svelte';

  const { Story } = defineMeta({
    title: 'Components/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let open = $state(false);
  let inputRef: HTMLInputElement | undefined = $state();
  const dialog = useDialog();
  const parentDialog = useDialog();
  const childDialog = useDialog();
</script>

<Story name="Basic" asChild>
  <Dialog>
    <DialogTrigger>
      {#snippet asChild(props)}<Button {...props()}>View notifications</Button>{/snippet}
    </DialogTrigger>
    <DialogSurface>
      <DialogHeader>
        <DialogTitle>Notifications</DialogTitle>
        <DialogCloseIcon />
        <DialogDescription>You are all caught up. Good job!</DialogDescription>
      </DialogHeader>
    </DialogSurface>
  </Dialog>
</Story>

<Story name="Controlled" asChild>
  <Dialog bind:open>
    <DialogTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open controlled dialog</Button>{/snippet}
    </DialogTrigger>
    <DialogSurface>
      <DialogTitle>Publish changes?</DialogTitle>
      <DialogDescription>This will make the latest version visible to all users.</DialogDescription>
      <DialogFooter>
        <DialogCloseTrigger>
          {#snippet asChild(props)}
            <Button {...props()} variant="outline">Back to editing</Button>
          {/snippet}
        </DialogCloseTrigger>
      </DialogFooter>
    </DialogSurface>
  </Dialog>
</Story>

<Story name="Root Provider" asChild>
  <Button onclick={() => dialog().setOpen(true)}>
    Dialog is {dialog().open ? 'open' : 'closed'}
  </Button>
  <DialogRootProvider value={dialog}>
    <DialogSurface>
      <DialogTitle>Controlled externally</DialogTitle>
      <DialogDescription>This dialog is controlled through the Ark UI store.</DialogDescription>
      <DialogCloseIcon />
    </DialogSurface>
  </DialogRootProvider>
</Story>

<Story name="Alert Dialog" asChild>
  <Dialog role="alertdialog">
    <DialogTrigger>
      {#snippet asChild(props)}<Button {...props()}>Delete account</Button>{/snippet}
    </DialogTrigger>
    <DialogSurface>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Your account data will be permanently removed.
      </DialogDescription>
      <DialogFooter>
        <DialogCloseTrigger>
          {#snippet asChild(props)}<Button {...props()} variant="outline">Cancel</Button>{/snippet}
        </DialogCloseTrigger>
        <Button>Delete account</Button>
      </DialogFooter>
    </DialogSurface>
  </Dialog>
</Story>

<Story name="Initial Focus" asChild>
  <Dialog initialFocusEl={() => inputRef ?? null}>
    <DialogTrigger>
      {#snippet asChild(props)}<Button {...props()}>Edit profile</Button>{/snippet}
    </DialogTrigger>
    <DialogSurface>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>The first input receives focus when opened.</DialogDescription>
      <DialogBody><input bind:this={inputRef} placeholder="Name" /></DialogBody>
    </DialogSurface>
  </Dialog>
</Story>

<Story name="Scrollable Body" asChild>
  <Dialog>
    <DialogTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open long content</Button>{/snippet}
    </DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent class={storyStyles.scrollContent}>
        <DialogHeader>
          <DialogTitle>Release checklist</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>Review all items before publishing to production.</DialogDescription>
        </DialogHeader>
        <DialogBody class={storyStyles.scrollBody}>
          <ScrollArea class={storyStyles.scrollArea}>
            <ScrollAreaViewport>
              <ScrollAreaContent>
                <div class={storyStyles.scrollSections}>
                  {#each insideScrollSections as item (item.title)}
                    <section>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </section>
                  {/each}
                </div>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollArea>
        </DialogBody>
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</Story>

<Story name="Nested" asChild>
  <Button onclick={() => parentDialog().setOpen(true)}>Open parent dialog</Button>
  <DialogRootProvider value={parentDialog}>
    <DialogSurface>
      <DialogTitle>Parent dialog</DialogTitle>
      <DialogDescription>Open a nested dialog to see layered state.</DialogDescription>
      <DialogBody>
        <Button onclick={() => childDialog().setOpen(true)}>Open nested dialog</Button>
      </DialogBody>
    </DialogSurface>
  </DialogRootProvider>
  <DialogRootProvider value={childDialog}>
    <DialogSurface>
      <DialogTitle>Nested dialog</DialogTitle>
      <DialogDescription>Ark UI manages the nested layer stack.</DialogDescription>
      <DialogCloseIcon />
    </DialogSurface>
  </DialogRootProvider>
</Story>

<Story name="Non Modal" asChild>
  <Dialog modal={false}>
    <DialogTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open non-modal dialog</Button>{/snippet}
    </DialogTrigger>
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Non-modal dialog</DialogTitle>
        <DialogCloseIcon />
        <DialogDescription
          >The page remains interactive while this dialog is open.</DialogDescription
        >
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</Story>

<Story name="Context" asChild>
  <Dialog>
    <DialogTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open status dialog</Button>{/snippet}
    </DialogTrigger>
    <DialogSurface>
      <DialogTitle>Status</DialogTitle>
      <DialogDescription><DialogStatusText /></DialogDescription>
    </DialogSurface>
  </Dialog>
</Story>

<Story name="Custom Close Icon" asChild>
  <Dialog>
    <DialogTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open dialog</Button>{/snippet}
    </DialogTrigger>
    <DialogSurface>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogCloseIcon aria-label="Close dialog"
          ><span aria-hidden="true">×</span></DialogCloseIcon
        >
        <DialogDescription>The close icon supports custom content.</DialogDescription>
      </DialogHeader>
    </DialogSurface>
  </Dialog>
</Story>
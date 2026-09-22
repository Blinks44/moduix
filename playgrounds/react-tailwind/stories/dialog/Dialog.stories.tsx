import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
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
  useDialogContext,
} from '@/components/dialog/Dialog';
import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@/components/scroll-area/ScrollArea';
import { insideScrollSections } from '../data/insideScrollSections';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function DialogSurface({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>{children}</DialogContent>
      </DialogPositioner>
    </>
  );
}

function DialogStatusText() {
  const dialog = useDialogContext();

  return <>Dialog is {dialog.open ? 'open' : 'closed'}</>;
}

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View notifications</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>You are all caught up. Good job!</DialogDescription>
        </DialogHeader>
      </DialogSurface>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Dialog open={open} onOpenChange={(details) => setOpen(details.open)}>
        <DialogTrigger asChild>
          <Button>Open controlled dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogTitle>Publish changes?</DialogTitle>
          <DialogDescription>
            This will make the latest version visible to all users.
          </DialogDescription>
          <DialogFooter>
            <DialogCloseTrigger asChild>
              <Button variant="outline">Back to editing</Button>
            </DialogCloseTrigger>
          </DialogFooter>
        </DialogSurface>
      </Dialog>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const dialog = useDialog();

    return (
      <>
        <Button onClick={() => dialog.setOpen(true)}>
          Dialog is {dialog.open ? 'open' : 'closed'}
        </Button>
        <DialogRootProvider value={dialog}>
          <DialogSurface>
            <DialogTitle>Controlled externally</DialogTitle>
            <DialogDescription>
              This dialog is controlled through the Ark UI store.
            </DialogDescription>
            <DialogCloseIcon />
          </DialogSurface>
        </DialogRootProvider>
      </>
    );
  },
};

export const AlertDialog: Story = {
  render: () => (
    <Dialog role="alertdialog">
      <DialogTrigger asChild>
        <Button>Delete account</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Your account data will be permanently removed.
        </DialogDescription>
        <DialogFooter>
          <DialogCloseTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogCloseTrigger>
          <Button>Delete account</Button>
        </DialogFooter>
      </DialogSurface>
    </Dialog>
  ),
};

export const InitialFocus: Story = {
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <Dialog initialFocusEl={() => inputRef.current}>
        <DialogTrigger asChild>
          <Button>Edit profile</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>The first input receives focus when opened.</DialogDescription>
          <DialogBody>
            <input ref={inputRef} placeholder="Name" />
          </DialogBody>
        </DialogSurface>
      </Dialog>
    );
  },
};

export const ScrollableBody: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open long content</Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="flex h-[min(42rem,calc(100dvh-2.5rem))] flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle>Release checklist</DialogTitle>
            <DialogCloseIcon />
            <DialogDescription>Review all items before publishing to production.</DialogDescription>
          </DialogHeader>
          <DialogBody className="min-h-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full min-h-0">
              <ScrollAreaViewport>
                <ScrollAreaContent>
                  <div className="flex flex-col gap-5">
                    {insideScrollSections.map((item) => (
                      <section key={item.title}>
                        <h3 className="m-0 mb-1 text-sm leading-6 font-semibold">{item.title}</h3>
                        <p className="m-0 text-sm leading-6 text-muted-foreground">{item.body}</p>
                      </section>
                    ))}
                  </div>
                </ScrollAreaContent>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar>
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollArea>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  ),
};

export const Nested: Story = {
  render: () => {
    const parentDialog = useDialog();
    const childDialog = useDialog();

    return (
      <>
        <Button onClick={() => parentDialog.setOpen(true)}>Open parent dialog</Button>
        <DialogRootProvider value={parentDialog}>
          <DialogSurface>
            <DialogTitle>Parent dialog</DialogTitle>
            <DialogDescription>Open a nested dialog to see layered state.</DialogDescription>
            <DialogBody>
              <Button onClick={() => childDialog.setOpen(true)}>Open nested dialog</Button>
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
      </>
    );
  },
};

export const NonModal: Story = {
  render: () => (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button>Open non-modal dialog</Button>
      </DialogTrigger>
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Non-modal dialog</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>
            The page remains interactive while this dialog is open.
          </DialogDescription>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  ),
};

export const Context: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open status dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle>Status</DialogTitle>
        <DialogDescription>
          <DialogStatusText />
        </DialogDescription>
      </DialogSurface>
    </Dialog>
  ),
};

export const CustomCloseIcon: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogCloseIcon aria-label="Close dialog">
            <span aria-hidden="true">×</span>
          </DialogCloseIcon>
          <DialogDescription>The close icon supports custom content.</DialogDescription>
        </DialogHeader>
      </DialogSurface>
    </Dialog>
  ),
};
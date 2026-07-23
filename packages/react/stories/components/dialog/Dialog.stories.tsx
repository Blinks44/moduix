import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { Button } from '../../../src/components/button';
import { Dialog, useDialog, useDialogContext } from '../../../src/components/dialog/Dialog';
import { ScrollArea } from '../../../src/components/scroll-area';
import { insideScrollSections } from '../../data/insideScrollSections';
import storyStyles from './Dialog.stories.module.css';

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

function DialogSurface({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>{children}</Dialog.Content>
      </Dialog.Positioner>
    </>
  );
}

function DialogStatusText() {
  const dialog = useDialogContext();

  return <>Dialog is {dialog.open ? 'open' : 'closed'}</>;
}

export const Basic: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>View notifications</Button>
      </Dialog.Trigger>
      <DialogSurface>
        <Dialog.Header>
          <Dialog.Title>Notifications</Dialog.Title>
          <Dialog.CloseIcon />
          <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        </Dialog.Header>
      </DialogSurface>
    </Dialog.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Dialog.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Dialog.Trigger asChild>
          <Button>Open controlled dialog</Button>
        </Dialog.Trigger>
        <DialogSurface>
          <Dialog.Title>Publish changes?</Dialog.Title>
          <Dialog.Description>
            This will make the latest version visible to all users.
          </Dialog.Description>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline">Back to editing</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </DialogSurface>
      </Dialog.Root>
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
        <Dialog.RootProvider value={dialog}>
          <DialogSurface>
            <Dialog.Title>Controlled externally</Dialog.Title>
            <Dialog.Description>
              This dialog is controlled through the Ark UI store.
            </Dialog.Description>
            <Dialog.CloseIcon />
          </DialogSurface>
        </Dialog.RootProvider>
      </>
    );
  },
};

export const AlertDialog: Story = {
  render: () => (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button>Delete account</Button>
      </Dialog.Trigger>
      <DialogSurface>
        <Dialog.Title>Are you absolutely sure?</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. Your account data will be permanently removed.
        </Dialog.Description>
        <Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.CloseTrigger>
          <Button>Delete account</Button>
        </Dialog.Footer>
      </DialogSurface>
    </Dialog.Root>
  ),
};

export const InitialFocus: Story = {
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <Dialog.Root initialFocusEl={() => inputRef.current}>
        <Dialog.Trigger asChild>
          <Button>Edit profile</Button>
        </Dialog.Trigger>
        <DialogSurface>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>The first input receives focus when opened.</Dialog.Description>
          <Dialog.Body>
            <input ref={inputRef} placeholder="Name" />
          </Dialog.Body>
        </DialogSurface>
      </Dialog.Root>
    );
  },
};

export const ScrollableBody: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open long content</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content className={storyStyles.scrollContent}>
          <Dialog.Header>
            <Dialog.Title>Release checklist</Dialog.Title>
            <Dialog.CloseIcon />
            <Dialog.Description>
              Review all items before publishing to production.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body className={storyStyles.scrollBody}>
            <ScrollArea className={storyStyles.scrollArea}>
              <ScrollArea.Viewport>
                <ScrollArea.Content>
                  <div className={storyStyles.scrollSections}>
                    {insideScrollSections.map((item) => (
                      <section key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </section>
                    ))}
                  </div>
                </ScrollArea.Content>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner />
            </ScrollArea>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ),
};

export const Nested: Story = {
  render: () => {
    const parentDialog = useDialog();
    const childDialog = useDialog();

    return (
      <>
        <Button onClick={() => parentDialog.setOpen(true)}>Open parent dialog</Button>
        <Dialog.RootProvider value={parentDialog}>
          <DialogSurface>
            <Dialog.Title>Parent dialog</Dialog.Title>
            <Dialog.Description>Open a nested dialog to see layered state.</Dialog.Description>
            <Dialog.Body>
              <Button onClick={() => childDialog.setOpen(true)}>Open nested dialog</Button>
            </Dialog.Body>
          </DialogSurface>
        </Dialog.RootProvider>
        <Dialog.RootProvider value={childDialog}>
          <DialogSurface>
            <Dialog.Title>Nested dialog</Dialog.Title>
            <Dialog.Description>Ark UI manages the nested layer stack.</Dialog.Description>
            <Dialog.CloseIcon />
          </DialogSurface>
        </Dialog.RootProvider>
      </>
    );
  },
};

export const NonModal: Story = {
  render: () => (
    <Dialog.Root modal={false}>
      <Dialog.Trigger asChild>
        <Button>Open non-modal dialog</Button>
      </Dialog.Trigger>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Non-modal dialog</Dialog.Title>
          <Dialog.CloseIcon />
          <Dialog.Description>
            The page remains interactive while this dialog is open.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ),
};

export const Context: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open status dialog</Button>
      </Dialog.Trigger>
      <DialogSurface>
        <Dialog.Title>Status</Dialog.Title>
        <Dialog.Description>
          <DialogStatusText />
        </Dialog.Description>
      </DialogSurface>
    </Dialog.Root>
  ),
};

export const CustomCloseIcon: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <DialogSurface>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.CloseIcon aria-label="Close dialog">
            <span aria-hidden="true">×</span>
          </Dialog.CloseIcon>
          <Dialog.Description>The close icon supports custom content.</Dialog.Description>
        </Dialog.Header>
      </DialogSurface>
    </Dialog.Root>
  ),
};
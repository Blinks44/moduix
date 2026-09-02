import { For, createSignal } from 'solid-js';
import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Dialog, useDialog, useDialogContext } from '@/components/dialog/Dialog';
import { ScrollArea } from '@/components/scroll-area/ScrollArea';
import { insideScrollSections } from '../data/insideScrollSections';
import storyStyles from './Dialog.stories.module.css';

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

function DialogSurface(props: { children: JSX.Element }) {
  return (
    <>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>{props.children}</Dialog.Content>
      </Dialog.Positioner>
    </>
  );
}

function DialogStatusText() {
  const dialog = useDialogContext();

  return <>Dialog is {dialog().open ? 'open' : 'closed'}</>;
}

export const Basic: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger
        asChild={(triggerProps) => <Button {...triggerProps()}>View notifications</Button>}
      />
      <DialogSurface>
        <Dialog.Header>
          <Dialog.Title>Notifications</Dialog.Title>
          <Dialog.CloseIcon />
          <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        </Dialog.Header>
      </DialogSurface>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = createSignal(false);

    return (
      <Dialog open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <Dialog.Trigger
          asChild={(triggerProps) => <Button {...triggerProps()}>Open controlled dialog</Button>}
        />
        <DialogSurface>
          <Dialog.Title>Publish changes?</Dialog.Title>
          <Dialog.Description>
            This will make the latest version visible to all users.
          </Dialog.Description>
          <Dialog.Footer>
            <Dialog.CloseTrigger
              asChild={(triggerProps) => (
                <Button {...triggerProps()} variant="outline">
                  Back to editing
                </Button>
              )}
            />
          </Dialog.Footer>
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
        <Button onClick={() => dialog().setOpen(true)}>
          Dialog is {dialog().open ? 'open' : 'closed'}
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
    <Dialog role="alertdialog">
      <Dialog.Trigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Delete account</Button>}
      />
      <DialogSurface>
        <Dialog.Title>Are you absolutely sure?</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. Your account data will be permanently removed.
        </Dialog.Description>
        <Dialog.Footer>
          <Dialog.CloseTrigger
            asChild={(triggerProps) => (
              <Button {...triggerProps()} variant="outline">
                Cancel
              </Button>
            )}
          />
          <Button>Delete account</Button>
        </Dialog.Footer>
      </DialogSurface>
    </Dialog>
  ),
};

export const InitialFocus: Story = {
  render: () => {
    let inputRef: HTMLInputElement | undefined;

    return (
      <Dialog initialFocusEl={() => inputRef ?? null}>
        <Dialog.Trigger
          asChild={(triggerProps) => <Button {...triggerProps()}>Edit profile</Button>}
        />
        <DialogSurface>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>The first input receives focus when opened.</Dialog.Description>
          <Dialog.Body>
            <input ref={(element) => (inputRef = element)} placeholder="Name" />
          </Dialog.Body>
        </DialogSurface>
      </Dialog>
    );
  },
};

export const ScrollableBody: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open long content</Button>}
      />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content class={storyStyles.scrollContent}>
          <Dialog.Header>
            <Dialog.Title>Release checklist</Dialog.Title>
            <Dialog.CloseIcon />
            <Dialog.Description>
              Review all items before publishing to production.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body class={storyStyles.scrollBody}>
            <ScrollArea class={storyStyles.scrollArea}>
              <ScrollArea.Viewport>
                <ScrollArea.Content>
                  <div class={storyStyles.scrollSections}>
                    <For each={insideScrollSections}>
                      {(item) => (
                        <section>
                          <h3>{item.title}</h3>
                          <p>{item.body}</p>
                        </section>
                      )}
                    </For>
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
    </Dialog>
  ),
};

export const Nested: Story = {
  render: () => {
    const parentDialog = useDialog();
    const childDialog = useDialog();

    return (
      <>
        <Button onClick={() => parentDialog().setOpen(true)}>Open parent dialog</Button>
        <Dialog.RootProvider value={parentDialog}>
          <DialogSurface>
            <Dialog.Title>Parent dialog</Dialog.Title>
            <Dialog.Description>Open a nested dialog to see layered state.</Dialog.Description>
            <Dialog.Body>
              <Button onClick={() => childDialog().setOpen(true)}>Open nested dialog</Button>
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
    <Dialog modal={false}>
      <Dialog.Trigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open non-modal dialog</Button>}
      />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Non-modal dialog</Dialog.Title>
          <Dialog.CloseIcon />
          <Dialog.Description>
            The page remains interactive while this dialog is open.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  ),
};

export const Context: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open status dialog</Button>}
      />
      <DialogSurface>
        <Dialog.Title>Status</Dialog.Title>
        <Dialog.Description>
          <DialogStatusText />
        </Dialog.Description>
      </DialogSurface>
    </Dialog>
  ),
};

export const CustomCloseIcon: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open dialog</Button>}
      />
      <DialogSurface>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.CloseIcon aria-label="Close dialog">
            <span aria-hidden="true">×</span>
          </Dialog.CloseIcon>
          <Dialog.Description>The close icon supports custom content.</Dialog.Description>
        </Dialog.Header>
      </DialogSurface>
    </Dialog>
  ),
};
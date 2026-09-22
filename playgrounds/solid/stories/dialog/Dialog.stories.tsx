import { For, createSignal } from 'solid-js';
import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
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
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/components/scroll-area/ScrollArea';
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
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>{props.children}</DialogContent>
      </DialogPositioner>
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
      <DialogTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>View notifications</Button>}
      />
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
    const [open, setOpen] = createSignal(false);

    return (
      <Dialog open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <DialogTrigger
          asChild={(triggerProps) => <Button {...triggerProps()}>Open controlled dialog</Button>}
        />
        <DialogSurface>
          <DialogTitle>Publish changes?</DialogTitle>
          <DialogDescription>
            This will make the latest version visible to all users.
          </DialogDescription>
          <DialogFooter>
            <DialogCloseTrigger
              asChild={(triggerProps) => (
                <Button {...triggerProps()} variant="outline">
                  Back to editing
                </Button>
              )}
            />
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
        <Button onClick={() => dialog().setOpen(true)}>
          Dialog is {dialog().open ? 'open' : 'closed'}
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
      <DialogTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Delete account</Button>}
      />
      <DialogSurface>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Your account data will be permanently removed.
        </DialogDescription>
        <DialogFooter>
          <DialogCloseTrigger
            asChild={(triggerProps) => (
              <Button {...triggerProps()} variant="outline">
                Cancel
              </Button>
            )}
          />
          <Button>Delete account</Button>
        </DialogFooter>
      </DialogSurface>
    </Dialog>
  ),
};

export const InitialFocus: Story = {
  render: () => {
    let inputRef: HTMLInputElement | undefined;

    return (
      <Dialog initialFocusEl={() => inputRef ?? null}>
        <DialogTrigger
          asChild={(triggerProps) => <Button {...triggerProps()}>Edit profile</Button>}
        />
        <DialogSurface>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>The first input receives focus when opened.</DialogDescription>
          <DialogBody>
            <input ref={(element) => (inputRef = element)} placeholder="Name" />
          </DialogBody>
        </DialogSurface>
      </Dialog>
    );
  },
};

export const ScrollableBody: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open long content</Button>}
      />
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
                    <For each={insideScrollSections}>
                      {(item) => (
                        <section>
                          <h3>{item.title}</h3>
                          <p>{item.body}</p>
                        </section>
                      )}
                    </For>
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
        <Button onClick={() => parentDialog().setOpen(true)}>Open parent dialog</Button>
        <DialogRootProvider value={parentDialog}>
          <DialogSurface>
            <DialogTitle>Parent dialog</DialogTitle>
            <DialogDescription>Open a nested dialog to see layered state.</DialogDescription>
            <DialogBody>
              <Button onClick={() => childDialog().setOpen(true)}>Open nested dialog</Button>
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
      <DialogTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open non-modal dialog</Button>}
      />
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
      <DialogTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open status dialog</Button>}
      />
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
      <DialogTrigger asChild={(triggerProps) => <Button {...triggerProps()}>Open dialog</Button>} />
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
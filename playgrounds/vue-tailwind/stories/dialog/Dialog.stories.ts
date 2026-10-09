import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
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

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const dialogComponents = {
  Button,
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
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
};

const DialogSurface = defineComponent({
  components: dialogComponents,
  template: `
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent><slot /></DialogContent>
    </DialogPositioner>
  `,
});

const DialogStatusText = defineComponent({
  setup() {
    return { dialog: useDialogContext() };
  },
  template: '<span>Dialog is {{ dialog.open ? "open" : "closed" }}</span>',
});

const storyComponents = { ...dialogComponents, DialogStatusText, DialogSurface };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { insideScrollSections, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Dialog>
      <DialogTrigger as-child><Button>View notifications</Button></DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>You are all caught up. Good job!</DialogDescription>
        </DialogHeader>
      </DialogSurface>
    </Dialog>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <Dialog v-model:open="open">
        <DialogTrigger as-child><Button>Open controlled dialog</Button></DialogTrigger>
        <DialogSurface>
          <DialogTitle>Publish changes?</DialogTitle>
          <DialogDescription>This will make the latest version visible to all users.</DialogDescription>
          <DialogFooter><DialogCloseTrigger as-child><Button variant="outline">Back to editing</Button></DialogCloseTrigger></DialogFooter>
        </DialogSurface>
      </Dialog>
    `,
    () => ({ open: ref(false) }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <Button @click="dialog.setOpen(true)">Dialog is {{ dialog.open ? 'open' : 'closed' }}</Button>
      <DialogRootProvider :value="dialog">
        <DialogSurface>
          <DialogTitle>Controlled externally</DialogTitle>
          <DialogDescription>This dialog is controlled through the Ark UI store.</DialogDescription>
          <DialogCloseIcon />
        </DialogSurface>
      </DialogRootProvider>
    `,
    () => ({ dialog: useDialog() }),
  ),
};

export const AlertDialog: Story = {
  render: renderStory(`
    <Dialog role="alertdialog">
      <DialogTrigger as-child><Button>Delete account</Button></DialogTrigger>
      <DialogSurface>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>This action cannot be undone. Your account data will be permanently removed.</DialogDescription>
        <DialogFooter>
          <DialogCloseTrigger as-child><Button variant="outline">Cancel</Button></DialogCloseTrigger>
          <Button>Delete account</Button>
        </DialogFooter>
      </DialogSurface>
    </Dialog>
  `),
};

export const InitialFocus: Story = {
  render: renderStory(
    `
      <Dialog :initial-focus-el="() => inputRef">
        <DialogTrigger as-child><Button>Edit profile</Button></DialogTrigger>
        <DialogSurface>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>The first input receives focus when opened.</DialogDescription>
          <DialogBody><input ref="inputRef" placeholder="Name" /></DialogBody>
        </DialogSurface>
      </Dialog>
    `,
    () => {
      const inputRef = ref<HTMLInputElement>();
      return { inputRef };
    },
  ),
};

export const ScrollableBody: Story = {
  render: renderStory(`
    <Dialog>
      <DialogTrigger as-child><Button>Open long content</Button></DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent class="flex h-[min(42rem,calc(100dvh-2.5rem))] flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle>Release checklist</DialogTitle>
            <DialogCloseIcon />
            <DialogDescription>Review all items before publishing to production.</DialogDescription>
          </DialogHeader>
          <DialogBody class="min-h-0 flex-1 overflow-hidden">
            <ScrollArea class="h-full min-h-0">
              <ScrollAreaViewport><ScrollAreaContent>
                <div class="flex flex-col gap-5">
                  <section v-for="item in insideScrollSections" :key="item.title">
                    <h3 class="m-0 mb-1 text-sm leading-6 font-semibold">{{ item.title }}</h3>
                    <p class="m-0 text-sm leading-6 text-muted-foreground">{{ item.body }}</p>
                  </section>
                </div>
              </ScrollAreaContent></ScrollAreaViewport>
              <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollArea>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  `),
};

export const Nested: Story = {
  render: renderStory(
    `
      <Button @click="parentDialog.setOpen(true)">Open parent dialog</Button>
      <DialogRootProvider :value="parentDialog">
        <DialogSurface>
          <DialogTitle>Parent dialog</DialogTitle>
          <DialogDescription>Open a nested dialog to see layered state.</DialogDescription>
          <DialogBody><Button @click="childDialog.setOpen(true)">Open nested dialog</Button></DialogBody>
        </DialogSurface>
      </DialogRootProvider>
      <DialogRootProvider :value="childDialog">
        <DialogSurface>
          <DialogTitle>Nested dialog</DialogTitle>
          <DialogDescription>Ark UI manages the nested layer stack.</DialogDescription>
          <DialogCloseIcon />
        </DialogSurface>
      </DialogRootProvider>
    `,
    () => ({ childDialog: useDialog(), parentDialog: useDialog() }),
  ),
};

export const NonModal: Story = {
  render: renderStory(`
    <Dialog :modal="false">
      <DialogTrigger as-child><Button>Open non-modal dialog</Button></DialogTrigger>
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Non-modal dialog</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>The page remains interactive while this dialog is open.</DialogDescription>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  `),
};

export const Context: Story = {
  render: renderStory(`
    <Dialog>
      <DialogTrigger as-child><Button>Open status dialog</Button></DialogTrigger>
      <DialogSurface>
        <DialogTitle>Status</DialogTitle>
        <DialogDescription><DialogStatusText /></DialogDescription>
      </DialogSurface>
    </Dialog>
  `),
};

export const CustomCloseIcon: Story = {
  render: renderStory(`
    <Dialog>
      <DialogTrigger as-child><Button>Open dialog</Button></DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogCloseIcon aria-label="Close dialog"><span aria-hidden="true">×</span></DialogCloseIcon>
          <DialogDescription>The close icon supports custom content.</DialogDescription>
        </DialogHeader>
      </DialogSurface>
    </Dialog>
  `),
};
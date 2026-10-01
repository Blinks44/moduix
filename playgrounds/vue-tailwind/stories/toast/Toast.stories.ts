import type { CreateToasterReturn, ToastPlacement } from '@ark-ui/vue/toast';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import { Button } from '@/components/button';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@/components/toast';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;
type ToastStore = CreateToasterReturn;
const toastTypes = ['info', 'success', 'warning', 'error'] as const;
const stackClass = 'grid justify-items-center gap-3';
const segmentedClass = 'flex flex-wrap justify-center gap-1';
const segmentClass =
  'min-h-control-sm cursor-pointer rounded-sm border border-border bg-background px-2 py-1 text-xs leading-4 text-foreground data-[active]:border-foreground data-[active]:bg-foreground data-[active]:text-background';
const typedActionsClass = 'flex flex-wrap justify-center gap-2';
const customToastClass = '!border-primary !bg-primary !text-primary-foreground';
const customContentClass = 'grid grid-cols-[auto_minmax(0,1fr)] gap-x-3';
const customIconClass = 'row-span-2 size-4 text-current';
const closeIconClass = 'size-3 shrink-0';

const basicToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
const actionToaster = createToaster({ placement: 'bottom-end', gap: 24 });
const durationToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
const expandedToaster = createToaster({ placement: 'bottom-end', overlap: false, gap: 16 });
const maxToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16, max: 3 });
const promiseToaster = createToaster({ placement: 'bottom-end', overlap: false, gap: 16 });
const typeToaster = createToaster({ placement: 'bottom-end', overlap: false, gap: 16 });
const updateToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
const varyingHeightToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
const customToaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
const placements = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'] as const;
const placementToasters: Record<ToastPlacement, ToastStore> = {
  'top-start': createToaster({ placement: 'top-start', overlap: true, gap: 16 }),
  top: createToaster({ placement: 'top', overlap: true, gap: 16 }),
  'top-end': createToaster({ placement: 'top-end', overlap: true, gap: 16 }),
  'bottom-start': createToaster({ placement: 'bottom-start', overlap: true, gap: 16 }),
  bottom: createToaster({ placement: 'bottom', overlap: true, gap: 16 }),
  'bottom-end': createToaster({ placement: 'bottom-end', overlap: true, gap: 16 }),
};

const InfoIcon = defineComponent({
  name: 'InfoIcon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
});

const ToastRenderer = defineComponent({
  components: { ToastToaster },
  props: { toaster: { type: Object as PropType<ToastStore>, required: true } },
  template: '<ToastToaster :toaster="toaster" />',
});

const PlacementStory = defineComponent({
  components: { Button, ToastRenderer },
  setup() {
    return {
      placement: ref<ToastPlacement>('bottom-end'),
      placementToasters,
      placements,
      segmentClass,
      segmentedClass,
      stackClass,
    };
  },
  template: `
    <div :class="stackClass">
      <div :class="segmentedClass">
        <button
          v-for="item in placements"
          :key="item"
          type="button"
          :class="segmentClass"
          :data-active="item === placement ? true : undefined"
          @click="placement = item"
        >{{ item }}</button>
      </div>
      <Button @click="placementToasters[placement].info({ title: 'Notification', description: 'This toast appears at ' + placement + '.' })">
        Show {{ placement }}
      </Button>
    </div>
    <ToastRenderer v-for="item in placements" :key="item" :toaster="placementToasters[item]" />
  `,
});

const PromiseToastStory = defineComponent({
  components: { Button, ToastRenderer },
  setup() {
    const handleUpload = () => {
      promiseToaster.promise(uploadFile, {
        loading: {
          title: 'Uploading file...',
          description: 'Please wait while we upload your document.',
        },
        success: {
          title: 'Upload complete',
          description: 'Your file has been uploaded successfully.',
        },
        error: {
          title: 'Upload failed',
          description: 'Could not upload the file. Please try again.',
        },
      });
    };

    return { handleUpload, promiseToaster };
  },
  template: `
    <Button @click="handleUpload">Upload file</Button>
    <ToastRenderer :toaster="promiseToaster" />
  `,
});

const UpdateStory = defineComponent({
  components: { Button, ToastRenderer },
  setup() {
    const id = ref<string>();
    const createPending = () => {
      id.value = updateToaster.create({
        title: 'Sending message...',
        description: 'Please wait while we deliver your message.',
        type: 'loading',
      });
    };
    const updateMessage = () => {
      if (!id.value) return;
      updateToaster.update(id.value, {
        title: 'Message sent',
        description: 'Your message has been delivered successfully.',
        type: 'success',
      });
    };

    return { createPending, typedActionsClass, updateMessage, updateToaster };
  },
  template: `
    <div :class="typedActionsClass">
      <Button @click="createPending">Create pending toast</Button>
      <Button @click="updateMessage">Update same toast</Button>
    </div>
    <ToastRenderer :toaster="updateToaster" />
  `,
});

const VaryingHeightStory = defineComponent({
  components: { Button, ToastRenderer },
  setup() {
    const count = ref(0);
    const createVaryingToast = () => {
      const next = count.value + 1;
      count.value = next;
      varyingHeightToaster.info({
        title: `Notification ${next}`,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
      });
    };

    return { createVaryingToast, varyingHeightToaster };
  },
  template: `
    <Button @click="createVaryingToast">Create toast</Button>
    <ToastRenderer :toaster="varyingHeightToaster" />
  `,
});

const storyComponents = {
  Button,
  CloseIcon,
  InfoIcon,
  PlacementStory,
  PromiseToastStory,
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastRenderer,
  ToastTitle,
  ToastToaster,
  UpdateStory,
  VaryingHeightStory,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          basicToaster,
          actionToaster,
          closeIconClass,
          customContentClass,
          customIconClass,
          customToaster,
          customToastClass,
          durationToaster,
          expandedToaster,
          maxToaster,
          placementToasters,
          placements,
          promiseToaster,
          segmentClass,
          segmentedClass,
          stackClass,
          toastTypes,
          typedActionsClass,
          typeToaster,
          updateToaster,
          varyingHeightToaster,
          ...(setup ? setup() : {}),
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Button @click="basicToaster.create({ title: 'Scheduled for tomorrow', description: 'Your meeting has been scheduled for tomorrow at 10am.', type: 'info' })">
      Schedule meeting
    </Button>
    <ToastRenderer :toaster="basicToaster" />
  `),
};

export const Action: Story = {
  render: renderStory(`
    <Button @click="actionToaster.create({ title: 'Event has been created', description: 'We have sent you an email with the event details.', type: 'info', action: { label: 'Undo', onClick: () => actionToaster.info({ description: 'Event restored to draft.' }) } })">
      Create event
    </Button>
    <ToastRenderer :toaster="actionToaster" />
  `),
};

export const Duration: Story = {
  render: renderStory(`
    <div :class="typedActionsClass">
      <Button
        v-for="duration in [{ label: '1s', value: 1000 }, { label: '3s', value: 3000 }, { label: '5s', value: 5000 }, { label: 'Permanent', value: Infinity }]"
        :key="duration.label"
        @click="durationToaster.create({ title: 'Reminder set', description: duration.value === Infinity ? 'This notification will stay until dismissed.' : 'This notification will disappear in ' + duration.label + '.', type: 'info', duration: duration.value })"
      >{{ duration.label }}</Button>
    </div>
    <ToastRenderer :toaster="durationToaster" />
  `),
};

export const AlwaysExpanded: Story = {
  name: 'Always Expanded',
  render: renderStory(`
    <Button @click="expandedToaster.info({ title: 'Expanded toast', description: 'Create several notifications to compare the always-expanded stack.' })">
      Create expanded toast
    </Button>
    <ToastRenderer :toaster="expandedToaster" />
  `),
};

export const MaxToasts: Story = {
  name: 'Max Toasts',
  render: renderStory(`
    <div :class="typedActionsClass">
      <Button @click="maxToaster.info({ title: 'New notification', description: 'You have a new message in your inbox.' })">Add notification</Button>
      <Button @click="['John liked your post', 'Sarah commented on your photo', 'New follower: @designpro', 'Your post was shared 10 times', 'Meeting reminder in 15 minutes'].forEach((description) => maxToaster.info({ title: 'Notification', description }))">
        Add 5 notifications
      </Button>
    </div>
    <ToastRenderer :toaster="maxToaster" />
  `),
};

export const Placement: Story = { render: () => PlacementStory };

export const PromiseToast: Story = {
  name: 'Promise Toast',
  render: () => PromiseToastStory,
};

export const Types: Story = {
  render: renderStory(`
    <div :class="typedActionsClass">
      <Button
        v-for="type in toastTypes"
        :key="type"
        @click="typeToaster.create({ title: type === 'info' ? 'Update available' : type + ' toast', description: 'This notification uses the ' + type + ' status style.', type })"
      >{{ type }}</Button>
    </div>
    <ToastRenderer :toaster="typeToaster" />
  `),
};

export const Update: Story = {
  name: 'Update an existing toast',
  render: () => UpdateStory,
};

export const VaryingHeight: Story = {
  name: 'Varying Height',
  render: () => VaryingHeightStory,
};

export const AdvancedCustomization: Story = {
  name: 'Advanced Customization',
  render: renderStory(`
    <Button @click="customToaster.success({ title: 'Workspace synced', description: 'Map edits are available to everyone.' })">
      Create custom toast
    </Button>
    <ToastToaster :toaster="customToaster">
      <template #default>
        <Toast :class="customToastClass">
          <div :class="customContentClass">
            <InfoIcon :class="customIconClass" />
            <ToastTitle />
            <ToastDescription class="text-primary-foreground/72" />
          </div>
          <ToastCloseTrigger class="!text-primary-foreground [@media(hover:hover)]:hover:!bg-primary-foreground/14 [@media(hover:hover)]:hover:!text-primary-foreground">
            <CloseIcon :class="closeIconClass" />
          </ToastCloseTrigger>
        </Toast>
      </template>
    </ToastToaster>
  `),
};

const uploadFile = () =>
  new Promise<void>((resolve, reject) => {
    window.setTimeout(() => {
      if (Math.random() > 0.5) resolve();
      else reject(new Error('Upload failed'));
    }, 2000);
  });

const descriptions = [
  'Your changes have been saved.',
  'File uploaded successfully. You can view it in your documents folder.',
  'Your meeting has been scheduled for tomorrow at 10:00 AM. We have sent a calendar invite to all participants.',
  'We noticed unusual activity on your account. Please verify your identity using the link sent to your email address.',
];
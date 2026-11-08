<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Toast,
    ToastCloseTrigger,
    ToastDescription,
    ToastTitle,
    ToastToaster,
    createToaster,
    type CreateToasterReturn,
    type ToastPlacement,
  } from '@/components/toast';
  import { CloseIcon } from '@/lib/moduix/icons/ui';
  import InfoIcon from './InfoIcon.svelte';
  import ToastRenderer from './ToastRenderer.svelte';

  const { Story } = defineMeta({
    title: 'Components/Toast',
    component: Toast,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const stackClass = 'grid justify-items-center gap-3';
  const segmentedClass = 'flex flex-wrap justify-center gap-1';
  const segmentClass =
    'min-h-control-sm cursor-pointer rounded-sm border border-border bg-background px-2 py-1 text-xs leading-4 text-foreground data-[active]:border-foreground data-[active]:bg-foreground data-[active]:text-background';
  const typedActionsClass = 'flex flex-wrap justify-center gap-2';
  const customToastClass = '!border-primary !bg-primary !text-primary-foreground';
  const customContentClass = 'grid grid-cols-[auto_minmax(0,1fr)] gap-x-3';
  const customIconClass = 'row-span-2 size-4 text-current';
  const closeIconClass = 'size-3 shrink-0';

  type ToastStore = CreateToasterReturn;
  const toastTypes = ['info', 'success', 'warning', 'error'] as const;
  const durations = [
    { label: '1s', value: 1000 },
    { label: '3s', value: 3000 },
    { label: '5s', value: 5000 },
    { label: 'Permanent', value: Infinity },
  ];
  const maxDescriptions = [
    'John liked your post',
    'Sarah commented on your photo',
    'New follower: @designpro',
    'Your post was shared 10 times',
    'Meeting reminder in 15 minutes',
  ];

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
  const placements = [
    'top-start',
    'top',
    'top-end',
    'bottom-start',
    'bottom',
    'bottom-end',
  ] as const;
  const placementToasters: Record<ToastPlacement, ToastStore> = {
    'top-start': createToaster({ placement: 'top-start', overlap: true, gap: 16 }),
    top: createToaster({ placement: 'top', overlap: true, gap: 16 }),
    'top-end': createToaster({ placement: 'top-end', overlap: true, gap: 16 }),
    'bottom-start': createToaster({ placement: 'bottom-start', overlap: true, gap: 16 }),
    bottom: createToaster({ placement: 'bottom', overlap: true, gap: 16 }),
    'bottom-end': createToaster({ placement: 'bottom-end', overlap: true, gap: 16 }),
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
</script>

<script lang="ts">
  let placement = $state<ToastPlacement>('bottom-end');
  let updateId = $state<string>();
  let count = $state(0);

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

  const createPending = () => {
    updateId = updateToaster.create({
      title: 'Sending message...',
      description: 'Please wait while we deliver your message.',
      type: 'loading',
    });
  };

  const updateMessage = () => {
    if (!updateId) return;
    updateToaster.update(updateId, {
      title: 'Message sent',
      description: 'Your message has been delivered successfully.',
      type: 'success',
    });
  };

  const createVaryingToast = () => {
    const next = count + 1;
    count = next;
    varyingHeightToaster.info({
      title: `Notification ${next}`,
      description: descriptions[next % descriptions.length],
    });
  };
</script>

<Story name="Basic" asChild>
  <Button
    onclick={() =>
      basicToaster.create({
        title: 'Scheduled for tomorrow',
        description: 'Your meeting has been scheduled for tomorrow at 10am.',
        type: 'info',
      })}
  >
    Schedule meeting
  </Button>
  <ToastRenderer toaster={basicToaster} />
</Story>

<Story name="Action" asChild>
  <Button
    onclick={() =>
      actionToaster.create({
        title: 'Event has been created',
        description: 'We have sent you an email with the event details.',
        type: 'info',
        action: {
          label: 'Undo',
          onClick: () => actionToaster.info({ description: 'Event restored to draft.' }),
        },
      })}
  >
    Create event
  </Button>
  <ToastRenderer toaster={actionToaster} />
</Story>

<Story name="Duration" asChild>
  <div class={typedActionsClass}>
    {#each durations as duration (duration.label)}
      <Button
        onclick={() =>
          durationToaster.create({
            title: 'Reminder set',
            description:
              duration.value === Infinity
                ? 'This notification will stay until dismissed.'
                : 'This notification will disappear in ' + duration.label + '.',
            type: 'info',
            duration: duration.value,
          })}>{duration.label}</Button
      >
    {/each}
  </div>
  <ToastRenderer toaster={durationToaster} />
</Story>

<Story name="Always Expanded" exportName="AlwaysExpanded" asChild>
  <Button
    onclick={() =>
      expandedToaster.info({
        title: 'Expanded toast',
        description: 'Create several notifications to compare the always-expanded stack.',
      })}
  >
    Create expanded toast
  </Button>
  <ToastRenderer toaster={expandedToaster} />
</Story>

<Story name="Max Toasts" exportName="MaxToasts" asChild>
  <div class={typedActionsClass}>
    <Button
      onclick={() =>
        maxToaster.info({
          title: 'New notification',
          description: 'You have a new message in your inbox.',
        })}>Add notification</Button
    >
    <Button
      onclick={() =>
        maxDescriptions.forEach((description) =>
          maxToaster.info({ title: 'Notification', description }),
        )}
    >
      Add 5 notifications
    </Button>
  </div>
  <ToastRenderer toaster={maxToaster} />
</Story>

<Story name="Placement" asChild>
  <div class={stackClass}>
    <div class={segmentedClass}>
      {#each placements as item (item)}
        <button
          type="button"
          class={segmentClass}
          data-active={item === placement ? true : undefined}
          onclick={() => (placement = item)}>{item}</button
        >
      {/each}
    </div>
    <Button
      onclick={() =>
        placementToasters[placement].info({
          title: 'Notification',
          description: 'This toast appears at ' + placement + '.',
        })}
    >
      Show {placement}
    </Button>
  </div>
  {#each placements as item (item)}
    <ToastRenderer toaster={placementToasters[item]} />
  {/each}
</Story>

<Story name="Promise Toast" exportName="PromiseToast" asChild>
  <Button onclick={handleUpload}>Upload file</Button>
  <ToastRenderer toaster={promiseToaster} />
</Story>

<Story name="Types" asChild>
  <div class={typedActionsClass}>
    {#each toastTypes as type (type)}
      <Button
        onclick={() =>
          typeToaster.create({
            title: type === 'info' ? 'Update available' : type + ' toast',
            description: 'This notification uses the ' + type + ' status style.',
            type,
          })}>{type}</Button
      >
    {/each}
  </div>
  <ToastRenderer toaster={typeToaster} />
</Story>

<Story name="Update an existing toast" exportName="Update" asChild>
  <div class={typedActionsClass}>
    <Button onclick={createPending}>Create pending toast</Button>
    <Button onclick={updateMessage}>Update same toast</Button>
  </div>
  <ToastRenderer toaster={updateToaster} />
</Story>

<Story name="Varying Height" exportName="VaryingHeight" asChild>
  <Button onclick={createVaryingToast}>Create toast</Button>
  <ToastRenderer toaster={varyingHeightToaster} />
</Story>

<Story name="Advanced Customization" exportName="AdvancedCustomization" asChild>
  <Button
    onclick={() =>
      customToaster.success({
        title: 'Workspace synced',
        description: 'Map edits are available to everyone.',
      })}
  >
    Create custom toast
  </Button>
  <ToastToaster toaster={customToaster}>
    {#snippet children()}
      <Toast class={customToastClass}>
        <div class={customContentClass}>
          <InfoIcon class={customIconClass} />
          <ToastTitle />
          <ToastDescription class="text-primary-foreground/72" />
        </div>
        <ToastCloseTrigger
          class="!text-primary-foreground [@media(hover:hover)]:hover:!bg-primary-foreground/14 [@media(hover:hover)]:hover:!text-primary-foreground"
        >
          <CloseIcon class={closeIconClass} />
        </ToastCloseTrigger>
      </Toast>
    {/snippet}
  </ToastToaster>
</Story>
<script lang="ts">
  import {
    Toast,
    ToastActionTrigger,
    ToastCloseTrigger,
    ToastDescription,
    ToastTitle,
    ToastToaster,
    type CreateToasterReturn,
  } from '@/components/toast';

  let { toaster }: { toaster: CreateToasterReturn } = $props();
  let rootRef: Element | null = $state(null);
  let titleRef: Element | null = $state(null);
  let descriptionRef: Element | null = $state(null);
  let actionRef: Element | null = $state(null);
  let closeRef: Element | null = $state(null);
  let composedCloseRef: Element | null = $state(null);

  export const getRefs = () => ({
    rootRef,
    titleRef,
    descriptionRef,
    actionRef,
    closeRef,
    composedCloseRef,
  });
</script>

<ToastToaster {toaster} portalled={false}>
  {#snippet children()}
    <Toast bind:ref={rootRef} data-probe="root">
      <article aria-label="Notification">
        <ToastTitle bind:ref={titleRef} />
        <ToastDescription bind:ref={descriptionRef} />
        <ToastActionTrigger bind:ref={actionRef}>Undo</ToastActionTrigger>
        <ToastCloseTrigger bind:ref={closeRef} />
        <ToastCloseTrigger bind:ref={composedCloseRef} aria-label="Custom close">
          {#snippet asChild(props)}<button {...props()} type="button">Custom close</button
            >{/snippet}
        </ToastCloseTrigger>
      </article>
    </Toast>
  {/snippet}
</ToastToaster>
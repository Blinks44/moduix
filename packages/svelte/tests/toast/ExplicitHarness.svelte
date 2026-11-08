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

  let { handleClick, toaster }: { handleClick: () => void; toaster: CreateToasterReturn } =
    $props();
  let titleRef: Element | null = $state(null);
  let descriptionRef: Element | null = $state(null);
  let actionRef: Element | null = $state(null);

  export const getRefs = () => ({ titleRef, descriptionRef, actionRef });
</script>

<ToastToaster {toaster} portalled={false}>
  {#snippet children(item)}
    <Toast data-toast-id={item().id}>
      <ToastTitle bind:ref={titleRef}>
        {#snippet asChild(props)}<h2 {...props()}>Consumer title</h2>{/snippet}
      </ToastTitle>
      <ToastDescription bind:ref={descriptionRef}>
        {#snippet asChild(props)}<p {...props()}>Consumer description</p>{/snippet}
      </ToastDescription>
      <ToastActionTrigger bind:ref={actionRef} class="consumer-action" onclick={handleClick}>
        {#snippet asChild(props)}
          <button {...props()} type="button">Consumer action</button>
        {/snippet}
      </ToastActionTrigger>
      <ToastCloseTrigger />
    </Toast>
  {/snippet}
</ToastToaster>
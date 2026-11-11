<script lang="ts">
  import { Popover, PopoverContent, PopoverPositioner, PopoverTrigger } from '@/components/popover';
  import { Toast, ToastTitle, ToastToaster, type CreateToasterReturn } from '@/components/toast';

  let {
    portalled,
    target,
    toaster,
  }: { portalled: boolean; target: HTMLElement; toaster: CreateToasterReturn } = $props();
</script>

<ToastToaster {toaster} {portalled} portalRef={target}>
  {#snippet children()}
    <Toast>
      <ToastTitle />
      <Popover defaultOpen>
        <PopoverTrigger>Popover trigger</PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent data-testid="nested-popover">Nested popover</PopoverContent>
        </PopoverPositioner>
      </Popover>
    </Toast>
  {/snippet}
</ToastToaster>
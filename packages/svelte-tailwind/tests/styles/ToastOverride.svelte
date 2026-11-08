<script lang="ts">
  import {
    Toast,
    ToastDescription,
    ToastTitle,
    ToastToaster,
    createToaster,
  } from '@/components/toast';

  const toaster = createToaster({ placement: 'bottom', duration: Infinity });

  export const create = () =>
    toaster.create({ title: 'Custom styles', description: 'Consumer utilities win.' });
</script>

<ToastToaster {toaster} portalled={false}>
  {#snippet children()}
    <Toast class="w-full bg-primary p-6">
      <ToastTitle class="text-lg" />
      <ToastDescription />
    </Toast>
  {/snippet}
</ToastToaster>
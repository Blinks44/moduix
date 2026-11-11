<script lang="ts">
  import { ToastToaster, type CreateToasterReturn } from '@/components/toast';

  let { toaster }: { toaster: CreateToasterReturn } = $props();
</script>

<ToastToaster {toaster} />
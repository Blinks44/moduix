<script lang="ts">
  import { ToastToaster, createToaster } from '@/components/toast';

  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
</script>

<ToastToaster {toaster} portalled={false} />
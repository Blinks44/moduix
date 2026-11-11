<script lang="ts">
  import { ToastTitle, useToastContext } from '@/components/toast';

  const toast = useToastContext();
</script>

<ToastTitle>{toast().title}</ToastTitle>
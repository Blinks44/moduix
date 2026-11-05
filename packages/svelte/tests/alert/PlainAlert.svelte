<script lang="ts">
  import { Alert, AlertContent, AlertTitle, type AlertRootProps } from '@/components/alert';

  let { ...props }: AlertRootProps = $props();
</script>

<Alert {...props}>
  <AlertContent>
    <AlertTitle>Payment failed</AlertTitle>
  </AlertContent>
</Alert>
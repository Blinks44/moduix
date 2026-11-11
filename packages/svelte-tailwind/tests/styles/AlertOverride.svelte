<script lang="ts">
  import {
    Alert,
    AlertContent,
    AlertDescription,
    AlertIndicator,
    AlertTitle,
  } from '@/components/alert';
</script>

<div>
  <Alert id="storage-alert" data-probe="root" class="consumer-class" role="status">
    <AlertContent>
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>Install the latest version.</AlertDescription>
    </AlertContent>
  </Alert>
  <Alert status="error" role="alert">
    <AlertIndicator>!</AlertIndicator>
    <AlertContent>
      <AlertTitle>Payment failed</AlertTitle>
    </AlertContent>
  </Alert>
</div>
<Alert class="w-auto" data-testid="width-alert" />
<div>
  <span class="text-primary" data-testid="reference"></span>
  <Alert status="error">
    <AlertIndicator data-testid="status-indicator">!</AlertIndicator>
    <AlertIndicator class="text-primary" data-testid="custom-indicator">!</AlertIndicator>
  </Alert>
</div>
<Alert>
  <AlertIndicator><svg data-testid="default-icon"></svg></AlertIndicator>
  <AlertIndicator><svg class="size-6" data-testid="custom-icon"></svg></AlertIndicator>
</Alert>
<script lang="ts">
  import {
    Alert,
    AlertActions,
    AlertContent,
    AlertDescription,
    AlertIndicator,
    type AlertRootProps,
  } from '@/components/alert';

  let { ...props }: AlertRootProps = $props();

  let rootRef: Element | null = $state(null);
  let indicatorRef: Element | null = $state(null);
  let contentRef: Element | null = $state(null);
  let descriptionRef: Element | null = $state(null);
  let actionsRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, indicatorRef, contentRef, descriptionRef, actionsRef });
</script>

<Alert {...props} bind:ref={rootRef}>
  <AlertIndicator bind:ref={indicatorRef} aria-hidden="false">i</AlertIndicator>
  <AlertContent bind:ref={contentRef}>
    <AlertDescription bind:ref={descriptionRef}>Scheduled maintenance</AlertDescription>
    <AlertActions bind:ref={actionsRef}>No action required</AlertActions>
  </AlertContent>
</Alert>
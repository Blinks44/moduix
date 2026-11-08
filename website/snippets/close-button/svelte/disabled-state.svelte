<script lang="ts">
  import { CloseButton } from '@moduix/svelte/close-button';
  import { Stack } from '@moduix/svelte/stack';
</script>

<Stack gap="2">
  <Stack direction="row" align="center" gap="2">
    <CloseButton disabled aria-label="Close unavailable message" />
    <span>Native disabled</span>
  </Stack>
  <Stack direction="row" align="center" gap="2">
    <CloseButton aria-disabled="true" aria-label="Close unavailable notification" />
    <span>ARIA disabled</span>
  </Stack>
</Stack>
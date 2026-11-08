<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
</script>

<Stack
  direction={{ mobile: 'column', desktop: 'row' }}
  gap="3"
  justify="center"
  style="inline-size: 100%"
>
  <strong>Adaptive layout</strong>
  <span>Column on mobile, row from desktop width.</span>
</Stack>
<script lang="ts">
  import { Check as CheckIcon, Download as DownloadIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { SwapIndicator, SwapRootProvider, useSwap } from '@moduix/svelte/swap';

  let downloaded = $state(false);
  const swap = useSwap(() => ({ swap: downloaded }));
</script>

<Stack align="center" gap="4">
  <SwapRootProvider value={swap}>
    {#snippet asChild(props)}
      <Button
        {...props()}
        aria-label={downloaded ? 'Downloaded' : 'Download'}
        onclick={() => (downloaded = !downloaded)}
      >
        <SwapIndicator aria-hidden="true" type="off"><DownloadIcon /></SwapIndicator>
        <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
      </Button>
    {/snippet}
  </SwapRootProvider>
  <div data-preview-meta>
    <output>Visible indicator: {downloaded ? 'Downloaded' : 'Download'}</output>
  </div>
</Stack>
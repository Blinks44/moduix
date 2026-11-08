<script lang="ts">
  import { Check as CheckIcon, Download as DownloadIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { Swap, SwapIndicator, type SwapAnimation } from '@moduix/svelte/swap';

  const animations = ['fade', 'scale', 'rotate', 'flip'] as const;
  let animation = $state<SwapAnimation>('scale');
  let downloaded = $state(false);
</script>

<Stack align="center" gap="4">
  <Button
    aria-label={downloaded ? 'Downloaded' : 'Download'}
    onclick={() => (downloaded = !downloaded)}
  >
    <Swap {animation} swap={downloaded}>
      <SwapIndicator aria-hidden="true" type="off"><DownloadIcon /></SwapIndicator>
      <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
    </Swap>
  </Button>
  <Stack align="center" gap="2">
    <output>Animation: {animation}</output>
    <Stack direction="row" justify="center" wrap="wrap" gap="0.5rem">
      {#each animations as name (name)}
        <Button
          aria-pressed={animation === name}
          size="sm"
          variant={animation === name ? 'default' : 'outline'}
          onclick={() => (animation = name)}
        >
          {name}
        </Button>
      {/each}
    </Stack>
  </Stack>
</Stack>
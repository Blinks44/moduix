<script lang="ts">
  import { Check as CheckIcon, Download as DownloadIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import { Swap, SwapIndicator } from '@moduix/svelte/swap';
  import styles from '@/components/examples/swap/swap-custom-animation.module.css';

  let downloaded = $state(false);
</script>

<Button
  aria-label={downloaded ? 'Downloaded' : 'Download'}
  onclick={() => (downloaded = !downloaded)}
>
  <Swap animation="bounce" class={styles.root} swap={downloaded}>
    <SwapIndicator aria-hidden="true" type="off"><DownloadIcon /></SwapIndicator>
    <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
  </Swap>
</Button>
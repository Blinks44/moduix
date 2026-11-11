<script lang="ts">
  import {
    Lightbox,
    LightboxBind,
    LightboxContent,
    LightboxPositioner,
    type LightboxImageSelectDetails,
  } from '@/components/lightbox';

  let { onImageSelect }: { onImageSelect: (details: LightboxImageSelectDetails) => void } =
    $props();
  let root: HTMLElement | undefined = $state();
</script>

<div bind:this={root}>
  <!-- svelte-ignore a11y_img_redundant_alt: the alt text mirrors the Vue test name -->
  <button type="button"><img src="/thumbnail.jpg" alt="Bound image" /></button>
</div>
<Lightbox portalled={false}>
  <LightboxBind rootRef={() => root} selector="button" {onImageSelect} />
  <LightboxPositioner>
    <LightboxContent aria-label="Bound preview">Bound image preview</LightboxContent>
  </LightboxPositioner>
</Lightbox>
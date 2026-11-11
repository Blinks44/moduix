<script module lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';

  export interface LightboxImageProps extends HTMLImgAttributes {
    /** Close the lightbox when the image is clicked. */
    closeOnClick?: boolean;
    /** The rendered <img> element. */
    ref?: HTMLImageElement | null;
  }
</script>

<script lang="ts">
  import { useDialogContext } from '@ark-ui/svelte/dialog';
  import { clsx } from 'clsx';
  import styles from './Lightbox.module.css';

  let {
    class: className,
    closeOnClick = false,
    onclick,
    ref = $bindable(null),
    ...props
  }: LightboxImageProps = $props();

  const dialog = useDialogContext();

  const handleClick = (event: MouseEvent & { currentTarget: EventTarget & HTMLImageElement }) => {
    onclick?.(event);
    if (closeOnClick && !event.defaultPrevented) {
      dialog().setOpen(false);
    }
  };
</script>

<img
  {...props}
  bind:this={ref}
  class={clsx(styles.image, className)}
  data-close-on-click={closeOnClick ? '' : undefined}
  data-slot="lightbox-image"
  onclick={handleClick}
/>
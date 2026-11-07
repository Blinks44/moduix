<script module lang="ts">
  import type { UnpicSourceProps } from '@unpic/core';
  import type { ClassValue } from 'svelte/elements';
  import type { HTMLSourceAttributes } from 'svelte/elements';

  export interface ImageSourceProps
    extends
      Omit<UnpicSourceProps, 'srcset'>,
      Omit<
        HTMLSourceAttributes,
        'class' | 'height' | 'media' | 'sizes' | 'src' | 'srcset' | 'style' | 'type' | 'width'
      > {
    class?: ClassValue;
    ref?: HTMLSourceElement | null;
    style?: string;
  }
</script>

<script lang="ts">
  import { transformSourceProps } from '@unpic/core';

  let { class: className, ref = $bindable(null), ...props }: ImageSourceProps = $props();

  const sourceProps = $derived(
    transformSourceProps<HTMLSourceAttributes>(props as UnpicSourceProps),
  );
</script>

<source {...sourceProps} bind:this={ref} class={className} data-slot="image-source" />
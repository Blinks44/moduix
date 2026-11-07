<script module lang="ts">
  import type { UnpicImageProps } from '@unpic/core';
  import type { ClassValue, HTMLImgAttributes } from 'svelte/elements';

  type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

  export type ImageRootProps = DistributiveOmit<
    UnpicImageProps<HTMLImgAttributes>,
    'class' | 'fetchpriority' | 'style'
  > & {
    class?: ClassValue;
    fetchpriority?: HTMLImgAttributes['fetchpriority'];
    ref?: HTMLImageElement | null;
    style?: string;
  };
</script>

<script lang="ts">
  import { transformProps } from '@unpic/core';
  import { transformBaseImageProps } from '@unpic/core/base';
  import { clsx } from 'clsx';
  import { getProviderForUrl } from 'unpic';
  import styles from './Image.module.css';

  let { class: className, ref = $bindable(null), style, ...props }: ImageRootProps = $props();

  const imageProps = $derived.by(() => {
    const input = props as UnpicImageProps<HTMLImgAttributes>;
    // Without a CDN, Unpic returns props unchanged; the base transform still applies its loading
    // defaults and layout styles and drops Unpic-only props such as `layout` and `priority`.
    const hasCdn = input.cdn ?? (getProviderForUrl(input.src) || input.fallback);
    const { style: layoutStyle, ...rest } = (
      hasCdn
        ? transformProps<HTMLImgAttributes>(input)
        : transformBaseImageProps<never, never, HTMLImgAttributes>(input as never)
    ) as Omit<HTMLImgAttributes, 'style'> & { style?: Record<string, string | number> };
    // Unpic emits the layout style as an object; Svelte expects a string, consumer style last.
    const declarations = Object.entries(layoutStyle ?? {}).map(
      ([name, value]) => `${name}: ${value}`,
    );
    return { ...rest, style: [...declarations, style].filter(Boolean).join('; ') || undefined };
  });
</script>

<img {...imageProps} bind:this={ref} class={clsx(styles.root, className)} data-slot="image-root" />
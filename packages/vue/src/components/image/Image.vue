<script setup lang="ts">
import type { UnpicImageProps } from '@unpic/core';
import { transformProps } from '@unpic/core';
import { transformBaseImageProps } from '@unpic/core/base';
import { clsx } from 'clsx';
import { getProviderForUrl } from 'unpic';
import { useAttrs } from 'vue';
import type { HTMLAttributes, ImgHTMLAttributes } from 'vue';
import styles from './Image.module.css';

type ImageTransformProps = UnpicImageProps<ImgHTMLAttributes> & {
  style?: ImgHTMLAttributes['style'];
};

export interface Props
  extends /* @vue-ignore */ Omit<UnpicImageProps<ImgHTMLAttributes>, 'fetchpriority'> {
  class?: HTMLAttributes['class'];
  fetchpriority?: ImgHTMLAttributes['fetchpriority'];
  style?: ImgHTMLAttributes['style'];
}

defineOptions({ inheritAttrs: false });

const props = defineProps<Props>();
const attrs = useAttrs();

const getImageProps = () => {
  const { class: _class, ...input } = { ...attrs, ...props } as ImageTransformProps;
  // Without a CDN, Unpic returns props unchanged; the base transform still applies its loading
  // defaults and layout styles and drops Unpic-only props such as `layout` and `priority`.
  const hasCdn = input.cdn ?? (getProviderForUrl(input.src) || input.fallback);
  return hasCdn
    ? transformProps<ImgHTMLAttributes>(input)
    : transformBaseImageProps<never, never, ImgHTMLAttributes>(input as never);
};
</script>

<template>
  <img v-bind="getImageProps()" :class="clsx(styles.root, props.class)" data-slot="image-root" />
</template>
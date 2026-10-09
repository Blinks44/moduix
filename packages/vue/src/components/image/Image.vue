<script setup lang="ts">
import type { UnpicImageProps } from '@unpic/core';
import { transformProps } from '@unpic/core';
import { clsx } from 'clsx';
import { ref, useAttrs } from 'vue';
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
const imageElement = ref<HTMLImageElement>();

defineExpose({ $el: imageElement });

const getImageProps = () => {
  const { class: _class, ...inputProps } = { ...attrs, ...props };
  const input = inputProps as ImageTransformProps;
  return transformProps<ImgHTMLAttributes>({
    ...input,
    loading: input.loading ?? (input.priority ? 'eager' : 'lazy'),
    decoding: input.decoding ?? (input.priority ? undefined : 'async'),
    fetchpriority: input.fetchpriority ?? (input.priority ? 'high' : undefined),
  });
};
</script>

<template>
  <img
    ref="imageElement"
    v-bind="getImageProps()"
    :class="clsx(styles.root, props.class)"
    data-slot="image-root"
  />
</template>
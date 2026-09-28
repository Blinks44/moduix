<script setup lang="ts">
import type { UnpicImageProps } from '@unpic/core';
import { transformProps } from '@unpic/core';
import { ref, useAttrs } from 'vue';
import type { HTMLAttributes, ImgHTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
  return transformProps<ImgHTMLAttributes>(inputProps as ImageTransformProps);
};
</script>

<template>
  <img
    ref="imageElement"
    v-bind="getImageProps()"
    :class="cn('rounded-md', props.class)"
    data-slot="image-root"
  />
</template>
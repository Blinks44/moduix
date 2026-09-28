<script setup lang="ts">
import type { UnpicSourceProps } from '@unpic/core';
import { transformSourceProps } from '@unpic/core';
import { ref, useAttrs } from 'vue';
import type { HTMLAttributes, SourceHTMLAttributes } from 'vue';

export interface Props
  extends
    /* @vue-ignore */ Omit<UnpicSourceProps, 'srcset'>,
    /* @vue-ignore */ Omit<
      SourceHTMLAttributes,
      'class' | 'media' | 'sizes' | 'src' | 'srcset' | 'style' | 'type'
    > {
  class?: HTMLAttributes['class'];
  style?: SourceHTMLAttributes['style'];
}

defineOptions({ inheritAttrs: false });

const props = defineProps<Props>();
const attrs = useAttrs();
const sourceElement = ref<HTMLSourceElement>();

defineExpose({ $el: sourceElement });

const getSourceProps = () => {
  const { class: _class, ...inputProps } = { ...attrs, ...props };
  return transformSourceProps<SourceHTMLAttributes>(inputProps as UnpicSourceProps);
};
</script>

<template>
  <source
    ref="sourceElement"
    v-bind="getSourceProps()"
    :class="props.class"
    data-slot="image-source"
  />
</template>
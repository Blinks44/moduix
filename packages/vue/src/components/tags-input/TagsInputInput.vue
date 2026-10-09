<script setup lang="ts">
import { TagsInputInput as ArkTagsInputInput } from '@ark-ui/vue/tags-input';
import type { TagsInputInputProps } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TagsInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputInput
    v-bind="attrs"
    :class="clsx(styles.input, props.class)"
    data-slot="tags-input-input"
  />
</template>
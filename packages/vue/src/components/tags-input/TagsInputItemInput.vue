<script setup lang="ts">
import { TagsInputItemInput as ArkTagsInputItemInput } from '@ark-ui/vue/tags-input';
import type { TagsInputItemInputProps } from '@ark-ui/vue/tags-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TagsInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TagsInputItemInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTagsInputItemInput
    v-bind="attrs"
    :class="clsx(styles.itemInput, props.class)"
    data-slot="tags-input-item-input"
  />
</template>
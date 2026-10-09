<script setup lang="ts">
import { useDialogContext } from '@ark-ui/vue/dialog';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes, ImgHTMLAttributes } from 'vue';
import styles from './Lightbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ImgHTMLAttributes {
  class?: HTMLAttributes['class'];
  closeOnClick?: boolean;
}

const { class: className, closeOnClick = false } = defineProps<Props>();
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const attrs = useAttrs();
const dialog = useDialogContext();

const handleClick = (event: MouseEvent) => {
  emit('click', event);

  if (closeOnClick && !event.defaultPrevented) {
    dialog.value.setOpen(false);
  }
};
</script>

<template>
  <img
    v-bind="attrs"
    :class="clsx(styles.image, className)"
    :data-close-on-click="closeOnClick ? '' : undefined"
    data-slot="lightbox-image"
    @click="handleClick"
  />
</template>
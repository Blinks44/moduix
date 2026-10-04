<script setup lang="ts">
import { useDialogContext } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes, ImgHTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="
      cn(
        'block max-h-[min(80dvh,100%)] max-w-[min(80vw,100%)] rounded-md object-contain shadow-lg select-none data-[close-on-click]:cursor-zoom-out',
        className,
      )
    "
    :data-close-on-click="closeOnClick ? '' : undefined"
    data-slot="lightbox-image"
    @click="handleClick"
  />
</template>
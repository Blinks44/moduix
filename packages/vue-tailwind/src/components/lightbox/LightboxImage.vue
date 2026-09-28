<script setup lang="ts">
import { useDialogContext } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes, ImgHTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<ImgHTMLAttributes, 'onClick'> {
  class?: HTMLAttributes['class'];
  closeOnClick?: boolean;
  onClick?: (event: MouseEvent) => void;
}

const { class: className, closeOnClick = false, onClick } = defineProps<Props>();
const attrs = useAttrs();
const dialog = useDialogContext();

const handleClick = (event: MouseEvent) => {
  onClick?.(event);

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
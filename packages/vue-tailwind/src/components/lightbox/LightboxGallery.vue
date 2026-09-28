<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="
      cn(
        '[&_[data-slot=carousel-indicator-group]]:mx-auto',
        'max-w-[min(72rem,calc(100vw-2rem))] justify-self-center [&_[data-slot=carousel-control]]:items-center [&_[data-slot=carousel-indicator-group]]:w-fit [&_[data-slot=carousel-indicator-group]]:max-w-full [&_[data-slot=carousel-indicator-group]]:flex-wrap [&_[data-slot=carousel-indicator]:has(img)]:h-control-xl [&_[data-slot=carousel-indicator]:has(img)]:w-20 [&_[data-slot=carousel-indicator]:has(img)]:overflow-hidden [&_[data-slot=carousel-indicator]:has(img)]:rounded-md [&_[data-slot=carousel-indicator]:has(img)]:border [&_[data-slot=carousel-indicator]:has(img)]:border-transparent [&_[data-slot=carousel-indicator]:has(img)]:bg-transparent [&_[data-slot=carousel-indicator]:has(img)]:opacity-[0.65] [&_[data-slot=carousel-indicator]:has(img)]:transition [&_[data-slot=carousel-indicator]:has(img)]:duration-150 [&_[data-slot=carousel-indicator]:has(img)]:ease-in-out [&_[data-slot=carousel-indicator]:has(img)_img]:block [&_[data-slot=carousel-indicator]:has(img)_img]:size-full [&_[data-slot=carousel-indicator]:has(img)_img]:object-cover [&_[data-slot=carousel-indicator]:has(img):hover]:opacity-90 [&_[data-slot=carousel-indicator]:has(img)[data-current]]:-translate-y-px [&_[data-slot=carousel-indicator]:has(img)[data-current]]:border-primary [&_[data-slot=carousel-indicator]:has(img)[data-current]]:opacity-100 [&_[data-slot=carousel-item-group]]:aspect-[16/10] [&_[data-slot=carousel-item-group]]:max-h-[68dvh] [&_[data-slot=carousel-item-group]]:bg-black/90 [&_[data-slot=carousel-item]]:grid [&_[data-slot=carousel-item]]:h-full [&_[data-slot=carousel-item]]:place-items-center [&_[data-slot=carousel-item]_img]:block [&_[data-slot=carousel-item]_img]:size-full [&_[data-slot=carousel-item]_img]:rounded-md [&_[data-slot=carousel-item]_img]:object-contain [&_[data-slot=carousel-item]_img]:select-none [&_[data-slot=carousel-item]_video]:block [&_[data-slot=carousel-item]_video]:size-full [&_[data-slot=carousel-item]_video]:rounded-md [&_[data-slot=carousel-item]_video]:object-contain [&_[data-slot=carousel-item]_video]:select-none',
        className,
      )
    "
    data-slot="lightbox-gallery"
  >
    <slot />
  </ark.div>
</template>
<script setup lang="ts">
import { DialogTrigger as ArkDialogTrigger } from '@ark-ui/vue/dialog';
import type { DialogTriggerProps } from '@ark-ui/vue/dialog';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Lightbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDialogTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(styles.trigger, className)"
    data-slot="lightbox-trigger"
  >
    <slot />
  </ArkDialogTrigger>
</template>
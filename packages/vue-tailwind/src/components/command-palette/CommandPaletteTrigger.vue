<script setup lang="ts">
import { DialogTrigger as ArkDialogTrigger } from '@ark-ui/vue/dialog';
import type { DialogTriggerProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DialogTriggerProps {
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
    :class="className"
    data-slot="command-palette-trigger"
  >
    <slot />
  </ArkDialogTrigger>
</template>
<script setup lang="ts">
import { MenuContextTrigger as ArkMenuContextTrigger } from '@ark-ui/vue/menu';
import type { MenuContextTriggerProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuContextTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuContextTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="className"
    data-slot="menu-context-trigger"
  >
    <slot />
  </ArkMenuContextTrigger>
</template>
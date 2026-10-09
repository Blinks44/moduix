<script setup lang="ts">
import { MenuContent as ArkMenuContent, type MenuContentProps } from '@ark-ui/vue/menu';
import { useAttrs, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { MenuViewport } from '../menu';
import { menuContentVariants } from '../menu/Menu.variants';

defineOptions({ inheritAttrs: false });
interface Props extends /* @vue-ignore */ MenuContentProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}
const { asChild, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuContent
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(menuContentVariants(), className)"
    data-slot="split-button-content"
  >
    <slot v-if="asChild" />
    <MenuViewport v-else><slot /></MenuViewport>
  </ArkMenuContent>
</template>
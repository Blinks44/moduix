<script setup lang="ts">
import { NavigationMenuRoot as ArkNavigationMenuRoot } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ NavigationMenuRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'group/navigation-menu relative box-border flex w-fit max-w-full min-w-0 justify-center text-foreground';
</script>

<template>
  <ArkNavigationMenuRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    data-slot="navigation-menu-root"
  >
    <slot />
  </ArkNavigationMenuRoot>
</template>
<script setup lang="ts">
import { NavigationMenuRootProvider as ArkNavigationMenuRootProvider } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuRootProviderProps } from '@ark-ui/vue/navigation-menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuRootProviderProps {
  class?: HTMLAttributes['class'];
  value: NavigationMenuRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'group/navigation-menu relative box-border flex w-fit max-w-full min-w-0 justify-center text-foreground';
</script>

<template>
  <ArkNavigationMenuRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="navigation-menu-root-provider"
  >
    <slot />
  </ArkNavigationMenuRootProvider>
</template>
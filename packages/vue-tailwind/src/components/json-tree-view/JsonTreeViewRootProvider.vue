<script setup lang="ts">
import { JsonTreeViewRootProvider as ArkJsonTreeViewRootProvider } from '@ark-ui/vue/json-tree-view';
import type { JsonTreeViewRootProviderProps } from '@ark-ui/vue/json-tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { jsonTreeViewRootClass } from './JsonTreeView.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ JsonTreeViewRootProviderProps {
  class?: HTMLAttributes['class'];
  value: JsonTreeViewRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkJsonTreeViewRootProvider
    v-bind="attrs"
    :class="cn(jsonTreeViewRootClass, className)"
    :value="value"
    data-slot="json-tree-view-root-provider"
  >
    <slot />
  </ArkJsonTreeViewRootProvider>
</template>
<script lang="ts">
import type { TreeNode, TreeViewRootProviderProps } from '@ark-ui/vue/tree-view';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends TreeNode> extends /* @vue-ignore */ TreeViewRootProviderProps<T> {
  class?: HTMLAttributes['class'];
  value: TreeViewRootProviderProps<T>['value'];
}
</script>

<script setup lang="ts" generic="T extends TreeNode">
import { TreeViewRootProvider as ArkTreeViewRootProvider } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

const { class: className, value } = defineProps<Props<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewRootProvider
    v-bind="attrs"
    :class="
      cn(
        'box-border flex w-80 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
        className,
      )
    "
    :value="value"
    data-slot="tree-view-root-provider"
  >
    <slot />
  </ArkTreeViewRootProvider>
</template>
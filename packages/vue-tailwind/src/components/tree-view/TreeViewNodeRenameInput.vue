<script setup lang="ts">
import { TreeViewNodeRenameInput as ArkTreeViewNodeRenameInput } from '@ark-ui/vue/tree-view';
import type { TreeViewNodeRenameInputProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<TreeViewNodeRenameInputProps, 'class'> {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const componentClass =
  'box-border min-w-0 flex-1 rounded-xs border border-ring bg-background px-1 py-0 text-foreground outline-1 -outline-offset-1 outline-transparent [font:inherit] focus-visible:outline-ring';
</script>

<template>
  <ArkTreeViewNodeRenameInput
    v-bind="attrs"
    :class="cn(componentClass, props.class)"
    data-slot="tree-view-node-rename-input"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </ArkTreeViewNodeRenameInput>
</template>
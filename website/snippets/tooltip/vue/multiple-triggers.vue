<script setup lang="ts">
import { Info as InfoIcon, Plus as PlusIcon, Share as ShareIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/vue/tooltip';
import { shallowRef } from 'vue';
import styles from '@/components/examples/tooltip/component-multiple-triggers.module.css';

const tooltipTools = [
  { id: 'create', label: 'Create', shortcut: 'Ctrl+N', icon: PlusIcon },
  { id: 'share', label: 'Share', shortcut: 'Ctrl+S', icon: ShareIcon },
  { id: 'details', label: 'Details', shortcut: 'Ctrl+I', icon: InfoIcon },
] as const;

const activeTool = shallowRef<(typeof tooltipTools)[number] | null>(null);

const handleTriggerValueChange = ({ value }: { value?: string | null }) => {
  activeTool.value = tooltipTools.find((tool) => tool.id === value) ?? null;
};
</script>

<template>
  <Tooltip @trigger-value-change="handleTriggerValueChange">
    <div :class="styles.tools">
      <TooltipTrigger
        v-for="tool in tooltipTools"
        :key="tool.id"
        :value="tool.id"
        as-child
        :aria-label="tool.label"
      >
        <Button variant="ghost" size="icon-md">
          <component :is="tool.icon" aria-hidden="true" />
        </Button>
      </TooltipTrigger>
    </div>
    <TooltipBody>
      <template v-if="activeTool">{{ activeTool.label }} ({{ activeTool.shortcut }})</template>
    </TooltipBody>
  </Tooltip>
</template>
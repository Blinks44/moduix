<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/vue/tooltip';
import { computed, ref } from 'vue';
import styles from '@/components/examples/tooltip/component-positioning.module.css';

const tooltipPlacements = ['top', 'right', 'bottom', 'left'] as const;
type TooltipPlacement = (typeof tooltipPlacements)[number];

const placement = ref<TooltipPlacement>('top');
const positioning = computed(() => ({
  placement: placement.value,
  offset: { mainAxis: 12 },
}));
</script>

<template>
  <div>
    <Tooltip :positioning="positioning">
      <TooltipTrigger as-child :aria-label="'Tooltip placement: ' + placement">
        <Button>Hover or focus</Button>
      </TooltipTrigger>
      <TooltipBody>Placement: {{ placement }}</TooltipBody>
    </Tooltip>
    <output>Placement: {{ placement }}</output>
    <div :class="styles.meta">
      <Button
        v-for="item in tooltipPlacements"
        :key="item"
        type="button"
        size="sm"
        :variant="item === placement ? 'default' : 'outline'"
        :aria-pressed="item === placement"
        @click="placement = item"
      >
        {{ item }}
      </Button>
    </div>
  </div>
</template>
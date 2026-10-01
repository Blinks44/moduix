<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
  useTooltipContext,
} from '@moduix/vue/tooltip';
import { computed, defineComponent } from 'vue';

const TooltipStateContent = defineComponent({
  components: { TooltipContent },
  setup() {
    const tooltip = useTooltipContext();
    return { open: computed(() => tooltip.value.open.toString()) };
  },
  template: '<TooltipContent>Open from context: {{ open }}</TooltipContent>',
});
</script>

<template>
  <Tooltip>
    <TooltipTrigger>Context tooltip</TooltipTrigger>
    <TooltipPositioner><TooltipStateContent /></TooltipPositioner>
  </Tooltip>
</template>
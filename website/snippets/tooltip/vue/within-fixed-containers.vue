<script setup lang="ts">
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/vue/tooltip';
import styles from '@/components/examples/tooltip/component-within-fixed-containers.module.css';
</script>

<template>
  <div :class="styles.root">
    <div :class="styles.content">
      <div :class="styles.sticky">
        <Tooltip :close-on-scroll="false" :positioning="{ strategy: 'fixed' }">
          <TooltipTrigger>Focus, then scroll</TooltipTrigger>
          <TooltipBody>Stays anchored while this panel scrolls.</TooltipBody>
        </Tooltip>
      </div>
      <p :class="styles.end">End of scroll area</p>
    </div>
  </div>
</template>
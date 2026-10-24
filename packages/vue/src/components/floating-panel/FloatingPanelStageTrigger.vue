<script setup lang="ts">
import { FloatingPanelStageTrigger as ArkFloatingPanelStageTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelStageTriggerProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { stageIcons } from './floating-panel.types';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelStageTriggerProps {
  asChild?: FloatingPanelStageTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
  stage: FloatingPanelStageTriggerProps['stage'];
}

const { asChild = false, class: className, stage } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelStageTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.controlButton, className)"
    :stage="stage"
    data-slot="floating-panel-stage-trigger"
  >
    <slot>
      <component :is="stageIcons[stage]" v-if="!asChild" />
    </slot>
  </ArkFloatingPanelStageTrigger>
</template>
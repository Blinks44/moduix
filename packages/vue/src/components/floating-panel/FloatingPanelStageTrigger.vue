<script setup lang="ts">
import { FloatingPanelStageTrigger as ArkFloatingPanelStageTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelStageTriggerProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { MaximizeIcon, MinusIcon, RestoreIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelStageTriggerProps {
  asChild?: FloatingPanelStageTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
  stage: FloatingPanelStageTriggerProps['stage'];
}

const { asChild = false, class: className, stage } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

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
    <slot />
    <MinusIcon v-if="!slots.default && !asChild && stage === 'minimized'" />
    <MaximizeIcon v-if="!slots.default && !asChild && stage === 'maximized'" />
    <RestoreIcon v-if="!slots.default && !asChild && stage === 'default'" />
  </ArkFloatingPanelStageTrigger>
</template>
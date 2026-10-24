<script setup lang="ts">
import { TourActions as ArkTourActions } from '@ark-ui/vue/tour';
import type { TourActionsProps } from '@ark-ui/vue/tour';
import type { HTMLAttributes } from 'vue';
import TourActionTrigger from './TourActionTrigger.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourActionsProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: never }>();
</script>

<template>
  <ArkTourActions>
    <template #default="actions">
      <TourActionTrigger
        v-for="(action, index) in actions"
        :key="`${action.label}-${index}`"
        :action="action"
        :class="className"
      />
    </template>
  </ArkTourActions>
</template>
<script setup lang="ts">
import { useEditableContext } from '@ark-ui/vue/editable';
import type { EditableControlProps } from '@ark-ui/vue/editable';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import EditableCancelTrigger from './EditableCancelTrigger.vue';
import EditableControl from './EditableControl.vue';
import EditableEditTrigger from './EditableEditTrigger.vue';
import EditableSubmitTrigger from './EditableSubmitTrigger.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<EditableControlProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const editable = useEditableContext();

const attrs = useAttrs();
</script>

<template>
  <EditableControl v-bind="attrs" :class="className">
    <template v-if="editable.editing">
      <EditableSubmitTrigger />
      <EditableCancelTrigger />
    </template>
    <EditableEditTrigger v-else />
  </EditableControl>
</template>
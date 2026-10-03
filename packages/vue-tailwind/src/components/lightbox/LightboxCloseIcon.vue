<script setup lang="ts">
import { DialogCloseTrigger as ArkDialogCloseTrigger, useDialogContext } from '@ark-ui/vue/dialog';
import type { DialogCloseTriggerProps } from '@ark-ui/vue/dialog';
import { computed, useAttrs, useSlots } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

const DEFAULT_CLOSE_LABEL = 'Close image';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<DialogCloseTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const slots = useSlots();
const dialog = useDialogContext();
const closeLabel = computed(
  () => (attrs['aria-label'] as string | undefined) ?? DEFAULT_CLOSE_LABEL,
);
const closeState = computed(() => (dialog.value.open ? 'open' : 'closed'));
</script>

<template>
  <ArkDialogCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="closeLabel"
      :aria-labelledby="attrs['aria-labelledby'] as string | undefined"
      :class="
        cn(
          'pointer-events-none invisible fixed end-4 top-4 z-[calc(var(--moduix-z-popup)+var(--layer-index,0)+1)] size-8 rounded-sm border-0 bg-background p-0 text-foreground opacity-0 transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring data-[state=open]:pointer-events-auto data-[state=open]:visible data-[state=open]:opacity-100 motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted',
          className,
        )
      "
      :data-state="closeState"
      data-slot="lightbox-close-icon"
    >
      <slot v-if="slots.default" />
    </CloseButton>
  </ArkDialogCloseTrigger>
</template>
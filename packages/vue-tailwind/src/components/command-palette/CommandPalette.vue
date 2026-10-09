<script setup lang="ts">
import { DialogRootProvider as ArkDialogRootProvider, useDialog } from '@ark-ui/vue/dialog';
import type { DialogRootEmits, DialogRootProps, UseDialogProps } from '@ark-ui/vue/dialog';
import { isHotKey } from '@ark-ui/vue/hotkeys';
import { computed, useAttrs, watchEffect } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';
import OverlayPortalProvider from '@/lib/moduix/overlayPortal/OverlayPortalProvider.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogRootProps {
  ariaLabel?: DialogRootProps['aria-label'];
  closeOnEscape?: DialogRootProps['closeOnEscape'];
  closeOnInteractOutside?: DialogRootProps['closeOnInteractOutside'];
  defaultOpen?: DialogRootProps['defaultOpen'];
  finalFocusEl?: DialogRootProps['finalFocusEl'];
  id?: DialogRootProps['id'];
  ids?: DialogRootProps['ids'];
  initialFocusEl?: DialogRootProps['initialFocusEl'];
  immediate?: boolean;
  lazyMount?: boolean;
  modal?: DialogRootProps['modal'];
  open?: DialogRootProps['open'];
  persistentElements?: DialogRootProps['persistentElements'];
  portalled?: boolean;
  portalRef?: PortalRef;
  preventScroll?: DialogRootProps['preventScroll'];
  present?: boolean;
  restoreFocus?: DialogRootProps['restoreFocus'];
  role?: DialogRootProps['role'];
  shortcut?: false | string;
  skipAnimationOnMount?: boolean;
  trapFocus?: DialogRootProps['trapFocus'];
  triggerValue?: DialogRootProps['triggerValue'];
  defaultTriggerValue?: DialogRootProps['defaultTriggerValue'];
  unmountOnExit?: boolean;
}

export interface Emits {
  escapeKeyDown: DialogRootEmits['escapeKeyDown'];
  exitComplete: DialogRootEmits['exitComplete'];
  enterComplete: [];
  focusOutside: DialogRootEmits['focusOutside'];
  interactOutside: DialogRootEmits['interactOutside'];
  openChange: DialogRootEmits['openChange'];
  pointerDownOutside: DialogRootEmits['pointerDownOutside'];
  requestDismiss: DialogRootEmits['requestDismiss'];
  triggerValueChange: DialogRootEmits['triggerValueChange'];
  'update:open': DialogRootEmits['update:open'];
  'update:triggerValue': DialogRootEmits['update:triggerValue'];
}

const props = withDefaults(defineProps<Props>(), {
  closeOnEscape: undefined,
  closeOnInteractOutside: undefined,
  defaultOpen: undefined,
  lazyMount: undefined,
  modal: undefined,
  open: undefined,
  portalled: undefined,
  preventScroll: undefined,
  present: undefined,
  restoreFocus: undefined,
  shortcut: undefined,
  skipAnimationOnMount: undefined,
  trapFocus: undefined,
  unmountOnExit: undefined,
});
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const shortcut = computed(() => props.shortcut ?? false);
const lazyMount = computed(() => props.lazyMount ?? true);
const portalled = computed(() => props.portalled ?? true);
const unmountOnExit = computed(() => props.unmountOnExit ?? true);
const dialogProps = computed<UseDialogProps>(() => ({
  ...attrs,
  ...props,
  'aria-label': props.ariaLabel ?? (attrs['aria-label'] as DialogRootProps['aria-label']),
}));
const dialog = useDialog(dialogProps, emit);

watchEffect((onCleanup) => {
  const shortcutValue = shortcut.value;
  if (!shortcutValue || typeof document === 'undefined') {
    return;
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const dialogState = dialog.value;
    if (
      event.defaultPrevented ||
      event.repeat ||
      event.isComposing ||
      !isHotKey(shortcutValue, event, {
        enableOnContentEditable: dialogState.open,
        enableOnFormTags: dialogState.open,
      })
    ) {
      return;
    }

    event.preventDefault();
    dialogState.setOpen(!dialogState.open);
  };

  document.addEventListener('keydown', handleKeyDown);
  onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
});

const handleEnterComplete = () => emit('enterComplete');
const handleExitComplete = () => emit('exitComplete');
</script>

<template>
  <OverlayPortalProvider :portalled="portalled" :portal-ref="props.portalRef">
    <ArkDialogRootProvider
      :value="dialog"
      :lazy-mount="lazyMount"
      :unmount-on-exit="unmountOnExit"
      @enter-complete="handleEnterComplete"
      @exit-complete="handleExitComplete"
    >
      <slot />
    </ArkDialogRootProvider>
  </OverlayPortalProvider>
</template>
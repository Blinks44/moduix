import { ClipboardContext, useClipboard, useClipboardContext } from '@ark-ui/vue/clipboard';
import Clipboard from './Clipboard.vue';
import ClipboardControl from './ClipboardControl.vue';
import ClipboardIndicator from './ClipboardIndicator.vue';
import ClipboardInput from './ClipboardInput.vue';
import ClipboardLabel from './ClipboardLabel.vue';
import ClipboardRootProvider from './ClipboardRootProvider.vue';
import ClipboardTrigger from './ClipboardTrigger.vue';
import ClipboardValueText from './ClipboardValueText.vue';

export {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
  useClipboard,
  useClipboardContext,
};

export type {
  ClipboardContextProps,
  ClipboardControlProps,
  ClipboardCopyStatusDetails,
  ClipboardIndicatorProps,
  ClipboardInputProps,
  ClipboardLabelProps,
  ClipboardRootEmits,
  ClipboardRootProps,
  ClipboardRootProviderProps,
  ClipboardTriggerProps,
  ClipboardValueTextProps,
  UseClipboardContext,
  UseClipboardProps,
  UseClipboardReturn,
} from '@ark-ui/vue/clipboard';
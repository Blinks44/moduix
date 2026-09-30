import {
  SignaturePadContext,
  SignaturePadHiddenInput,
  useSignaturePadContext,
} from '@ark-ui/vue/signature-pad';
import SignaturePad from './SignaturePad.vue';
import SignaturePadCanvas from './SignaturePadCanvas.vue';
import SignaturePadClearTrigger from './SignaturePadClearTrigger.vue';
import SignaturePadControl from './SignaturePadControl.vue';
import SignaturePadGuide from './SignaturePadGuide.vue';
import SignaturePadLabel from './SignaturePadLabel.vue';
import SignaturePadRootProvider from './SignaturePadRootProvider.vue';
import SignaturePadSegment from './SignaturePadSegment.vue';
import { useSignaturePad } from './useSignaturePad';

export {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadClearTrigger,
  SignaturePadContext,
  SignaturePadControl,
  SignaturePadGuide,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadRootProvider,
  SignaturePadSegment,
  useSignaturePad,
  useSignaturePadContext,
};

export type {
  SignaturePadClearTriggerBaseProps,
  SignaturePadClearTriggerProps,
  SignaturePadContextProps,
  SignaturePadControlBaseProps,
  SignaturePadControlProps,
  SignaturePadDrawDetails,
  SignaturePadDrawEndDetails,
  SignaturePadDrawingOptions,
  SignaturePadGuideBaseProps,
  SignaturePadGuideProps,
  SignaturePadHiddenInputBaseProps,
  SignaturePadHiddenInputProps,
  SignaturePadLabelBaseProps,
  SignaturePadLabelProps,
  SignaturePadRootEmits,
  SignaturePadRootProps,
  SignaturePadRootProviderBaseProps,
  SignaturePadRootProviderProps,
  SignaturePadSegmentBaseProps,
  SignaturePadSegmentProps,
  UseSignaturePadProps,
  UseSignaturePadReturn,
} from '@ark-ui/vue/signature-pad';
import { QrCodeContext, useQrCode, useQrCodeContext } from '@ark-ui/vue/qr-code';
import QrCode from './QrCode.vue';
import QrCodeDownloadTrigger from './QrCodeDownloadTrigger.vue';
import QrCodeFrame from './QrCodeFrame.vue';
import QrCodeOverlay from './QrCodeOverlay.vue';
import QrCodePattern from './QrCodePattern.vue';
import QrCodeRootProvider from './QrCodeRootProvider.vue';

export {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
  useQrCode,
  useQrCodeContext,
};

export type {
  QrCodeContextProps,
  QrCodeDownloadTriggerProps,
  QrCodeFrameProps,
  QrCodeGenerateOptions,
  QrCodeOverlayProps,
  QrCodePatternProps,
  QrCodeRootEmits,
  QrCodeRootProps,
  QrCodeRootProviderProps,
  QrCodeValueChangeDetails,
  UseQrCodeContext,
  UseQrCodeProps,
  UseQrCodeReturn,
} from '@ark-ui/vue/qr-code';
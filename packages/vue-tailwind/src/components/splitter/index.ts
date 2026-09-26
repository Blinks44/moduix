import {
  SplitterContext,
  createSplitterRegistry,
  useSplitter,
  useSplitterContext,
} from '@ark-ui/vue/splitter';
import Splitter from './Splitter.vue';
import SplitterPanel from './SplitterPanel.vue';
import SplitterResizeTrigger from './SplitterResizeTrigger.vue';
import SplitterResizeTriggerIndicator from './SplitterResizeTriggerIndicator.vue';
import SplitterRootProvider from './SplitterRootProvider.vue';

export {
  createSplitterRegistry,
  Splitter,
  SplitterContext,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  SplitterRootProvider,
  useSplitter,
  useSplitterContext,
};

export type {
  SplitterContextProps,
  SplitterExpandCollapseDetails,
  SplitterPanelData,
  SplitterPanelProps,
  SplitterResizeDetails,
  SplitterResizeEndDetails,
  SplitterResizeTriggerIndicatorProps,
  SplitterResizeTriggerProps,
  SplitterRootEmits,
  SplitterRootProps,
  SplitterRootProviderProps,
  UseSplitterContext,
  UseSplitterProps,
  UseSplitterReturn,
} from '@ark-ui/vue/splitter';
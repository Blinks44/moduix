export {
  SplitterContext,
  createSplitterRegistry,
  useSplitter,
  useSplitterContext,
} from '@ark-ui/svelte/splitter';
export { default as Splitter } from './Splitter.svelte';
export { default as SplitterPanel } from './SplitterPanel.svelte';
export { default as SplitterResizeTrigger } from './SplitterResizeTrigger.svelte';
export { default as SplitterResizeTriggerIndicator } from './SplitterResizeTriggerIndicator.svelte';
export { default as SplitterRootProvider } from './SplitterRootProvider.svelte';

export type {
  SplitterContextProps,
  SplitterExpandCollapseDetails,
  SplitterPanelData,
  SplitterPanelProps,
  SplitterResizeDetails,
  SplitterResizeEndDetails,
  SplitterResizeTriggerIndicatorProps,
  SplitterResizeTriggerProps,
  SplitterRootProps,
  SplitterRootProviderProps,
  UseSplitterContext,
  UseSplitterProps,
  UseSplitterReturn,
} from '@ark-ui/svelte/splitter';
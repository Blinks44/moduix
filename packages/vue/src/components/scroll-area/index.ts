import { ScrollAreaContext, useScrollArea, useScrollAreaContext } from '@ark-ui/vue/scroll-area';
import ScrollArea from './ScrollArea.vue';
import ScrollAreaContent from './ScrollAreaContent.vue';
import ScrollAreaCorner from './ScrollAreaCorner.vue';
import ScrollAreaRootProvider from './ScrollAreaRootProvider.vue';
import ScrollAreaScrollbar from './ScrollAreaScrollbar.vue';
import ScrollAreaThumb from './ScrollAreaThumb.vue';
import ScrollAreaViewport from './ScrollAreaViewport.vue';

export {
  ScrollArea,
  ScrollAreaContext,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollArea,
  useScrollAreaContext,
};

export type { ModuixScrollAreaRootProps } from './ScrollArea.vue';
export type { ModuixScrollAreaRootProviderProps } from './ScrollAreaRootProvider.vue';

export type {
  ScrollAreaContentProps,
  ScrollAreaCornerProps,
  ScrollAreaElementIds,
  ScrollAreaRootProps,
  ScrollAreaRootProviderProps,
  ScrollAreaScrollbarProps,
  ScrollAreaScrollToDetails,
  ScrollAreaScrollToEdge,
  ScrollAreaScrollToEdgeDetails,
  ScrollAreaScrollbarState,
  ScrollAreaThumbProps,
  ScrollAreaViewportProps,
  UseScrollAreaContext,
  UseScrollAreaProps,
  UseScrollAreaReturn,
} from '@ark-ui/vue/scroll-area';
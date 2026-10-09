import { MarqueeContext, useMarquee, useMarqueeContext } from '@ark-ui/vue/marquee';
import Marquee from './Marquee.vue';
import MarqueeContent from './MarqueeContent.vue';
import MarqueeEdge from './MarqueeEdge.vue';
import MarqueeItem from './MarqueeItem.vue';
import MarqueeRootProvider from './MarqueeRootProvider.vue';
import MarqueeViewport from './MarqueeViewport.vue';

export {
  Marquee,
  MarqueeContext,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
  useMarquee,
  useMarqueeContext,
};

export type {
  MarqueeContentBaseProps,
  MarqueeContentProps,
  MarqueeContextProps,
  MarqueeEdgeBaseProps,
  MarqueeEdgeProps,
  MarqueeItemBaseProps,
  MarqueeItemProps,
  MarqueePauseStatusDetails,
  MarqueeRootBaseProps,
  MarqueeRootEmits,
  MarqueeRootProps,
  MarqueeRootProviderBaseProps,
  MarqueeRootProviderProps,
  MarqueeSide,
  MarqueeViewportBaseProps,
  MarqueeViewportProps,
  UseMarqueeContext,
  UseMarqueeProps,
  UseMarqueeReturn,
} from '@ark-ui/vue/marquee';
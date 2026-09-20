import {
  AccordionContext,
  AccordionItemContext,
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
} from '@ark-ui/vue/accordion';
import AccordionItem from './AccordionItem.vue';
import AccordionItemBody from './AccordionItemBody.vue';
import AccordionItemContent from './AccordionItemContent.vue';
import AccordionItemIndicator from './AccordionItemIndicator.vue';
import AccordionItemTrigger from './AccordionItemTrigger.vue';
import AccordionRoot from './AccordionRoot.vue';
import AccordionRootProvider from './AccordionRootProvider.vue';

const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  RootProvider: AccordionRootProvider,
  Context: AccordionContext,
  ItemContext: AccordionItemContext,
  Item: AccordionItem,
  ItemTrigger: AccordionItemTrigger,
  ItemIndicator: AccordionItemIndicator,
  ItemContent: AccordionItemContent,
  ItemBody: AccordionItemBody,
});

export {
  Accordion,
  AccordionContext,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemContext,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRoot,
  AccordionRootProvider,
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
};

export type {
  AccordionContextProps,
  AccordionFocusChangeDetails,
  AccordionItemContentProps,
  AccordionItemContextProps,
  AccordionItemIndicatorProps,
  AccordionItemProps,
  AccordionItemTriggerProps,
  AccordionRootEmits,
  AccordionRootProps,
  AccordionRootProviderProps,
  AccordionValueChangeDetails,
  UseAccordionContext,
  UseAccordionItemContext,
  UseAccordionProps,
  UseAccordionReturn,
} from '@ark-ui/vue/accordion';
import { PaginationContext, usePagination, usePaginationContext } from '@ark-ui/vue/pagination';
import Pagination from './Pagination.vue';
import PaginationEllipsis from './PaginationEllipsis.vue';
import PaginationFirstTrigger from './PaginationFirstTrigger.vue';
import PaginationItem from './PaginationItem.vue';
import PaginationItems from './PaginationItems.vue';
import PaginationLastTrigger from './PaginationLastTrigger.vue';
import PaginationNextTrigger from './PaginationNextTrigger.vue';
import PaginationPrevTrigger from './PaginationPrevTrigger.vue';
import PaginationRootProvider from './PaginationRootProvider.vue';

export {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationFirstTrigger,
  PaginationItem,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
  usePagination,
  usePaginationContext,
};

export type {
  PaginationContextProps,
  PaginationEllipsisProps,
  PaginationFirstTriggerProps,
  PaginationItemLabelDetails,
  PaginationItemProps,
  PaginationLastTriggerProps,
  PaginationNextTriggerProps,
  PaginationPageChangeDetails,
  PaginationPageSizeChangeDetails,
  PaginationPageUrlDetails,
  PaginationPrevTriggerProps,
  PaginationRootEmits,
  PaginationRootProps,
  PaginationRootProviderProps,
  UsePaginationContext,
  UsePaginationProps,
  UsePaginationReturn,
} from '@ark-ui/vue/pagination';
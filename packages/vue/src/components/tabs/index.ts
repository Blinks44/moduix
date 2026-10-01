import { TabsContext, useTabs, useTabsContext } from '@ark-ui/vue/tabs';
import Tabs from './Tabs.vue';
import TabsContent from './TabsContent.vue';
import TabsIndicator from './TabsIndicator.vue';
import TabsList from './TabsList.vue';
import TabsRootProvider from './TabsRootProvider.vue';
import TabsTrigger from './TabsTrigger.vue';

export {
  Tabs,
  TabsContext,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
  useTabs,
  useTabsContext,
};

export type {
  TabContentProps,
  TabIndicatorProps,
  TabListProps,
  TabsContextProps,
  TabsFocusChangeDetails,
  TabsRootEmits,
  TabsRootProps,
  TabsRootProviderProps,
  TabsValueChangeDetails,
  TabTriggerProps,
  UseTabsContext,
  UseTabsProps,
  UseTabsReturn,
} from '@ark-ui/vue/tabs';
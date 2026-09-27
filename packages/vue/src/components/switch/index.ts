import { SwitchContext, SwitchHiddenInput, useSwitch, useSwitchContext } from '@ark-ui/vue/switch';
import Switch from './Switch.vue';
import SwitchControl from './SwitchControl.vue';
import SwitchLabel from './SwitchLabel.vue';
import SwitchRootProvider from './SwitchRootProvider.vue';
import SwitchThumb from './SwitchThumb.vue';

export {
  Switch,
  SwitchContext,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
  useSwitch,
  useSwitchContext,
};

export type {
  SwitchCheckedChangeDetails,
  SwitchContextProps,
  SwitchControlProps,
  SwitchHiddenInputProps,
  SwitchLabelProps,
  SwitchRootEmits,
  UseSwitchContext,
  UseSwitchProps,
  UseSwitchReturn,
} from '@ark-ui/vue/switch';

export type { Props as SwitchRootProps, SwitchSize } from './Switch.vue';
export type { Props as SwitchRootProviderProps } from './SwitchRootProvider.vue';
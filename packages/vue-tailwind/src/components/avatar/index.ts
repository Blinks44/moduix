import { AvatarContext, useAvatar, useAvatarContext } from '@ark-ui/vue/avatar';
import Avatar from './Avatar.vue';
import AvatarFallback from './AvatarFallback.vue';
import AvatarGroup from './AvatarGroup.vue';
import AvatarImage from './AvatarImage.vue';
import AvatarRootProvider from './AvatarRootProvider.vue';

export {
  Avatar,
  AvatarContext,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  AvatarRootProvider,
  useAvatar,
  useAvatarContext,
};

export type {
  AvatarContextProps,
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarRootEmits,
  AvatarStatusChangeDetails,
  UseAvatarContext,
  UseAvatarProps,
  UseAvatarReturn,
} from '@ark-ui/vue/avatar';
export type { Props as AvatarRootProps, AvatarSize } from './Avatar.vue';
export type { Props as AvatarRootProviderProps } from './AvatarRootProvider.vue';
export type { Props as AvatarGroupProps } from './AvatarGroup.vue';
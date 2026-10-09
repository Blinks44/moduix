import { AvatarContext, useAvatar, useAvatarContext } from '@ark-ui/vue/avatar';
import Avatar from './Avatar.vue';
import AvatarFallback from './AvatarFallback.vue';
import AvatarImage from './AvatarImage.vue';
import AvatarRootProvider from './AvatarRootProvider.vue';

export {
  Avatar,
  AvatarContext,
  AvatarFallback,
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
  AvatarRootProps,
  AvatarRootProviderProps,
  AvatarStatusChangeDetails,
  UseAvatarContext,
  UseAvatarProps,
  UseAvatarReturn,
} from '@ark-ui/vue/avatar';
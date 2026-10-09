import type { InjectionKey } from 'vue';

export type DrawerVariant = 'island';

export type DrawerVariantContext = {
  variant: () => DrawerVariant | undefined;
};

export const DrawerVariantContextKey: InjectionKey<DrawerVariantContext> =
  Symbol('DrawerVariantContext');
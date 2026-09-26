<script setup lang="ts">
import { Avatar, AvatarContext, AvatarFallback } from '@moduix/vue/avatar';
import type { UseAvatarContext } from '@moduix/vue/avatar';
import type { CSSProperties, UnwrapRef } from 'vue';
import styles from '@/components/examples/avatar/avatar-custom-image.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

const getCustomImageProps = (avatar: UnwrapRef<UseAvatarContext>) => {
  const { hidden, ...imageProps } = avatar.getImageProps();
  const imageStyle: CSSProperties = { visibility: hidden ? 'hidden' : 'visible' };

  return {
    ...imageProps,
    src: avatarImage,
    alt: 'Alex T.',
    class: styles.image,
    style: imageStyle,
  };
};
</script>

<template>
  <Avatar>
    <AvatarFallback>AT</AvatarFallback>
    <AvatarContext v-slot="avatar">
      <img v-bind="getCustomImageProps(avatar)" />
    </AvatarContext>
  </Avatar>
</template>
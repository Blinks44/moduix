import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { CSSProperties, UnwrapRef } from 'vue';
import {
  Avatar,
  AvatarContext,
  AvatarFallback,
  AvatarImage,
  AvatarRootProvider,
  useAvatar,
} from '@/components/avatar';
import type { UseAvatarContext } from '@/components/avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const imageUrl = 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';
const customImageUrl =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&dpr=2&q=80';

const avatarComponents = {
  Avatar,
  AvatarContext,
  AvatarFallback,
  AvatarImage,
  AvatarRootProvider,
};

function getCustomImageProps(avatar: UnwrapRef<UseAvatarContext>) {
  const { hidden, ...imageProps } = avatar.getImageProps();
  const imageStyle: CSSProperties = { visibility: hidden ? 'hidden' : 'visible' };

  return {
    ...imageProps,
    src: customImageUrl,
    alt: 'Alex T.',
    class: 'block size-full rounded-[inherit] object-cover object-center',
    style: imageStyle,
  };
}

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: avatarComponents,
      setup() {
        return { getCustomImageProps, imageUrl, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(
    '<Avatar><AvatarFallback>AT</AvatarFallback><AvatarImage :src="imageUrl" alt="Alex T." /></Avatar>',
  ),
};

export const FallbackOnly: Story = {
  render: renderStory(
    '<div class="flex items-center gap-4"><Avatar size="xs"><AvatarFallback>XS</AvatarFallback></Avatar><Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar><Avatar><AvatarFallback>MD</AvatarFallback></Avatar><Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar><Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar></div>',
  ),
};

export const AsChildComposition: Story = {
  render: renderStory(
    '<Avatar as-child size="xl" class="no-underline transition-[box-shadow,transform] duration-200 ease-in-out hover:-translate-y-px hover:shadow-[0_0_0_2px_var(--color-background),0_0_0_4px_var(--color-primary)]"><a href="mailto:alex@example.com" aria-label="Email Alex T."><AvatarFallback class="bg-primary text-primary-foreground">AT</AvatarFallback><AvatarImage class="object-[50%_35%]" :src="imageUrl" alt="" /></a></Avatar>',
  ),
};

export const StatusChange: Story = {
  render: renderStory(
    '<div class="inline-flex items-center gap-3"><Avatar @status-change="status = $event.status"><AvatarFallback>AT</AvatarFallback><AvatarImage :src="imageUrl" alt="Alex T." /></Avatar><span class="text-sm text-muted-foreground">status: {{ status }}</span></div>',
    () => ({ status: ref('idle') }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    '<div class="inline-flex items-center gap-3"><button type="button" @click="count++">Change avatar</button><AvatarRootProvider :value="avatar"><AvatarFallback>AT</AvatarFallback><AvatarImage :src="imageUrl + \'&seed=\' + count" alt="Alex T." /></AvatarRootProvider></div>',
    () => ({ avatar: useAvatar(), count: ref(0) }),
  ),
};

export const CustomImage: Story = {
  render: renderStory(
    '<Avatar><AvatarFallback>AT</AvatarFallback><AvatarContext v-slot="avatar"><img v-bind="getCustomImageProps(avatar)" /></AvatarContext></Avatar>',
  ),
};

export const ImageError: Story = {
  render: renderStory(
    '<Avatar><AvatarFallback>NA</AvatarFallback><AvatarImage src="https://example.com/does-not-exist.png" alt="Broken image example" /></Avatar>',
  ),
};

export const FallbackIcon: Story = {
  render: renderStory(
    '<Avatar size="lg" class="bg-accent"><AvatarFallback class="text-accent-foreground"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-[55%]"><path d="M12 17v4" /><path d="M8 21h8" /><path d="m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15" /><circle cx="8" cy="9" r="2" /><rect x="2" y="3" width="20" height="14" rx="2" /></svg></AvatarFallback></Avatar>',
  ),
};
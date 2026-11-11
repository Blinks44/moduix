<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Avatar,
    AvatarContext,
    AvatarFallback,
    AvatarImage,
    AvatarRootProvider,
    useAvatar,
    type UseAvatarReturn,
  } from '@/components/avatar';
  import styles from './Avatar.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const imageUrl =
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';
  const customImageUrl =
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&dpr=2&q=80';

  const getCustomImageProps = (avatar: ReturnType<UseAvatarReturn>) => {
    const { hidden, ...imageProps } = avatar.getImageProps();

    return {
      ...imageProps,
      src: customImageUrl,
      alt: 'Alex T.',
      class: styles.customImage,
      style: `visibility: ${hidden ? 'hidden' : 'visible'}`,
    };
  };
</script>

<script lang="ts">
  let status = $state('idle');
  let count = $state(0);
  const avatar = useAvatar({ id: 'avatar-root-provider' });
</script>

<Story name="Basic" asChild>
  <Avatar>
    <AvatarFallback>AT</AvatarFallback>
    <AvatarImage src={imageUrl} alt="Alex T." />
  </Avatar>
</Story>

<Story name="Fallback Only" exportName="FallbackOnly" asChild>
  <div class={styles.fallbackRow}>
    <Avatar size="xs"><AvatarFallback>XS</AvatarFallback></Avatar>
    <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
    <Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
    <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
    <Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
  </div>
</Story>

<Story name="As Child Composition" exportName="AsChildComposition" asChild>
  <Avatar size="xl" class={styles.linkAvatar}>
    {#snippet asChild(props)}
      <a {...props()} href="mailto:alex@example.com" aria-label="Email Alex T.">
        <AvatarFallback class={styles.linkAvatarFallback}>AT</AvatarFallback>
        <AvatarImage class={styles.linkAvatarImage} src={imageUrl} alt="" />
      </a>
    {/snippet}
  </Avatar>
</Story>

<Story name="Status Change" exportName="StatusChange" asChild>
  <div class={styles.statusStory}>
    <Avatar onStatusChange={(details) => (status = details.status)}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src={imageUrl} alt="Alex T." />
    </Avatar>
    <span class={styles.statusLabel}>status: {status}</span>
  </div>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={styles.providerStory}>
    <button type="button" onclick={() => count++}>Change avatar</button>
    <AvatarRootProvider value={avatar}>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src={`${imageUrl}&seed=${count}`} alt="Alex T." />
    </AvatarRootProvider>
  </div>
</Story>

<Story name="Custom Image" exportName="CustomImage" asChild>
  <Avatar>
    <AvatarFallback>AT</AvatarFallback>
    <AvatarContext>
      {#snippet render(avatar)}
        <img {...getCustomImageProps(avatar())} alt="Alex T." />
      {/snippet}
    </AvatarContext>
  </Avatar>
</Story>

<Story name="Image Error" exportName="ImageError" asChild>
  <Avatar>
    <AvatarFallback>NA</AvatarFallback>
    <AvatarImage src="https://example.com/does-not-exist.png" alt="Broken image example" />
  </Avatar>
</Story>

<Story name="Fallback Icon" exportName="FallbackIcon" asChild>
  <Avatar size="lg" class={styles.iconAvatar}>
    <AvatarFallback>
      <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={styles.iconAvatarGlyph}
      >
        <path d="M12 17v4" />
        <path d="M8 21h8" />
        <path d="m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15" />
        <circle cx="8" cy="9" r="2" />
        <rect x="2" y="3" width="20" height="14" rx="2" />
      </svg>
    </AvatarFallback>
  </Avatar>
</Story>
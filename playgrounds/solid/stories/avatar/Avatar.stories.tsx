import type { JSX } from 'solid-js';
import { createMemo, createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarRootProvider,
  useAvatar,
  useAvatarContext,
} from '@/components/avatar/Avatar';
import styles from './Avatar.stories.module.css';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const imageUrl = 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';
const customImageUrl =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&dpr=2&q=80';

const decorativeSvgProps: Record<string, string> = {
  'aria-hidden': 'true',
  focusable: 'false',
};

function AvatarCustomImage(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  const avatar = useAvatarContext();
  const image = createMemo(() => {
    const { hidden, ...imageProps } = avatar().getImageProps();

    return { hidden, imageProps };
  });

  return (
    <img
      {...image().imageProps}
      {...props}
      class={styles.customImage}
      style={{ visibility: image().hidden ? 'hidden' : 'visible' }}
    />
  );
}

function StatusChangeAvatar() {
  const [status, setStatus] = createSignal('idle');

  return (
    <div class={styles.statusStory}>
      <Avatar onStatusChange={(details) => setStatus(details.status)}>
        <AvatarFallback>AT</AvatarFallback>
        <AvatarImage src={imageUrl} alt="Alex T." />
      </Avatar>
      <span class={styles.statusLabel}>status: {status()}</span>
    </div>
  );
}

function RootProviderAvatar() {
  const [count, setCount] = createSignal(0);
  const avatar = useAvatar();

  return (
    <div class={styles.providerStory}>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Change avatar
      </button>
      <AvatarRootProvider value={avatar}>
        <AvatarFallback>AT</AvatarFallback>
        <AvatarImage src={`${imageUrl}&seed=${count()}`} alt="Alex T." />
      </AvatarRootProvider>
    </div>
  );
}

function ComputerIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...decorativeSvgProps}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <path d="m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15" />
      <circle cx="8" cy="9" r="2" />
      <rect x="2" y="3" width="20" height="14" rx="2" />
    </svg>
  );
}

export const Basic: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarImage src={imageUrl} alt="Alex T." />
    </Avatar>
  ),
};

export const FallbackOnly: Story = {
  render: () => (
    <div class={styles.fallbackRow}>
      <Avatar size="xs">
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const AsChildComposition: Story = {
  render: () => (
    <Avatar
      asChild={(props) => (
        <a {...props()} href="mailto:alex@example.com" aria-label="Email Alex T.">
          <AvatarFallback class={styles.linkAvatarFallback}>AT</AvatarFallback>
          <AvatarImage class={styles.linkAvatarImage} src={imageUrl} alt="" />
        </a>
      )}
      size="xl"
      class={styles.linkAvatar}
    />
  ),
};

export const StatusChange: Story = {
  render: () => <StatusChangeAvatar />,
};

export const RootProvider: Story = {
  render: () => <RootProviderAvatar />,
};

export const CustomImage: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>AT</AvatarFallback>
      <AvatarCustomImage src={customImageUrl} alt="Alex T." />
    </Avatar>
  ),
};

export const ImageError: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>NA</AvatarFallback>
      <AvatarImage src="https://example.com/does-not-exist.png" alt="Broken image example" />
    </Avatar>
  ),
};

export const FallbackIcon: Story = {
  render: () => (
    <Avatar size="lg" class={styles.iconAvatar}>
      <AvatarFallback>
        <ComputerIcon class={styles.iconAvatarGlyph} />
      </AvatarFallback>
    </Avatar>
  ),
};
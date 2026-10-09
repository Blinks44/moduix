import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ImgHTMLAttributes, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarRootProvider,
  useAvatar,
  useAvatarContext,
} from '@/components/avatar/Avatar';
import { ComputerIcon } from '../../icons/demo';
import styles from './Avatar.stories.module.css';

const meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const imageUrl = 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';
const customImageUrl =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&dpr=2&q=80';

function AvatarCustomImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const avatar = useAvatarContext();
  const { hidden, ...imageProps } = avatar.getImageProps();

  return (
    <img
      {...imageProps}
      {...props}
      className={styles.customImage}
      style={{ visibility: hidden ? 'hidden' : 'visible' }}
    />
  );
}

function StatusChangeAvatar() {
  const [status, setStatus] = useState('idle');

  return (
    <div className={styles.statusStory}>
      <Avatar onStatusChange={(details) => setStatus(details.status)}>
        <AvatarFallback>AT</AvatarFallback>
        <AvatarImage src={imageUrl} alt="Alex T." />
      </Avatar>
      <span className={styles.statusLabel}>status: {status}</span>
    </div>
  );
}

function RootProviderAvatar() {
  const [count, setCount] = useState(0);
  const avatar = useAvatar();

  return (
    <div className={styles.providerStory}>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Change avatar
      </button>
      <AvatarRootProvider value={avatar}>
        <AvatarFallback>AT</AvatarFallback>
        <AvatarImage src={`${imageUrl}&seed=${count}`} alt="Alex T." />
      </AvatarRootProvider>
    </div>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <Avatar>
        <AvatarFallback>AT</AvatarFallback>
        <AvatarImage src={imageUrl} alt="Alex T." />
      </Avatar>
    );
  },
};

export const FallbackOnly: Story = {
  render: () => {
    return (
      <div className={styles.fallbackRow}>
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
    );
  },
};

export const AsChildComposition: Story = {
  render: () => {
    return (
      <Avatar asChild size="xl" className={styles.linkAvatar}>
        <a href="mailto:alex@example.com" aria-label="Email Alex T.">
          <AvatarFallback className={styles.linkAvatarFallback}>AT</AvatarFallback>
          <AvatarImage className={styles.linkAvatarImage} src={imageUrl} alt="" />
        </a>
      </Avatar>
    );
  },
};

export const StatusChange: Story = {
  render: () => <StatusChangeAvatar />,
};

export const RootProvider: Story = {
  render: () => <RootProviderAvatar />,
};

export const CustomImage: Story = {
  render: () => {
    return (
      <Avatar>
        <AvatarFallback>AT</AvatarFallback>
        <AvatarCustomImage src={customImageUrl} alt="Alex T." />
      </Avatar>
    );
  },
};

export const ImageError: Story = {
  render: () => {
    return (
      <Avatar>
        <AvatarFallback>NA</AvatarFallback>
        <AvatarImage src="https://example.com/does-not-exist.png" alt="Broken image example" />
      </Avatar>
    );
  },
};

export const FallbackIcon: Story = {
  render: () => {
    return (
      <Avatar size="lg" className={styles.iconAvatar}>
        <AvatarFallback>
          <ComputerIcon className={styles.iconAvatarGlyph} />
        </AvatarFallback>
      </Avatar>
    );
  },
};
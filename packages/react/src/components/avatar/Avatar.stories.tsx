import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ImgHTMLAttributes, useState } from 'react';
import { ComputerIcon } from '@/icons/demo';
import styles from './Avatar.stories.module.css';
import { Avatar, useAvatar, useAvatarContext } from './index';

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
        <Avatar.Fallback name="Alex T." />
        <Avatar.Image src={imageUrl} alt="Alex T." />
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
      <Avatar.RootProvider value={avatar}>
        <Avatar.Fallback name="Alex T." />
        <Avatar.Image src={`${imageUrl}&seed=${count}`} alt="Alex T." />
      </Avatar.RootProvider>
    </div>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <Avatar>
        <Avatar.Fallback name="Alex T." />
        <Avatar.Image src={imageUrl} alt="Alex T." />
      </Avatar>
    );
  },
};

export const FallbackOnly: Story = {
  render: () => {
    return (
      <div className={styles.fallbackRow}>
        <Avatar size="xs">
          <Avatar.Fallback>XS</Avatar.Fallback>
        </Avatar>
        <Avatar size="sm">
          <Avatar.Fallback>SM</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Fallback>MD</Avatar.Fallback>
        </Avatar>
        <Avatar size="lg">
          <Avatar.Fallback>LG</Avatar.Fallback>
        </Avatar>
        <Avatar size="xl">
          <Avatar.Fallback>XL</Avatar.Fallback>
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
          <Avatar.Fallback className={styles.linkAvatarFallback} name="Alex T." />
          <Avatar.Image className={styles.linkAvatarImage} src={imageUrl} alt="" />
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
        <Avatar.Fallback name="Alex T." />
        <AvatarCustomImage src={imageUrl} alt="Alex T." />
      </Avatar>
    );
  },
};

export const ImageError: Story = {
  render: () => {
    return (
      <Avatar>
        <Avatar.Fallback name="No Avatar" />
        <Avatar.Image src="https://example.com/does-not-exist.png" alt="Broken image example" />
      </Avatar>
    );
  },
};

export const FallbackIcon: Story = {
  render: () => {
    return (
      <Avatar size="lg" className={styles.iconAvatar}>
        <Avatar.Fallback>
          <ComputerIcon className={styles.iconAvatarGlyph} />
        </Avatar.Fallback>
      </Avatar>
    );
  },
};
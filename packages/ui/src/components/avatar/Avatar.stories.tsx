import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ComputerIcon } from '@/icons/demo';
import { Avatar, useAvatar } from './Avatar';
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

function StatusChangeAvatar() {
  const [status, setStatus] = useState('idle');

  return (
    <div className={styles.statusStory}>
      <Avatar.Root onStatusChange={(details) => setStatus(details.status)}>
        <Avatar.Fallback>LT</Avatar.Fallback>
        <Avatar.Image src={imageUrl} alt="Alex T." />
      </Avatar.Root>
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
        <Avatar.Fallback>LT</Avatar.Fallback>
        <Avatar.Image src={`${imageUrl}&seed=${count}`} alt="Alex T." />
      </Avatar.RootProvider>
    </div>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <Avatar.Root>
        <Avatar.Fallback>LT</Avatar.Fallback>
        <Avatar.Image src={imageUrl} alt="Alex T." />
      </Avatar.Root>
    );
  },
};

export const FallbackOnly: Story = {
  render: () => {
    return (
      <div className={styles.fallbackRow}>
        <Avatar.Root size="xs">
          <Avatar.Fallback>XS</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root size="sm">
          <Avatar.Fallback>SM</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Fallback>MD</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root size="lg">
          <Avatar.Fallback>LG</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root size="xl">
          <Avatar.Fallback>XL</Avatar.Fallback>
        </Avatar.Root>
      </div>
    );
  },
};

export const AsChildComposition: Story = {
  render: () => {
    return (
      <Avatar.Root asChild size="xl" className={styles.linkAvatar}>
        <a href="mailto:alex@example.com" aria-label="Email Alex T.">
          <Avatar.Fallback className={styles.linkAvatarFallback}>LT</Avatar.Fallback>
          <Avatar.Image className={styles.linkAvatarImage} src={imageUrl} alt="" />
        </a>
      </Avatar.Root>
    );
  },
};

export const StatusChange: Story = {
  render: () => <StatusChangeAvatar />,
};

export const Context: Story = {
  render: () => {
    return (
      <Avatar.Root>
        <Avatar.Context>
          {(avatar) => <Avatar.Fallback>{avatar.loaded ? 'LT' : 'Loading'}</Avatar.Fallback>}
        </Avatar.Context>
        <Avatar.Image src={imageUrl} alt="Alex T." />
      </Avatar.Root>
    );
  },
};

export const RootProvider: Story = {
  render: () => <RootProviderAvatar />,
};

export const ImageError: Story = {
  render: () => {
    return (
      <Avatar.Root>
        <Avatar.Fallback>NA</Avatar.Fallback>
        <Avatar.Image src="https://example.com/does-not-exist.png" alt="Broken image example" />
      </Avatar.Root>
    );
  },
};

export const FallbackIcon: Story = {
  render: () => {
    return (
      <Avatar.Root size="lg" className={styles.iconAvatar}>
        <Avatar.Fallback>
          <ComputerIcon className={styles.iconAvatarGlyph} />
        </Avatar.Fallback>
      </Avatar.Root>
    );
  },
};
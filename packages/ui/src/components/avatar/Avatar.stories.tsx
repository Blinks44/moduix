import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ComputerIcon } from '@/icons/demo';
import { Avatar } from './Avatar';
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
        <Avatar.Image src={imageUrl} alt="Alex T." />
        <Avatar.Fallback>LT</Avatar.Fallback>
      </Avatar.Root>
      <span className={styles.statusLabel}>status: {status}</span>
    </div>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <Avatar.Root>
        <Avatar.Image src={imageUrl} alt="Alex T." />
        <Avatar.Fallback>LT</Avatar.Fallback>
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
          <Avatar.Image className={styles.linkAvatarImage} src={imageUrl} alt="" />
          <Avatar.Fallback className={styles.linkAvatarFallback}>LT</Avatar.Fallback>
        </a>
      </Avatar.Root>
    );
  },
};

export const StatusChange: Story = {
  render: () => <StatusChangeAvatar />,
};

export const ImageError: Story = {
  render: () => {
    return (
      <Avatar.Root>
        <Avatar.Image src="https://example.com/does-not-exist.png" alt="Broken image example" />
        <Avatar.Fallback>NA</Avatar.Fallback>
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
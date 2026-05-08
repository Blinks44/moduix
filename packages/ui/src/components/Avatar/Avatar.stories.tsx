import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
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

export const Basic: Story = {
  render: () => {
    return (
      <Avatar>
        <AvatarImage src={imageUrl} alt="Alex T." />
        <AvatarFallback delay={600}>LT</AvatarFallback>
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
        <Avatar size="md">
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

export const ImageError: Story = {
  render: () => {
    return (
      <Avatar>
        <AvatarImage src="https://example.com/does-not-exist.png" alt="Broken image example" />
        <AvatarFallback>NA</AvatarFallback>
      </Avatar>
    );
  },
};
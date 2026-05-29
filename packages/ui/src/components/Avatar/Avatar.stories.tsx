import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComputerIcon } from '@/icons/demo';
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
        <Avatar className={styles.sizeXs}>
          <AvatarFallback>XS</AvatarFallback>
        </Avatar>
        <Avatar className={styles.sizeSm}>
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar className={styles.sizeLg}>
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <Avatar className={styles.sizeXl}>
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
      </div>
    );
  },
};

export const RenderComposition: Story = {
  render: () => {
    return (
      <Avatar render={<a href="mailto:alex@example.com" />} className={styles.linkAvatar}>
        <AvatarImage className={styles.linkAvatarImage} src={imageUrl} alt="Alex T." />
        <AvatarFallback className={styles.linkAvatarFallback} delay={600}>
          LT
        </AvatarFallback>
      </Avatar>
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

export const FallbackIcon: Story = {
  render: () => {
    return (
      <Avatar className={styles.iconAvatar}>
        <AvatarFallback>
          <ComputerIcon className={styles.iconAvatarGlyph} />
        </AvatarFallback>
      </Avatar>
    );
  },
};
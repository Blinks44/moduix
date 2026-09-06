import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, type ImgHTMLAttributes, useState } from 'react';
import { Avatar, useAvatar, useAvatarContext } from '@/components/avatar/Avatar';

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
      className="block size-full rounded-[inherit] object-cover object-center"
      style={{ visibility: hidden ? 'hidden' : 'visible' }}
    />
  );
}

function StatusChangeAvatar() {
  const [status, setStatus] = useState('idle');

  return (
    <div className="inline-flex items-center gap-3">
      <Avatar onStatusChange={(details) => setStatus(details.status)}>
        <Avatar.Fallback>AT</Avatar.Fallback>
        <Avatar.Image src={imageUrl} alt="Alex T." />
      </Avatar>
      <span className="text-sm text-muted-foreground">status: {status}</span>
    </div>
  );
}

function RootProviderAvatar() {
  const [count, setCount] = useState(0);
  const avatar = useAvatar();

  return (
    <div className="inline-flex items-center gap-3">
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Change avatar
      </button>
      <Avatar.RootProvider value={avatar}>
        <Avatar.Fallback>AT</Avatar.Fallback>
        <Avatar.Image src={`${imageUrl}&seed=${count}`} alt="Alex T." />
      </Avatar.RootProvider>
    </div>
  );
}

function ComputerIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
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
      <Avatar.Fallback>AT</Avatar.Fallback>
      <Avatar.Image src={imageUrl} alt="Alex T." />
    </Avatar>
  ),
};

export const FallbackOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
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
  ),
};

export const AsChildComposition: Story = {
  render: () => (
    <Avatar
      asChild
      size="xl"
      className="no-underline transition-[box-shadow,transform] duration-200 ease-in-out hover:-translate-y-px hover:shadow-[0_0_0_2px_var(--color-background),0_0_0_4px_var(--color-primary)]"
    >
      <a href="mailto:alex@example.com" aria-label="Email Alex T.">
        <Avatar.Fallback className="bg-primary text-primary-foreground">AT</Avatar.Fallback>
        <Avatar.Image className="[object-position:50%_35%]" src={imageUrl} alt="" />
      </a>
    </Avatar>
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
      <Avatar.Fallback>AT</Avatar.Fallback>
      <AvatarCustomImage src={customImageUrl} alt="Alex T." />
    </Avatar>
  ),
};

export const ImageError: Story = {
  render: () => (
    <Avatar>
      <Avatar.Fallback>NA</Avatar.Fallback>
      <Avatar.Image src="https://example.com/does-not-exist.png" alt="Broken image example" />
    </Avatar>
  ),
};

export const FallbackIcon: Story = {
  render: () => (
    <Avatar size="lg" className="bg-accent">
      <Avatar.Fallback className="text-accent-foreground">
        <ComputerIcon className="size-[55%]" />
      </Avatar.Fallback>
    </Avatar>
  ),
};
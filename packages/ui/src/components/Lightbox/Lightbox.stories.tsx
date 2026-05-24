import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { CloseButton } from '@/components/CloseButton';
import {
  Lightbox,
  LightboxContent,
  LightboxGallery,
  LightboxImage,
  LightboxTrigger,
} from './Lightbox';

const meta = {
  title: 'Components/Lightbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const WrappedImage: Story = {
  render: () => {
    return (
      <Lightbox>
        <LightboxImage
          src="https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=1200&q=80"
          alt="Mountain ridge at sunset"
          style={{ width: 280, height: 180, objectFit: 'cover', borderRadius: '8px' }}
        />
        <LightboxContent>
          <img
            src="https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=1800&q=90"
            alt="Mountain ridge at sunset"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </LightboxContent>
      </Lightbox>
    );
  },
};

export const TriggerComposition: Story = {
  render: () => {
    return (
      <Lightbox>
        <LightboxTrigger
          render={
            <button type="button" style={{ cursor: 'zoom-in' }}>
              Open image
            </button>
          }
        />
        <LightboxContent withBackdrop={false}>
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=90"
            alt="Earth from space"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </LightboxContent>
      </Lightbox>
    );
  },
};

export const CustomBuiltInCloseButton: Story = {
  render: () => {
    return (
      <Lightbox>
        <LightboxTrigger
          render={
            <button type="button" style={{ cursor: 'zoom-in' }}>
              Open image
            </button>
          }
        />
        <LightboxContent
          closeButton={
            <CloseButton aria-label="Close preview">
              <span aria-hidden="true">x</span>
            </CloseButton>
          }
        >
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=90"
            alt="Earth from space"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </LightboxContent>
      </Lightbox>
    );
  },
};

export const DynamicCapture: Story = {
  render: () => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);

    return (
      <React.Fragment>
        <div
          ref={rootRef}
          style={{
            display: 'grid',
            width: 460,
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 12,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=640&q=80"
            alt="Foggy mountain"
            style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
          />
          <img
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=640&q=80"
            alt="Blue sea"
            style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
          />
          <img
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=640&q=80"
            alt="Road in forest"
            style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
          />
        </div>
        <LightboxGallery rootRef={rootRef} />
      </React.Fragment>
    );
  },
};
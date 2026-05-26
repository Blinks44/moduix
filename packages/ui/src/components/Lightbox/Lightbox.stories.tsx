import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import {
  Lightbox,
  LightboxBackdrop,
  LightboxClose,
  LightboxCloseButton,
  LightboxContent,
  LightboxFrame,
  LightboxGallery,
  LightboxImage,
  LightboxPopup,
  LightboxPortal,
  LightboxTrigger,
  LightboxViewport,
} from './Lightbox';

const customPopupStyle = {
  '--lightbox-width': '72vw',
  '--lightbox-height': '72dvh',
} as React.CSSProperties;

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
        <LightboxContent>
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

export const CustomComposition: Story = {
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
        <LightboxPortal>
          <LightboxBackdrop style={{ backgroundColor: 'rgb(15 23 42 / 0.62)' }} />
          <LightboxViewport>
            <LightboxCloseButton />
            <LightboxPopup style={customPopupStyle}>
              <LightboxFrame>
                <LightboxClose aria-label="Close image" nativeButton={false} render={<div />}>
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=90"
                    alt="Earth from space"
                    style={{ display: 'block', width: '100%', height: 'auto' }}
                  />
                </LightboxClose>
              </LightboxFrame>
            </LightboxPopup>
          </LightboxViewport>
        </LightboxPortal>
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
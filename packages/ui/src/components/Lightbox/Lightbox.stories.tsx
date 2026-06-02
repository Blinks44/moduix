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
import styles from './Lightbox.stories.module.css';

const meta = {
  title: 'Components/Lightbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <Lightbox>
        <LightboxImage
          src="https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=1200&q=80"
          fullSrc="https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=1800&q=90"
          alt="Mountain ridge at sunset"
          className={styles.previewImage}
        />
        <LightboxContent />
      </Lightbox>
    );
  },
};

export const TriggerComposition: Story = {
  render: () => {
    return (
      <Lightbox>
        <LightboxTrigger className={styles.triggerButton}>Open image</LightboxTrigger>
        <LightboxContent>
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=90"
            alt="Earth from space"
            className={styles.contentImage}
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
            <button type="button" className={styles.triggerButton}>
              Open image
            </button>
          }
        />
        <LightboxPortal>
          <LightboxBackdrop className={styles.customBackdrop} />
          <LightboxViewport>
            <LightboxCloseButton />
            <LightboxPopup className={styles.customPopup}>
              <LightboxFrame>
                <LightboxClose nativeButton={false} render={<div />}>
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=90"
                    alt="Earth from space"
                    className={styles.contentImage}
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
        <div ref={rootRef} className={styles.galleryRoot}>
          <button type="button" className={styles.galleryItem}>
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=640&q=80"
              data-lightbox-src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=90"
              alt="Foggy mountain"
              className={styles.galleryImage}
            />
          </button>
          <button type="button" className={styles.galleryItem}>
            <img
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=640&q=80"
              data-lightbox-src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1800&q=90"
              alt="Blue sea"
              className={styles.galleryImage}
            />
          </button>
          <button type="button" className={styles.galleryItem}>
            <img
              src="https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=640&q=80"
              data-lightbox-src="https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1800&q=90"
              alt="Road in forest"
              className={styles.galleryImage}
            />
          </button>
        </div>
        <LightboxGallery rootRef={rootRef} selector="button" />
      </React.Fragment>
    );
  },
};
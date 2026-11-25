'use client';

import { useEffect } from 'react';
import {
  Carousel,
  CarouselContext,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@/registry/react/ui/carousel';

const slides = [
  {
    id: 'workspaces',
    category: 'Workspaces',
    title: 'Workspaces for teams',
    description: 'Private offices and shared desks with meeting rooms and Wi-Fi.',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
    alt: 'A bright office with tables, chairs, and plants.',
  },
  {
    id: 'outdoors',
    category: 'Outdoors',
    title: 'Mountain trails',
    description: 'Day hikes and weekend routes through the mountains.',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    alt: 'Snow-covered mountains under a clear sky.',
  },
  {
    id: 'wellbeing',
    category: 'Wellbeing',
    title: 'Spa appointments',
    description: 'Book a massage or a treatment at a local spa.',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    alt: 'A lotion bottle, rolled towels, and pink flowers.',
  },
  {
    id: 'community',
    category: 'Community',
    title: 'Local events',
    description: 'Find outdoor concerts, meetups, and other events nearby.',
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
    alt: 'People gathered on a patio under string lights.',
  },
];

function ResumeAutoplayWhenVisible({ onVisible }: { onVisible: () => void }) {
  useEffect(() => {
    const resume = () => {
      if (document.visibilityState === 'visible') onVisible();
    };

    document.addEventListener('visibilitychange', resume);
    return () => document.removeEventListener('visibilitychange', resume);
  }, [onVisible]);

  return null;
}

export function AutoplayGallery() {
  return (
    <Carousel
      aria-label="Featured experiences"
      autoplay={{ delay: 3500 }}
      className="w-[min(100%,68rem)]"
      loop
      padding="var(--autoplay-gallery-padding, var(--moduix-spacing-8))"
      slideCount={slides.length}
      slidesPerPage={1.12}
      spacing="var(--autoplay-gallery-spacing, var(--moduix-spacing-4))"
    >
      <CarouselContext>
        {(api) => (
          <>
            <ResumeAutoplayWhenVisible onVisible={api.play} />
            <div className="relative overflow-clip">
              <CarouselItemGroup
                className="py-3"
                onTouchStart={api.pause}
                onWheel={(event) => {
                  if (event.deltaX !== 0) api.pause();
                }}
              >
                {slides.map((slide, index) => (
                  <CarouselItem
                    key={slide.id}
                    className="relative aspect-[5/4] min-h-0 scale-96 overflow-hidden rounded-xl opacity-58 transition-[opacity,transform] duration-slow before:pointer-events-none before:absolute before:inset-x-0 before:top-[35%] before:bottom-0 before:z-1 before:rounded-[inherit] before:bg-[linear-gradient(to_top,color-mix(in_oklab,var(--color-foreground)_68%,transparent),transparent)] before:[mask-image:linear-gradient(to_top,black_45%,transparent)] before:backdrop-blur-lg data-[active]:scale-100 data-[active]:opacity-100 motion-reduce:transition-none sm:aspect-auto sm:min-h-[clamp(22rem,48vw,32rem)]"
                    data-active={api.page === index ? '' : undefined}
                    index={index}
                    snapAlign="center"
                  >
                    <img
                      className="block size-full rounded-[inherit] object-cover"
                      src={slide.src}
                      alt={slide.alt}
                    />
                    <div className="absolute inset-x-3 bottom-3 z-1 flex max-w-[calc(100%-1.5rem)] flex-col items-start gap-1 text-white sm:inset-x-5 sm:bottom-5 sm:max-w-[min(34rem,calc(100%-2.5rem))]">
                      <span className="text-xs font-semibold tracking-[0.08em] text-white/78 uppercase">
                        {slide.category}
                      </span>
                      <h2 className="m-0 max-w-[22ch] text-base leading-[1.15] text-balance text-inherit sm:text-[clamp(var(--text-xl),3vw,var(--text-3xl))]">
                        {slide.title}
                      </h2>
                      <p className="m-0 hidden max-w-[52ch] text-sm text-pretty text-white/84 sm:block">
                        {slide.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselItemGroup>

              <CarouselControl className="pointer-events-none absolute inset-0 z-1 justify-between px-2 sm:px-4">
                <CarouselPrevTrigger
                  className="pointer-events-auto shadow-md"
                  onClick={() => requestAnimationFrame(api.play)}
                />
                <CarouselNextTrigger
                  className="pointer-events-auto shadow-md"
                  onClick={() => requestAnimationFrame(api.play)}
                />
              </CarouselControl>
            </div>
          </>
        )}
      </CarouselContext>

      <CarouselContext>
        {(api) => (
          <CarouselIndicatorGroup className="mt-2">
            {api.pageSnapPoints.map((_, index) => (
              <CarouselIndicator
                key={index}
                className="relative overflow-visible bg-[color-mix(in_oklab,var(--color-muted)_90%,var(--color-foreground))] [background-image:linear-gradient(currentColor,currentColor)] [background-size:0%_100%] bg-no-repeat text-[var(--moduix-carousel-indicator-bg-current,var(--color-primary))] opacity-100 after:absolute after:inset-x-0 after:-inset-y-2 data-current:bg-[color-mix(in_oklab,var(--color-muted)_90%,var(--color-foreground))] data-current:[background-size:100%_100%] data-current:data-playing:transition-[background-size] data-current:data-playing:duration-[3500ms] data-current:data-playing:ease-linear motion-reduce:data-current:transition-none rtl:bg-right"
                data-playing={api.isPlaying ? '' : undefined}
                index={index}
                onClick={() => requestAnimationFrame(api.play)}
              />
            ))}
          </CarouselIndicatorGroup>
        )}
      </CarouselContext>
    </Carousel>
  );
}
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import {
  Carousel,
  CarouselAutoplayIndicator,
  CarouselAutoplayTrigger,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
} from '@/index';

const carouselComponents = {
  Carousel,
  CarouselAutoplayIndicator,
  CarouselAutoplayTrigger,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
  CarouselIndicator,
  CarouselIndicatorGroup,
};

test('lets consumers override runtime indicator sizing with state utilities', async () => {
  render(
    defineComponent({
      components: carouselComponents,
      template: `
        <Carousel aria-label="Thumbnail gallery" :slide-count="2">
          <CarouselItemGroup>
            <CarouselItem :index="0">First</CarouselItem>
            <CarouselItem :index="1">Second</CarouselItem>
          </CarouselItemGroup>
          <CarouselIndicatorGroup>
            <CarouselIndicator
              :index="0"
              class="h-12 w-20 bg-transparent data-current:h-12 data-current:w-20 data-current:bg-transparent"
            />
            <CarouselIndicator :index="1" />
          </CarouselIndicatorGroup>
        </Carousel>
      `,
    }),
  );

  const currentIndicator = document.querySelector<HTMLElement>(
    '[data-slot="carousel-indicator"][data-current]',
  )!;

  expect([...currentIndicator.classList]).toEqual(
    expect.arrayContaining([
      'h-12',
      'w-20',
      'bg-transparent',
      'data-current:h-12',
      'data-current:w-20',
      'data-current:bg-transparent',
    ]),
  );
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('width', '80px');
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('height', '48px');
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});
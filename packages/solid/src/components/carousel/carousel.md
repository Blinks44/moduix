# Carousel (Solid)

`Carousel` preserves the React component's flat part anatomy, Ark paging behavior, callback details,
data hooks, generated indicators, and CSS variables. The public values match the React contract:
`Carousel`, `CarouselRootProvider`, `CarouselContext`, `CarouselControl`, `CarouselItemGroup`,
`CarouselItem`, `CarouselPrevTrigger`, `CarouselNextTrigger`, `CarouselIndicatorGroup`,
`CarouselIndicator`, `CarouselIndicators`, `CarouselAutoplayTrigger`, `CarouselAutoplayIndicator`,
`CarouselProgressText`, `useCarousel`, and `useCarouselContext`.

`ref` and `asChild` are supported as separate native Ark Solid paths. Ark Solid does not forward a
`ref` through `asChild`, so their combination is intentionally unsupported; the component tests
cover ordinary ref forwarding and `asChild` composition independently.
# Carousel (Solid)

`Carousel` preserves the React component's compound anatomy, Ark paging behavior, callback details,
data hooks, generated indicators, and CSS variables.

`ref` and `asChild` are supported as separate native Ark Solid paths. Ark Solid does not forward a
`ref` through `asChild`, so their combination is intentionally unsupported; the component tests
cover ordinary ref forwarding and `asChild` composition independently.
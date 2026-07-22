export const aspectRatioCssProperties = [
  {
    name: '--moduix-aspect-ratio-radius' as const,
    defaultValue: 'var(--moduix-radius-md)',
    description: 'Controls the root border radius.',
  },
];

export const aspectRatioBasicCss = `
.aspect-ratio-demo {
  width: min(30rem, calc(100vw - var(--moduix-spacing-8)));
}

.aspect-ratio-demo__image {
  object-fit: cover;
}

.aspect-ratio-demo__figure {
  margin: 0;
}
`;

export const aspectRatioGridCss = `
.aspect-ratio-grid {
  display: grid;
  width: min(42rem, calc(100vw - var(--moduix-spacing-8)));
  gap: var(--moduix-spacing-4);
  align-items: start;
}

@media (min-width: 40rem) {
  .aspect-ratio-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.aspect-ratio-grid__card {
  overflow: hidden;
  --moduix-card-radius: var(--moduix-radius-lg);
}

.aspect-ratio-grid__media {
  --moduix-aspect-ratio-radius: 0;
}

.aspect-ratio-grid__image {
  object-fit: cover;
}

.aspect-ratio-grid__body {
  display: grid;
  gap: var(--moduix-spacing-2);
  padding: var(--moduix-spacing-5);
}

.aspect-ratio-grid__title {
  margin: 0;
  color: var(--moduix-color-foreground);
  font-size: var(--moduix-text-md);
  font-weight: var(--moduix-weight-semibold);
  line-height: var(--moduix-line-height-text-md);
}

.aspect-ratio-grid__description {
  margin: 0;
  color: var(--moduix-color-muted-foreground);
  font-size: var(--moduix-text-sm);
  line-height: var(--moduix-line-height-text-sm);
}
`;

export const aspectRatioEmbedCss = `
.aspect-ratio-demo {
  width: min(30rem, calc(100vw - var(--moduix-spacing-8)));
}

.aspect-ratio-demo__frame {
  border: 0;
}
`;

export const aspectRatioMigrationCss = `
.aspect-ratio-demo {
  width: min(30rem, calc(100vw - var(--moduix-spacing-8)));
  background: var(--moduix-color-muted);
}

.aspect-ratio-demo__fill-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;
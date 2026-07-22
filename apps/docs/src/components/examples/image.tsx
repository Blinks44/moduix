export const imageCssProperties = [
  {
    name: '--moduix-image-radius' as const,
    defaultValue: 'var(--moduix-radius-md)',
    description: 'Controls the image border radius.',
  },
];

export const imageBasicCss = `
.image-demo {
  width: min(32rem, calc(100vw - var(--moduix-spacing-8)));
}
`;

export const imageFullWidthCss = `
.image-full-width {
  width: min(46rem, calc(100vw - var(--moduix-spacing-8)));
}
`;

export const imagePictureCss = `
.image-picture {
  display: block;
  width: min(32rem, calc(100vw - var(--moduix-spacing-8)));
}
`;
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import type { ComponentProps } from 'solid-js';
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperHandles,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  useImageCropper,
} from '../src';
import landscape from './fixtures/landscape.svg';

test('renders the recommended CropArea anatomy with moduix hooks', async () => {
  let rootRef!: HTMLDivElement;
  let selectionRef!: HTMLDivElement;

  const { container } = render(() => (
    <ImageCropper ref={(element) => (rootRef = element)} aria-label="Landscape crop">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea ref={(element) => (selectionRef = element)} />
      </ImageCropperViewport>
    </ImageCropper>
  ));

  expect(rootRef).toBe(screen.getByRole('group', { name: 'Landscape crop' }));
  expect(rootRef!.getAttribute('data-slot')).toBe('image-cropper-root');
  expect(selectionRef!.getAttribute('data-slot')).toBe('image-cropper-selection');
  expect(selectionRef).toBe(screen.getByRole('slider', { hidden: true }));
  expect(selectionRef!.getAttribute('tabindex')).toBe('0');
  expect(container.querySelectorAll('[data-slot="image-cropper-grid"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
});

test('preserves Ark keyboard crop commands after the image is ready', async () => {
  render(() => (
    <ImageCropper aria-label="Landscape crop">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
  ));
  const selection = screen.getByRole('slider', { hidden: true });

  await expect
    .element(page.locator('[data-slot="image-cropper-image"]'))
    .toHaveAttribute('data-ready');

  const before = selection.getAttribute('aria-valuenow');
  await page.getByRole('slider').press('ArrowLeft');
  await expect.element(page.getByRole('slider')).not.toHaveAttribute('aria-valuenow', before!);
});

test('preserves fixed crop area semantics', async () => {
  const { container } = render(() => (
    <ImageCropper fixedCropArea aria-label="Avatar crop">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
  ));

  await expect
    .element(page.getByRole('group', { name: 'Avatar crop', exact: true }))
    .toHaveAttribute('data-fixed');
  await expect
    .element(page.getByRole('slider', { includeHidden: true, exact: true }))
    .not.toHaveAttribute('aria-disabled');
  await expect
    .element(page.getByRole('slider', { includeHidden: true, exact: true }))
    .toHaveAttribute('data-disabled');
  await expect
    .element(page.getByRole('slider', { includeHidden: true, exact: true }))
    .toHaveAttribute('tabindex', '0');
  await expect
    .element(page.locator('[data-slot="image-cropper-viewport"]'))
    .toHaveAttribute('data-disabled');
  expect(
    container.querySelectorAll('[data-slot="image-cropper-handle"][data-disabled]'),
  ).toHaveLength(ImageCropperHandles.length);
});

function ProviderImageCropper() {
  const imageCropper = useImageCropper({ aspectRatio: 16 / 9 });

  return (
    <ImageCropperRootProvider value={imageCropper} data-testid="image-cropper-provider">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropperRootProvider>
  );
}

test('supports RootProvider with the recommended CropArea anatomy', async () => {
  render(() => <ProviderImageCropper />);

  await expect
    .element(page.getByTestId('image-cropper-provider'))
    .toHaveAttribute('data-slot', 'image-cropper-root-provider');
});

test('does not forward unsupported CropArea composition props to Ark', async () => {
  const unsupportedProps = {
    asChild: () => <div />,
    children: <div />,
  } as unknown as ComponentProps<typeof ImageCropperCropArea>;

  const { container } = render(() => (
    <ImageCropper>
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea {...unsupportedProps} />
      </ImageCropperViewport>
    </ImageCropper>
  ));

  expect(container.querySelector('[data-slot="image-cropper-selection"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
});

test('does not forward refs through native Ark Solid asChild composition', async () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <ImageCropper
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
      aria-label="Landscape crop"
    >
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
  ));

  expect(rootRef).toBeUndefined();
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <ImageCropper class="gap-0" aria-label="Landscape crop">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
  ));

  const root = screen.getByRole('group', { name: 'Landscape crop' });
  expect([...root!.classList]).toEqual(expect.arrayContaining(['gap-0']));
  expect(['gap-3'].some((name) => root!.classList.contains(name))).toBe(false);
});

test('keeps component-owned visual utilities on their owning parts', async () => {
  const { container } = render(() => (
    <ImageCropper aria-label="Landscape crop">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
  ));

  const viewport = container.querySelector<HTMLElement>('[data-slot="image-cropper-viewport"]')!;
  const selection = container.querySelector<HTMLElement>('[data-slot="image-cropper-selection"]')!;
  const grids = container.querySelectorAll<HTMLElement>('[data-slot="image-cropper-grid"]');
  const handle = container.querySelector<HTMLElement>('[data-slot="image-cropper-handle"]')!;

  expect(getComputedStyle(viewport)).toMatchObject({ borderWidth: '1px', borderRadius: '10px' });
  expect(getComputedStyle(selection)).toMatchObject({ borderWidth: '2px', borderRadius: '8px' });
  expect(getComputedStyle(grids[0]!)).toMatchObject({
    pointerEvents: 'none',
    borderTopWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '0px',
    borderRightWidth: '0px',
  });
  expect(getComputedStyle(grids[1]!)).toMatchObject({
    pointerEvents: 'none',
    borderLeftWidth: '1px',
    borderRightWidth: '1px',
    borderTopWidth: '0px',
    borderBottomWidth: '0px',
  });
  expect(getComputedStyle(handle)).toMatchObject({
    width: '12px',
    height: '12px',
    borderWidth: '1px',
  });
  expect(viewport.classList.contains('bg-background')).toBe(true);
  expect(selection.classList.contains('border-primary')).toBe(true);
  expect(handle.classList.contains('bg-white/96')).toBe(true);
  expect(getComputedStyle(handle).backgroundColor).toContain('/ 0.96)');
});
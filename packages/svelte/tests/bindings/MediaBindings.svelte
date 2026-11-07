<script lang="ts">
  import {
    Carousel,
    CarouselItem,
    CarouselItemGroup,
    CarouselNextTrigger,
    CarouselProgressText,
  } from '@/components/carousel';
  import {
    Clipboard,
    ClipboardContext,
    ClipboardControl,
    ClipboardInput,
    ClipboardLabel,
  } from '@/components/clipboard';
  import {
    FileUpload,
    FileUploadClearTrigger,
    FileUploadItemGroup,
    FileUploadItems,
  } from '@/components/file-upload';
  import {
    ImageCropper,
    ImageCropperContext,
    ImageCropperCropArea,
    ImageCropperImage,
    ImageCropperViewport,
  } from '@/components/image-cropper';
  import {
    Marquee,
    MarqueeContent,
    MarqueeContext,
    MarqueeItem,
    MarqueeViewport,
  } from '@/components/marquee';
  import { QrCode, QrCodeContext, QrCodeFrame, QrCodePattern } from '@/components/qr-code';
  import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@/components/signature-pad';
  import landscape from '../fixtures/landscape.svg';

  const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });

  let zoom = $state(1);
  let rotation = $state(0);
  let flip = $state({ horizontal: false, vertical: false });
  let page = $state(0);
  let paused = $state(false);
  let qrValue = $state('https://ark-ui.com');
  let paths = $state(['M1,1 L2,2']);
  let acceptedFiles = $state([file]);
  let clipboardValue = $state('first');

  export const write = (
    key:
      | 'acceptedFiles'
      | 'clipboardValue'
      | 'flip'
      | 'page'
      | 'paths'
      | 'paused'
      | 'qrValue'
      | 'rotation'
      | 'zoom',
  ) => {
    if (key === 'zoom') zoom = 2;
    if (key === 'rotation') rotation = 90;
    if (key === 'flip') flip = { horizontal: true, vertical: false };
    if (key === 'page') page = 1;
    if (key === 'paused') paused = true;
    if (key === 'qrValue') qrValue = 'https://moduix.dev';
    if (key === 'paths') paths = ['M1,1 L2,2', 'M3,3 L4,4'];
    if (key === 'acceptedFiles') acceptedFiles = [];
    if (key === 'clipboardValue') clipboardValue = 'second';
  };
  export const read = () => ({
    acceptedFiles: acceptedFiles.map((item) => item.name),
    clipboardValue,
    flip: { ...flip },
    page,
    paths: [...paths],
    paused,
    qrValue,
    rotation,
    zoom,
  });
</script>

<ImageCropper bind:zoom bind:rotation bind:flip>
  <ImageCropperContext>
    {#snippet render(context)}
      <output data-testid="cropper-state">
        {context().zoom}|{context().rotation}|{context().flip.horizontal}
      </output>
      <button type="button" onclick={() => context().zoomBy(0.5)}>Zoom cropper</button>
      <button type="button" onclick={() => context().rotateBy(90)}>Rotate cropper</button>
      <button type="button" onclick={() => context().flipHorizontally()}>Flip cropper</button>
    {/snippet}
  </ImageCropperContext>
  <ImageCropperViewport>
    <ImageCropperImage src={landscape} />
    <ImageCropperCropArea />
  </ImageCropperViewport>
</ImageCropper>

<Carousel bind:page slideCount={3} aria-label="Bound carousel">
  <CarouselItemGroup>
    {#each [0, 1, 2] as index (index)}
      <CarouselItem {index}>Slide {index + 1}</CarouselItem>
    {/each}
  </CarouselItemGroup>
  <CarouselNextTrigger />
  <CarouselProgressText data-testid="carousel-progress" />
</Carousel>

<Marquee bind:paused aria-label="Bound marquee">
  <MarqueeViewport>
    <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
  </MarqueeViewport>
  <MarqueeContext>
    {#snippet render(context)}
      <button type="button" onclick={() => context().pause()}>Pause marquee</button>
    {/snippet}
  </MarqueeContext>
</Marquee>

<QrCode bind:value={qrValue}>
  <QrCodeFrame><QrCodePattern /></QrCodeFrame>
  <QrCodeContext>
    {#snippet render(context)}
      <output data-testid="qr-value">{context().value}</output>
      <button type="button" onclick={() => context().setValue('https://chakra-ui.com')}>
        Change QR value
      </button>
    {/snippet}
  </QrCodeContext>
</QrCode>

<SignaturePad
  bind:paths
  translations={{ clearTrigger: 'Clear bound signature', control: 'Bound signature area' }}
>
  <SignaturePadLabel>Bound signature</SignaturePadLabel>
  <SignaturePadCanvas />
</SignaturePad>

<FileUpload bind:acceptedFiles>
  <FileUploadClearTrigger>Clear bound files</FileUploadClearTrigger>
  <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
</FileUpload>

<Clipboard bind:value={clipboardValue}>
  <ClipboardLabel>Bound clipboard</ClipboardLabel>
  <ClipboardControl><ClipboardInput /></ClipboardControl>
  <ClipboardContext>
    {#snippet render(context)}
      <button type="button" onclick={() => context().setValue('typed')}>Change clipboard</button>
    {/snippet}
  </ClipboardContext>
</Clipboard>
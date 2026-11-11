<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Image, ImageSource } from '@/components/image';
  import styles from './Image.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Image',
    component: Image,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const mountainImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';
  const architectureImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72';
  const portraitImage = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330';
  const sunImage =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520"%3E%3Crect width="800" height="520" fill="%2387ceeb"/%3E%3Ccircle cx="400" cy="260" r="100" fill="%23ffd700"/%3E%3C/svg%3E';
</script>

<Story name="Basic" asChild>
  <Image
    src={mountainImage}
    alt="Mountain landscape"
    width={800}
    height={520}
    layout="constrained"
  />
</Story>

<Story name="Without Cdn" exportName="WithoutCdn" asChild>
  <Image
    src={sunImage}
    alt="Sun illustration without an image CDN"
    width={800}
    height={520}
    layout="constrained"
  />
</Story>

<Story name="Fixed" asChild>
  <Image
    src={portraitImage}
    alt="Team member in a sunlit workspace"
    layout="fixed"
    width={192}
    height={256}
  />
</Story>

<Story name="Priority" asChild>
  <Image
    src={mountainImage}
    alt="Mountain landscape"
    width={800}
    height={520}
    priority
    background="auto"
  />
</Story>

<Story name="Unstyled" asChild>
  <div class={styles.unstyled}>
    <Image
      src={architectureImage}
      alt="Sunlit modern office interior"
      width={800}
      height={520}
      unstyled
      class={styles.unstyledImage}
    />
  </div>
</Story>

<Story name="Full Width" exportName="FullWidth" asChild>
  <div class={styles.fullWidth}>
    <Image
      src={architectureImage}
      alt="Sunlit modern office interior"
      layout="fullWidth"
      height={360}
    />
  </div>
</Story>

<Story name="Art Direction" exportName="ArtDirection" asChild>
  <picture class={styles.picture}>
    <ImageSource
      media="(min-width: 48rem)"
      type="image/avif"
      src={architectureImage}
      width={800}
      height={520}
    />
    <ImageSource media="(min-width: 48rem)" src={architectureImage} width={800} height={520} />
    <Image src={portraitImage} alt="Team member in a sunlit workspace" width={800} height={520} />
  </picture>
</Story>
<script lang="ts">
  import {
    Lightbox,
    LightboxContent,
    LightboxImage,
    LightboxPositioner,
    LightboxTrigger,
  } from '@/components/lightbox';

  let {
    calls = [],
    cancel = false,
    defaultOpen = false,
    closeOnClick = true,
    withPrevent = false,
  }: {
    calls?: string[];
    cancel?: boolean;
    defaultOpen?: boolean;
    closeOnClick?: boolean;
    withPrevent?: boolean;
  } = $props();
</script>

<Lightbox portalled={false} {defaultOpen}>
  <LightboxTrigger>Open preview</LightboxTrigger>
  <LightboxPositioner>
    <LightboxContent aria-label="Image preview">
      <LightboxImage
        src="/full-size.jpg"
        alt="Mountain ridge"
        {closeOnClick}
        onclick={(event) => {
          calls.push('first');
          if (cancel || withPrevent) event.preventDefault();
        }}
      />
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>
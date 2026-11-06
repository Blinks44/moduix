<script lang="ts">
  import {
    Lightbox,
    LightboxCloseIcon,
    LightboxContent,
    LightboxPositioner,
    LightboxTitle,
  } from '@/components/lightbox';

  let {
    label,
    labelledby,
    custom = false,
  }: { label?: string; labelledby?: string; custom?: boolean } = $props();
</script>

<Lightbox defaultOpen portalled={false}>
  <LightboxPositioner>
    <LightboxContent>
      <LightboxTitle>Preview</LightboxTitle>
      {#if custom}
        <LightboxCloseIcon
          aria-label={label}
          aria-labelledby={labelledby}
          class="consumer-close"
          style="color: red"
          title="Dismiss preview"
          data-testid="close"
        >
          <span>Custom close</span>
        </LightboxCloseIcon>
      {:else}
        <LightboxCloseIcon
          aria-label={label}
          aria-labelledby={labelledby}
          class="consumer-close"
          style="color: red"
          title="Dismiss preview"
          data-testid="close"
        />
      {/if}
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>
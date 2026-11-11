<script lang="ts">
  import { Frame } from '@ark-ui/svelte/frame';

  const previewDocument = `<!doctype html>
<html>
  <head>
    <style>
      body { margin: 0; padding: 1.25rem; font-family: system-ui, sans-serif; }
    </style>
  </head>
  <body><main><h2>Release notes</h2></main></body>
</html>`;
</script>

<Frame
  sandbox="allow-same-origin"
  srcdoc={previewDocument}
  title="Release notes preview"
  style="
    display: block;
    inline-size: 100%;
    block-size: 10rem;
    border: 1px solid #d1d5db;
    border-radius: 0.75rem;
  "
/>
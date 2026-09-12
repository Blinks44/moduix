import { Frame } from '@ark-ui/solid';

const contentStyles = `
  :root { color-scheme: light; }
  body {
    margin: 0;
    color: #111827;
    font-family: system-ui, sans-serif;
  }
  article {
    display: grid;
    gap: 0.5rem;
    min-block-size: 8rem;
    align-content: center;
    padding: 1.25rem;
    background: #f9fafb;
  }
  h2, p { margin: 0; }
  h2 { font-size: 1.25rem; }
  p { color: #4b5563; }
`;

export default function FrameBasicDemo() {
  return (
    <Frame
      head={<style>{contentStyles}</style>}
      title="Release preview"
      style="display: block; inline-size: 100%; block-size: 10rem; border: 1px solid #d1d5db; border-radius: 0.75rem;"
    >
      <article aria-labelledby="release-title">
        <h2 id="release-title">Release 2.8.0</h2>
        <p>Ready for the final review.</p>
      </article>
    </Frame>
  );
}
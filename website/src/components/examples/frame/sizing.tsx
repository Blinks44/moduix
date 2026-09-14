import { Frame } from '@ark-ui/react';

const contentStyles = `
  body {
    margin: 0;
    color: #111827;
    font-family: system-ui, sans-serif;
  }
  main {
    display: grid;
    min-block-size: 12rem;
    gap: 0.5rem;
    align-content: center;
    padding: 1.25rem;
    background: #f9fafb;
  }
  h2, p { margin: 0; }
  p { color: #4b5563; }
`;

export default function FrameSizingDemo() {
  return (
    <Frame
      head={<style>{contentStyles}</style>}
      title="Resizable release notes"
      style={{
        display: 'block',
        inlineSize: '100%',
        blockSize: 'var(--height, 10rem)',
        border: '1px solid #d1d5db',
        borderRadius: '0.75rem',
      }}
    >
      <main aria-labelledby="notes-title">
        <h2 id="notes-title">Release notes</h2>
        <p>The iframe grows to match this content.</p>
      </main>
    </Frame>
  );
}
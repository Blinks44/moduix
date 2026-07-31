import { Button } from '@moduix/react/button';
import { Skeleton } from '@moduix/react/skeleton';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const profile = {
  name: 'Ada Lovelace',
  role: 'Analytical engine notes',
};

export default function LoadedSkeletonDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        display: 'grid',
        width: '100%',
        justifyItems: 'center',
        gap: 'var(--moduix-spacing-3)',
      }}
    >
      <Skeleton
        loading={loading}
        style={{
          display: 'grid',
          width: '100%',
          minHeight: '4.5rem',
          gap: 'var(--moduix-spacing-1)',
          padding: 'var(--moduix-spacing-4)',
          border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
        }}
      >
        <strong>{profile.name}</strong>
        <span
          style={{
            color: 'var(--moduix-color-muted-foreground)',
            fontSize: 'var(--moduix-text-sm)',
            lineHeight: 'var(--moduix-line-height-text-sm)',
          }}
        >
          {profile.role}
        </span>
      </Skeleton>
      <PreviewMeta>
        <output>Profile: {loading ? 'loading' : 'loaded'}</output>
        <Button size="sm" type="button" onClick={() => setLoading(!loading)}>
          {loading ? 'Show profile' : 'Show skeleton'}
        </Button>
      </PreviewMeta>
    </div>
  );
}
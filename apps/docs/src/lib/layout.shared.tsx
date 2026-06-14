import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { ModuixLogo } from '@/components/ModuixLogo';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <ModuixLogo
          width={36}
          height={27}
          style={{
            display: 'block',
            height: '1.2rem',
            width: 'auto',
            color: 'var(--color-fd-foreground)',
          }}
        />
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
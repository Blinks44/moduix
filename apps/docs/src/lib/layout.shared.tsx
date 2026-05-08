import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <img
          src="/moduix-logo.svg"
          alt="moduix"
          width={36}
          height={27}
          style={{
            display: 'block',
            height: '1.2rem',
            width: 'auto',
          }}
        />
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
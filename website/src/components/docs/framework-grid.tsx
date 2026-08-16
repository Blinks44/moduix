import { useI18n } from '@rspress/core/runtime';
import { Card, Cards } from '../mdx/Components';

type Framework = {
  name: string;
  descriptionKey:
    | 'frameworkAstroDescription'
    | 'frameworkNextDescription'
    | 'frameworkReactRouterDescription'
    | 'frameworkRsbuildDescription'
    | 'frameworkTanStackStartDescription'
    | 'frameworkViteDescription';
  href: string;
  logo: string;
};

const frameworks: readonly Framework[] = [
  {
    name: 'Astro',
    descriptionKey: 'frameworkAstroDescription',
    href: '/docs/installation/astro',
    logo: '/frameworks/astro.svg',
  },
  {
    name: 'Next.js',
    descriptionKey: 'frameworkNextDescription',
    href: '/docs/installation/nextjs',
    logo: '/frameworks/nextjs.svg',
  },
  {
    name: 'React Router',
    descriptionKey: 'frameworkReactRouterDescription',
    href: '/docs/installation/react-router',
    logo: '/frameworks/react-router.svg',
  },
  {
    name: 'Rsbuild',
    descriptionKey: 'frameworkRsbuildDescription',
    href: '/docs/installation/rsbuild',
    logo: '/frameworks/rsbuild.svg',
  },
  {
    name: 'TanStack Start',
    descriptionKey: 'frameworkTanStackStartDescription',
    href: '/docs/installation/tanstack-start',
    logo: '/frameworks/tanstack-start.svg',
  },
  {
    name: 'Vite',
    descriptionKey: 'frameworkViteDescription',
    href: '/docs/installation/vite',
    logo: '/frameworks/vite.svg',
  },
];

export function FrameworkGrid() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <Cards>
      {frameworks.map((framework) => (
        <Card
          key={framework.href}
          title={framework.name}
          description={t(framework.descriptionKey)}
          href={framework.href}
          icon={<img src={framework.logo} alt="" />}
        />
      ))}
    </Cards>
  );
}
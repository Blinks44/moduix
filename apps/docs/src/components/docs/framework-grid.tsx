import { Card, Cards } from '../mdx/Components';

type Framework = {
  name: string;
  description: string;
  href: string;
  logo: string;
};

const frameworks: readonly Framework[] = [
  {
    name: 'Astro',
    description: 'Interactive React islands in Astro.',
    href: '/docs/installation/astro',
    logo: '/frameworks/astro.svg',
  },
  {
    name: 'Next.js',
    description: 'App Router and React Server Components.',
    href: '/docs/installation/nextjs',
    logo: '/frameworks/nextjs.svg',
  },
  {
    name: 'React Router',
    description: 'Framework mode and data mode apps.',
    href: '/docs/installation/react-router',
    logo: '/frameworks/react-router.svg',
  },
  {
    name: 'Rsbuild',
    description: 'React apps powered by Rspack.',
    href: '/docs/installation/rsbuild',
    logo: '/frameworks/rsbuild.svg',
  },
  {
    name: 'TanStack Start',
    description: 'Full-stack React on Vite.',
    href: '/docs/installation/tanstack-start',
    logo: '/frameworks/tanstack-start.svg',
  },
  {
    name: 'Vite',
    description: 'Standard React apps and SPAs.',
    href: '/docs/installation/vite',
    logo: '/frameworks/vite.svg',
  },
];

export function FrameworkGrid() {
  return (
    <Cards>
      {frameworks.map((framework) => (
        <Card
          key={framework.href}
          title={framework.name}
          description={framework.description}
          href={framework.href}
          icon={<img src={framework.logo} alt="" />}
        />
      ))}
    </Cards>
  );
}
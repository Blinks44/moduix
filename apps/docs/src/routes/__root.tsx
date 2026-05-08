import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import * as React from 'react';
import appCss from '@/styles/app.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Moduix component library',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'moduix',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
      { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      { rel: 'manifest', href: '/favicon/site.webmanifest' },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html suppressHydrationWarning>
      <head>
        <title></title>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <Outlet />
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
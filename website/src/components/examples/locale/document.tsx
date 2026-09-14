import { LocaleProvider } from '@ark-ui/react/locale';
import type { ReactNode } from 'react';

export function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LocaleProvider locale="ar-EG">{children}</LocaleProvider>
      </body>
    </html>
  );
}
import { LocaleProvider } from '@ark-ui/solid/locale';
import type { ParentProps } from 'solid-js';

export function Document(props: ParentProps) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LocaleProvider locale="ar-EG">{props.children}</LocaleProvider>
      </body>
    </html>
  );
}
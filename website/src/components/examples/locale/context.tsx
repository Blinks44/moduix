import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { LocaleProvider, useLocaleContext } from '@moduix/react/locale';
import { Stack } from '@moduix/react/stack';

function LocaleDetails() {
  const { dir, locale } = useLocaleContext();

  return (
    <Card dir={dir} lang="ar">
      <Card.Header>
        <Card.Title>إعدادات الحساب</Card.Title>
        <Card.Description>
          {locale} · {dir}
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <span>تُستخدم اللغة والاتجاه نفسيهما في هذه المساحة.</span>
          <Button type="button">حفظ التغييرات</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default function LocaleContextDemo() {
  return (
    <LocaleProvider locale="ar-EG">
      <LocaleDetails />
    </LocaleProvider>
  );
}
import { LocaleProvider, useLocaleContext } from '@ark-ui/react/locale';

function LocaleDetails() {
  const { dir, locale } = useLocaleContext();

  return (
    <section aria-labelledby="locale-heading" dir={dir} lang="ar">
      <h2 id="locale-heading">إعدادات الحساب</h2>
      <p>
        {locale} · {dir}
      </p>
      <p>تُستخدم اللغة والاتجاه نفسيهما في هذه المساحة.</p>
      <button type="button">حفظ التغييرات</button>
    </section>
  );
}

export default function LocaleContextDemo() {
  return (
    <LocaleProvider locale="ar-EG">
      <LocaleDetails />
    </LocaleProvider>
  );
}
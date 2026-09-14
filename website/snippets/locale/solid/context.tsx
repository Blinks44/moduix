import { LocaleProvider, useLocaleContext } from '@ark-ui/solid/locale';

function LocaleDetails() {
  const locale = useLocaleContext();

  return (
    <section aria-labelledby="locale-heading" dir={locale().dir} lang="ar">
      <h2 id="locale-heading">إعدادات الحساب</h2>
      <p>
        {locale().locale} · {locale().dir}
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
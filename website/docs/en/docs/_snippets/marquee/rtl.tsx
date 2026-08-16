import { LocaleProvider } from '@moduix/react/locale';
import { Marquee } from '@moduix/react/marquee';

const partners = [
  { name: 'أطلس', mark: 'AT' },
  { name: 'بيكون', mark: 'BC' },
  { name: 'كومباس', mark: 'CP' },
  { name: 'دلتا', mark: 'DL' },
  { name: 'إيكو', mark: 'EC' },
  { name: 'فاوندري', mark: 'FD' },
];

export default function RtlMarqueeDemo() {
  return (
    <LocaleProvider locale="ar">
      <Marquee aria-label="شعارات الشركاء" className="marquee-root">
        <Marquee.Edge side="start" />
        <Marquee.Viewport>
          <Marquee.Content>
            {partners.map((item) => (
              <Marquee.Item key={item.mark} className="marquee-item">
                <span>{item.mark}</span>
                <span>{item.name}</span>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
        <Marquee.Edge side="end" />
      </Marquee>
    </LocaleProvider>
  );
}
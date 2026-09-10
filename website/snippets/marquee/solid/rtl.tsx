import { LocaleProvider } from '@moduix/solid/locale';
import { Marquee } from '@moduix/solid/marquee';
import styles from '@/components/examples/marquee/marquee-rtl.module.css';

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
      <Marquee aria-label="شعارات الشركاء" class={styles.root}>
        <Marquee.Edge side="start" />
        <Marquee.Viewport>
          <Marquee.Content>
            {partners.map((item) => (
              <Marquee.Item class={styles.item}>
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
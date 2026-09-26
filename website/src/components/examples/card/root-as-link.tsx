import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/react/card';
import styles from '@/components/examples/card/card-root-as-link.module.css';

const report = {
  href: '/reports/release-health',
  title: 'Release health',
  description: 'Summary for the current production rollout.',
  summary: '98.4% successful sessions',
};

export default function LinkedCardDemo() {
  return (
    <Card className={styles.root} asChild>
      <a href={report.href}>
        <CardHeader>
          <CardTitle>{report.title}</CardTitle>
          <CardDescription>{report.description}</CardDescription>
        </CardHeader>
        <CardBody>{report.summary}</CardBody>
      </a>
    </Card>
  );
}
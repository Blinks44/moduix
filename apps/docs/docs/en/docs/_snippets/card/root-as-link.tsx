import { Card } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const report = {
  href: '/reports/release-health',
  title: 'Release health',
  description: 'Summary for the current production rollout.',
  summary: '98.4% successful sessions',
};

export default function LinkedCardDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Card asChild>
        <a href={report.href}>
          <Card.Header>
            <Card.Title>{report.title}</Card.Title>
            <Card.Description>{report.description}</Card.Description>
          </Card.Header>
          <Card.Body>{report.summary}</Card.Body>
        </a>
      </Card>
    </PreviewLayout>
  );
}
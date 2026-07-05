//#region demo
import { Card } from '@moduix/react';

const report = {
  href: '/reports/release-health',
  title: 'Release health',
  description: 'Summary for the current production rollout.',
  summary: '98.4% successful sessions',
};

export function LinkedCardDemo() {
  return (
    <Card asChild>
      <a href={report.href}>
        <Card.Header>
          <Card.Title>{report.title}</Card.Title>
          <Card.Description>{report.description}</Card.Description>
        </Card.Header>
        <Card.Body>{report.summary}</Card.Body>
      </a>
    </Card>
  );
}
//#endregion
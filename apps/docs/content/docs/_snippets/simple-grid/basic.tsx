/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Card, SimpleGrid, Text } from '@moduix/react';
import styles from './simple-grid.module.css';

const plans = [
  {
    name: 'Starter',
    description: 'For personal projects and early prototypes.',
    price: 'Free',
  },
  {
    name: 'Team',
    description: 'Shared workflows for growing product teams.',
    price: '$24',
  },
  {
    name: 'Scale',
    description: 'Advanced controls for larger organizations.',
    price: '$64',
  },
  {
    name: 'Enterprise',
    description: 'Custom security, support, and deployment.',
    price: 'Custom',
  },
];

export function SimpleGridDemo() {
  return (
    <SimpleGrid
      minChildWidth="18rem"
      gap="var(--spacing-4)"
      className={`${styles.simpleGridDemoGrid} ${styles.simpleGridDemoCards}`}
    >
      {plans.map((plan) => (
        <Card key={plan.name} size="sm">
          <Card.Header>
            <Card.Title>{plan.name}</Card.Title>
            <Card.Description>{plan.description}</Card.Description>
          </Card.Header>
          <Card.Body>
            <Text size="xl" weight="semibold">
              {plan.price}
            </Text>
          </Card.Body>
        </Card>
      ))}
    </SimpleGrid>
  );
}

//#endregion
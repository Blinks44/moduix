//#region demo
import { Container, Text } from '@moduix/react';

const customContent = {
  label: 'Customized max width and gutters',
};

export function CustomStyledContainerDemo() {
  return (
    <Container className="customContainer">
      <Text weight="semibold">{customContent.label}</Text>
    </Container>
  );
}
//#endregion
import { EnvironmentProvider, useEnvironmentContext } from '@ark-ui/react/environment';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';
import { useEffect, useState } from 'react';

interface EnvironmentDetails {
  documentName: string;
  rootNode: string;
  windowHost: string;
}

function EnvironmentSummary() {
  const { getDocument, getRootNode, getWindow } = useEnvironmentContext();
  const [details, setDetails] = useState<EnvironmentDetails>({
    documentName: 'Detecting…',
    rootNode: 'Detecting…',
    windowHost: 'Detecting…',
  });

  useEffect(() => {
    const rootNode = getRootNode();
    const rootName =
      rootNode.nodeType === Node.DOCUMENT_NODE
        ? 'Document'
        : rootNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE
          ? 'Shadow root'
          : rootNode.nodeName;

    setDetails({
      rootNode: rootName,
      documentName: getDocument().title || 'Untitled document',
      windowHost: getWindow().location.hostname || 'Local preview',
    });
  }, [getDocument, getRootNode, getWindow]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Resolved environment</Card.Title>
        <Card.Description>Ark queries DOM APIs from this environment.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          <span>Root node: {details.rootNode}</span>
          <span>Document: {details.documentName}</span>
          <span>Window: {details.windowHost}</span>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default function EnvironmentBasicDemo() {
  return (
    <EnvironmentProvider>
      <EnvironmentSummary />
    </EnvironmentProvider>
  );
}
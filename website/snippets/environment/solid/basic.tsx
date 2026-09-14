import { EnvironmentProvider, useEnvironmentContext } from '@ark-ui/solid/environment';
import { Card } from '@moduix/solid/card';
import { Stack } from '@moduix/solid/stack';
import { createEffect, createSignal } from 'solid-js';

interface EnvironmentDetails {
  documentName: string;
  rootNode: string;
  windowHost: string;
}

function EnvironmentSummary() {
  const environment = useEnvironmentContext();
  const [details, setDetails] = createSignal<EnvironmentDetails>({
    documentName: 'Detecting…',
    rootNode: 'Detecting…',
    windowHost: 'Detecting…',
  });

  createEffect(() => {
    const { getDocument, getRootNode, getWindow } = environment();
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
  });

  return (
    <Card>
      <Card.Header>
        <Card.Title>Resolved environment</Card.Title>
        <Card.Description>Ark queries DOM APIs from this environment.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          <span>Root node: {details().rootNode}</span>
          <span>Document: {details().documentName}</span>
          <span>Window: {details().windowHost}</span>
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
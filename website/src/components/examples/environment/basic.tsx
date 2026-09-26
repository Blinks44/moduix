import { EnvironmentProvider, useEnvironmentContext } from '@ark-ui/react/environment';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/react/card';
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
      <CardHeader>
        <CardTitle>Resolved environment</CardTitle>
        <CardDescription>Ark queries DOM APIs from this environment.</CardDescription>
      </CardHeader>
      <CardBody>
        <Stack gap={2}>
          <span>Root node: {details.rootNode}</span>
          <span>Document: {details.documentName}</span>
          <span>Window: {details.windowHost}</span>
        </Stack>
      </CardBody>
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
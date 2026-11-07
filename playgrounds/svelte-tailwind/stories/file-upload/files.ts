export const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', { type: 'text/plain' }),
  new File(['{}'], 'package.json', { type: 'application/json' }),
  new File(
    [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" fill="#93c5fd"/><circle cx="120" cy="40" r="18" fill="#fcd34d"/><path d="M0 160 60 60 160 160" fill="#166534"/></svg>',
    ],
    'landscape.svg',
    { type: 'image/svg+xml' },
  ),
];

export const missingImageMimeTypeFile = new File([''], 'diagram.png');
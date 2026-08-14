import { Typeset } from '@moduix/react/typeset';

export default function TypesetScrollableTableDemo() {
  return (
    <Typeset>
      <Typeset.Scroll aria-label="Typeset settings comparison">
        <table style={{ minWidth: '36rem' }}>
          <thead>
            <tr>
              <th>Context</th>
              <th>Size</th>
              <th>Leading</th>
              <th>Flow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Documentation</td>
              <td>1.125rem</td>
              <td>1.9</td>
              <td>1.75em</td>
            </tr>
          </tbody>
        </table>
      </Typeset.Scroll>
    </Typeset>
  );
}
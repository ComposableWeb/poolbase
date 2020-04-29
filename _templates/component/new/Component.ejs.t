---
to: src/components/<%= name %>/<%= name %>.tsx
---
/** @jsx jsx */
import { jsx } from 'theme-ui';

export const <%= name %>: React.FC = (props: React.PropsWithChildren<{ }>) => (
  <div {...props} />
);
export default <%= name %>;

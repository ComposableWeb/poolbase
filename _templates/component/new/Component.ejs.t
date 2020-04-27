---
to: src/components/<%= name %>/<%= name %>.tsx
---
/** @jsx jsx */
import { jsx } from 'theme-ui';

export const <%= name %>: React.ReactElement = (props: React.PropsWithChildren<{ }>) => (
  <<%= name %> {...props} />
);
export default <%= name %>;

/** @jsx jsx */
import { jsx, Box } from 'theme-ui';

export const AppMain: React.FC = (props: React.PropsWithChildren<{}>) => (
  <Box {...props} as="main" sx={{ px: 4 }}>
    {props.children}
  </Box>
);
export default AppMain;

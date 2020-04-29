/** @jsx jsx */
import { jsx, Grid } from 'theme-ui';

export const AppLayout: React.FC = (props: React.PropsWithChildren<{}>) => (
  <Grid
    gap={0}
    columns={[0, '150px 1fr']}
    sx={{
      height: '100%',
    }}
    {...props}
  />
);
export default AppLayout;

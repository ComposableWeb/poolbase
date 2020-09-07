/** @jsx jsx */
import { jsx, Box, BoxProps } from 'theme-ui';

export const AppBar: React.FC<BoxProps> = (props: React.PropsWithChildren<BoxProps>) => (
  <Box
    {...props}
    sx={{
      bg: 'backgroundInverted',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  />
);
export default AppBar;

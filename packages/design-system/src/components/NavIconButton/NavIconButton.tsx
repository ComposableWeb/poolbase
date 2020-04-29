/** @jsx jsx */
import { jsx, IconButton, IconButtonProps } from 'theme-ui';

export const NavIconButton: React.FC<IconButtonProps> = (props: React.PropsWithChildren<IconButtonProps>) => (
  <IconButton
    {...props}
    sx={{
      color: 'textInverted',
      width: 10,
      height: 10,
      display: 'flex',
      my: 1,
    }}
  />
);
export default NavIconButton;

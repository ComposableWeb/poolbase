/** @jsx jsx */
import { jsx, Box, Styled } from 'theme-ui';

import { PageData } from '../../../../poolbase-app/src/app/interfaces';

export const ListItem: React.FC<{ data: PageData }> = ({
  data,
  ...rest
}: React.PropsWithChildren<{ data: PageData }>) => (
  <Box {...rest}>
    <Styled.h3>{!data.metaTitle ? data.url : data.metaTitle}</Styled.h3>
  </Box>
);

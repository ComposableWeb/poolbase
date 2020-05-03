/** @jsx jsx */
import { jsx, Box } from 'theme-ui';

export const Form: React.FC = (props: React.PropsWithChildren<{}>) => {
  return <Box as="form" {...props} />;
};
export default Form;

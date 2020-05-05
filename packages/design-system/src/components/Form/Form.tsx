/** @jsx jsx */
import { jsx } from 'theme-ui';

export const Form: React.FC<React.ComponentPropsWithRef<'form'>> = (
  props: React.PropsWithChildren<React.ComponentPropsWithRef<'form'>>
) => {
  return <form {...props} sx={{ variant: 'prestyled.forms.form' }} />;
};
export default Form;

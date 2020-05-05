/** @jsx jsx */
import { jsx, Button } from 'theme-ui';
import { FormStateProxy } from 'react-hook-form';

export const SubmitButton: React.FC<FormStateProxy> = ({
  children,
  isSubmitting,
}: React.PropsWithChildren<FormStateProxy>) => <Button disabled={isSubmitting}>{children}</Button>;
export default SubmitButton;

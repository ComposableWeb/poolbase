/** @jsx jsx */
import { jsx, Button } from 'theme-ui';
import { FormStateProxy } from 'react-hook-form';
import UseAnimations from 'react-useanimations';

export const SubmitButton: React.FC<FormStateProxy> = ({
  children,
  isSubmitting,
}: React.PropsWithChildren<FormStateProxy>) => (
  <Button disabled={isSubmitting}>
    {isSubmitting && (
      <UseAnimations
        animationKey="activity"
        size={20}
        style={{ display: 'inline-block', lineHeight: '1', marginRight: '0.3em', verticalAlign: 'middle' }}
      />
    )}
    {children}
  </Button>
);
export default SubmitButton;

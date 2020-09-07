/** @jsx jsx */
import { jsx, Button } from 'theme-ui';

import UseAnimations from 'react-useanimations';

export type SubmitButtonProps = React.PropsWithChildren<{ submitting: boolean }>;
export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, submitting }: SubmitButtonProps) => (
  <Button disabled={submitting}>
    {submitting && (
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

/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ReactNode, PropsWithoutRef } from 'react';
import { Form as FinalForm, FormProps as FinalFormProps } from 'react-final-form';
import { Form as StyledForm, SubmitButton } from '@poolbase/design-system';
import * as z from 'zod';
export { FORM_ERROR } from 'final-form';

type FormProps<FormValues> = {
  /** All your form fields */
  children: ReactNode;
  /** Text to display in the submit button */
  submitText: string;
  onSubmit: FinalFormProps<FormValues>['onSubmit'];
  initialValues?: FinalFormProps<FormValues>['initialValues'];
  schema?: z.ZodType<any, any>;
} & Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'>;

export function Form<FormValues extends Record<string, unknown>>({
  children,
  submitText,
  schema,
  initialValues ={},
  onSubmit,
  ...props
}: FormProps<FormValues>) {
  return (
    <FinalForm<FormValues>
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return;
        try {
          schema.parse(values);
        } catch (error) {
          return error.formErrors.fieldErrors;
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <StyledForm onSubmit={handleSubmit} {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && (
            <div role="alert" style={{ color: 'red' }}>
              {submitError}
            </div>
          )}

          <SubmitButton submitting={submitting}>
            {submitText}
          </SubmitButton>
        </StyledForm>
      )}
    />
  );
}

export default Form;

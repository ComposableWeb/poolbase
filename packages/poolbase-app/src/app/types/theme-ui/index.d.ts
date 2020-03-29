import * as React from 'react';
import { IntrinsicSxElements, SxProps, BoxProps, ResponsiveValue } from 'theme-ui';

declare module 'theme-ui' {
  type SxComponent<T extends SxProps = IntrinsicSxElements['div']> = React.ComponentElement<
    T & { as?: React.ElementType }
  >;
  const Button: SxComponent;
  const Box: SxComponent;
  interface IntrinsicSxElements {
    span: JSX.IntrinsicElements['span'] & SxProps;
  }
  export interface GridProps extends BoxProps {
    /**
     * Minimum width of child elements
     */
    width?: ResponsiveValue<string | number>;
    /**
     * 	Number of columns to use for the layout (cannot be used in conjunction with the width prop)
     */
    columns?: ResponsiveValue<string | number>;
    /**
     * Space between child elements
     */
    gap?: ResponsiveValue<string | number>;
  }
  export const Grid: ForwardRef<HTMLDivElement, GridProps>;
}

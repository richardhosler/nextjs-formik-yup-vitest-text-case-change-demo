import { LabelHTMLAttributes, ReactNode, forwardRef } from "react";

interface ILabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, ILabelProps>(
  ({ children, ...props }, ref) => (
    <label ref={ref} {...props}>
      {children}
    </label>
  )
);

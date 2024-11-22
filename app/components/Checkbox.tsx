import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

import { Label } from "./Label";

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  ({ label, ...props }, ref): ReactNode => (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        ref={ref}
        {...props}
        className={`form-checkbox h-4 w-4 text-purple-500 ${props.className}`}
        name={props.name}
        id={props.name}
      />
      <Label htmlFor={props.name}>{label}</Label>
    </div>
  )
);

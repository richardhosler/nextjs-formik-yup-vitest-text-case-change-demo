import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

import { Label } from "./Label";

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  ({ label, ...props }, ref): ReactNode => (
    <div className="flex flex-col">
      <Label htmlFor={props.name}>{label}</Label>
      <input
        type="text"
        ref={ref}
        name={props.name}
        {...props}
        className={`block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 ${props.className || ""}`}
      />
    </div>
  )
);

import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(
  ({ ...props }, ref): ReactNode => (
    <button
      ref={ref}
      type="button"
      {...props}
      className={`flex-grow py-2 px-4 text-xl text-white bg-purple-400 rounded-lg hover:bg-purple-500 transition-all ${props.className}`}
    />
  )
);

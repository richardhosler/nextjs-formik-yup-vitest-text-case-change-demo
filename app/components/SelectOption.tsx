"use client";

import { forwardRef, ForwardedRef, JSX, HTMLAttributes } from "react";

interface ISelectOptionProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  isHighlighted?: boolean;
  onOptionSelect: (index: string) => void;
}

export const SelectOption = forwardRef(
  (
    {
      value,
      isHighlighted = false,
      onOptionSelect: handleOptionSelect,
      ...props
    }: ISelectOptionProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => (
    <div
      role="option"
      aria-selected={isHighlighted}
      tabIndex={-1}
      ref={ref}
      onClick={() => {
        handleOptionSelect(value);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handleOptionSelect(value);
        }
      }}
      {...props}
      className={`cursor-pointer relative z-10 ${props.className}`}
    >
      {value}
    </div>
  )
);


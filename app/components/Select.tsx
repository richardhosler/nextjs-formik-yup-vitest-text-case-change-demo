"use client";

import {
  JSX,
  useRef,
  useState,
  KeyboardEvent,
  HTMLAttributes,
  FocusEvent,
} from "react";

import { Label } from "./Label";
import { SelectOption } from "./SelectOption";

interface ISelectProps extends HTMLAttributes<HTMLInputElement> {
  options: string[];
  value: string;
  label: string;
  onSelectOption: (value: string) => void;
}

export function Select({
  options,
  value,
  label,
  onSelectOption,
  ...props
}: ISelectProps): JSX.Element {
  const [showOptions, setShowOptions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
    if (!containerRef.current?.contains(event.relatedTarget)) {
      setShowOptions(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (showOptions && focusedIndex >= 0) {
        const selectedValue = options[focusedIndex];
        onSelectOption(selectedValue);
        setShowOptions(false);
        setFocusedIndex(-1);
      } else {
        setShowOptions(!showOptions);
        if (!showOptions) {
          setFocusedIndex(0);
        }
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!showOptions) {
        setShowOptions(true);
        setFocusedIndex(0);
        scrollOptionIntoView(0);
      } else {
        const newIndex =
          focusedIndex < options.length - 1 ? focusedIndex + 1 : focusedIndex;
        setFocusedIndex(newIndex);
        scrollOptionIntoView(newIndex);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (showOptions) {
        const newIndex = focusedIndex > 0 ? focusedIndex - 1 : focusedIndex;
        setFocusedIndex(newIndex);
        scrollOptionIntoView(newIndex);
      }
    } else if (event.key === "Escape") {
      setShowOptions(false);
      setFocusedIndex(-1);
    }
  };

  const handleOptionSelect = (selectedValue: string): void => {
    onSelectOption(selectedValue);
    setShowOptions(false);
    setFocusedIndex(-1);
  };

  const optionsContainerRef = useRef<HTMLDivElement>(null);

  const scrollOptionIntoView = (i: number): void => {
    if (!optionsContainerRef.current) {
      return;
    }

    const optionElements = optionsContainerRef.current.children;
    if (i >= 0 && i < optionElements.length) {
      const optionElement = optionElements[i] as HTMLElement;
      const containerTop = optionsContainerRef.current.scrollTop;
      const containerBottom =
        containerTop + optionsContainerRef.current.clientHeight;
      const elementTop = optionElement.offsetTop;
      const elementBottom = elementTop + optionElement.offsetHeight;

      if (elementTop < containerTop) {
        optionsContainerRef.current.scrollTop = elementTop;
      } else if (elementBottom > containerBottom) {
        optionsContainerRef.current.scrollTop =
          elementBottom - optionsContainerRef.current.clientHeight;
      }
    }
  };

  return (
    <div className="flex flex-col" ref={containerRef} onBlur={handleBlur}>
      <Label htmlFor={props.id}>{label}</Label>
      <input
        ref={inputRef}
        value={value}
        role="listbox"
        tabIndex={0}
        name={props.id}
        onClick={() => setShowOptions(!showOptions)}
        onKeyDown={handleKeyDown}
        className="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 z-20"
        readOnly
      />
      <div className="relative">
        <div
          ref={optionsContainerRef}
          className={`${showOptions ? "absolute" : "hidden"} w-full rounded-lg max-h-48 overflow-y-scroll z-10 shadow-md top-1.5 border-purple-500 bg-purple-200`}
          tabIndex={-1}
        >
          {options.map((option, j) => (
            <SelectOption
              key={`option-${option}`}
              value={option}
              className={`py-2 px-4 hover:bg-purple-500 cursor-pointer rounded-lg ${
                focusedIndex === j ? "bg-purple-500" : ""
              }`}
              onOptionSelect={() => {
                handleOptionSelect(option);
              }}
              onMouseEnter={() => setFocusedIndex(j)}
              isHighlighted={focusedIndex === j}
              tabIndex={-1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

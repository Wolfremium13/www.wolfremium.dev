import React, { useRef, useState } from "react"
import {GiMicroscopeLens} from "react-icons/gi";

interface Props {
  id: string
  label: string
  value?: boolean
  description?: string
  activeText?: string
  inactiveText?: string
  onChange: (value: boolean | undefined) => void
  disabled?: boolean
  required?: boolean
}

export const SingleOptionInput: React.FC<Props> = ({
  id,
  label,
  value: defaultValue,
  description,
  activeText,
  inactiveText,
  onChange,
  disabled = false,
  required = false,
}) => {
  const [value, setValue] = useState(defaultValue)
  const [isFocused, setIsFocused] = useState(false)
  const ref = useRef<HTMLDivElement>()

  const concatClasses = (...classes: string[]) => classes.join(" ")

  const handleClick = (isChecked: boolean) => {
    if (disabled) return
    setIsFocused(true)
    setValue(isChecked)
    onChange(isChecked)
  }

  const handleClickOutside = () => {
    setIsFocused(false)
  }

  return (
    <div
      className={concatClasses(
        "flex flex-col gap-1 relative w-full",
        isFocused ? "text-primary" : "",
      )}
      ref={ref as React.RefObject<HTMLDivElement>}
      onClick={handleClickOutside}
    >
      <label
        htmlFor={id}
        className="text-sm cursor-pointer flex flex-row gap-1 items-center
                   transition-colors duration-300 ease-in-out"
      >
        {label}
        {required && <span className="text-alert-dark">*</span>}
      </label>
      <div
          className="rounded border border-darkGreen flex w-fit min-w-20 relative overflow-hidden text-neutral-mid-light">
        <span
          className={concatClasses(
            "z-10 w-1/2 text-center py-1 px-4",
            "transition-colors duration-300 ease-in-out",
            value === true && !disabled ? "text-neutral-light bg-secondary-light" : "",
            (value === false || value === undefined) && !disabled ? "hover:bg-lightGreen cursor-pointer" : "",
            disabled ? "cursor-not-allowed" : "",
          )}
          onClick={() => handleClick(true)}
        >
          {activeText ?? "Sí"}
        </span>
        <span
          className={concatClasses(
            "z-10 w-1/2 text-center py-1 px-4",
            "transition-colors duration-300 ease-in-out",
            (value === true || value === undefined) && !disabled ? "hover:bg-secondary cursor-pointer" : "",
            value === false && !disabled ? "text-neutral-light bg-secondary-light" : "",
            disabled ? "cursor-not-allowed" : "",
          )}
          onClick={() => handleClick(false)}
        >
          {inactiveText ?? "No"}
        </span>
        <div className={concatClasses(
          "h-full w-1/2 absolute transition-all duration-300 ease-in-out",
          value === true ? "left-0" : "",
          value === false ? "left-1/2" : "",
          value === undefined ? "hidden" : "",
          disabled ? "bg-primary-dark bg-opacity-10" : "bg-primary",
        )}></div>
      </div>
      {description && (
        <span className="text-xs text-primary-light text-opacity-75 py-1 flex items-center gap-2">
        <div className="w-4">
          <GiMicroscopeLens className="w-4 h-4"/>
        </div>
        <p>{description}</p>
      </span>
      )}
    </div>
  )
}
import React, { useEffect, useMemo, useRef, useState } from "react"
import {GiMicroscopeLens} from "react-icons/gi";

interface Option {
  value: string
  filterableTexts: string[]
  label: string
  child: React.ReactNode
}

interface Props {
  id: string
  label: string
  options: Option[]
  placeholder?: string
  values?: string[]
  description?: string
  onChange?: (value: string[]) => void
  disabled?: boolean
  required?: boolean
}

export const MultipleOptionInput: React.FC<Props> = ({
  id,
  label,
  options,
  description,
  placeholder = "",
  values: defaultValues = [],
  onChange = () => {},
  disabled = false,
  required = false,
}) => {
  const [values, setValues] = useState<string[]>(defaultValues)
  const [filterValue, setFilterValue] = useState<string>("")
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
  const [isFocussed, setIsFocussed] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const filterInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (values.length > 0) {
      setFilteredOptions(options.filter(option => values.length > 0 && !values.some(value => value === option.value)))
    }
  }, [])

  const printableValues = useMemo(() => options.filter((option) => values.some((value) => value === option.value)), [values])

  const concatClasses = (...classes: string[]) => classes.join(" ")

  const handleFilter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const selectedOption = filteredOptions.find(option => option.filterableTexts.some(text => text.toLowerCase().includes(filterValue.toLowerCase())))

      if (selectedOption) {
        handleSelect(selectedOption)
      }
    } else {
      const filter = e.currentTarget.value
      const availableOptions = options.filter(option => !values.some(value => value === option.value))
      const filteredOptions = availableOptions.filter(option =>
        option.filterableTexts.some(text => text.toLowerCase().includes(filter.toLowerCase()))
      )

      setFilteredOptions(filteredOptions)
    }
  }

  const handleChange = (selectedValues: string[]) => {
    if (disabled) return
    const availableOptions = options.filter(option => !selectedValues.some(value => value === option.value))

    setValues(selectedValues)
    onChange(selectedValues)
    setFilteredOptions(availableOptions)
    setFilterValue("")
    filterInputRef.current?.focus()
  }

  const handleSelect = (option: Option) => {
    const selectedValues: string[] = [...values, option.value]

    handleChange(selectedValues)
  }

  const handleDeselect = (option: Option) => {
    const selectedValues: string[] = values.filter(value => value !== option.value)

    handleChange(selectedValues)
  }

  const handleFocus = () => {
    setIsFocussed(true)
  }

  const handleBlur = (e: React.FocusEvent) => {
    if (
      containerRef.current &&
      !containerRef.current?.contains(e.relatedTarget as Node)
    ) {
      setIsFocussed(false)
    }
  }

  return (
    <div className="flex flex-col gap-1 relative w-full text-neutral-dark" ref={containerRef}>
      <label
        htmlFor={id}
        className={concatClasses(
          "text-sm cursor-pointer flex flex-row gap-1 items-center",
          "transition-colors duration-300 ease-in-out",
          isFocussed ? "text-primary" : "text-neutral-dark"
        )}
      >
        {label}
        {required && <span className="text-alert-dark">*</span>}
      </label>
      <div
        className={concatClasses(
          "w-full rounded overflow-hidden",
          "border border-neutral-mid-light focus-within:border-primary",
          isFocussed ? "rounded-b-none" : "rounded",
          disabled ? "bg-neutral bg-opacity-10 text-neutral cursor-not-allowed" : "bg-neutral-light"
        )}
      >
        {printableValues.length > 0 && (
          <ul className="flex flex-row gap-1 flex-wrap w-full p-1">
            {printableValues.map((value, index) => (
              <li
                key={index}
                className={concatClasses(
                  "inline-block duration-300 ease-in-out",
                  disabled ? "cursor-not-allowed" : "hover:opacity-50 transition-opacity  cursor-pointer"
                )}
                onClick={() => handleDeselect(value)}
              >
                {value.child}
              </li>
            ))}
          </ul>
        )}
        {!disabled && (
          <input
            ref={filterInputRef}
            type="text"
            id={id}
            placeholder={placeholder}
            className="flex-1 w-full px-3 py-2 focus:outline-none"
            value={filterValue}
            onChange={(e) => setFilterValue(e.currentTarget.value)}
            onKeyUp={handleFilter}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
      </div>
      {filteredOptions.length > 0 && isFocussed && (
        <ul
          className="absolute w-full flex flex-col gap-1 p-1 top-full -mt-[1px]
                     bg-neutral-light rounded-b overflow-y-auto max-h-28
                     border border-primary z-20"
          tabIndex={-1}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className="flex gap-1 cursor-pointer
                           hover:bg-neutral hover:bg-opacity-5
                           transition-colors duration-300 ease-in-out"
              onClick={() => handleSelect(option)}
            >
              {option.child}
            </li>
          ))}
        </ul>
      )}
      {description && (
        <span className="text-xs text-neutral text-opacity-75 py-1 flex items-center gap-2">
          <div className="w-4">
            <GiMicroscopeLens className="w-4 h-4"/>
          </div>
          <p>{description}</p>
        </span>
      )}
    </div>
  )
}
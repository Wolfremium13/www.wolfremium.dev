import React, {useMemo, useState} from "react"
import {InputValidations} from "@/app/shared/InputValidation";
import {GiCogLock, GiD4} from "react-icons/gi";

interface Props {
    id: string
    label: string
    value?: Date
    placeholder?: string
    description?: string
    onChange?: (value: Date | undefined, formattedValue: string | undefined) => void
    withTime?: boolean
    disabled?: boolean
    required?: boolean
    validations?: InputValidations
}

export const DateInput: React.FC<Props>  = ({
  id,
  label,
  value: defaultValue,
  placeholder,
  description,
  onChange = () => {},
  withTime = false,
  disabled = false,
  required = false,
  validations: defaultValidations = InputValidations.create(),
}) => {
  const [value, setValue] = useState(defaultValue)
  const [hasChanged, setHasChanged] = useState(Boolean(defaultValue) && !disabled)
  const validations = useMemo(() => required
      ? defaultValidations.includeRequired()
      : defaultValidations, [required, defaultValidations])
  const formatDate = (date: Date): string => {
    if (!date) return ""
    if (isNaN(date.getTime())) return ""

        if (withTime) {
            return date.toISOString().split("T").join(" ").split(".")[0]
        }

    return date.toISOString().split("T")[0]
  }
  const hasErrors = useMemo(() => value && !validations.validate(formatDate(value)), [value])
  const invalidMessages = useMemo(() => value ? validations.getInvalidMessages(formatDate(value)) : [], [value])

    const concatClasses = (...classes: string[]) => classes.join(" ")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = new Date(event.target.value)
        const isValid = validations.validate(formatDate(value))

        setHasChanged(true)
        setValue(value)
        onChange(isValid ? value : undefined, formatDate(value))
    }

    return (
        <div>
            <label
                htmlFor={id}
                className="text-sm cursor-pointer flex flex-row gap-1 items-center
                   transition-colors duration-300 ease-in-out text-secondary-dark"
            >
                {label}
                {required && <span className="text-alert-dark">*</span>}
            </label>
            <input
                className={concatClasses(
                    "w-full px-3 py-2 border border-darkGreen bg-primary-dark text-neutral-light",
                    "disabled:bg-neutral disabled:bg-opacity-10 disabled:text-neutral disabled:cursor-not-allowed",
                    "focus:outline-none focus:border-primary placeholder:text-neutral placeholder:text-opacity-50",
                    "transition-colors duration-300 ease-in-out",
                    hasErrors && hasChanged ? "rounded-t" : "rounded",
                )}
                type={withTime ? "datetime-local" : "date"}
                id={id}
                name={id}
                value={value ? formatDate(value) : ""}
                placeholder={placeholder}
                onChange={handleChange}
                disabled={disabled}
                required={required}
            />
            {hasErrors && hasChanged && (
                <div className="relative w-full h-0 -mt-1">
          <span className="text-xs text-alert-dark border-alert absolute left-0 right-0 py-1 px-3
                           bg-alert-light rounded-b flex items-center gap-2 z-20">
            <div className="w-4">
              <GiD4 className="w-4 h-4"/>
            </div>
            <ul>
              {invalidMessages.map((invalidMessage, index) => (
                  <li key={index}>{invalidMessage}</li>
              ))}
            </ul>
          </span>
                </div>
            )}
            {description && (
                <span className="text-xs text-lightGreen text-opacity-75 py-1 flex items-center gap-2">
          <div className="w-4">
            <GiCogLock className="w-4 h-4"/>
          </div>
          <p>{description}</p>
        </span>
            )}
        </div>
    )
}
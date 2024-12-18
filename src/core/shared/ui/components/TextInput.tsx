import React, {useMemo, useState} from "react"
import {GiMicroscopeLens, GiMoebiusTriangle} from "react-icons/gi";
import {InputValidations} from "@/core/shared/ui/InputValidation";

type Size = "normal" | "medium" | "big";

export interface TextInputProps {
    id: string
    label: string
    value?: string
    placeholder?: string
    description?: string
    onChange: (value: string | undefined) => void
    disabled?: boolean
    required?: boolean
    validations?: InputValidations
    size?: Size
    showCounter?: boolean
}

export const TextInput: React.FC<TextInputProps> = (
    {
        id,
        label,
        value: defaultValue = "",
        placeholder,
        description,
        onChange,
        disabled = false,
        required = false,
        validations: defaultValidations = InputValidations.create(),
        size = "normal",
        showCounter = false
    }) => {
    const [value, setValue] = useState<string>(defaultValue)
    const [hasChanged, setHasChanged] = useState(Boolean(defaultValue.length) && !disabled)
    const validations = useMemo(() => required
        ? defaultValidations.includeRequired()
        : defaultValidations, [required, defaultValidations])
    const hasErrors = useMemo(() => !validations.validate(value), [value])
    const invalidMessages = useMemo(() => validations.getInvalidMessages(value), [value])

    const concatClasses = (...classes: string[]) => classes.join(" ")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value
        const isValid = validations.validate(value)

        setHasChanged(true)
        setValue(value)
        onChange(isValid ? value : undefined)
    }

    return (
        <div className="flex flex-col gap-1 text-secondary-dark focus-within:text-neutral-light relative w-full">
            <label
                htmlFor={id}
                className="text-sm cursor-pointer flex flex-row gap-1 items-center
                   transition-colors duration-300 ease-in-out"
            >
                {label}
                {required && <span className="text-alert-dark">*</span>}
            </label>
            {size === "normal" && (
                <input
                    className={concatClasses(
                        "w-full px-3 py-2 border border-darkGreen text-neutral-light",
                        "bg-primary-dark",
                        "disabled:bg-neutral disabled:bg-opacity-10 disabled:text-neutral disabled:cursor-not-allowed",
                        "focus:outline-none focus:border-primary-light placeholder:text-neutral placeholder:text-opacity-80",
                        "transition-colors duration-300 ease-in-out",
                        (hasErrors && hasChanged) || showCounter ? "rounded-t" : "rounded",
                    )}
                    type="text"
                    id={id}
                    name={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                />
            )}
            {(size === "medium" || size === "big") && (
                <textarea
                    className={concatClasses(
                        "w-full px-3 py-2 border border-darkGreen text-neutral-light resize-none bg-primary-dark",
                        "disabled:bg-neutral disabled:bg-opacity-10 disabled:text-neutral disabled:cursor-not-allowed",
                        "focus:outline-none focus:border-primary-light placeholder:text-neutral placeholder:text-opacity-80",
                        "transition-colors duration-300 ease-in-out",
                        (hasErrors && hasChanged) || showCounter ? "rounded-t" : "rounded",
                        size === "big" ? "h-52" : "h-40",
                    )}
                    id={id}
                    name={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                />
            )}
            {hasErrors && hasChanged && (
                <div className="relative w-full h-0 -mt-1">
          <span className="text-xs text-alert-dark border-alert absolute left-0 right-0 py-1 px-3
                           bg-alert-light rounded-b flex items-center gap-2 z-20">
            <div className="w-4">
              <GiMoebiusTriangle className="w-4 h-4"/>
            </div>
            <ul>
              {invalidMessages.map((invalidMessage, index) => (
                  <li key={index}>{invalidMessage}</li>
              ))}
            </ul>
          </span>
                </div>
            )}
            {showCounter && (
                <span
                    className="-mt-[5px] text-xs border border-t-0 rounded-b border-darkGreen text-neutral-light py-1 px-2 flex items-center gap-2">
          <p>
            Conteo de letras: {value.length}
              {validations.getMaxCharacters() && `/${validations.getMaxCharacters()}`}
          </p>
        </span>
            )}
            {description && (
                <span className="text-xs text-primary-light text-opacity-75 py-1 flex items-center gap-2">
          <div className="w-4"><GiMicroscopeLens className="w-4 h-4"/></div>
          <p>{description}</p>
        </span>
            )}
        </div>
    )
}
import React, {PropsWithChildren} from "react"

type ButtonColor = "primary" | "secondary" | "neutral";

interface Props extends PropsWithChildren {
    color: ButtonColor
    onClick?: () => void
    disabled?: boolean
}

export const Button = (
    {
        color,
        onClick = () => {
        },
        disabled = false,
        children
    }: Props) => {
    const colorDictionary: Record<ButtonColor, string> = {
        "primary": "bg-primary-light hover:bg-secondary text-primary-dark",
        "secondary": "bg-secondary hover:bg-secondary-dark text-neutral-light",
        "neutral": "bg-neutral hover:bg-secondary-light text-neutral-light",
    }

    const concatClasses = (...classes: string[]) => classes.join(" ")

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={concatClasses(
                "px-4 py-2 rounded shadow-md cursor-pointer",
                colorDictionary[color],
                "disabled:bg-neutral-dark disabled:bg-opacity-30 disabled:cursor-not-allowed",
                "transition-colors duration-300 ease-in-out",
            )}
        >
            {children}
        </button>
    )
}
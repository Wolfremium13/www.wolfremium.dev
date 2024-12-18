import React, {PropsWithChildren} from "react"

interface Props extends PropsWithChildren {
    onClick?: () => void
    direction?: "vertical" | "horizontal"
}

export const Card = ({onClick, direction = "vertical", children}: Props) => {
    const concatClasses = (...classes: string[]) => classes.join(" ")

    return (
        <div
            className={concatClasses(
                "border border-primary-light p-4 rounded shadow-md bg-neutral-dark",
                "flex overflow-hidden gap-4 transition-colors duration-300 ease-in-out",
                direction === "vertical" ? "flex-col" : "flex-row",
                onClick !== undefined ? "cursor-pointer hover:bg-secondary-light hover:bg-opacity-5" : ""
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
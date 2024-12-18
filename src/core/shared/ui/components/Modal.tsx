import {PropsWithChildren} from "react"

type Size = "small" | "large";

interface Props extends PropsWithChildren {
    size?: Size;
}

export const Modal = ({size = "large", children}: Props) => {
    const sizeDictionary: Record<Size, string> = {
        "small": "w-46 max-w-full md:max-w-xl",
        "large": "w-4xl max-w-full md:max-w-4xl",
    }

    const concatClasses = (...classes: string[]) => classes.join(" ")

    return (
        <div className="fixed inset-0 bg-neutral-dark bg-opacity-70 flex items-center justify-center md:p-4">
            <div className={concatClasses(
                "bg-primary-dark rounded shadow-md max-h-full",
                "mx-4 my-8 flex flex-col overflow-auto",
                sizeDictionary[size],
                "border border-darkGreen"
            )}>
                {children}
            </div>
        </div>
    )
}
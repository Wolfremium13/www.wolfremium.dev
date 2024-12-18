import {ElementType, PropsWithChildren} from "react"

type As = "h1" | "h2" | "h3" | "h4" | "h5"
type Size = "xs" | "sm" | "md" | "lg"

interface Props extends PropsWithChildren {
    as: As
    size?: Size
}

export const Title = ({as, size = "md", children}: Props) => {
    const Component: ElementType = as
    const sizeDictionary: Record<Size, string> = {
        xs: "text-sm",
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-4xl"
    }

    const concatClasses = (...classes: string[]) => classes.join(" ")

    return (
        <Component className={concatClasses(
            "font-bold",
            sizeDictionary[size],
            "text-lightGreen"
        )}>
            {children}
        </Component>
    )
}
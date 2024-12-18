import React from "react"
import {GiArrowsShield} from "react-icons/gi";

type Format = "long" | "short";
type Highlight = "url" | "slug" | "none";

interface Props {
  href: string
  prefix?: string
  target?: "_blank" | "_self" | "_parent" | "_top"
  format?: Format
  highlight?: Highlight
}

export const UrlFormatted = ({
  href: value,
  prefix = "",
  target = "_self",
  format = "long",
  highlight = "none"
}: Props) => (
    <a
      href={value}
      target={target}
      className="flex gap-1 p-2 rounded items-center justify-between
                 transition-colors duration-300 ease-in-out text-neutral
                 bg-neutral-light hover:bg-neutral hover:bg-opacity-5"
    >
      {prefix && <small className="font-bold">{prefix}</small>}
      <small className="text-neutral text-opacity-75 flex-1 truncate">
        {highlight === "url" && <UrlHighlighted value={value} format={format}/>}
        {highlight === "slug" && <SlugHighlighted value={value} format={format}/>}
        {highlight === "none" && format === "long" && (<small>{value}</small>)}
        {highlight === "none" && format === "short" && (<small>{value.substring(0, value.indexOf("/", 8))}</small>)}
      </small>
      <div className="w-4">
        <GiArrowsShield className="w-4 h-4 text-primary"/>
      </div>
    </a>
  )

interface HighlightedProps {
  value: string
  format?: Format
}

const UrlHighlighted = ({ value, format }: HighlightedProps) => {
  const baseUrl = value.substring(0, value.indexOf("/", 8)).replace(/(^\w+:|^)\/\//, "")
  const previousBaseUrl = value.split(baseUrl)[0]
  const postBaseUrl = value.split(baseUrl)[1]

  if (format === "short") {
    return <span className="text-primary font-bold">{baseUrl}</span>
  }

  return (
    <>
      <span>{previousBaseUrl}</span>
      <span className="text-primary font-bold">{baseUrl}</span>
      <span>{postBaseUrl}</span>
    </>
  )
}

const SlugHighlighted = ({ value, format }: HighlightedProps) => {
  const slug = value.split("/").pop()
  const urlWithoutLastSlug = value.split("/").slice(0, -1).join("/")

  if (format === "short") {
    return <span className="text-primary font-bold">{slug}</span>
  }

  return (
    <>
      <span>{urlWithoutLastSlug}/</span>
      <span className="text-primary font-bold">{slug}</span>
    </>
  )
}
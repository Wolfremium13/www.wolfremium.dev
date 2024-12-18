import React from "react"

type Format = "full-date" | "short-date" | "days-from-now";

interface Props {
  value: string | Date
  format?: Format
}

export const DateFormatted = ({ value: originalValue, format = "full-date" }: Props) => {
  const value = originalValue instanceof Date ? originalValue : new Date(originalValue)
  const year = value.getFullYear()
  const month = value.getMonth() + 1
  const day = value.getDate()
  const dayOfWeek = value.getDay()

  const dayOfWeekString = [
    "Domingo", "Lunes", "Martes", "Miércoles",
    "Jueves", "Viernes", "Sábado"
  ]
  const monthString = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  if (format === "short-date") {
    const addZero = (n: number) => n.toString().padStart(2, "0")

    return <span>{addZero(day)}/{addZero(month)}/{year}</span>
  }

  if (format === "days-from-now") {
    const today = new Date()
    const diff = today.getTime() - value.getTime()
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return <span>Hoy</span>
    if (diffDays === 1) return <span>{diffDays} día</span>

    return <span>{diffDays} días</span>
  }

  return <span>{dayOfWeekString[dayOfWeek]}, {day} de {monthString[month - 1]} de {year}</span>
}
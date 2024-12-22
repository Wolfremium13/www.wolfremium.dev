"use client"
import React from "react"
import {Modal} from "@/app/shared/components/Modal";
import {Title} from "@/app/shared/components/Title";
import {Button} from "@/app/shared/components/Button";

interface Props {
  error: string;
  onClose: () => void;
}

export const ErrorDialog: React.FC<Props> = ({ error, onClose }) => {
  console.error(error)

  return (
    <Modal size="small">
      <div className="flex flex-col gap-4 p-4">
        <Title as="h2">Error</Title>
        <p>{error}</p>
        <Button color="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </Modal>
  )
}

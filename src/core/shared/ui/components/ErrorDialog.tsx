"use client"
import React from "react"
import {Modal} from "@/core/shared/ui/components/Modal";
import {Title} from "@/core/shared/ui/components/Title";
import {Button} from "@/core/shared/ui/components/Button";

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

"use client"
import React, { PropsWithChildren } from "react"
import {Modal} from "@/app/shared/components/Modal";
import {Button} from "@/app/shared/components/Button";

interface Props extends PropsWithChildren {
  onAccept: () => void
  onCancel: () => void
}

export const ConfirmDialog: React.FC<Props> = ({ children, onAccept, onCancel }) => (
    <Modal size="small">
      <div className="flex flex-col gap-4 p-4 justify-center">
        <div>{children}</div>
        <div className="flex flex-row gap-2 justify-center">
          <Button color="secondary" onClick={onCancel}>Cancelar</Button>
          <Button color="primary" onClick={onAccept}>Confirmar</Button>
        </div>
      </div>
    </Modal>
  )

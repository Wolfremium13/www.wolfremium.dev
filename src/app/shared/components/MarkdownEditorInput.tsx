import ES_ES from "@vavt/cm-extension/dist/locale/es-ES"
import { MdEditor, ExposeParam, UploadImgEvent, UploadImgCallBack, config } from "md-editor-rt"
import React, { useMemo, useRef, useState } from "react"
import "md-editor-rt/lib/style.css"
import {InputValidations} from "@/app/shared/InputValidation";
import {useUploadImage} from "@/app/admin/blog/hooks/use.upload.image";
import {GiLobArrow, GiMicroscopeLens, GiMoebiusTriangle} from "react-icons/gi";

interface Props {
  id: string
  label: string
  value?: string
  placeholder?: string
  description?: string
  onChange: (value: string | undefined) => void
  disabled?: boolean
  required?: boolean
  validations?: InputValidations
}

config({
  editorConfig: {
    languageUserDefined: { "es-ES": ES_ES }
  }
})

export const MarkdownEditorInput: React.FC<Props>  = ({
  id,
  label,
  value: defaultValue = "",
  placeholder,
  description,
  onChange,
  disabled = false,
  required = false,
  validations: defaultValidations = InputValidations.create(),
}) => {
  const [value, setValue] = useState(defaultValue)
  const [hasChanged, setHasChanged] = useState(Boolean(defaultValue.length) && !disabled)
  const validations = useMemo(() => required
      ? defaultValidations.includeRequired()
      : defaultValidations, [required, defaultValidations])
  const hasErrors = useMemo(() => !validations.validate(value), [value])
  const invalidMessages = useMemo(() => validations.getInvalidMessages(value), [value])
  const editorRef = useRef<ExposeParam>()
  const { upload } = useUploadImage()

  const concatClasses = (...classes: string[]) => classes.join(" ")

  const handleChange = (value: string) => {
    if (disabled) return
    const isValid = validations.validate(value)

    setHasChanged(true)
    setValue(value)
    onChange(isValid ? value : undefined)
  }

  const handleUploadImage: UploadImgEvent = async (files: File[], callBack: UploadImgCallBack) => {
    if (files && files[0]) {
      const fileToUpload = files[0]

      if (fileToUpload) {
        const fileUrl = await upload(fileToUpload)

        callBack([fileUrl])
      }
    }
  }

  return (
    <div>
      <div className="flex flex-row w-full justify-between">
        <label
          htmlFor={id}
          className="text-sm cursor-pointer flex flex-row gap-1 items-center
                     transition-colors duration-300 ease-in-out"
        >
          {label}
          {required && <span className="text-alert-dark">*</span>}
        </label>
        <p className="flex gap-2 pr-7 text-xs text-secondary items-center">
          ¡Aquí tienes acciones para verlo mejor!
          <GiLobArrow className="w-4 h-4" />
        </p>
      </div>
      <div className={concatClasses(
        "flex flex-col shadow-inner z-20 focus-within:border-primary border-primary-light overflow-hidden",
        hasErrors && hasChanged ? "rounded-t" : "rounded",
      )}>
        <MdEditor theme={"dark"}
          previewTheme="github"
          language="es-ES"
          ref={editorRef}
          modelValue={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          onUploadImg={handleUploadImage}
          toolbarsExclude={[
            "fullscreen",
            "catalog",
            "github",
            "revoke",
            "next",
            "prettier",
            "htmlPreview",
            "previewOnly",
            "save"
          ]}
          footers={[
            "markdownTotal"
          ]}
        />
      </div>
      {hasErrors && hasChanged && (
        <div className="relative w-full h-0">
          <span className="text-xs text-alert-dark border-alert absolute -mt-6 left-0 right-0 py-1 px-3
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
      {description && (
        <span className="text-xs text-neutral text-opacity-75 py-1 flex items-center gap-2">
          <div className="w-4">
            <GiMicroscopeLens className="w-4 h-4"/>
          </div>
          <p>{description}</p>
        </span>
      )}
    </div>
  )
}

export class InputValidation {
  private constructor(
    private readonly _id: string,
    private readonly _validation: (value: string) => boolean,
    private readonly _invalidMessage: string
  ) {}

  public static create(
    id: string,
    validation: (value: string) => boolean,
    invalidMessage: string
  ): InputValidation {
    return new InputValidation(id, validation, invalidMessage)
  }

  public get id(): string {
    return this._id
  }

  public validate(value: string): boolean {
    return this._validation(value)
  }

  public get invalidMessage(): string {
    return this._invalidMessage
  }
}

export class InputValidations {
  private constructor(
    public validations: InputValidation[]
  ) { }

  public static create(...validations: InputValidation[]): InputValidations {
    return new InputValidations(validations ?? [])
  }

  public include(
    id: string,
    validation: (value: string) => boolean,
    invalidMessage: string
  ): InputValidations {
    return InputValidations.create(
      ...this.validations,
      InputValidation.create(id, validation, invalidMessage)
    )
  }

  public includeRequired(): InputValidations {
    const requiredValidation: InputValidation = InputValidation.create(
      "required",
      (value: string) => value.length > 0,
      "Este campo es requerido"
    )

    return InputValidations.create(requiredValidation, ...this.validations)
  }

  public includeSlug(): InputValidations {
    const slugValidation: InputValidation = InputValidation.create(
      "slug",
      (value: string) => value.length === 0 || /^[a-z0-9-]+$/.test(value),
      "El valor debe ser en minúsculas y separado por guiones"
    )

    return InputValidations.create(slugValidation, ...this.validations)
  }

  public includeEmail(): InputValidations {
    const emailValidation: InputValidation = InputValidation.create(
      "email",
      (value: string) => value.length === 0 || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      "El valor debe ser un email válido"
    )

    return InputValidations.create(emailValidation, ...this.validations)
  }

  public includeUrl(): InputValidations {
    const urlValidation: InputValidation = InputValidation.create(
      "url",
      (value: string) => value.length === 0 || /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/.test(value),
      "El valor debe ser una URL válida"
    )

    return InputValidations.create(urlValidation, ...this.validations)
  }

  public includeMaxCharacters(maxCharacters: number) {
    const maxCharactersValidation: InputValidation = InputValidation.create(
      "maxCharacters",
      (value: string) => value.length <= maxCharacters,
      `El valor debe tener como máximo ${maxCharacters} caracteres`
    )

    return InputValidations.create(maxCharactersValidation, ...this.validations)
  }

  public getMaxCharacters(): number | undefined {
    const maxCharactersValidation = this.validations.find(
      (validation) => validation.id === "maxCharacters"
    )

    if (!maxCharactersValidation) return undefined

    return maxCharactersValidation.invalidMessage
      .split(" ")
      .filter((word) => !isNaN(parseInt(word)))
      .map((number) => parseInt(number))[0]
  }

  public validate(value: string): boolean {
    return this.validations
      .map((validation) => validation.validate(value))
      .every((isValid) => isValid)
  }

  public getInvalidMessages(value: string): string[] {
    return this.validations
      .filter((validation) => !validation.validate(value))
      .map((validation) => validation.invalidMessage)
  }

  includeMaxTags(number: number) {
    const maxTagsValidation: InputValidation = InputValidation.create(
      "maxTags",
      (value: string) => value.split(",").length <= number,
      `El valor debe tener como máximo ${number} tags`
    )

    return InputValidations.create(maxTagsValidation, ...this.validations)
  }
}

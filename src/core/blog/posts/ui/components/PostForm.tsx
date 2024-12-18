import React, {useState} from "react"
import {SingleOptionInput} from "@/core/shared/ui/components/SingleOptionInput";
import {TextInput} from "@/core/shared/ui/components/TextInput";
import {UploadImageInput} from "@/core/shared/ui/components/UploadImageInput";
import {InputValidations} from "@/core/shared/ui/InputValidation";
import {MarkdownEditorInput} from "@/core/shared/ui/components/MarkdownEditorInput";
import {DateInput} from "@/core/shared/ui/components/DateInput";
import {Post} from "@/core/blog/posts/ui/types/post";
import {TagsInput} from "@/core/shared/ui/components/TagsInput";

interface Props {
    post?: Post
    posts: Post[]
    onChange: (post: Post | undefined) => void
    isEditing?: boolean
}

type Form = Partial<Post>;

export const PostForm: React.FC<Props> = (
    {
        post,
        posts,
        onChange,
        isEditing = false,
    }) => {
    const [form, setForm] = useState<Form>(post || {})

    const isValid = (post: Form): post is Post => Boolean(
        post.slug &&
        post.title &&
        post.datePublished &&
        !isNaN(Date.parse(post.datePublished)) &&
        post.imageUrl &&
        post.imageAlt &&
        post.shortDescription &&
        post.content &&
        post.published !== undefined &&
        post.tags &&
        post.tags.length > 0
    )

    const handleFormChange = (key: keyof Form) => (value: string | string[] | boolean | undefined) => {
        handleChange({...form, [key]: value})
    }

    const handleChange = (form: Form) => {
        setForm(form)
        onChange(isValid(form) ? form : undefined)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isValid(form)) {
            onChange(form)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-grow overflow-hidden"
        >
            <div className="overflow-y-auto flex-grow custom-scrollbar flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-neutral-light">
                    <SingleOptionInput
                        id="published"
                        label="Estado"
                        activeText="Publicado"
                        inactiveText="Borrador"
                        value={form.published}
                        onChange={handleFormChange("published")}
                        description={
                            form.published === true && "Este post aparecerá en el listado de posts" ||
                            form.published === false && "Este post no aparecerá en el listado de posts pero su enlace sí será accesible" ||
                            "Este campo determinará si el post aparecerá en el listado de posts o no, el enlace siempre será accesible"
                        }
                        required
                    />
                    <TextInput
                        id="slug"
                        label="Slug"
                        value={form.slug ?? ""}
                        placeholder={"mi-post-perfecto"}
                        description={isEditing
                            ? "Este es el campo que se usa en la URL del post"
                            : "Este campo se utilizará para la URL del post, no será editable una vez creado y debe estar en el mismo idioma que el post"
                        }
                        onChange={handleFormChange("slug")}
                        disabled={isEditing}
                        required
                        validations={InputValidations.create().includeSlug().include(
                            "repeatedSlug",
                            (value: string) => !posts.some((post) => post.slug === value),
                            "Ya existe un post con este slug"
                        )}
                    />
                </div>
                <div className="flex justify-center flex-col md:flex-row gap-4">
                    <div className="flex flex-col items-center sm:items-start justify-start gap-3 w-1/3">
                        <UploadImageInput
                            value={form.imageUrl}
                            placeholder="Subir imagen"
                            onChange={handleFormChange("imageUrl")}
                        />
                        <TextInput
                            id="previewImageAlt"
                            label="Texto alternativo de la portada"
                            value={form.imageAlt ?? ""}
                            placeholder={"Un cuaderno con un lápiz encima"
                            }
                            onChange={handleFormChange("imageAlt")}
                            description="Este texto se mostrará cuando la imagen no pueda ser cargada o leída por un lector de pantalla, es importante para la accesibilidad"
                            required
                        />
                    </div>
                    <div className="w-2/3 flex flex-col gap-6">
                        <TextInput
                            id="title"
                            label="Título"
                            value={form.title ?? ""}
                            placeholder={"Mi post perfecto"}
                            onChange={handleFormChange("title")}
                            required
                        />
                        <TextInput
                            id="shortDescription"
                            label="Introducción"
                            value={form.shortDescription ?? ""}
                            placeholder={"Para crear un post perfecto debes seguir estos pasos..."}
                            onChange={handleFormChange("shortDescription")}
                            size="big"
                            description="Este texto se mostrará en el listado dando una introducción al post, también será el texto que aparecerá al compartir el enlace como preview"
                            validations={InputValidations.create().includeMaxCharacters(600)}
                            showCounter
                            required
                        />
                    </div>
                </div>
                <MarkdownEditorInput
                    id="content"
                    label="Contenido del post"
                    value={form.content ?? ""}
                    placeholder={"## Paso 1 para crear un post perfecto..."}
                    onChange={handleFormChange("content")}
                    validations={InputValidations.create()
                        .includeMaxCharacters(22000)
                        .include(
                            "nonH1",
                            (value: string) => value.length === 0 || !/(^|\n)# /.test(value),
                            "El contenido del post no puede incluir títulos de primer nivel (#)"
                        )
                    }
                    required
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DateInput
                        id="datePublished"
                        label="Fecha de publicación"
                        value={form.datePublished ? new Date(form.datePublished) : undefined}
                        onChange={(_: Date | undefined, value: string | undefined) => handleFormChange("datePublished")(value)}
                        description="Este campo será la fecha que se pondrá como fecha de publicación del post pero es sólo informativa, su visibilidad en el listado no cambiará"
                        required
                    />
                    {form.dateModified && (
                        <DateInput
                            id="dateModified"
                            label="Fecha de última modificación"
                            value={new Date(form.dateModified)}
                            withTime
                            disabled
                        />
                    )}
                    <TagsInput
                        id="tags"
                        label="Tags del post"
                        value={form.tags || []}
                        onChange={handleFormChange("tags")}
                        placeholder="Añade tags para tu post"
                        description="Los tags ayudan a categorizar tu contenido y mejorar su búsqueda."
                        validations={InputValidations.create().includeMaxTags(10)}
                        required={true}
                    />
                </div>
            </div>
        </form>
    )
}
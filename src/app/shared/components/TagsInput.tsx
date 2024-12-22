import React, {useMemo, useState} from "react";
import {GiCrossMark} from "react-icons/gi";
import {InputValidations} from "@/app/shared/InputValidation";

export interface TagsInputProps {
    id: string;
    label: string;
    value: string[];
    placeholder?: string;
    description?: string;
    onChange: (tags: string[] | undefined) => void;
    required?: boolean;
    validations?: InputValidations;
}

export const TagsInput: React.FC<TagsInputProps> = ({
                                                        id,
                                                        label,
                                                        value: defaultValue = [],
                                                        placeholder,
                                                        description,
                                                        onChange,
                                                        required = false,
                                                        validations: defaultValidations = InputValidations.create().includeMaxTags(10)
                                                    }) => {
    const [tags, setTags] = useState<string[]>(defaultValue);
    const [inputValue, setInputValue] = useState("");
    const [hasChanged, setHasChanged] = useState(false);

    const validations = useMemo(() => required
        ? defaultValidations.includeRequired()
        : defaultValidations, [required, defaultValidations]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddTag = (tag: string) => {
        if (tag && !tags.includes(tag) && validations.validate(tag)) {
            const newTags = [...tags, tag];
            setTags(newTags);
            onChange(newTags);
            setInputValue("");
            setHasChanged(true);
        }
    };

    const handleRemoveTag = (tag: string) => {
        const newTags = tags.filter(t => t !== tag);
        setTags(newTags);
        onChange(newTags.length > 0 ? newTags : undefined);
        setHasChanged(true);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAddTag(inputValue.trim());
        }
    };

    return (
        <div className="flex flex-col gap-1 text-secondary-dark focus-within:text-neutral-light relative w-full">
            <label htmlFor={id} className="text-sm cursor-pointer flex items-center gap-1">
                {label}
                {required && <span className="text-alert-dark">*</span>}
            </label>
            <div className="flex flex-wrap gap-1 items-center py-2 border border-darkGreen bg-primary-dark rounded">
                {tags.map((tag, index) => (
                    <span key={index}
                          className="flex items-center text-xs text-neutral-light bg-darkGreen rounded px-2 py-1">
                            {tag}
                        <GiCrossMark className="ml-1 cursor-pointer text-alert-dark"
                                     onClick={() => handleRemoveTag(tag)}/>
                    </span>
                ))}
                <input
                    className="flex-1 bg-transparent px-2 py-1 text-neutral-light placeholder:text-neutral-light placeholder:text-opacity-80 focus:outline-none"
                    type="text"
                    value={inputValue}
                    placeholder={placeholder || "Add tags"}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            {description && (
                <span className="text-xs text-primary-light text-opacity-75 mt-1">{description}</span>
            )}
            {hasChanged && tags.length === 0 && required && (
                <span className="text-xs text-alert-dark mt-1">At least one tag is required.</span>
            )}
        </div>
    );
};
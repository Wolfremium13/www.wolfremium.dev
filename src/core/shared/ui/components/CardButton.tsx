"use client"
import React from "react"
import {GiAbstract013} from "react-icons/gi";
import {Card} from "@/core/shared/ui/components/Card";

interface Props {
    onClick?: () => void;
}

const CardButton: React.FC<Props> = ({onClick}) => (
    <Card onClick={onClick}>
        <div className="flex items-center justify-center w-full h-full
                      text-neutral-dark text-opacity-10 hover:text-opacity-40
                      bg-neutral-dark rounded shadow-md">
            <GiAbstract013 className="text-lightGreen w-20 h-20"/>
        </div>
    </Card>
)

export {CardButton}
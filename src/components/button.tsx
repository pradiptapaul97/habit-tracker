import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
type ButtonType = "primary" | "secondary" | "ghost-destructive"

type ButtonProps = {
    varient?: ButtonType
} & ComponentProps<'button'>

export function Button({ varient = "primary", className, ...props }: ButtonProps) {
    return (
        <button {...props} className={twMerge(getVarientStyles(varient),
            "transition-colors rounded px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed",
            className
        )} />
    )
}

function getVarientStyles(varient: ButtonType) {
    switch (varient) {
        case "primary":
            return "bg-violet-600 hover:bg-violet-500"
        case "secondary":
            return "bg-zinc-700 hover:bg-zinc-600 text-zinc-400"
        case "ghost-destructive":
            return "bg-transparent hover:bg-red-800 text-red-800 hover:text-red-200"
    }
}
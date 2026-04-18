import { cn } from "@/lib/utils"
import { forwardRef, type RefObject } from "react"

interface Props {
	isOpen: boolean
	onClick: () => void
	lineRefs: [RefObject<HTMLSpanElement | null>, RefObject<HTMLSpanElement | null>, RefObject<HTMLSpanElement | null>]
}

export const BurjHamburger = forwardRef<HTMLButtonElement, Props>(({ isOpen, onClick, lineRefs }, ref) => {
	const baseLine = "block h-[1.5px] rounded-[1px] will-change-transform bg-(--c-gold-lt) transition-colors duration-200 group-hover:bg-gold"
	const openLine = isOpen ? "bg-gold" : ""

	return (
		<button
			ref={ref}
			type="button"
			onClick={onClick}
			aria-label={isOpen ? "Close navigation" : "Open navigation"}
			aria-expanded={isOpen}
			className={cn(
				"group flex h-15 w-15 cursor-pointer flex-col items-center justify-center gap-[5px] border rounded-full  bg-transparent absolute top-6 right-11 backdrop-blur-sm hover:border-(--c-gold) transition-all duration-500 hover:scale-110",
				"focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold/40",
			)}
		>
			<span ref={lineRefs[0]} className={cn(baseLine, openLine, "w-[3px]")} />
			<span ref={lineRefs[1]} className={cn(baseLine, openLine, "w-[10px]")} />
			<span ref={lineRefs[2]} className={cn(baseLine, openLine, "w-[15px]")} />
			{/* <span
				className={cn(
					"pointer-events-none absolute -bottom-0.5 font-sans-luxe text-[7px] font-light uppercase tracking-[0.28em] transition-opacity duration-200",
					isOpen ? "opacity-0" : "text-gold/60 group-hover:text-gold",
				)}
			>
				Menu
			</span> */}
		</button>
	)
})

BurjHamburger.displayName = "BurjHamburger"

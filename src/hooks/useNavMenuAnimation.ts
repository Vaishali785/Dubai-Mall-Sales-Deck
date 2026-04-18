import gsap from "gsap"
import { useCallback, useEffect, useRef, useState } from "react"

const LUX = "cubic-bezier(0.25, 0, 0, 1)"
const SNAP = "cubic-bezier(0.16, 1, 0.3, 1)"

export function useNavMenuAnimation(refs: {
	slats: React.RefObject<HTMLDivElement | null>
	lines: React.RefObject<HTMLSpanElement | null>[]
	glow: React.RefObject<HTMLDivElement | null>
	content: React.RefObject<HTMLDivElement | null>
	// brand: React.RefObject<HTMLDivElement>
	label: React.RefObject<HTMLParagraphElement | null>
	links: React.RefObject<HTMLUListElement | null>
	rule: React.RefObject<HTMLDivElement | null>
	footer: React.RefObject<HTMLDivElement | null>
	bottomBar: React.RefObject<HTMLDivElement | null>
}) {
	const [isOpen, setIsOpen] = useState(false)
	const animatingRef = useRef(false)

	const getSlats = () => (refs.slats.current ? Array.from(refs.slats.current.querySelectorAll(".blind-slat")) : [])
	const getLinks = () => (refs.links.current ? Array.from(refs.links.current.querySelectorAll("a")) : [])

	useEffect(() => {
		gsap.set(getSlats(), { scaleY: 0, transformOrigin: "top center" })
		gsap.set(refs.content.current, { opacity: 0 })
		gsap.set(getLinks(), { opacity: 0, y: -40 })
		gsap.set([refs.label.current, refs.footer.current, refs.bottomBar.current, refs.glow.current], { opacity: 0 })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const open = useCallback(() => {
		if (animatingRef.current) return
		animatingRef.current = true
		setIsOpen(true)

		const lineEls = refs.lines.map((r) => r.current)
		const tl = gsap.timeline({ onComplete: () => (animatingRef.current = false) })

		tl.to(lineEls[0], { rotation: 45, y: 6.5, width: 17, duration: 0.52, ease: LUX }, 0)
			.to(lineEls[1], { scaleX: 0, opacity: 0, duration: 0.28, ease: LUX }, 0)
			.to(lineEls[2], { rotation: -45, y: -6.5, width: 17, duration: 0.52, ease: LUX }, 0)
			.to(getSlats(), { scaleY: 1, duration: 0.45, ease: SNAP, stagger: { each: 0.028, from: "start" } }, 0.04)
			.to(refs.glow.current, { opacity: 1, duration: 0.8, ease: LUX }, 0.42)
			.to(refs.content.current, { opacity: 1, duration: 0.01 }, 0.48)
			// .to( { opacity: 1, duration: 0.5, ease: LUX }, 0.56)
			.to(refs.label.current, { opacity: 1, duration: 0.45, ease: LUX }, 0.62)
			.to(getLinks(), { opacity: 1, y: 0, duration: 0.55, ease: LUX, stagger: { each: 0.075, from: "start" } }, 0.66)
			.call(() => refs.rule.current?.classList.add("show"), [], 0.84)
			.to([refs.bottomBar.current, refs.footer.current], { opacity: 1, duration: 0.5, ease: LUX }, 0.9)
	}, [refs])

	const close = useCallback(() => {
		// Allow close to interrupt in-flight open animation (e.g. fast nav-item click).
		gsap.killTweensOf([
			getSlats(),
			getLinks(),
			refs.glow.current,
			refs.content.current,
			refs.label.current,
			refs.footer.current,
			refs.bottomBar.current,
		])
		animatingRef.current = true
		setIsOpen(false)

		const lineEls = refs.lines.map((r) => r.current)
		const links = getLinks()
		const slats = getSlats()

		const tl = gsap.timeline({
			onComplete: () => {
				animatingRef.current = false
				refs.rule.current?.classList.remove("show")
				gsap.set(refs.content.current, { opacity: 0 })
				gsap.set(links, { opacity: 0, y: -40 })
				gsap.set([refs.label.current, refs.footer.current, refs.bottomBar.current, refs.glow.current], { opacity: 0 })
				gsap.set(slats, { scaleY: 0, transformOrigin: "top center" })
			},
		})

		tl.to(
			[links, refs.footer.current, refs.label.current],
			{
				opacity: 0,
				duration: 0.22,
				ease: LUX,
			},
			0,
		)
			.to([refs.bottomBar.current, refs.glow.current], { opacity: 0, duration: 0.18, ease: LUX }, 0)
			.to(refs.content.current, { opacity: 0, duration: 0.01 }, 0.2)
			.to(
				slats,
				{
					scaleY: 0,
					transformOrigin: "top center",
					duration: 0.38,
					ease: LUX,
					stagger: { each: 0.022, from: "end" },
				},
				0.12,
			)
			.to(lineEls[0], { rotation: 0, y: 0, width: 3, duration: 0.48, ease: LUX }, 0.2)
			.to(lineEls[1], { scaleX: 1, opacity: 1, duration: 0.3, ease: LUX }, 0.26)
			.to(lineEls[2], { rotation: 0, y: 0, width: 15, duration: 0.48, ease: LUX }, 0.2)
	}, [refs])

	const toggle = useCallback(() => (isOpen ? close() : open()), [isOpen, open, close])

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) close()
		}
		document.addEventListener("keydown", onKey)
		return () => document.removeEventListener("keydown", onKey)
	}, [isOpen, close])

	return { isOpen, open, close, toggle }
}

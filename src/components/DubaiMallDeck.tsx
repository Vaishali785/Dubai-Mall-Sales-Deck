import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

import { useWheelHandler } from "../hooks/useWheelHandler"
import { GlobalNav } from "./GlobalNav"
import { AttractionsGallerySection } from "./sections/AttractionsGallerySection"
import { AttractionsIntroSection } from "./sections/AttractionsIntroSection"
import { DiningGallerySection } from "./sections/DiningGallerySection"
import { DiningIntroSection } from "./sections/DiningIntroSection"
import { EcosystemSection } from "./sections/EcosystemSection"
import FinaleSection from "./sections/FinaleSection"
import { HeroSection } from "./sections/HeroSection"
import { IntroLoader } from "./sections/IntroLoader"
import { RetailBrandsSection } from "./sections/RetailBrandsSection"
import { RetailIntroSection } from "./sections/RetailIntroSection"
import { SectionWipe } from "./sections/SectionWipe"
import { WhySection } from "./sections/WhySection"
import { GrainOverlay } from "./ui/GrainOverlay"

gsap.registerPlugin(useGSAP)

const LUX = "cubic-bezier(0.25,0,0,1)"
const WHY_CHAPTER_COUNT = 5
const WHY_STEP_COOLDOWN_MS = 1200
const SECTION_IDS = [
	"#hero",
	"#why-section",
	"#retail-intro",
	"#retail-brands",
	"#ecosystem",
	"#dining-intro",
	"#dining-gallery",
	"#attractions-intro",
	"#attractions-gallery",
	"#finale",
] as const

function setBaseInitialStates(root: HTMLDivElement) {
	const sectionDefaults = SECTION_IDS.map((id) => ({ id, values: { opacity: 0, pointerEvents: "none" } }))
	sectionDefaults.forEach(({ id, values }) => gsap.set(id, values))

	const elementDefaults: Array<{ selector: string; values: gsap.TweenVars }> = [
		{ selector: "#iconGlow", values: { opacity: 0, scale: 0.8 } },
		{ selector: "#heroNav", values: { opacity: 0, y: -20 } },
		{ selector: "#hEyebrow", values: { opacity: 0, x: -16 } },
		{ selector: ".h-line", values: { opacity: 0, y: 26 } },
		{ selector: "#hDivider", values: { opacity: 0 } },
		{ selector: "#hSub", values: { opacity: 0, y: 12 } },
		{ selector: "#scrollCue", values: { opacity: 0, y: 8 } },
		{ selector: "#sideInd", values: { opacity: 0 } },
		{ selector: "#why-header", values: { opacity: 0, y: -10 } },
		{ selector: "#why-scroll-hint", values: { opacity: 0 } },
		{ selector: ".why-chapter", values: { opacity: 0, y: 32 } },
		{ selector: ".why-img-card", values: { opacity: 0 } },
		{ selector: ".bg-layer", values: { opacity: 0 } },
		{ selector: "#ri-eyebrow", values: { opacity: 0, y: 14 } },
		{ selector: "#ri-headline", values: { opacity: 0, y: 18 } },
		{ selector: "#ri-divider", values: { opacity: 0 } },
		{ selector: "#ri-sub", values: { opacity: 0, y: 12 } },
		{ selector: "#ri-stats", values: { opacity: 0, y: 10 } },
		{ selector: "#ri-scroll", values: { opacity: 0 } },
		{ selector: "#retail-brands-header", values: { opacity: 0 } },
		{ selector: ".brand-tile", values: { opacity: 0, scale: 0.95, y: 10 } },
		{ selector: "#more-brands", values: { opacity: 0 } },
		{ selector: ".di-eyebrow", values: { opacity: 0, y: 14 } },
		{ selector: "#di-headline", values: { opacity: 0, y: 18 } },
		{ selector: "#di-divider", values: { opacity: 0 } },
		{ selector: "#di-sub", values: { opacity: 0, y: 12 } },
		{ selector: "#di-stats", values: { opacity: 0, y: 10 } },
		{ selector: "#di-scroll", values: { opacity: 0 } },
		{ selector: "#dg-header", values: { opacity: 0 } },
		{ selector: "#ag-header", values: { opacity: 0 } },
		{ selector: "#ag-progress", values: { opacity: 0 } },
	]

	elementDefaults.forEach(({ selector, values }) => gsap.set(selector, values))

	const wbg0 = root.querySelector<HTMLElement>("#wbg0")
	if (wbg0) gsap.set(wbg0, { opacity: 1 })
}

export function DubaiMallDeck() {
	const containerRef = useRef<HTMLDivElement>(null)

	/* ── Section state ── */
	const currentSectionRef = useRef(0)
	const currentChapterRef = useRef(-1)
	const isTransitioningRef = useRef(false)
	const wheelReadyRef = useRef(false)
	const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const lastWheelRef = useRef(0)
	const lastWhyStepRef = useRef(0)
	const ecoJustEnteredRef = useRef(false)

	/* ── Section navigation refs ── */
	const goToWhyRef = useRef<() => void>(() => {})
	const goToHeroRef = useRef<() => void>(() => {})
	const showChapterRef = useRef<(idx: number, instant?: boolean) => void>(() => {})
	const goToRetailIntroRef = useRef<() => void>(() => {})
	const goToRetailBrandsRef = useRef<() => void>(() => {})
	const goToRetailIntroBackRef = useRef<() => void>(() => {})
	const goToRetailIntroFromBrandsRef = useRef<() => void>(() => {})
	const goToEcosystemRef = useRef<() => void>(() => {})
	const goToRetailBrandsFromEcoRef = useRef<() => void>(() => {})
	const goToDiningIntroRef = useRef<() => void>(() => {})
	const goToDiningGalleryRef = useRef<() => void>(() => {})
	const goToDiningIntroBackRef = useRef<() => void>(() => {})
	const goToEcoFromDiningRef = useRef<() => void>(() => {})
	const goToAttractionsRef = useRef<() => void>(() => {})
	const goFromAttractionsBackRef = useRef<() => void>(() => {})
	const goToAttractionsGalleryRef = useRef<() => void>(() => {})
	const goToAttractionsIntroBackRef = useRef<() => void>(() => {})
	const goToFinaleRef = useRef<() => void>(() => {})
	const goToAttractionsFromFinaleRef = useRef<() => void>(() => {})
	const jumpToSectionRef = useRef<(sec: number) => void>(() => {})

	/* ── Ecosystem refs (set by EcosystemSection via onReady) ── */
	const ecoFlipRef = useRef<(idx: number, dir: number) => void>(() => {})
	const ecoGetIdxRef = useRef<() => number>(() => 0)
	const ecoGetFlipRef = useRef<() => boolean>(() => false)

	/* ── Dining gallery refs (set by DiningGallerySection via onReady) ── */
	const diningGallerySetActiveRef = useRef<(v: boolean) => void>(() => {})
	const diningGalleryAnimateInRef = useRef<() => void>(() => {})

	/* ── Attractions gallery refs (set by AttractionsGallerySection via onReady) ── */
	const attrGallerySetActiveRef = useRef<(v: boolean) => void>(() => {})
	const attrGalleryAnimateInRef = useRef<() => void>(() => {})
	/* ── Finale refs (set by FinaleSection via onReady) ── */
	const finaleSetActiveRef = useRef<(v: boolean) => void>(() => {})
	const finaleAnimateInRef = useRef<() => void>(() => {})

	function beginTransition() {
		isTransitioningRef.current = true
		if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current)
		safetyTimerRef.current = setTimeout(() => {
			isTransitioningRef.current = false
		}, 3000)
	}
	function endTransition() {
		isTransitioningRef.current = false
		if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current)
	}

	useGSAP(
		() => {
			const root = containerRef.current
			if (!root) return

			/* ── Burj path setup ── */
			const burjPath = root.querySelector<SVGPathElement>("#burjPath")
			if (burjPath) {
				const len = burjPath.getTotalLength()
				burjPath.style.strokeDasharray = String(len)
				burjPath.style.strokeDashoffset = String(len)
			}

			/* ── Initial states ── */
			setBaseInitialStates(root)

			/* ══ CHAPTER SWITCHER (Why) ══ */
			const chapters = Array.from({ length: WHY_CHAPTER_COUNT }, (_, i) => root.querySelector(`#wc${i}`))
			const imgCards = Array.from({ length: WHY_CHAPTER_COUNT }, (_, i) => root.querySelector(`#wi${i}`))
			const photoLayers = Array.from({ length: WHY_CHAPTER_COUNT }, (_, i) => root.querySelector(`#wimg${i}`))
			const bgLayers = Array.from({ length: WHY_CHAPTER_COUNT }, (_, i) => root.querySelector(`#wbg${i}`))
			const wpFillEl = root.querySelector<HTMLElement>("#wpFill")
			const wpLabelEl = root.querySelector<HTMLElement>("#wpLabel")

			const showChapter = (idx: number, instant = false) => {
				if (idx === currentChapterRef.current) return
				const prev = currentChapterRef.current
				currentChapterRef.current = idx

				chapters.forEach((c, i) => {
					gsap.killTweensOf(c)
					gsap.killTweensOf(imgCards[i])
					gsap.killTweensOf(photoLayers[i])
					gsap.killTweensOf(bgLayers[i])
				})
				chapters.forEach((c, i) => {
					if (i !== idx && i !== prev) gsap.set(c, { opacity: 0, y: 0 })
				})
				imgCards.forEach((c, i) => {
					if (i !== idx && i !== prev) gsap.set(c, { opacity: 0 })
				})
				photoLayers.forEach((c, i) => {
					if (i !== idx && i !== prev) gsap.set(c, { opacity: 0 })
				})

				const delay = prev >= 0 && !instant ? 0.12 : 0
				if (prev >= 0 && !instant) {
					gsap.to(chapters[prev], { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" })
					gsap.to(imgCards[prev], { opacity: 0, duration: 0.4, ease: "power2.in" })
					gsap.to(photoLayers[prev], { opacity: 0, duration: 0.4, ease: "power2.in" })
					gsap.to(bgLayers[prev], { opacity: 0, duration: 0.65, ease: LUX })
				} else if (prev >= 0) {
					gsap.set(chapters[prev], { opacity: 0, y: 0 })
					gsap.set(imgCards[prev], { opacity: 0 })
					gsap.set(photoLayers[prev], { opacity: 0 })
					gsap.set(bgLayers[prev], { opacity: 0 })
				}

				gsap.fromTo(chapters[idx], { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay })
				gsap.fromTo(imgCards[idx], { opacity: 0 }, { opacity: 1, duration: 0.7, ease: LUX, delay: delay + 0.05 })
				gsap.fromTo(photoLayers[idx], { opacity: 0 }, { opacity: 1, duration: 0.7, ease: LUX, delay: delay + 0.05 })
				gsap.to(bgLayers[idx], { opacity: 1, duration: 0.75, ease: LUX, delay })

				root.querySelectorAll<HTMLElement>(".wp-dot").forEach((dot, i) => {
					const active = i === idx
					dot.style.background = active ? "var(--c-gold)" : "transparent"
					dot.style.borderColor = active ? "var(--c-gold)" : "rgba(200,169,110,0.5)"
					dot.style.boxShadow = active ? "0 0 8px rgba(200,169,110,0.5)" : "none"
				})

				if (wpFillEl) {
					gsap.to(wpFillEl, {
						height: `${(idx / (WHY_CHAPTER_COUNT - 1)) * 100}%`,
						duration: 0.55,
						ease: LUX,
					})
				}
				if (wpLabelEl) wpLabelEl.textContent = `0${idx + 1} / 0${WHY_CHAPTER_COUNT}`
				gsap.to("#why-scroll-hint", { opacity: idx === WHY_CHAPTER_COUNT - 1 ? 0 : 0.8, duration: 0.4 })
			}
			showChapterRef.current = showChapter

			/* ══ SECTION TRANSITIONS ══ */

			const goToWhy = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 1
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#hero", { opacity: 0, y: -48, scale: 0.97, duration: 0.75, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.25, ease: "none" }, 0.55)
					.call(() => {
						gsap.set("#why-section", { opacity: 1, y: 0, pointerEvents: "all" })
						gsap.set("#hero", { pointerEvents: "none" })
						if (currentChapterRef.current < 0) showChapter(0, true)
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
					.to("#why-header", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.85)
					.to("#why-scroll-hint", { opacity: 0.8, duration: 0.5 }, 1.1)
			}
			goToWhyRef.current = goToWhy

			const goToHero = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 0
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#why-section", { opacity: 0, y: 48, scale: 1.02, duration: 0.7, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.2 }, 0.52)
					.call(() => {
						gsap.set("#hero", { y: 0, scale: 1, opacity: 0, pointerEvents: "all" })
						gsap.set("#why-section", { pointerEvents: "none" })
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.35, ease: "power2.out" })
					.to("#hero", { opacity: 1, duration: 0.5 }, 0.72)
			}
			goToHeroRef.current = goToHero

			const animateRetailIntroIn = () => {
				const tl = gsap.timeline()
				tl.to("#ri-eyebrow", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.1)
					.to("#ri-headline", { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }, 0.25)
					.to("#ri-divider", { opacity: 1, duration: 0.6 }, 0.65)
					.to("#ri-sub", { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, 0.75)
					.to("#ri-stats", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.95)
					.to("#ri-scroll", { opacity: 1, duration: 0.6 }, 1.2)
			}

			const goToRetailIntro = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 2
				gsap.set("#ri-eyebrow", { opacity: 0, y: 14 })
				gsap.set("#ri-headline", { opacity: 0, y: 18 })
				gsap.set("#ri-divider", { opacity: 0 })
				gsap.set("#ri-sub", { opacity: 0, y: 12 })
				gsap.set("#ri-stats", { opacity: 0, y: 10 })
				gsap.set("#ri-scroll", { opacity: 0 })

				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#why-section", { opacity: 0, y: -48, scale: 0.97, duration: 0.75, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.22 }, 0.57)
					.call(() => {
						gsap.set("#why-section", { pointerEvents: "none" })
						gsap.set("#retail-intro", { opacity: 1, pointerEvents: "all" })
						animateRetailIntroIn()
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToRetailIntroRef.current = goToRetailIntro

			const goToWhyFromRetail = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 1
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#retail-intro", { opacity: 0, y: 40, duration: 0.55, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.4)
					.call(() => {
						gsap.set("#retail-intro", { pointerEvents: "none" })
						gsap.set("#why-section", { opacity: 1, y: 0, scale: 1, pointerEvents: "all" })
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToRetailIntroBackRef.current = goToWhyFromRetail

			const goToRetailBrands = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 3
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#retail-intro", { opacity: 0, y: -40, duration: 0.6, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.2 }, 0.45)
					.call(() => {
						gsap.set("#retail-intro", { pointerEvents: "none" })
						gsap.set("#retail-brands", { opacity: 1, pointerEvents: "all" })
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
					.to("#retail-brands-header", { opacity: 1, duration: 0.6, ease: "power3.out" }, 0.55)
					.to(
						".brand-tile",
						{
							opacity: 1,
							scale: 1,
							y: 0,
							duration: 0.75,
							ease: "power3.out",
							stagger: 0.07,
						},
						0.65,
					)
					.to("#more-brands", { opacity: 1, duration: 0.5 }, 1.15)
			}
			goToRetailBrandsRef.current = goToRetailBrands

			const goToRetailIntroFromBrands = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 2
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#retail-brands", { opacity: 0, y: 30, duration: 0.5, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.38)
					.call(() => {
						gsap.set("#retail-brands", { opacity: 0, pointerEvents: "none" })
						gsap.set("#retail-intro", { opacity: 1, y: 0, scale: 1, pointerEvents: "all" })
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToRetailIntroFromBrandsRef.current = goToRetailIntroFromBrands

			const goToEcosystem = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 4
				ecoJustEnteredRef.current = true
				setTimeout(() => {
					ecoJustEnteredRef.current = false
				}, 900)
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#retail-brands", { opacity: 0, y: -40, duration: 0.55, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.4)
					.call(() => {
						gsap.set("#retail-brands", { opacity: 0, pointerEvents: "none" })
						gsap.set("#ecosystem", { opacity: 1, pointerEvents: "all" })
						document.getElementById("ecosystem")?.classList.add("active")
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToEcosystemRef.current = goToEcosystem

			const goToRetailBrandsFromEco = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 3
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#ecosystem", { opacity: 0, y: 40, duration: 0.5, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.38)
					.call(() => {
						gsap.set("#ecosystem", { pointerEvents: "none" })
						document.getElementById("ecosystem")?.classList.remove("active")
						gsap.set("#retail-brands", { opacity: 1, y: 0, pointerEvents: "all" })
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToRetailBrandsFromEcoRef.current = goToRetailBrandsFromEco

			/* ══ DINING TRANSITIONS ══ */

			const animateDiningIntroIn = () => {
				gsap.set(".di-eyebrow", { opacity: 0, y: 14 })
				gsap.set("#di-headline", { opacity: 0, y: 18 })
				gsap.set("#di-divider", { opacity: 0 })
				gsap.set("#di-sub", { opacity: 0, y: 12 })
				gsap.set("#di-stats", { opacity: 0, y: 10 })
				gsap.set("#di-scroll", { opacity: 0 })
				const tl = gsap.timeline()
				tl.to(".di-eyebrow", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0)
					.to("#di-headline", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.15)
					.to("#di-divider", { opacity: 1, duration: 0.55 }, 0.5)
					.to("#di-sub", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.6)
					.to("#di-stats", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.8)
					.to("#di-scroll", { opacity: 1, duration: 0.55 }, 1.05)
			}

			/* eco → dining intro */
			const goToDiningIntro = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 5

				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#ecosystem", { opacity: 0, y: -44, duration: 0.6, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.45)
					.call(() => {
						gsap.set("#ecosystem", { pointerEvents: "none" })
						document.getElementById("ecosystem")?.classList.remove("active")
						gsap.set("#dining-intro", { opacity: 1, pointerEvents: "all" })
						animateDiningIntroIn()
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToDiningIntroRef.current = goToDiningIntro

			/* dining intro → dining gallery */
			const goToDiningGallery = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 6

				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#dining-intro", { opacity: 0, y: -42, duration: 0.6, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.45)
					.call(() => {
						gsap.set("#dining-intro", { pointerEvents: "none" })
						gsap.set("#dining-gallery", { opacity: 1, pointerEvents: "all" })
						diningGallerySetActiveRef.current(true)
						diningGalleryAnimateInRef.current()
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToDiningGalleryRef.current = goToDiningGallery

			/* dining gallery → dining intro (back from gallery) */
			const goToDiningIntroBack = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 5
				diningGallerySetActiveRef.current(false)

				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#dining-gallery", { opacity: 0, y: 40, duration: 0.55, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.4)
					.call(() => {
						gsap.set("#dining-gallery", { opacity: 0, pointerEvents: "none" })
						gsap.set("#dg-header", { opacity: 0 })
						gsap.set("#dining-intro", { opacity: 1, y: 0, scale: 1, pointerEvents: "all" })
						animateDiningIntroIn()
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToDiningIntroBackRef.current = goToDiningIntroBack

			/* dining intro → eco (back) */
			const goToEcoFromDining = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 4
				ecoJustEnteredRef.current = true
				setTimeout(() => {
					ecoJustEnteredRef.current = false
				}, 900)

				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#dining-intro", { opacity: 0, y: 40, duration: 0.55, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.4)
					.call(() => {
						gsap.set("#dining-intro", { opacity: 0, pointerEvents: "none" })
						gsap.set("#ecosystem", { opacity: 1, y: 0, scale: 1, pointerEvents: "all" })
						document.getElementById("ecosystem")?.classList.add("active")
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToEcoFromDiningRef.current = goToEcoFromDining

			/* dining gallery → attractions intro (forward) */
			const goToAttractions = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 7
				diningGallerySetActiveRef.current(false)
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#dining-gallery", { opacity: 0, y: -42, duration: 0.6, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.45)
					.call(() => {
						gsap.set("#dining-gallery", { opacity: 0, pointerEvents: "none" })
						gsap.set("#dg-header", { opacity: 0 })
						gsap.set("#attractions-intro", { opacity: 1, y: 0, pointerEvents: "all" })
						animateAttractionsIn()
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToAttractionsRef.current = goToAttractions

			/* attractions intro → dining gallery (back) */
			const goFromAttractionsBack = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 6
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#attractions-intro", { opacity: 0, y: 40, duration: 0.55, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.4)
					.call(() => {
						gsap.set("#attractions-intro", { opacity: 0, pointerEvents: "none" })
						gsap.set("#dining-gallery", { opacity: 1, y: 0, pointerEvents: "all" })
						diningGallerySetActiveRef.current(true)
						diningGalleryAnimateInRef.current()
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goFromAttractionsBackRef.current = goFromAttractionsBack

			/* attractions intro → attractions gallery */
			const goToAttractionsGallery = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 8
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#attractions-intro", { opacity: 0, y: -42, duration: 0.6, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.45)
					.call(() => {
						gsap.set("#attractions-intro", { pointerEvents: "none" })
						gsap.set("#attractions-gallery", { opacity: 1, pointerEvents: "all" })
						attrGallerySetActiveRef.current(true)
						attrGalleryAnimateInRef.current()
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToAttractionsGalleryRef.current = goToAttractionsGallery

			/* attractions gallery → attractions intro (back) */
			const goToAttractionsIntroBack = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 7
				attrGallerySetActiveRef.current(false)
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#attractions-gallery", { opacity: 0, y: 40, duration: 0.55, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.4)
					.call(() => {
						gsap.set("#attractions-gallery", { opacity: 0, pointerEvents: "none" })
						gsap.set("#ag-header", { opacity: 0 })
						gsap.set("#ag-progress", { opacity: 0 })
						gsap.set("#attractions-intro", { opacity: 1, pointerEvents: "all" })
						animateAttractionsIn()
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToAttractionsIntroBackRef.current = goToAttractionsIntroBack

			/* attractions gallery → finale */
			const goToFinale = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 9
				attrGallerySetActiveRef.current(false)
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#attractions-gallery", { opacity: 0, y: -38, duration: 0.6, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.2 }, 0.45)
					.call(() => {
						gsap.set("#attractions-gallery", { opacity: 0, pointerEvents: "none" })
						gsap.set("#ag-header", { opacity: 0 })
						gsap.set("#ag-progress", { opacity: 0 })
						gsap.set("#finale", { opacity: 1, y: 0, pointerEvents: "all" })
						finaleSetActiveRef.current(true)
						finaleAnimateInRef.current()
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToFinaleRef.current = goToFinale

			/* finale → attractions gallery (back) */
			const goToAttractionsFromFinale = () => {
				if (isTransitioningRef.current) return
				beginTransition()
				currentSectionRef.current = 8
				finaleSetActiveRef.current(false)
				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to("#finale", { opacity: 0, y: 38, duration: 0.55, ease: "power2.in" })
					.to("#sectionWipe", { opacity: 1, duration: 0.2 }, 0.4)
					.call(() => {
						gsap.set("#finale", { opacity: 0, y: 0, pointerEvents: "none" })
						gsap.set("#attractions-gallery", { opacity: 1, y: 0, pointerEvents: "all" })
						attrGallerySetActiveRef.current(true)
						attrGalleryAnimateInRef.current()
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			goToAttractionsFromFinaleRef.current = goToAttractionsFromFinale

			/* ── Attractions animate-in ── */
			const animateAttractionsIn = () => {
				gsap.set(".ai-eyebrow", { opacity: 0, y: 12 })
				gsap.set(".ai-headline", { opacity: 0, y: 18 })
				gsap.set(".ai-divider", { opacity: 0 })
				gsap.set(".ai-sub", { opacity: 0, y: 12 })
				gsap.set(".ai-stats", { opacity: 0, y: 10 })
				gsap.set(".ai-scroll", { opacity: 0 })
				const tl = gsap.timeline()
				tl.to(".ai-eyebrow", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0)
					.to(".ai-headline", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.15)
					.to(".ai-divider", { opacity: 1, duration: 0.5 }, 0.5)
					.to(".ai-sub", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.6)
					.to(".ai-stats", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.8)
					.to(".ai-scroll", { opacity: 1, duration: 0.5 }, 1.05)
			}

			/* ── Generic jump-to (for nav clicks from any section) ── */
			const jumpToSection = (targetSec: number) => {
				if (isTransitioningRef.current) return
				if (currentSectionRef.current === targetSec) return
				beginTransition()
				const prevSec = currentSectionRef.current
				currentSectionRef.current = targetSec

				/* Clean up special states */
				diningGallerySetActiveRef.current(false)
				attrGallerySetActiveRef.current(false)
				finaleSetActiveRef.current(false)
				document.getElementById("ecosystem")?.classList.remove("active")

				const tl = gsap.timeline({ onComplete: endTransition })
				tl.to(
					SECTION_IDS.filter((_, i) => i === prevSec),
					{ opacity: 0, duration: 0.45, ease: "power2.in" },
				)
					.to("#sectionWipe", { opacity: 1, duration: 0.18 }, 0.35)
					.call(() => {
						SECTION_IDS.forEach((id, i) => {
							gsap.set(id, { opacity: i === targetSec ? 1 : 0, y: 0, scale: 1, pointerEvents: i === targetSec ? "all" : "none" })
						})
						if (targetSec === 1) {
							if (currentChapterRef.current < 0) showChapter(0, true)
							gsap.to("#why-header", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
							gsap.to("#why-scroll-hint", { opacity: 0.8, duration: 0.5, delay: 0.3 })
						}
						if (targetSec === 2) animateRetailIntroIn()
						if (targetSec === 5) animateDiningIntroIn()
						if (targetSec === 7) animateAttractionsIn()
						if (targetSec === 9) {
							finaleSetActiveRef.current(true)
							finaleAnimateInRef.current()
						}
						if (targetSec === 4) {
							ecoJustEnteredRef.current = true
							setTimeout(() => {
								ecoJustEnteredRef.current = false
							}, 900)
							document.getElementById("ecosystem")?.classList.add("active")
						}
					})
					.to("#sectionWipe", { opacity: 0, duration: 0.4, ease: "power2.out" })
			}
			jumpToSectionRef.current = jumpToSection

			/* ══ LOADER TIMELINE ══ */
			const pctEl = root.querySelector<HTMLElement>("#loaderPct")
			const diagHalf = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2
			const iconHalfDiag = Math.sqrt(86 ** 2 + 96 ** 2)
			const fillScale = (diagHalf / iconHalfDiag) * 1.15

			const loader = gsap.timeline({ defaults: { ease: LUX } })
			loader
				.to("#burjPath", { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 0.15)
				.to(
					"#ringProgress",
					{
						strokeDashoffset: 0,
						duration: 2.1,
						ease: "power1.inOut",
						onUpdate: function (this: gsap.core.Tween) {
							if (pctEl) pctEl.textContent = Math.round(this.progress() * 100) + "%"
						},
					},
					0.4,
				)
				.to("#loaderFill", { width: "100%", duration: 2.1, ease: "power1.inOut" }, 0.4)
				.to("#introCopy", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.6)
				.to(".b-accent", { opacity: 1, duration: 0.3, stagger: 0.08 }, 1.4)
				.to("#burjGround", { opacity: 1, duration: 0.35 }, 1.62)
				.to("#loaderRing", { opacity: 0, duration: 0.3, ease: "power2.in" }, 3.0)
				.to("#introCopy", { opacity: 0, y: -8, duration: 0.35, ease: "power2.in" }, 3.0)
				.to(".loader-bar-outer", { opacity: 0, duration: 0.25 }, 3.0)
				.to(".b-accent, #burjGround", { opacity: 0, duration: 0.25 }, 3.0)
				.to("#burjPath", { fill: "#C8A96E", fillOpacity: 1, stroke: "none", duration: 0.3, ease: "none" }, 3.1)
				.to("#iconGlow", { opacity: 1, scale: 1.8, duration: 0.5, ease: "power2.out" }, 3.15)
				.to(
					"#iconWrap",
					{
						scale: fillScale,
						duration: 0.85,
						ease: "power3.in",
						transformOrigin: "center center",
						onStart() {
							gsap.set("#hero", { opacity: 1, pointerEvents: "all" })
						},
					},
					3.62,
				)
				.to("#goldOverlay", { opacity: 1, duration: 0.35, ease: "power2.in" }, 4.3)
				.to(
					"#intro",
					{
						opacity: 0,
						duration: 0.55,
						ease: "power2.in",
						onComplete() {
							const introEl = document.getElementById("intro")
							if (introEl) introEl.style.display = "none"
						},
					},
					4.5,
				)
				.to("#heroNav", { opacity: 1, y: 0, duration: 0.8, pointerEvents: "all" }, 4.7)
				.to("#hEyebrow", { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, 4.9)
				.to(".h-line", { opacity: 1, y: 0, duration: 0.8, stagger: 0.13, ease: "power3.out" }, 5.05)
				.to("#hDivider", { opacity: 1, duration: 0.6 }, 5.5)
				.to("#hSub", { opacity: 1, y: 0, duration: 0.7 }, 5.6)
				.to("#scrollCue", { opacity: 1, y: 0, duration: 0.65 }, 5.85)
				.to("#sideInd", { opacity: 1, duration: 0.7 }, 6.0)
				.call(
					() => {
						wheelReadyRef.current = true
					},
					undefined,
					6.1,
				)
		},
		{ scope: containerRef },
	)

	useWheelHandler({
		onScroll: (dir) => {
			if (!wheelReadyRef.current) return

			const sec = currentSectionRef.current

			/* Gallery (section 6) handles its own wheel via capture listener */
			if (sec === 6) return
			/* Attractions gallery (section 8) handles its own wheel via capture listener */
			if (sec === 8) return
			/* Finale (section 9) handles its own wheel via capture listener */
			if (sec === 9) return

			/* Ecosystem has its own timing/blocking logic */
			if (sec === 4) {
				if (ecoJustEnteredRef.current) return
				if (ecoGetFlipRef.current()) return
				const now = Date.now()
				if (now - lastWheelRef.current < 950) return
				lastWheelRef.current = now
				if (dir > 0) {
					const idx = ecoGetIdxRef.current()
					if (idx < 3) ecoFlipRef.current(idx + 1, 1)
					else goToDiningIntroRef.current()
				} else {
					const idx = ecoGetIdxRef.current()
					if (idx > 0) ecoFlipRef.current(idx - 1, -1)
					else goToRetailBrandsFromEcoRef.current()
				}
				return
			}

			/* All other sections use standard cooldown */
			if (isTransitioningRef.current) return

			if (sec === 0) {
				if (dir > 0) goToWhyRef.current()
			} else if (sec === 1) {
				const now = Date.now()
				if (now - lastWhyStepRef.current < WHY_STEP_COOLDOWN_MS) return
				if (dir > 0) {
					if (currentChapterRef.current < 4) showChapterRef.current(currentChapterRef.current + 1)
					else goToRetailIntroRef.current()
				} else {
					if (currentChapterRef.current > 0) showChapterRef.current(currentChapterRef.current - 1)
					else goToHeroRef.current()
				}
				lastWhyStepRef.current = now
			} else if (sec === 2) {
				if (dir > 0) goToRetailBrandsRef.current()
				else goToRetailIntroBackRef.current()
			} else if (sec === 3) {
				if (dir > 0) goToEcosystemRef.current()
				else goToRetailIntroFromBrandsRef.current()
			} else if (sec === 5) {
				if (dir > 0) goToDiningGalleryRef.current()
				else goToEcoFromDiningRef.current()
			} else if (sec === 7) {
				if (dir > 0) goToAttractionsGalleryRef.current()
				else goFromAttractionsBackRef.current()
			}
		},
		cooldown: 700,
	})

	return (
		<div
			ref={containerRef}
			style={{
				width: "100%",
				height: "100vh",
				overflow: "hidden",
				background: "var(--c-void)",
				WebkitFontSmoothing: "antialiased",
			}}
		>
			<GrainOverlay />
			<SectionWipe />
			<IntroLoader />
			<GlobalNav
				onWhy={() => jumpToSectionRef.current(1)}
				onRetail={() => jumpToSectionRef.current(2)}
				onDining={() => jumpToSectionRef.current(5)}
				onAttractions={() => jumpToSectionRef.current(7)}
				onPlanVisit={() => jumpToSectionRef.current(9)}
			/>
			<HeroSection />
			<WhySection />
			<RetailIntroSection />
			<RetailBrandsSection />
			<EcosystemSection
				onReady={(flipTo, getIdx, getFlipping) => {
					ecoFlipRef.current = flipTo
					ecoGetIdxRef.current = getIdx
					ecoGetFlipRef.current = getFlipping
				}}
			/>
			<DiningIntroSection />
			<DiningGallerySection
				onReady={(setActive, animateIn) => {
					diningGallerySetActiveRef.current = setActive
					diningGalleryAnimateInRef.current = animateIn
				}}
				onBackEdge={() => goToDiningIntroBackRef.current()}
				onForwardEdge={() => goToAttractionsRef.current()}
			/>
			<AttractionsIntroSection />
			<AttractionsGallerySection
				onReady={(setActive, animateIn) => {
					attrGallerySetActiveRef.current = setActive
					attrGalleryAnimateInRef.current = animateIn
				}}
				onBackEdge={() => goToAttractionsIntroBackRef.current()}
				onForwardEdge={() => goToFinaleRef.current()}
			/>
			<FinaleSection
				onReady={(setActive, animateIn) => {
					finaleSetActiveRef.current = setActive
					finaleAnimateInRef.current = animateIn
				}}
				onBackEdge={() => goToAttractionsFromFinaleRef.current()}
			/>
		</div>
	)
}

import type { ReactNode } from "react"

export interface WhyChapter {
	id: number
	num: string
	stat: string
	unit: string
	title: string
	desc: string
	imgLabel: string
	img: string
}

export interface WhyVisualStyle {
	background: string
}

export interface BrandTile {
	id: string
	isHero?: boolean
	ambient: string
	category: string
	name: string
	desc: string
	tag: string
	logo?: ReactNode
	img: string
}

export interface EcoLogo {
	t: string
	c: string
}

export interface EcoCategory {
	id: string
	eyebrow: string
	title: string
	titleItalic: string
	desc: string
	stat: string
	statLabel: string
	catBg: string
	logosBg: string
	logos: EcoLogo[][]
}

export interface DiningCard {
	size: "large" | "small"
	zigzag?: "up" | "down"
	img: string
	tag: string
	title: string
}

export interface DiningGallerySectionProps {
	onReady: (setActive: (v: boolean) => void, animateIn: () => void) => void
	onBackEdge: () => void
	onForwardEdge?: () => void
}

export interface AttractionCard {
	eyebrow: string
	title: string
	titleEm: string
	desc: string
	number: string
	img: string
}

export interface AttractionsGallerySectionProps {
	onReady: (setActive: (v: boolean) => void, animateIn: () => void) => void
	onBackEdge: () => void
	onForwardEdge?: () => void
}

export interface GlobalNavProps {
	onWhy: () => void
	onRetail: () => void
	onDining: () => void
	onAttractions: () => void
	onPlanVisit: () => void
}

export type NavKey = "why" | "retail" | "dining" | "attractions"

export interface NavItem {
	label: string
	key: NavKey
}

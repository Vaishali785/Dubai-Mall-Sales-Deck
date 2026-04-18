import type { WhyChapter, WhyVisualStyle } from "@/types/app-types"

export const WHY_CHAPTERS: WhyChapter[] = [
	{
		id: 0,
		num: "01 — Position",
		stat: "#1",
		unit: "",
		title: "The World's Most Visited",
		desc: "Consistently ranked the world's most visited retail and leisure destination. Presence here is not simply an address — it is an unmistakable statement of global authority.",
		imgLabel: "Global No.1",
		img: "/images/why-section/why-1.jpg",
	},
	{
		id: 1,
		num: "02 — Scale",
		stat: "1,200",
		unit: "+",
		title: "Retail Stores & Destinations",
		desc: "From global luxury flagships to cult streetwear labels, The Dubai Mall houses the world's most complete commercial ecosystem under one iconic, architecturally revered roof.",
		imgLabel: "Retail Scale",
		img: "/images/why-section/dubai-luxury-corridor.png",
	},
	{
		id: 2,
		num: "03 — Reach",
		stat: "80",
		unit: "+",
		title: "International Source Markets",
		desc: "Visitors arrive from over 80 countries every week. No other mall on earth delivers this calibre of international, culturally diverse, high-net-worth consumer traffic.",
		imgLabel: "International Reach",
		img: "/images/why-section/why-3.jpg",
	},
	{
		id: 3,
		num: "04 — Dining",
		stat: "200",
		unit: "+",
		title: "Dining & Lifestyle Outlets",
		desc: "A city within a city — world-class dining, entertainment, and lifestyle experiences keep visitors present for hours, dramatically amplifying dwell time and brand exposure.",
		imgLabel: "Dining & Lifestyle",
		img: "/images/dining/dining_hall.png",
	},

	{
		id: 4,
		num: "05 — Footfall",
		stat: "105",
		unit: "M+",
		title: "Unrivalled Annual Footfall",
		desc: "More visitors than the entire population of Germany pass through these doors each year — a captive, high-spending audience unlike any other retail destination on the planet.",
		imgLabel: "Footfall & Visitors",
		img: "/images/why-section/footfall.png",
	},
]

export const WHY_BG_STYLES: WhyVisualStyle[] = [
	{
		background:
			"radial-gradient(ellipse 80% 60% at 65% 30%, rgba(200,149,60,.18) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 15% 80%, rgba(80,55,15,.12) 0%, transparent 50%), #060504",
	},
	{
		background:
			"radial-gradient(ellipse 55% 80% at 50% 0%, rgba(200,169,110,.16) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 80% 95%, rgba(170,110,25,.1) 0%, transparent 50%), #060504",
	},
	{
		background:
			"radial-gradient(ellipse 75% 50% at 15% 55%, rgba(140,110,50,.15) 0%, transparent 55%), radial-gradient(ellipse 55% 50% at 85% 35%, rgba(55,45,130,.1) 0%, transparent 50%), #060504",
	},
	{
		background:
			"radial-gradient(ellipse 70% 55% at 75% 30%, rgba(190,130,45,.16) 0%, transparent 60%), radial-gradient(ellipse 40% 55% at 10% 75%, rgba(95,70,25,.1) 0%, transparent 50%), #060504",
	},
	{
		background:
			"radial-gradient(ellipse 60% 70% at 50% 10%, rgba(200,169,110,.2) 0%, transparent 60%), radial-gradient(ellipse 80% 45% at 50% 100%, rgba(95,70,20,.12) 0%, transparent 50%), #060504",
	},
]

export const WHY_IMG_STYLES: WhyVisualStyle[] = [
	{
		background:
			"radial-gradient(ellipse 70% 60% at 60% 40%, rgba(200,149,60,.3) 0%, transparent 55%), linear-gradient(155deg, #1a1208 0%, #0c0906 40%, #080706 100%)",
	},
	{
		background:
			"radial-gradient(ellipse 50% 80% at 50% 10%, rgba(190,155,90,.2) 0%, transparent 55%), linear-gradient(170deg, #12100d 0%, #080705 60%, #060504 100%)",
	},
	{
		background:
			"radial-gradient(ellipse 80% 45% at 20% 55%, rgba(60,80,160,.15) 0%, transparent 55%), linear-gradient(145deg, #0a0c12 0%, #070608 50%, #060504 100%)",
	},
	{
		background:
			"radial-gradient(ellipse 65% 55% at 65% 35%, rgba(190,120,40,.25) 0%, transparent 60%), linear-gradient(160deg, #160e07 0%, #0a0806 50%, #060504 100%)",
	},
	{
		background:
			"radial-gradient(ellipse 55% 75% at 50% 5%, rgba(200,169,110,.22) 0%, transparent 58%), linear-gradient(180deg, #141008 0%, #080705 55%, #060504 100%)",
	},
]

import type { BrandTile } from "@/types/app-types"
import { AppleLogo, CartierLogo, LvLogo, NikeLogo } from "../../public/svgs/retailBrandLogos"

export const TICKER_BRANDS = [
	"Hermès",
	"Chanel",
	"Rolex",
	"Dior",
	"Gucci",
	"Prada",
	"Burberry",
	"Valentino",
	"Bottega Veneta",
	"Balenciaga",
	"Saint Laurent",
	"Givenchy",
]

export const BRAND_TILES: BrandTile[] = [
	{
		id: "bt-lv",
		isHero: true,
		ambient:
			"radial-gradient(ellipse 70% 50% at 55% 30%,rgba(200,149,60,.14) 0%,transparent 58%),radial-gradient(ellipse 50% 60% at 20% 80%,rgba(120,90,30,.1) 0%,transparent 50%),linear-gradient(162deg,#16100a 0%,#0e0b07 40%,#060504 100%)",
		logo: <LvLogo />,
		category: "Luxury Fashion · Maison",
		name: "Louis\nVuitton",
		desc: "The world's most storied luxury house — leather goods, haute maroquinerie & ready-to-wear",
		tag: "Fashion Avenue Flagship",
		img: "/images/retail/lv.png",
	},
	{
		id: "bt-apple",
		ambient:
			"radial-gradient(ellipse 65% 55% at 50% 30%,rgba(140,150,170,.09) 0%,transparent 60%),linear-gradient(170deg,#0e0f13 0%,#090a0d 45%,#060504 100%)",
		logo: <AppleLogo />,
		category: "Technology · Flagship",
		name: "Apple",
		desc: "The region's most immersive Apple Store — Genius Bar, Studio & full product ecosystem",
		tag: "Tech Flagship",
		img: "/images/retail/apple.png",
	},
	{
		id: "bt-cartier",
		ambient:
			"radial-gradient(ellipse 60% 55% at 45% 35%,rgba(160,40,40,.08) 0%,transparent 58%),radial-gradient(ellipse 45% 40% at 80% 70%,rgba(200,149,60,.09) 0%,transparent 50%),linear-gradient(155deg,#150a0a 0%,#0d0808 45%,#060504 100%)",
		logo: <CartierLogo />,
		category: "Jewellery · Watches",
		name: "Cartier",
		desc: "Fine jewellery, haute horlogerie & luxury accessories — UAE flagship boutique",
		tag: "Jewellery · Maison",
		img: "/images/retail/cartier.png",
	},
	{
		id: "bt-nike",
		ambient:
			"radial-gradient(ellipse 60% 50% at 40% 50%,rgba(45,45,65,.14) 0%,transparent 55%),linear-gradient(160deg,#0f0e13 0%,#0a0910 45%,#060504 100%)",
		logo: <NikeLogo />,
		category: "Sport · Lifestyle",
		name: "Nike",
		desc: "Global sportswear leader with immersive multi-floor flagship retail format",
		tag: "Lifestyle Flagship",
		img: "/images/retail/nike.png",
	},
	{
		id: "bt-zara",
		ambient:
			"radial-gradient(ellipse 55% 60% at 60% 35%,rgba(140,125,95,.09) 0%,transparent 55%),linear-gradient(158deg,#141210 0%,#0d0c0a 45%,#060504 100%)",
		category: "Global Fashion",
		name: "Zara",
		desc: "Global fashion powerhouse — three flagship levels of curated contemporary collections",
		tag: "Fashion · Multi-level",
		img: "/images/retail/zara.png",
	},
]

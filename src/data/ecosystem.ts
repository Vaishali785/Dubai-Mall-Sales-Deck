import type { EcoCategory } from "@/types/app-types"

export const CATS: EcoCategory[] = [
	{
		id: "luxury",
		eyebrow: "01 — Luxury Fashion",
		title: "Luxury",
		titleItalic: "Fashion",
		desc: "The world's most prestigious fashion houses, in dedicated flagship environments with bespoke service and five-star standards.",
		stat: "60+",
		statLabel: "Luxury\nMaisons",
		catBg:
			"radial-gradient(ellipse 75% 65% at 25% 40%,rgba(200,149,60,.14) 0%,transparent 58%),radial-gradient(ellipse 50% 50% at 80% 80%,rgba(160,100,30,.08) 0%,transparent 50%),linear-gradient(160deg,#1c1510 0%,#0f0c08 55%,#060504 100%)",
		logosBg: "radial-gradient(ellipse 65% 60% at 65% 35%,rgba(200,160,60,.07) 0%,transparent 60%),#060504",
		logos: [
			[
				{ t: "Prada", c: "lg" },
				{ t: "Saint Laurent", c: "up" },
				{ t: "Balenciaga", c: "" },
			],
			[
				{ t: "Fendi", c: "sm" },
				{ t: "Valentino", c: "lg" },
				{ t: "Bottega Veneta", c: "" },
				{ t: "Givenchy", c: "sm" },
			],
			[
				{ t: "Dolce & Gabbana", c: "up" },
				{ t: "Versace", c: "lg" },
				{ t: "Burberry", c: "" },
			],
			[
				{ t: "Alexander McQueen", c: "sm" },
				{ t: "Jimmy Choo", c: "" },
				{ t: "Ferragamo", c: "sm dn" },
				{ t: "Tiffany & Co", c: "" },
				{ t: "Chopard", c: "sm" },
			],
		],
	},
	{
		id: "global",
		eyebrow: "02 — Global Fashion",
		title: "Global",
		titleItalic: "Fashion",
		desc: "International fashion powerhouses delivering trend-forward retail to a diverse, sophisticated global audience.",
		stat: "120+",
		statLabel: "Fashion\nRetailers",
		catBg:
			"radial-gradient(ellipse 65% 60% at 75% 40%,rgba(155,135,95,.1) 0%,transparent 58%),radial-gradient(ellipse 45% 45% at 15% 75%,rgba(120,100,60,.06) 0%,transparent 50%),linear-gradient(145deg,#141210 0%,#0e0c0a 55%,#060504 100%)",
		logosBg: "radial-gradient(ellipse 60% 55% at 35% 55%,rgba(145,125,80,.05) 0%,transparent 60%),#060504",
		logos: [
			[
				{ t: "H&M", c: "lg" },
				{ t: "Uniqlo", c: "up" },
				{ t: "Mango", c: "" },
				{ t: "COS", c: "sm" },
			],
			[
				{ t: "Massimo Dutti", c: "" },
				{ t: "Pull & Bear", c: "sm" },
				{ t: "Bershka", c: "lg" },
				{ t: "Stradivarius", c: "sm up" },
			],
			[
				{ t: "Muji", c: "" },
				{ t: "Ted Baker", c: "lg" },
				{ t: "Superdry", c: "sm" },
				{ t: "Levi's", c: "" },
			],
			[
				{ t: "Guess", c: "sm dn" },
				{ t: "American Eagle", c: "" },
				{ t: "Hollister", c: "sm" },
			],
		],
	},
	{
		id: "tech",
		eyebrow: "03 — Technology",
		title: "Technology",
		titleItalic: "& Innovation",
		desc: "The region's most complete technology retail destination — from global consumer electronics to professional creative tools.",
		stat: "40+",
		statLabel: "Technology\nRetailers",
		catBg:
			"radial-gradient(ellipse 65% 60% at 30% 40%,rgba(55,65,125,.14) 0%,transparent 58%),radial-gradient(ellipse 50% 45% at 85% 75%,rgba(40,50,100,.08) 0%,transparent 50%),linear-gradient(155deg,#0d0e14 0%,#0a0b0e 55%,#060504 100%)",
		logosBg: "radial-gradient(ellipse 55% 55% at 65% 40%,rgba(70,80,145,.07) 0%,transparent 58%),#060504",
		logos: [
			[
				{ t: "Samsung", c: "lg" },
				{ t: "Huawei", c: "up" },
				{ t: "Sony", c: "" },
				{ t: "Dyson", c: "sm" },
			],
			[
				{ t: "Bose", c: "" },
				{ t: "Xiaomi", c: "sm dn" },
				{ t: "LG", c: "lg" },
				{ t: "Panasonic", c: "" },
			],
			[
				{ t: "Bang & Olufsen", c: "up" },
				{ t: "Garmin", c: "sm" },
				{ t: "DJI", c: "" },
				{ t: "Microsoft", c: "lg" },
			],
			[
				{ t: "Canon", c: "sm" },
				{ t: "Nikon", c: "" },
				{ t: "GoPro", c: "sm dn" },
			],
		],
	},
	{
		id: "beauty",
		eyebrow: "04 — Beauty & Lifestyle",
		title: "Beauty",
		titleItalic: "& Lifestyle",
		desc: "A curated constellation of global beauty authorities — from heritage French perfumers to contemporary cult beauty innovators.",
		stat: "80+",
		statLabel: "Beauty &\nLifestyle Brands",
		catBg:
			"radial-gradient(ellipse 60% 65% at 72% 38%,rgba(175,75,95,.1) 0%,transparent 55%),radial-gradient(ellipse 45% 45% at 18% 70%,rgba(200,149,60,.08) 0%,transparent 50%),linear-gradient(155deg,#140f10 0%,#0e0b0c 55%,#060504 100%)",
		logosBg: "radial-gradient(ellipse 60% 55% at 35% 42%,rgba(175,75,95,.05) 0%,transparent 55%),#060504",
		logos: [
			[
				{ t: "Sephora", c: "lg" },
				{ t: "Jo Malone", c: "up" },
				{ t: "Bath & Body Works", c: "" },
				{ t: "Lush", c: "sm" },
			],
			[
				{ t: "MAC Cosmetics", c: "" },
				{ t: "Kiehl's", c: "sm dn" },
				{ t: "Aesop", c: "lg" },
				{ t: "Charlotte Tilbury", c: "" },
			],
			[
				{ t: "Huda Beauty", c: "up" },
				{ t: "Benefit Cosmetics", c: "sm" },
				{ t: "The Body Shop", c: "" },
				{ t: "Rituals", c: "sm" },
			],
			[
				{ t: "La Mer", c: "lg" },
				{ t: "Estée Lauder", c: "" },
				{ t: "Bobbi Brown", c: "sm dn" },
			],
		],
	},
]

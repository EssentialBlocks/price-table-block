import * as typoPrefixs from "./constants/typographyPrefixConstants";
import {
	generateTypographyAttributes,
	generateResponsiveRangeAttributes,
	generateDimensionsAttributes,
	generateBackgroundAttributes,
	generateBorderShadowAttributes,
} from "../util/helpers";
import {
	buttonIconSpacing,
	buttonIconSize,
	headerIconSize,
	headerIconWidth,
	headerIconHeight,
	buttonPadding,
	buttonMargin,
	wrapperMargin,
	wrapperPadding,
	titleMargin,
	titlePadding,
	priceCurrencyMargin,
	buttonBackgroundControl,
	priceTableBackground,
	buttonBorderShadow,
	wrapperBorderShadow,
	iconBorderShadow,
	salepriceCurrencyMargin,
	featuresIconSize,
} from "./constants";

const attributes = {
	// the following 4 attributes is must required for responsive options and asset generation for frontend
	// responsive control attributes ⬇
	resOption: {
		type: "string",
		default: "Desktop",
	},
	// blockId attribute for making unique className and other uniqueness ⬇
	blockId: {
		type: "string",
	},
	blockRoot: {
		type: "string",
		default: "essential_block",
	},
	// blockMeta is for keeping all the styles ⬇
	blockMeta: {
		type: "object",
	},
	pricingStyle: {
		type: "string",
		default: "style-1",
	},
	title: {
		type: "string",
		source: "text",
		selector: ".ebgb-pricing .header .ebgb-pricing-title",
		default: "Startup",
	},
	defaultSubtitle: {
		type: "boolean",
	},
	showSubtitle: {
		type: "boolean",
		default: false,
	},
	subtitle: {
		type: "string",
		source: "text",
		selector: ".ebgb-pricing .header .ebgb-pricing-subtitle",
		default: "A tagline here.",
	},
	defaultHeaderIcon: {
		type: "boolean",
	},
	showHeaderIcon: {
		type: "boolean",
		default: false,
	},
	headerIcon: {
		type: "attribute",
		selector: ".ebgb-pricing-icon",
		attribute: "data-icon",
		default: "fas fa-home",
	},
	defaultTitleLine: {
		type: "boolean",
	},
	showTitleLine: {
		type: "boolean",
		default: true,
	},
	mainPrice: {
		type: "string",
		source: "attribute",
		selector: ".ebgb-pricing-tag .original-price",
		attribute: "data-price",
		default: "99",
	},
	showOnSale: {
		type: "boolean",
		default: false,
	},
	salePrice: {
		type: "string",
		source: "attribute",
		selector: ".ebgb-pricing-tag .sale-price",
		attribute: "data-sale-price",
		default: "89",
	},
	priceCurrency: {
		type: "string",
		source: "text",
		selector: ".ebgb-pricing-tag .price-currency",
		default: "$",
	},
	currencyPlacement: {
		type: "string",
		default: "left",
	},
	pricePeriod: {
		type: "string",
		source: "attribute",
		selector: ".ebgb-pricing-tag .price-period",
		attribute: "data-price-period",
		default: "month",
	},
	periodSeparator: {
		type: "string",
		source: "attribute",
		selector: ".ebgb-pricing-tag .price-period",
		attribute: "data-period-separator",
		default: "/",
	},
	features: {
		type: "array",
		source: "query",
		selector: ".ebgb-pricing .body ul li",
		query: {
			text: {
				type: "string",
				source: "text",
				selector: ".ebgb-pricebox-feature-text",
			},
			icon: {
				type: "string",
				source: "attribute",
				attribute: "data-icon",
			},
			color: {
				type: "string",
				source: "attribute",
				attribute: "data-color",
			},
			link: {
				type: "string",
				source: "attribute",
				attribute: "data-link",
			},
			clickable: {
				type: "string",
				source: "attribute",
				attribute: "data-clickable",
			},
		},
		default: [
			{
				icon: "fas fa-check",
				text: "Unlimited Calls",
				color: "#03bb89",
				clickable: "false",
				link: "",
			},
			{
				icon: "fas fa-check",
				text: "Free Hosting",
				color: "#03bb89",
				clickable: "false",
				link: "",
			},
			{
				icon: "fas fa-check",
				text: "500MB free storage",
				color: "#03bb89",
				clickable: "false",
				link: "",
			},
			{
				icon: "fas fa-check",
				text: "24/7 Support",
				color: "#03bb89",
				clickable: "false",
				link: "",
			},
		],
	},
	showButton: {
		type: "boolean",
		default: true,
	},
	buttonIcon: {
		type: "attribute",
		selector: ".ebgb-pricing .footer",
		attribute: "data-icon",
	},
	buttonIconPosition: {
		type: "string",
		default: "left",
	},
	buttonText: {
		type: "string",
		default: "Choose Plan",
	},
	titleTextColor: {
		type: "string",
		default: "blue",
	},
	titleLineColor: {
		type: "string",
		default: "#dbdbdb",
	},
	titleBackgroundColor: {
		type: "string",
	},
	subtitleTextColor: {
		type: "string",
		default: "#6d6d6d",
	},
	showIconBackground: {
		type: "boolean",
		default: true,
	},
	iconBackgroundColor: {
		type: "string",
	},
	iconBackgroundHoverColor: {
		type: "string",
	},
	iconColor: {
		type: "string",
		default: "#333",
	},
	iconHoverColor: {
		type: "string",
		default: "#333",
	},
	priceTextColor: {
		type: "string",
	},
	priceCurrencyTextColor: {
		type: "string",
	},
	salePriceTextColor: {
		type: "string",
	},
	salepriceCurrencyTextColor: {
		type: "string",
	},
	pricingPeriodTextColor: {
		type: "string",
	},
	featuresTextColor: {
		type: "string",
	},
	contentAlign: {
		type: "String",
		default: "center",
	},
	showRibbon: {
		type: "boolean",
		default: false,
	},
	ribbonStyle: {
		type: "string",
		default: "ribbon-1",
	},
	ribbonText: {
		type: "string",
		default: "featured",
	},
	ribbonColor: {
		type: "string",
		default: "#ffffff",
	},
	ribbonBackgroundColor: {
		type: "string",
		default: "#00c853",
	},
	buttonTextColor: {
		type: "string",
		default: "#ffffff",
	},
	hoverTextColor: {
		type: "string",
	},
	buttonURL: {
		type: "string",
		default: "#",
	},
	...generateResponsiveRangeAttributes(buttonIconSpacing, {
		defaultRange: 0,
		noUnits: true,
	}),
	...generateResponsiveRangeAttributes(buttonIconSize, {
		defaultRange: 20,
		noUnits: true,
	}),
	...generateResponsiveRangeAttributes(headerIconSize, {
		defaultRange: 30,
	}),
	...generateResponsiveRangeAttributes(headerIconWidth, {
		defaultRange: 80,
	}),
	...generateResponsiveRangeAttributes(headerIconHeight, {
		defaultRange: 80,
	}),
	...generateResponsiveRangeAttributes(featuresIconSize, {
		defaultRange: 20,
	}),
	...generateDimensionsAttributes(buttonPadding),
	...generateDimensionsAttributes(buttonMargin),
	...generateDimensionsAttributes(wrapperMargin),
	...generateDimensionsAttributes(wrapperPadding),
	...generateDimensionsAttributes(titlePadding),
	...generateDimensionsAttributes(titleMargin),
	...generateDimensionsAttributes(priceCurrencyMargin),
	...generateDimensionsAttributes(salepriceCurrencyMargin),
	// typography attributes
	...generateTypographyAttributes(Object.values(typoPrefixs)),
	// background attributes
	...generateBackgroundAttributes(buttonBackgroundControl, {
		defaultFillColor: "#00c853",
	}),
	...generateBackgroundAttributes(priceTableBackground),
	// border shadow attriubtes
	...generateBorderShadowAttributes(buttonBorderShadow),
	...generateBorderShadowAttributes(wrapperBorderShadow),
	...generateBorderShadowAttributes(iconBorderShadow),
};

export default attributes;

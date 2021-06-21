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
	subtitle: {
		type: "string",
		source: "text",
		selector: ".ebgb-pricing .header .ebgb-pricing-subtitle",
		default: "A tagline here.",
	},
	headerIcon: {
		type: "attribute",
		selector: ".ebgb-pricing-icon",
		attribute: "data-icon",
		default: "fas fa-home",
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
		default: "#C8E6C9",
	},
	subtitleTextColor: {
		type: "string",
		default: "blue",
	},
	showIconBackground: {
		type: "boolean",
		default: true,
	},
	iconBackgroundColor: {
		type: "string",
		default: "#C8E6C9",
	},
	iconBackgroundHoverColor: {
		type: "string",
		default: "#C8E6C9",
	},
	iconColor: {
		type: "string",
		default: "#ffffff",
	},
	iconHoverColor: {
		type: "string",
		default: "#ffffff",
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
	// new attributes end

	priceboxBackground: {
		type: "string",
	},
	titleTag: {
		type: "string",
		default: "h3",
	},
	displaySubtitle: {
		type: "boolean",
		default: false,
	},
	displayPriceDetails: {
		type: "boolean",
		default: false,
	},
	priceDetails: {
		type: "string",
		source: "text",
		selector: ".eb-pricebox-price-details",
	},
	priceBackgroundColor: {
		type: "string",
	},
	featuresBackgroundColor: {
		type: "string",
	},
	featuresTextColor: {
		type: "string",
	},

	buttonSize: {
		type: "string",
	},
	buttonFontSize: {
		type: "number",
	},
	buttonBackground: {
		type: "string",
	},
	buttonTextColor: {
		type: "string",
	},
	hoverBackgroundColor: {
		type: "string",
	},
	hoverTextColor: {
		type: "string",
	},
	buttonURL: {
		type: "string",
		default: "#",
	},
	featureFontSize: {
		type: "number",
	},
	linkedMargin: {
		type: "boolean",
		default: false,
	},
	marginTop: {
		type: "number",
	},
	marginRight: {
		type: "number",
	},
	marginBottom: {
		type: "number",
	},
	marginLeft: {
		type: "number",
	},
	linkedPadding: {
		type: "boolean",
		default: false,
	},
	paddingTop: {
		type: "number",
	},
	paddingRight: {
		type: "number",
	},
	paddingBottom: {
		type: "number",
	},
	paddingLeft: {
		type: "number",
	},
	isHover: {
		type: "boolean",
		default: false,
	},
	marginUnit: {
		type: "string",
		default: "px",
	},
	paddingUnit: {
		type: "string",
		default: "px",
	},
	iconSizeUnit: {
		type: "string",
		default: "px",
	},
	priceSizeUnit: {
		type: "string",
		default: "px",
	},
	featureSizeUnit: {
		type: "string",
		default: "px",
	},
	buttonSizeUnit: {
		type: "string",
		default: "px",
	},
	buttonHeight: {
		type: "number",
	},
	buttonHeightUnit: {
		type: "string",
		default: "px",
	},
	buttonWidth: {
		type: "number",
	},
	buttonWidthUnit: {
		type: "string",
		default: "px",
	},
	buttonBorderStyle: {
		type: "string",
		default: "solid",
	},
	buttonBorderWidth: {
		type: "number",
	},
	hoverBorderColor: {
		type: "string",
	},
	buttonBorderRadius: {
		type: "number",
	},
	buttonBorderRadiusUnit: {
		type: "string",
		default: "px",
	},
	subtitleFontFamily: {
		type: "string",
	},
	subtitleFontSize: {
		type: "number",
	},
	subtitleSizeUnit: {
		type: "string",
		default: "px",
	},
	subtitleFontWeight: {
		type: "string",
		default: "normal",
	},
	subtitleTextTransform: {
		type: "string",
	},
	subtitleTextDecoration: {
		type: "string",
	},
	subtitleLineHeight: {
		type: "number",
	},
	subtitleLineHeightUnit: {
		type: "string",
		default: "px",
	},
	subtitleLetterSpacing: {
		type: "number",
	},
	subtitleLetterSpacingUnit: {
		type: "string",
		default: "px",
	},
	priceFontFamily: {
		type: "string",
	},
	priceFontWeight: {
		type: "string",
		default: "normal",
	},
	priceTextDecoration: {
		type: "string",
	},
	priceLineHeight: {
		type: "number",
	},
	priceLineHeightUnit: {
		type: "string",
		default: "px",
	},
	priceLetterSpacing: {
		type: "number",
	},
	priceLetterSpacingUnit: {
		type: "string",
		default: "px",
	},
	featureFontFamily: {
		type: "string",
	},
	featureFontWeight: {
		type: "string",
		default: "normal",
	},
	featureTextTransform: {
		type: "string",
	},
	featureTextDecoration: {
		type: "string",
	},
	featureLineHeight: {
		type: "number",
	},
	featureLineHeightUnit: {
		type: "string",
		default: "px",
	},
	featureLetterSpacing: {
		type: "number",
	},
	featureLetterSpacingUnit: {
		type: "string",
		default: "px",
	},
	buttonFontFamily: {
		type: "string",
	},
	buttonFontWeight: {
		type: "string",
		default: "normal",
	},
	buttonTextTransform: {
		type: "string",
	},
	buttonTextDecoration: {
		type: "string",
	},
	buttonLineHeight: {
		type: "number",
	},
	buttonLineHeightUnit: {
		type: "string",
		default: "px",
	},
	buttonLetterSpacing: {
		type: "number",
	},
	buttonLetterSpacingUnit: {
		type: "string",
		default: "px",
	},
};

export default attributes;

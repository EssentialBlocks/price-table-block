const attributes = {
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

	titleBackgroundColor: {
		type: "string",
	},
	titleTextColor: {
		type: "string",
	},
	price: {
		type: "string",
		source: "text",
		selector: ".eb-pricebox-price",
		default: "$99",
	},
	priceValueSize: {
		type: "number",
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
	priceTextColor: {
		type: "string",
	},
	features: {
		type: "array",
		source: "query",
		selector: ".ebgb-pricing .body ul li",
		query: {
			text: {
				type: "string",
				source: "text",
				selector: ".ebgb-pricebox-feature-item",
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
	featuresBackgroundColor: {
		type: "string",
	},
	featuresTextColor: {
		type: "string",
	},
	buttonText: {
		type: "string",
		default: "Choose Plan",
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
	shadowColor: {
		type: "string",
	},
	shadowHOffset: {
		type: "number",
	},
	shadowVOffset: {
		type: "number",
	},
	shadowSpread: {
		type: "number",
	},
	shadowBlur: {
		type: "number",
	},
	borderWidth: {
		type: "number",
	},
	borderStyle: {
		type: "string",
		default: "solid",
	},
	borderColor: {
		type: "string",
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
	buttonBorderColor: {
		type: "string",
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

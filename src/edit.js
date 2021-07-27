/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { useBlockProps, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { useEffect } = wp.element;
const { select } = wp.data;
/**
 * Internal dependencies
 */
import "./editor.scss";
import Inspector from "./inspector";

import {
	buttonIconSpacing,
	buttonIconSize,
	buttonPadding,
	buttonMargin,
	wrapperPadding,
	wrapperMargin,
	titlePadding,
	titleMargin,
	priceCurrencyMargin,
	buttonBorderShadow,
	buttonBackgroundControl,
	priceTableBackground,
	wrapperBorderShadow,
	iconBorderShadow,
	ribbonBorderShadow,
	headerIconSize,
	headerIconWidth,
	headerIconHeight,
	salepriceCurrencyMargin,
	featuresIconSize,
} from "./constants";

import {
	typoPrefix_title,
	typoPrefix_subtitle,
	typoPrefix_price_title,
	typoPrefix_price_currency,
	typoPrefix_pricing_period,
	typoPrefix_saleprice,
	typoPrefix_saleprice_currency,
	typoPrefix_features_text,
	typoPrefix_button,
	typoPrefix_ribbon,
} from "./constants/typographyPrefixConstants";

import {
	softMinifyCssStrings,
	isCssExists,
	mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
	generateDimensionsControlStyles,
	generateBackgroundControlStyles,
	generateBorderShadowStyles,
	generateTypographyStyles,
	generateResponsiveRangeStyles,
} from "../util/helpers";

const edit = (props) => {
	const { attributes, isSelected, setAttributes, clientId } = props;
	const {
		blockId,
		blockMeta,
		// responsive control attribute ⬇
		resOption,
		pricingStyle,
		title,
		showSubtitle,
		subtitle,
		showHeaderIcon,
		headerIcon,
		showTitleLine,
		mainPrice,
		showOnSale,
		salePrice,
		salePriceTextColor,
		salepriceCurrencyTextColor,
		priceCurrency,
		currencyPlacement,
		pricePeriod,
		periodSeparator,
		features,
		showButton,
		buttonIcon,
		buttonIconPosition,
		buttonText,
		buttonURL,
		featuresTextColor,
		titleBackgroundColor,
		titleTextColor,
		titleLineColor,
		subtitleTextColor,
		priceTextColor,
		priceCurrencyTextColor,
		pricingPeriodTextColor,
		buttonTextColor,
		hoverTextColor,
		iconBackgroundColor,
		iconBackgroundHoverColor,
		showIconBackground,
		iconColor,
		iconHoverColor,
		contentAlign,
		showRibbon,
		ribbonStyle,
		ribbonText,
		ribbonColor,
		ribbonBackgroundColor,
		featuresAlignment,
		buttonAlignment,
		headerAlignment,
		priceAlignment,
		iconAlignment,
	} = attributes;

	// wrapper styles css in strings
	const {
		dimensionStylesDesktop: wrapperPaddingStylesDesktop,
		dimensionStylesTab: wrapperPaddingStylesTab,
		dimensionStylesMobile: wrapperPaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: wrapperPadding,
		styleFor: "padding",
		attributes,
	});

	const {
		dimensionStylesDesktop: wrapperMarginStylesDesktop,
		dimensionStylesTab: wrapperMarginStylesTab,
		dimensionStylesMobile: wrapperMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: wrapperMargin,
		styleFor: "margin",
		attributes,
	});

	const {
		backgroundStylesDesktop: priceTableBackgroundStylesDesktop,
		hoverBackgroundStylesDesktop: priceTableHoverBackgroundStylesDesktop,
		backgroundStylesTab: priceTableBackgroundStylesTab,
		hoverBackgroundStylesTab: priceTableHoverBackgroundStylesTab,
		backgroundStylesMobile: priceTableBackgroundStylesMobile,
		hoverBackgroundStylesMobile: priceTableHoverBackgroundStylesMobile,
		overlayStylesDesktop: priceTableOverlayStylesDesktop,
		hoverOverlayStylesDesktop: priceTableHoverOverlayStylesDesktop,
		overlayStylesTab: priceTableOverlayStylesTab,
		hoverOverlayStylesTab: priceTableHoverOverlayStylesTab,
		overlayStylesMobile: priceTableOverlayStylesMobile,
		hoverOverlayStylesMobile: priceTableHoverOverlayStylesMobile,
		bgTransitionStyle: priceTableBgTransitionStyle,
		ovlTransitionStyle: priceTableOvlTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: priceTableBackground,
	});

	const {
		styesDesktop: bdShadowStyesDesktop,
		styesTab: bdShadowStyesTab,
		styesMobile: bdShadowStyesMobile,
		stylesHoverDesktop: bdShadowStylesHoverDesktop,
		stylesHoverTab: bdShadowStylesHoverTab,
		stylesHoverMobile: bdShadowStylesHoverMobile,
		transitionStyle: bdShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: wrapperBorderShadow,
		attributes,
	});

	const {
		typoStylesDesktop: titleTypoStylesDesktop,
		typoStylesTab: titleTypoStylesTab,
		typoStylesMobile: titleTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_title,
		defaultFontSize: 28,
	});

	const {
		typoStylesDesktop: subtitleTypoStylesDesktop,
		typoStylesTab: subtitleTypoStylesTab,
		typoStylesMobile: subtitleTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_subtitle,
	});

	const {
		dimensionStylesDesktop: titlePaddingStylesDesktop,
		dimensionStylesTab: titlePaddingStylesTab,
		dimensionStylesMobile: titlePaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: titlePadding,
		styleFor: "padding",
		attributes,
	});

	const {
		dimensionStylesDesktop: titleMarginStylesDesktop,
		dimensionStylesTab: titleMarginStylesTab,
		dimensionStylesMobile: titleMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: titleMargin,
		styleFor: "margin",
		attributes,
	});

	const {
		typoStylesDesktop: priceTextTypoStylesDesktop,
		typoStylesTab: priceTextTypoStylesTab,
		typoStylesMobile: priceTextTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_price_title,
	});

	const {
		typoStylesDesktop: priceCurrencyTypoStylesDesktop,
		typoStylesTab: priceCurrencyTypoStylesTab,
		typoStylesMobile: priceCurrencyTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_price_currency,
	});

	const {
		dimensionStylesDesktop: priceCurrencyMarginStylesDesktop,
		dimensionStylesTab: priceCurrencyMarginStylesTab,
		dimensionStylesMobile: priceCurrencyMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: priceCurrencyMargin,
		styleFor: "margin",
		attributes,
	});

	const {
		typoStylesDesktop: pricePeriodTypoStylesDesktop,
		typoStylesTab: pricePeriodTypoStylesTab,
		typoStylesMobile: pricePeriodTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_pricing_period,
	});

	const {
		typoStylesDesktop: salePriceTypoStylesDesktop,
		typoStylesTab: salePriceTypoStylesTab,
		typoStylesMobile: salePriceTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_saleprice,
	});

	const {
		typoStylesDesktop: salePriceCurrencyTypoStylesDesktop,
		typoStylesTab: salePriceCurrencyTypoStylesTab,
		typoStylesMobile: salePriceCurrencyTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_saleprice_currency,
	});

	const {
		dimensionStylesDesktop: salePriceMarginStylesDesktop,
		dimensionStylesTab: salePriceMarginStylesTab,
		dimensionStylesMobile: salePriceMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: salepriceCurrencyMargin,
		styleFor: "margin",
		attributes,
	});

	const {
		typoStylesDesktop: featuresTypoStylesDesktop,
		typoStylesTab: featuresTypoStylesTab,
		typoStylesMobile: featuresTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_features_text,
	});

	const {
		rangeStylesDesktop: featuresIconSizeDesktop,
		rangeStylesTab: featuresIconSizeTab,
		rangeStylesMobile: featuresIconSizeMobile,
	} = generateResponsiveRangeStyles({
		controlName: featuresIconSize,
		property: "font-size",
		attributes,
		customUnit: "px",
	});

	const {
		rangeStylesDesktop: buttonIconSpaceRightDesktop,
		rangeStylesTab: buttonIconSpaceRightTab,
		rangeStylesMobile: buttonIconSpaceRightMobile,
	} = generateResponsiveRangeStyles({
		controlName: buttonIconSpacing,
		property: "margin-right",
		attributes,
		customUnit: "px",
	});

	const {
		rangeStylesDesktop: buttonIconSpaceLeftDesktop,
		rangeStylesTab: buttonIconSpaceLeftTab,
		rangeStylesMobile: buttonIconSpaceLeftMobile,
	} = generateResponsiveRangeStyles({
		controlName: buttonIconSpacing,
		property: "margin-left",
		attributes,
		customUnit: "px",
	});

	const {
		dimensionStylesDesktop: buttonPaddingStylesDesktop,
		dimensionStylesTab: buttonPaddingStylesTab,
		dimensionStylesMobile: buttonPaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: buttonPadding,
		styleFor: "padding",
		attributes,
	});

	const {
		dimensionStylesDesktop: buttonMarginStylesDesktop,
		dimensionStylesTab: buttonMarginStylesTab,
		dimensionStylesMobile: buttonMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: buttonMargin,
		styleFor: "margin",
		attributes,
	});

	const {
		rangeStylesDesktop: buttonIconSizeDesktop,
		rangeStylesTab: buttonIconSizeTab,
		rangeStylesMobile: buttonIconSizeMobile,
	} = generateResponsiveRangeStyles({
		controlName: buttonIconSize,
		property: "font-size",
		attributes,
		customUnit: "px",
	});

	const {
		typoStylesDesktop: buttonTypoStylesDesktop,
		typoStylesTab: buttonTypoStylesTab,
		typoStylesMobile: buttonTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_button,
	});

	const {
		backgroundStylesDesktop: buttonBackgroundStylesDesktop,
		hoverBackgroundStylesDesktop: buttonHoverBackgroundStylesDesktop,
		bgTransitionStyle: buttonBgTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: buttonBackgroundControl,
		noOverlay: true,
		noMainBgi: true,
	});

	const {
		styesDesktop: btnShadowStyesDesktop,
		styesTab: btnShadowStyesTab,
		styesMobile: btnShadowStyesMobile,
		stylesHoverDesktop: btnShadowStylesHoverDesktop,
		stylesHoverTab: btnShadowStylesHoverTab,
		stylesHoverMobile: btnShadowStylesHoverMobile,
	} = generateBorderShadowStyles({
		controlName: buttonBorderShadow,
		attributes,
	});

	const {
		rangeStylesDesktop: headerIconSizeDesktop,
		rangeStylesTab: headerIconSizeTab,
		rangeStylesMobile: headerIconSizeMobile,
	} = generateResponsiveRangeStyles({
		controlName: headerIconSize,
		property: "font-size",
		attributes,
	});

	const {
		rangeStylesDesktop: headerIconWidthDesktop,
		rangeStylesTab: headerIconWidthTab,
		rangeStylesMobile: headerIconWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: headerIconWidth,
		property: "width",
		attributes,
	});

	const {
		rangeStylesDesktop: headerIconHeightDesktop,
		rangeStylesTab: headerIconHeightTab,
		rangeStylesMobile: headerIconHeightMobile,
	} = generateResponsiveRangeStyles({
		controlName: headerIconHeight,
		property: "height",
		attributes,
	});

	const {
		styesDesktop: iconBorderShadowDesktop,
		styesTab: iconBorderShadowTab,
		styesMobile: iconBorderShadowMobile,
		stylesHoverDesktop: iconBorderShadowHoverDesktop,
		stylesHoverTab: iconBorderShadowHoverTab,
		stylesHoverMobile: iconBorderShadowHoverMobile,
	} = generateBorderShadowStyles({
		controlName: iconBorderShadow,
		attributes,
	});

	const iconAlign = iconAlignment || contentAlign;

	const {
		typoStylesDesktop: ribbonTypoStylesDesktop,
		typoStylesTab: ribbonTypoStylesTab,
		typoStylesMobile: ribbonTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_ribbon,
	});

	const {
		styesDesktop: ribbonBorderShadowDesktop,
		stylesHoverDesktop: ribbonBorderShadowHoverDesktop,
	} = generateBorderShadowStyles({
		controlName: ribbonBorderShadow,
		attributes,
	});

	const desktopStyles = `
		.${blockId} .eb-pricing {
			text-align: ${contentAlign};
			${ribbonStyle === "ribbon-4" ? "overflow: hidden;" : ""}
		}
		
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-1::before {
			content: "";
			color: ${ribbonColor};
			background: ${ribbonBackgroundColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-2::before,
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-3::before,
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-4::before {
			${ribbonTypoStylesDesktop}
			${ribbonBorderShadowDesktop}
			content: "${ribbonText}";
			color: ${ribbonColor};
			background: ${ribbonBackgroundColor};
			text-align: center;
		}
		.${blockId} .eb-pricing:hover .eb-pricing-item.ribbon-2::before,
		.${blockId} .eb-pricing:hover .eb-pricing-item.ribbon-3::before,
		.${blockId} .eb-pricing:hover .eb-pricing-item.ribbon-4::before {
			${ribbonBorderShadowHoverDesktop}
		}
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-2::after {
			border-bottom: 15px solid ${ribbonBackgroundColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item {
			${wrapperPaddingStylesDesktop}
			${wrapperMarginStylesDesktop}
			${priceTableBackgroundStylesDesktop}
			${bdShadowStyesDesktop}
			transition: ${priceTableBgTransitionStyle}, ${bdShadowTransitionStyle};
		}
		.${blockId} .eb-pricing-item-overlay::before  {
			${priceTableOverlayStylesDesktop}
			transition: ${priceTableOvlTransitionStyle};
		}
		.${blockId} .eb-pricing .eb-pricing-item:hover {
			${priceTableHoverBackgroundStylesDesktop}
			${bdShadowStylesHoverDesktop}
		}
		.${blockId} .eb-pricing .eb-pricing-item:hover .eb-pricing-item-overlay:before {
			${priceTableHoverOverlayStylesDesktop}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header {
			${titlePaddingStylesDesktop}
			${titleMarginStylesDesktop}
			background: ${titleBackgroundColor || "none"};
			position: relative;
			z-index: 0;
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header .eb-pricing-title {
			${titleTypoStylesDesktop}
			color: ${titleTextColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header .eb-pricing-subtitle {
			${subtitleTypoStylesDesktop}
			color: ${subtitleTextColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .original-price {
			${priceTextTypoStylesDesktop}
			color: ${priceTextColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .original-price .price-currency {
			${priceCurrencyTypoStylesDesktop}
			${priceCurrencyMarginStylesDesktop}
			color: ${priceCurrencyTextColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .price-period {
			${pricePeriodTypoStylesDesktop}
			color: ${pricingPeriodTextColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .sale-price {
			${salePriceTypoStylesDesktop}
			color: ${salePriceTextColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .sale-price .price-currency {
			${salePriceCurrencyTypoStylesDesktop}
			${salePriceMarginStylesDesktop}
			color: ${salepriceCurrencyTextColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-body ul li, .${blockId} .eb-pricing .eb-pricing-item .eb-pricing-body ul li a {
			${featuresTypoStylesDesktop}
			color: ${featuresTextColor || "#6d6d6d"};
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-body ul li .eb-pricebox-icon {
			${featuresIconSizeDesktop}
			margin-right: 8px;
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button-wrapper {
			${buttonMarginStylesDesktop}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button {
			${buttonPaddingStylesDesktop}
			${buttonTypoStylesDesktop}
			${buttonBackgroundStylesDesktop}
			${btnShadowStyesDesktop}
			color: ${buttonTextColor};
			transition: ${buttonBgTransitionStyle};
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button:hover {
			${btnShadowStylesHoverDesktop}
			${buttonHoverBackgroundStylesDesktop}
			color: ${hoverTextColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button i {
			${
				buttonIconPosition === "left"
					? buttonIconSpaceRightDesktop
					: buttonIconSpaceLeftDesktop
			}
			${buttonIconSizeDesktop}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-icon {
			display: flex;
			align-items: center;
			justify-content: ${
				iconAlign === "left"
					? "flex-start"
					: iconAlign === "right"
					? "flex-end"
					: "center"
			};
		}
		
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-icon .icon {
			display: flex;
			align-items: center;
			justify-content: center;
			${headerIconWidthDesktop}
			${headerIconHeightDesktop}
			${iconBorderShadowDesktop}
			${
				showIconBackground
					? "background-color: " + iconBackgroundColor + ";"
					: "background-color: transparent;"
			}
		}
		.${blockId} .eb-pricing .eb-pricing-item:hover .eb-pricing-icon .icon {
			${iconBorderShadowHoverDesktop}
			${
				showIconBackground
					? "background-color: " + iconBackgroundHoverColor + ";"
					: "background-color: transparent;"
			}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-icon .icon i {
			${headerIconSizeDesktop}
			color: ${iconColor};
		}
		.${blockId} .eb-pricing .eb-pricing-item:hover .eb-pricing-icon .icon i {
			color: ${iconHoverColor};
		}

		${
			featuresAlignment
				? `.${blockId} .eb-pricing-body {
				text-align: ${featuresAlignment};
			}`
				: ""
		}

		${
			buttonAlignment
				? `.${blockId} .eb-pricing-footer {
				text-align: ${buttonAlignment};
			}`
				: ""
		}

		${
			headerAlignment
				? `.${blockId} .eb-pricing-header {
				text-align: ${headerAlignment};
			}`
				: ""
		}

		${
			priceAlignment
				? `.${blockId} .eb-pricing-tag {
				text-align: ${priceAlignment};
			}`
				: ""
		}
		
	`;
	// console.log(headerAlign);

	const tabStyles = `
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-2::before,
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-3::before,
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-4::before {
			${ribbonTypoStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item {
			${wrapperPaddingStylesTab}
			${wrapperMarginStylesTab}
			${priceTableBackgroundStylesTab}
			${bdShadowStyesTab}
		}
		.${blockId} .eb-pricing-item-overlay:before {
			${priceTableOverlayStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item:hover {
			${priceTableHoverBackgroundStylesTab}
			${bdShadowStylesHoverTab}
		}
		.${blockId} .eb-pricing-item:hover .eb-pricing-item-overlay:before {
			${priceTableHoverOverlayStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header {
			${titlePaddingStylesTab}
			${titleMarginStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header .eb-pricing-title {
			${titleTypoStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header .eb-pricing-subtitle {
			${subtitleTypoStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .original-price {
			${priceTextTypoStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .original-price .price-currency {
			${priceCurrencyTypoStylesTab}
			${priceCurrencyMarginStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .price-period {
			${pricePeriodTypoStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .sale-price {
			${salePriceTypoStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .sale-price .price-currency {
			${salePriceCurrencyTypoStylesTab}
			${salePriceMarginStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-body ul li {
			${featuresTypoStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-body ul li .eb-pricebox-icon {
			${featuresIconSizeTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button-wrapper {
			${buttonMarginStylesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button {
			${buttonPaddingStylesTab}
			${buttonTypoStylesTab}
			${btnShadowStyesTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button:hover {
			${btnShadowStylesHoverTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button i {
			${
				buttonIconPosition === "left"
					? buttonIconSpaceRightTab
					: buttonIconSpaceLeftTab
			}
			${buttonIconSizeTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-icon .icon {
			${headerIconWidthTab}
			${headerIconHeightTab}
			${iconBorderShadowTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-icon .icon:hover {
			${iconBorderShadowHoverTab}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-icon .icon i {
			${headerIconSizeTab}
		}
	`;

	const mobileStyles = `
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-2::before,
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-3::before,
		.${blockId} .eb-pricing .eb-pricing-item.ribbon-4::before {
			${ribbonTypoStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item {
			${wrapperPaddingStylesMobile}
			${wrapperMarginStylesMobile}
			${priceTableBackgroundStylesMobile}
			${bdShadowStyesMobile}
		}
		.${blockId} .eb-pricing-item-overlay:before {
			${priceTableOverlayStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item:hover {
			${priceTableHoverBackgroundStylesMobile}
			${bdShadowStylesHoverMobile}
		}
		.${blockId} .eb-pricing-item:hover .eb-pricing-item-overlay:before {
			${priceTableHoverOverlayStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header {
			${titlePaddingStylesMobile}
			${titleMarginStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header .eb-pricing-title {
			${titleTypoStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header .eb-pricing-subtitle {
			${subtitleTypoStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .original-price {
			${priceTextTypoStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .original-price .price-currency {
			${priceCurrencyTypoStylesMobile}
			${priceCurrencyMarginStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .price-period {
			${pricePeriodTypoStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .sale-price {
			${salePriceTypoStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag .sale-price .price-currency {
			${salePriceCurrencyTypoStylesMobile}
			${salePriceMarginStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-body ul li {
			${featuresTypoStylesMobile}
		}
		
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-body ul li .eb-pricebox-icon {
			${featuresIconSizeMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button-wrapper {
			${buttonMarginStylesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button {
			${buttonPaddingStylesMobile}
			${buttonTypoStylesMobile}
			${btnShadowStyesMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button:hover {
			${btnShadowStylesHoverMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-footer .eb-pricing-button i {
			${
				buttonIconPosition === "left"
					? buttonIconSpaceRightMobile
					: buttonIconSpaceLeftMobile
			}
			${buttonIconSizeMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-icon .icon {
			${headerIconWidthMobile}
			${headerIconHeightMobile}
			${iconBorderShadowMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-icon .icon:hover {
			${iconBorderShadowHoverMobile}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-icon .icon i {
			${headerIconSizeMobile}
		}
	`;

	var titleLineStyle = "";
	var headerAlign =
		headerAlignment === "left"
			? "margin: 0 !important;"
			: headerAlignment === "right"
			? "margin: 0 0 0 auto !important;"
			: "margin: 0 auto !important;";
	var headerAlignStyle3 =
		headerAlignment === "left"
			? "transform: translateX(-80%) !important;"
			: headerAlignment === "right"
			? "transform: translateX(80%) !important;"
			: "margin: 0 auto !important;";
	var priceAlign =
		priceAlignment === "left"
			? "margin: 0 !important;"
			: priceAlignment === "right"
			? "margin: 0 0 0 auto !important;"
			: "margin: 0 auto !important;";
	if (showTitleLine) {
		titleLineStyle = `
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header::after {
			content: "";
			position: absolute;
			width: 140px;
			height: 1px;
			bottom: 0px;
			left: 0px;
			right: 0px;
			margin: 0 auto;
			z-index: 1;
			background-color: ${titleLineColor};
		}
		.${blockId}.eb-pricing-content-left .eb-pricing-item .eb-pricing-header::after,
		.${blockId}.eb-pricing-content-left .eb-pricing-item .eb-pricing-tag::after {
			margin: 0;
		}
		.${blockId}.eb-pricing-content-right .eb-pricing-item .eb-pricing-header::after,
		.${blockId}.eb-pricing-content-right .eb-pricing-item .eb-pricing-tag::after {
			margin: 0 0 0 auto;
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-header::after {
			${headerAlign}
		}
		.${blockId} .eb-pricing .eb-pricing-item .eb-pricing-tag::after {
			${priceAlign}
		}
		.${blockId}.eb-pricing-content-left .eb-pricing.style-3 .eb-pricing-item .eb-pricing-header:after, .${blockId}.eb-pricing-content-left .eb-pricing.style-3 .eb-pricing-item .eb-pricing-tag:after {
			transform: translateX(-80%);
		}
		.${blockId}.eb-pricing-content-right .eb-pricing.style-3 .eb-pricing-item .eb-pricing-header:after, .${blockId}.eb-pricing-content-right .eb-pricing.style-3 .eb-pricing-item .eb-pricing-tag:after {
			transform: translateX(80%);
		}
		.${blockId} .eb-pricing.style-3 .eb-pricing-item .eb-pricing-header::after {
			${headerAlignStyle3}
		}
		.eb-pricing.style-3 .eb-pricing-item .eb-pricing-header:after {
			position: absolute;
			content: "";
			width: 100%;
			height: 1px;
			bottom: 0px;
			left: 0px;
			right: 0px;
			margin: 0 auto;
			z-index: 1;
			-webkit-transition: 1s;
			-o-transition: 1s;
			transition: 1s;
			-webkit-transform: scaleX(0.4);
			-ms-transform: scaleX(0.4);
			transform: scaleX(0.4);
		}
		.eb-pricing.style-3 .eb-pricing-item:hover .header:after,
		.eb-pricing.style-3 .eb-pricing-item:hover .eb-pricing-header:after {
			-webkit-transform: scaleX(1);
			-ms-transform: scaleX(1);
			transform: scaleX(1) !important;
		}
	`;
	}

	console.log(titleLineStyle);

	// ribbon Class
	const ribbonClass = showRibbon ? ` featured ${ribbonStyle}` : "";

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		${isCssExists(desktopStyles) ? desktopStyles : " "}
		${isCssExists(titleLineStyle) ? titleLineStyle : " "}
	`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		${isCssExists(tabStyles) ? tabStyles : " "}
	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		${isCssExists(mobileStyles) ? mobileStyles : " "}
	`);

	// Set All Style in "blockMeta" Attribute
	useEffect(() => {
		const styleObject = {
			desktop: desktopAllStyles,
			tab: tabAllStyles,
			mobile: mobileAllStyles,
		};
		if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
			setAttributes({ blockMeta: styleObject });
		}
	}, [attributes]);

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class
	useEffect(() => {
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
	}, []);
	// this useEffect is for creating an unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-pricing";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});
	}, []);

	// this useEffect is for mimmiking css when responsive options clicked from wordpress's 'preview' button
	useEffect(() => {
		mimmikCssForPreviewBtnClick({
			domObj: document,
			select,
		});
	}, []);

	const blockProps = useBlockProps({
		className: `eb-guten-block-main-parent-wrapper`,
	});

	return [
		<BlockControls>
			<AlignmentToolbar
				value={contentAlign}
				onChange={(contentAlign) => setAttributes({ contentAlign })}
			/>
		</BlockControls>,
		isSelected && (
			<Inspector attributes={attributes} setAttributes={setAttributes} />
		),
		<div {...blockProps}>
			<style>
				{`
				 ${desktopAllStyles}
 
				 /* mimmikcssStart */
 
				 ${resOption === "Tablet" ? tabAllStyles : " "}
				 ${resOption === "Mobile" ? tabAllStyles + mobileAllStyles : " "}
 
				 /* mimmikcssEnd */
 
				 @media all and (max-width: 1024px) {	
 
					 /* tabcssStart */			
					 ${softMinifyCssStrings(tabAllStyles)}
					 /* tabcssEnd */			
				 
				 }
				 
				 @media all and (max-width: 767px) {
					 
					 /* mobcssStart */			
					 ${softMinifyCssStrings(mobileAllStyles)}
					 /* mobcssEnd */			
				 
				 }
				 `}
			</style>
			<div className={`${blockId} eb-pricing-content-${contentAlign}`}>
				<div className={`eb-pricing ${pricingStyle}`}>
					<div className={`eb-pricing-item${ribbonClass}`}>
						<div className="eb-pricing-item-overlay"></div>
						{showHeaderIcon && (
							<div className="eb-pricing-icon" data-icon={headerIcon}>
								<span className="icon">
									<i class={headerIcon}></i>
								</span>
							</div>
						)}
						<div className="eb-pricing-header">
							<h2 className="eb-pricing-title">{title}</h2>
							{showSubtitle && (
								<span className="eb-pricing-subtitle">{subtitle}</span>
							)}
						</div>
						{pricingStyle !== "style-3" && (
							<div className="eb-pricing-tag">
								<span className="price-tag">
									<span
										className={`original-price${
											showOnSale === true ? " line-through" : ""
										}`}
										data-price={mainPrice}
									>
										{currencyPlacement === "left" && (
											<span className="price-currency">{priceCurrency}</span>
										)}
										{mainPrice}
										{currencyPlacement === "right" && (
											<span className="price-currency">{priceCurrency}</span>
										)}
									</span>

									{showOnSale && (
										<>
											<span className="sale-price" data-sale-price={salePrice}>
												{currencyPlacement === "left" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
												{salePrice}
												{currencyPlacement === "right" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
											</span>
										</>
									)}
								</span>
								<span
									className="price-period"
									data-period-separator={periodSeparator}
									data-price-period={pricePeriod}
								>
									{periodSeparator} {pricePeriod}
								</span>
							</div>
						)}
						<div className="eb-pricing-body">
							<ul className="eb-pricebox-features">
								{features.map(({ icon, text, color, clickable, link }) => (
									<li
										className="eb-pricebox-feature-item"
										data-icon={icon}
										data-color={color}
										data-clickable={clickable}
										data-link={link}
									>
										{clickable && link ? (
											<a href={link}>
												<span
													className={`eb-pricebox-icon ${icon}`}
													style={{ color: color }}
												/>
												<span className="eb-pricebox-feature-text">{text}</span>
											</a>
										) : (
											<>
												<span
													className={`eb-pricebox-icon ${icon}`}
													style={{ color: color }}
												/>
												<span className="eb-pricebox-feature-text">{text}</span>
											</>
										)}
									</li>
								))}
							</ul>
						</div>
						{pricingStyle === "style-3" && (
							<div className="eb-pricing-tag">
								<span className="price-tag">
									<span
										className={`original-price${
											showOnSale === true ? " line-through" : ""
										}`}
										data-price={mainPrice}
									>
										{currencyPlacement === "left" && (
											<span className="price-currency">{priceCurrency}</span>
										)}
										{mainPrice}
										{currencyPlacement === "right" && (
											<span className="price-currency">{priceCurrency}</span>
										)}
									</span>

									{showOnSale && (
										<>
											<span className="sale-price" data-sale-price={salePrice}>
												{currencyPlacement === "left" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
												{salePrice}
												{currencyPlacement === "right" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
											</span>
										</>
									)}
								</span>
								<span
									className="price-period"
									data-period-separator={periodSeparator}
									data-price-period={pricePeriod}
								>
									{periodSeparator} {pricePeriod}
								</span>
							</div>
						)}
						{showButton && (
							<div className="eb-pricing-footer" data-icon={buttonIcon}>
								<div className="eb-pricing-button-wrapper">
									<a href={buttonURL} className="eb-pricing-button">
										{buttonIconPosition === "left" && (
											<i className={buttonIcon}></i>
										)}
										<span className="eb-button-text">{buttonText}</span>
										{buttonIconPosition === "right" && (
											<i className={buttonIcon}></i>
										)}
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>,
		// edit view end
	];
};

export default edit;

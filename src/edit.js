/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { useBlockProps } = wp.blockEditor;
const { useEffect } = wp.element;
const { select } = wp.data;
/**
 * Internal dependencies
 */
import "./editor.scss";
import Inspector from "./inspector";

import {
	TWOUNITS,
	FONT_WEIGHT,
	TEXT_TRANSFORM,
	TEXT_DECORATION,
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
		priceBackgroundColor,
		priceTextColor,
		priceCurrencyTextColor,
		pricingPeriodTextColor,
		featuresBackgroundColor,
		buttonBackground,
		buttonTextColor,
		isHover,
		hoverBackgroundColor,
		hoverTextColor,
		buttonHeight,
		buttonHeightUnit,
		buttonWidth,
		buttonWidthUnit,
		buttonBorderStyle,
		buttonBorderWidth,
		buttonBorderColor,
		hoverBorderColor,
		buttonBorderRadius,
		buttonBorderRadiusUnit,
		subtitleFontFamily,
		subtitleFontSize,
		subtitleSizeUnit,
		subtitleFontWeight,
		subtitleTextDecoration,
		subtitleLineHeight,
		subtitleLineHeightUnit,
		subtitleLetterSpacing,
		subtitleLetterSpacingUnit,
		priceFontFamily,
		priceFontSize,
		priceSizeUnit,
		priceFontWeight,
		priceTextDecoration,
		priceLineHeight,
		priceLineHeightUnit,
		priceLetterSpacing,
		priceLetterSpacingUnit,
		featureFontFamily,
		featureFontSize,
		featureSizeUnit,
		featureFontWeight,
		featureTextTransform,
		featureTextDecoration,
		featureLineHeight,
		featureLineHeightUnit,
		featureLetterSpacing,
		featureLetterSpacingUnit,
		buttonFontFamily,
		buttonFontSize,
		buttonSizeUnit,
		buttonFontWeight,
		buttonTextDecoration,
		buttonTextTransform,
		buttonLineHeight,
		buttonLineHeightUnit,
		buttonLetterSpacing,
		buttonLetterSpacingUnit,
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
		backgroundStylesDesktop,
		backgroundStylesTab,
		backgroundStylesMobile,
		overlyStyles,
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
		backgroundStylesDesktop: buttonBackgroundStyleDesktop,
		backgroundStylesTab: buttonBackgroundStyleTab,
		backgroundStylesMobile: buttonBackgroundStyleMobile,
		overlyStyles: buttonBackgroundStyleOverlay,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: buttonBackgroundControl,
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

	const wrapperStyles = `
		.${blockId} .ebgb-pricing .ebgb-pricing-item {
			${wrapperPaddingStylesDesktop}
			${wrapperMarginStylesDesktop}
			${backgroundStylesDesktop}
			${bdShadowStyesDesktop}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item:before {
			${overlyStyles}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item:hover {
			${bdShadowStylesHoverDesktop}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .header {
			${titlePaddingStylesDesktop}
			${titleMarginStylesDesktop}
			background: ${titleBackgroundColor};
			position: relative;
			z-index: 0;
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .header .ebgb-pricing-title {
			${titleTypoStylesDesktop}
			color: ${titleTextColor};
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .header .ebgb-pricing-subtitle {
			${subtitleTypoStylesDesktop}
			color: ${subtitleTextColor};
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .original-price {
			${priceTextTypoStylesDesktop}
			color: ${priceTextColor};
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .price-currency {
			${priceCurrencyTypoStylesDesktop}
			${priceCurrencyMarginStylesDesktop}
			color: ${priceCurrencyTextColor};
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .price-period {
			${pricePeriodTypoStylesDesktop}
			color: ${pricingPeriodTextColor};
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .sale-price {
			${salePriceTypoStylesDesktop}
			color: ${salePriceTextColor};
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .sale-price .price-currency {
			${salePriceCurrencyTypoStylesDesktop}
			${salePriceMarginStylesDesktop}
			color: ${salepriceCurrencyTextColor};
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .body ul li, .${blockId} .ebgb-pricing .ebgb-pricing-item .body ul li a {
			${featuresTypoStylesDesktop}
			color: ${featuresTextColor};
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .body ul li .ebgb-pricebox-icon {
			${featuresIconSizeDesktop}
			margin-right: 8px;
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button-wrapper {
			${buttonMarginStylesDesktop}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button {
			${buttonPaddingStylesDesktop}
			${buttonTypoStylesDesktop}
			${buttonBackgroundStyleDesktop}
			${btnShadowStyesDesktop}
			color: ${buttonTextColor};
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button:hover {
			${btnShadowStylesHoverDesktop}
			color: ${hoverTextColor};
			background-color: ${hoverBackgroundColor};
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button i {
			${
				buttonIconPosition === "left"
					? buttonIconSpaceRightDesktop
					: buttonIconSpaceLeftDesktop
			}
			${buttonIconSizeDesktop}
		}
 		
	`;

	const wrapperStylesTab = `
		.${blockId} .ebgb-pricing .ebgb-pricing-item {
			${wrapperPaddingStylesTab}
			${wrapperMarginStylesTab}
			${backgroundStylesTab}
			${bdShadowStyesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item:hover {
			${bdShadowStylesHoverTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .header {
			${titlePaddingStylesTab}
			${titleMarginStylesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .header .ebgb-pricing-title {
			${titleTypoStylesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .header .ebgb-pricing-subtitle {
			${subtitleTypoStylesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .original-price {
			${priceTextTypoStylesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .price-currency {
			${priceCurrencyTypoStylesTab}
			${priceCurrencyMarginStylesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .price-period {
			${pricePeriodTypoStylesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .sale-price {
			${salePriceTypoStylesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .sale-price .price-currency {
			${salePriceCurrencyTypoStylesTab}
			${salePriceMarginStylesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .body ul li {
			${featuresTypoStylesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .body ul li .ebgb-pricebox-icon {
			${featuresIconSizeTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button-wrapper {
			${buttonMarginStylesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button {
			${buttonPaddingStylesTab}
			${buttonTypoStylesTab}
			${buttonBackgroundStyleTab}
			${btnShadowStyesTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button:hover {
			${btnShadowStylesHoverTab}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button i {
			${
				buttonIconPosition === "left"
					? buttonIconSpaceRightTab
					: buttonIconSpaceLeftTab
			}
			${buttonIconSizeTab}
		}
	`;

	const wrapperStylesMobile = `
		.${blockId} .ebgb-pricing .ebgb-pricing-item {
			${wrapperPaddingStylesMobile}
			${wrapperMarginStylesMobile}
			${backgroundStylesMobile}
			${bdShadowStyesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item:hover {
			${bdShadowStylesHoverMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .header {
			${titlePaddingStylesMobile}
			${titleMarginStylesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .header .ebgb-pricing-title {
			${titleTypoStylesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .header .ebgb-pricing-subtitle {
			${subtitleTypoStylesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .original-price {
			${priceTextTypoStylesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .price-currency {
			${priceCurrencyTypoStylesMobile}
			${priceCurrencyMarginStylesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .price-period {
			${pricePeriodTypoStylesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .sale-price {
			${salePriceTypoStylesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .ebgb-pricing-tag .sale-price .price-currency {
			${salePriceCurrencyTypoStylesMobile}
			${salePriceMarginStylesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .body ul li {
			${featuresTypoStylesMobile}
		}
		
		.${blockId} .ebgb-pricing .ebgb-pricing-item .body ul li .ebgb-pricebox-icon {
			${featuresIconSizeMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button-wrapper {
			${buttonMarginStylesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button {
			${buttonPaddingStylesMobile}
			${buttonTypoStylesMobile}
			${buttonBackgroundStyleMobile}
			${btnShadowStyesMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button:hover {
			${btnShadowStylesHoverMobile}
		}

		.${blockId} .ebgb-pricing .ebgb-pricing-item .footer .ebgb-pricing-button i {
			${
				buttonIconPosition === "left"
					? buttonIconSpaceRightMobile
					: buttonIconSpaceLeftMobile
			}
			${buttonIconSizeMobile}
		}
	`;
	var titleLineStyle = "";
	if (showTitleLine) {
		titleLineStyle = `
		.${blockId} .ebgb-pricing .ebgb-pricing-item .header::after {
			background: ${titleLineColor}
		}

		.ebgb-pricing .ebgb-pricing-item .header::after {
			content: "";
			position: absolute;
			width: 140px;
			height: 1px;
			bottom: 0px;
			left: 0px;
			right: 0px;
			margin: 0 auto;
			z-index: 1;
			background: rgba(9, 9, 9, 0.1);
		}
	`;
	}

	const wrapperStylesNew = {
		overflow: "hidden",
	};

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		${isCssExists(wrapperStyles) ? wrapperStyles : " "}
		${isCssExists(titleLineStyle) ? titleLineStyle : " "}
	`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		${isCssExists(wrapperStylesTab) ? wrapperStylesTab : " "}
	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		${isCssExists(wrapperStylesMobile) ? wrapperStylesMobile : " "}
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
		const BLOCK_PREFIX = "ebgb-pricing";
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
			<div className={blockId}>
				<div className={`ebgb-pricing ${pricingStyle}`}>
					<div className="ebgb-pricing-item">
						{showHeaderIcon && (
							<div className="ebgb-pricing-icon" data-icon={headerIcon}>
								<span className="icon">
									<i class={headerIcon}></i>
								</span>
							</div>
						)}
						<div className="header">
							<h2 className="ebgb-pricing-title">{title}</h2>
							{showSubtitle && (
								<span className="ebgb-pricing-subtitle">{subtitle}</span>
							)}
						</div>
						<div className="ebgb-pricing-tag">
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
												<span className="price-currency">{priceCurrency}</span>
											)}
											{salePrice}
											{currencyPlacement === "right" && (
												<span className="price-currency">{priceCurrency}</span>
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
						<div className="body">
							<ul className="ebgb-pricebox-features">
								{features.map(({ icon, text, color, clickable, link }) => (
									<li
										className="ebgb-pricebox-feature-item"
										data-icon={icon}
										data-color={color}
										data-clickable={clickable}
										data-link={link}
									>
										{clickable && link ? (
											<a href={link}>
												<span
													className={`ebgb-pricebox-icon ${icon}`}
													style={{ color: color }}
												/>
												<span className="ebgb-pricebox-feature-text">
													{text}
												</span>
											</a>
										) : (
											<>
												<span
													className={`ebgb-pricebox-icon ${icon}`}
													style={{ color: color }}
												/>
												<span className="ebgb-pricebox-feature-text">
													{text}
												</span>
											</>
										)}
									</li>
								))}
							</ul>
						</div>
						{showButton && (
							<div className="footer" data-icon={buttonIcon}>
								<div className="ebgb-pricing-button-wrapper">
									<a href={buttonURL} className="ebgb-pricing-button">
										{buttonIconPosition === "left" && (
											<i className={buttonIcon}></i>
										)}
										<span className="ebgb-button-text">{buttonText}</span>
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

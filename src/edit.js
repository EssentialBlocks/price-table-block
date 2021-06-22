/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
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
	softMinifyCssStrings,
	isCssExists,
	getFlipTransform,
	mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
	generateDimensionsControlStyles,
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
		subtitle,
		headerIcon,
		mainPrice,
		showOnSale,
		salePrice,
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

		displaySubtitle,
		titleBackgroundColor,
		titleTextColor,
		priceBackgroundColor,
		priceTextColor,
		featuresBackgroundColor,
		featuresTextColor,
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

	const wrapperStyles = `
		.${blockId}.ebgb-pricing.style-1 .ebgb-pricing-item {
			${wrapperPaddingStylesDesktop}
		}
	`;

	const wrapperStylesTab = `
		.${blockId}.ebgb-pricing.style-1 .ebgb-pricing-item {
			${wrapperPaddingStylesTab}
		}
	`;

	const wrapperStylesMobile = `
		.${blockId}.ebgb-pricing.style-1 .ebgb-pricing-item {
			${wrapperPaddingStylesMobile}
		}
	`;

	const colorStyles = {
		color: "#00C853",
	};

	const wrapperStylesNew = {
		overflow: "hidden",
	};

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		${isCssExists(wrapperStyles) ? wrapperStyles : " "}
	`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		${isCssExists(wrapperPaddingStylesTab) ? wrapperPaddingStylesTab : " "}
	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		${isCssExists(wrapperPaddingStylesMobile) ? wrapperPaddingStylesMobile : " "}
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

	return [
		isSelected && (
			<Inspector attributes={attributes} setAttributes={setAttributes} />
		),
		<div>
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

			<div className={`ebgb-pricing ${blockId} ${pricingStyle}`}>
				<div className="ebgb-pricing-item">
					{pricingStyle === "style-2" && headerIcon && (
						<div className="ebgb-pricing-icon" data-icon={headerIcon}>
							<span className="icon">
								<i class={headerIcon}></i>
							</span>
						</div>
					)}
					<div className="header">
						<h2 className="ebgb-pricing-title">{title}</h2>
						{pricingStyle !== "style-1" && (
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
									// style={featureListStyle}
									data-icon={icon}
									data-color={color}
									data-clickable={clickable}
									data-link={link}
								>
									{clickable && link ? (
										<a href={link}>
											<span className={`ebgb-pricebox-icon ${icon}`} />
											<span className="ebgb-pricebox-feature-text">{text}</span>
										</a>
									) : (
										<>
											<span className={`ebgb-pricebox-icon ${icon}`} />
											<span className="ebgb-pricebox-feature-text">{text}</span>
										</>
									)}
								</li>
							))}
						</ul>
					</div>
					{showButton && (
						<div className="footer" data-icon={buttonIcon}>
							<a
								href={buttonURL}
								// target="_blank"
								// rel="nofollow noopener"
								className="ebgb-pricing-button"
							>
								{buttonIconPosition === "left" && (
									<i className={buttonIcon}></i>
								)}
								<span className="ebgb-button-text">{buttonText}</span>
								{buttonIconPosition === "right" && (
									<i className={buttonIcon}></i>
								)}
							</a>
						</div>
					)}
				</div>
			</div>
		</div>,
		// edit view end
	];
};

export default edit;

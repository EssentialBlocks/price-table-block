/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { useEffect } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { select } = wp.data;
const {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	BaseControl,
} = wp.components;

/**
 * Internal dependencies
 */
import {
	TWOUNITS,
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
	typoPrefix_button,
	typoPrefix_title,
	typoPrefix_subtitle,
	typoPrefix_saleprice_currency,
	typoPrefix_price_title,
	typoPrefix_price_currency,
	typoPrefix_saleprice,
	typoPrefix_pricing_period,
	typoPrefix_features_text,
} from "./constants/typographyPrefixConstants";

import objAttributes from "./attributes";
import faIcons from "../util/faIcons";
import SortableFeatures from "./sortable-features";
import ColorControl from "../util/color-control";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import ResponsiveRangeController from "../util/responsive-range-control";
import ResponsiveDimensionsControl from "../util/dimensions-control-v2";
import TypographyDropdown from "../util/typography-control-v2";
import BackgroundControl from "../util/background-control";
import BorderShadowControl from "../util/border-shadow-control";
import {
	mimmikCssForResBtns,
	mimmikCssOnPreviewBtnClickWhileBlockSelected,
} from "../util/helpers";

const Inspector = ({ attributes, setAttributes }) => {
	const {
		resOption,
		pricingStyle,
		title,
		defaultSubtitle,
		showSubtitle,
		subtitle,
		showHeaderIcon,
		defaultHeaderIcon,
		headerIcon,
		defaultTitleLine,
		showTitleLine,
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
		buttonTextColor,
		hoverTextColor,
		titleTextColor,
		titleLineColor,
		titleBackgroundColor,
		subtitleTextColor,
		defaultIconBackground,
		showIconBackground,
		iconBackgroundColor,
		iconBackgroundHoverColor,
		iconColor,
		iconHoverColor,
		priceTextColor,
		priceCurrencyTextColor,
		salePriceTextColor,
		salepriceCurrencyTextColor,
		pricingPeriodTextColor,
		featuresTextColor,
		showRibbon,
		ribbonStyle,
		ribbonText,
		ribbonColor,
		ribbonBackgroundColor,
		hoverBackgroundColor,
		// new attributes
	} = attributes;

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class only the first time once
	useEffect(() => {
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// this useEffect is for mimmiking css for all the eb blocks on resOption changing
	useEffect(() => {
		mimmikCssForResBtns({
			domObj: document,
			resOption,
		});
	}, [resOption]);

	// this useEffect is to mimmik css for responsive preview in the editor page when clicking the buttons in the 'Preview button of wordpress' located beside the 'update' button while any block is selected and it's inspector panel is mounted in the DOM
	useEffect(() => {
		const cleanUp = mimmikCssOnPreviewBtnClickWhileBlockSelected({
			domObj: document,
			select,
			setAttributes,
		});
		return () => {
			cleanUp();
		};
	}, []);

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
		objAttributes,
	};

	const onFeatureAdd = () => {
		const count = attributes.features.length;
		const features = [
			...attributes.features,
			{
				icon: "fas fa-check",
				text: `Feature ${count}`,
				color: "#03bb89",
			},
		];

		setAttributes({ features });
	};

	const handlePricingStyle = (pricingStyle) => {
		setAttributes({ pricingStyle });
		switch (pricingStyle) {
			case "style-1":
				setAttributes({
					showSubtitle: false,
					showHeaderIcon: false,
				});
				defaultSubtitle ? setAttributes({ showSubtitle: true }) : "";
				defaultHeaderIcon ? setAttributes({ showHeaderIcon: true }) : "";
				defaultTitleLine === undefined
					? setAttributes({ showTitleLine: true })
					: "";
				break;

			case "style-2":
				defaultSubtitle === undefined
					? setAttributes({ showSubtitle: true })
					: "";
				defaultHeaderIcon === undefined
					? setAttributes({ showHeaderIcon: true })
					: "";
				defaultTitleLine === undefined
					? setAttributes({ showTitleLine: false })
					: "";
				break;

			case "style-3":
				setAttributes({
					showSubtitle: false,
					showHeaderIcon: false,
				});
				defaultSubtitle ? setAttributes({ showSubtitle: true }) : "";
				defaultHeaderIcon ? setAttributes({ showHeaderIcon: true }) : "";
				defaultTitleLine === undefined
					? setAttributes({ showTitleLine: true })
					: "";
				break;
		}
	};
	return (
		<InspectorControls key="controls">
			<span className="eb-panel-control">
				<PanelBody title={__("Settings")}>
					<SelectControl
						label={__("Pricing Preset")}
						value={pricingStyle}
						options={[
							{ label: "Default", value: "style-1" },
							{ label: "Style 2", value: "style-2" },
							{ label: "Style 3", value: "style-3" },
						]}
						onChange={(pricingStyle) => handlePricingStyle(pricingStyle)}
					/>
					<TextControl
						label={__("Title")}
						value={title}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
					/>
					<ToggleControl
						label={__("Show Subtitle?")}
						checked={showSubtitle}
						onChange={() => {
							setAttributes({
								showSubtitle: !showSubtitle,
								defaultSubtitle: !showSubtitle,
							});
						}}
					/>

					{showSubtitle && (
						<TextControl
							label={__("Sub Title")}
							value={subtitle}
							onChange={(newSubtitle) =>
								setAttributes({ subtitle: newSubtitle })
							}
						/>
					)}

					<ToggleControl
						label={__("Show Icon?")}
						checked={showHeaderIcon}
						onChange={() => {
							setAttributes({
								showHeaderIcon: !showHeaderIcon,
								defaultHeaderIcon: !showHeaderIcon,
							});
						}}
					/>

					{showHeaderIcon && (
						<BaseControl label={__("Icon")}>
							<FontIconPicker
								icons={faIcons}
								value={headerIcon}
								onChange={(headerIcon) => setAttributes({ headerIcon })}
								appendTo="body"
								closeOnSelect
							/>
						</BaseControl>
					)}
					<ToggleControl
						label={__("Show title line?")}
						checked={showTitleLine}
						onChange={() => {
							setAttributes({
								showTitleLine: !showTitleLine,
								defaultTitleLine: !showTitleLine,
							});
						}}
					/>
					<PanelBody title={__("Styles")}>
						<BaseControl>
							<h3 className="eb-control-title">{__("Background")}</h3>
						</BaseControl>
						<BackgroundControl
							controlName={priceTableBackground}
							resRequiredProps={resRequiredProps}
						/>
						<ResponsiveDimensionsControl
							resRequiredProps={resRequiredProps}
							controlName={wrapperPadding}
							baseLabel={__("Padding")}
						/>
						<ResponsiveDimensionsControl
							resRequiredProps={resRequiredProps}
							controlName={wrapperMargin}
							baseLabel={__("Margin")}
						/>
						<BaseControl>
							<h3 className="eb-control-title">Border</h3>
						</BaseControl>

						<BorderShadowControl
							controlName={wrapperBorderShadow}
							resRequiredProps={resRequiredProps}
						/>
					</PanelBody>
				</PanelBody>

				<PanelBody title={__("Header")} initialOpen={false}>
					<BaseControl>
						<h3 className="eb-control-title">{__("Title Style")}</h3>
					</BaseControl>
					<ColorControl
						label={__("Color")}
						color={titleTextColor}
						onChange={(titleTextColor) => setAttributes({ titleTextColor })}
					/>
					{showTitleLine && (
						<ColorControl
							label={__("Line Color")}
							color={titleLineColor}
							onChange={(titleLineColor) => setAttributes({ titleLineColor })}
						/>
					)}

					<ColorControl
						label={__("Background Color")}
						color={titleBackgroundColor}
						onChange={(titleBackgroundColor) =>
							setAttributes({ titleBackgroundColor })
						}
					/>
					<TypographyDropdown
						baseLabel={__("Typography")}
						typographyPrefixConstant={typoPrefix_title}
						resRequiredProps={resRequiredProps}
					/>
					<hr />
					{showSubtitle && (
						<>
							<BaseControl>
								<h3 className="eb-control-title">{__("Subtitle Style")}</h3>
							</BaseControl>
							<ColorControl
								label={__("Color")}
								color={subtitleTextColor}
								onChange={(subtitleTextColor) =>
									setAttributes({ subtitleTextColor })
								}
							/>
							<TypographyDropdown
								baseLabel={__("Typography")}
								typographyPrefixConstant={typoPrefix_subtitle}
								resRequiredProps={resRequiredProps}
							/>
						</>
					)}
					<hr />
					<BaseControl>
						<h3 className="eb-control-title">{__("Margin & Padding")}</h3>
					</BaseControl>
					<ResponsiveDimensionsControl
						resRequiredProps={resRequiredProps}
						controlName={titlePadding}
						baseLabel={__("Padding")}
					/>
					<ResponsiveDimensionsControl
						resRequiredProps={resRequiredProps}
						controlName={titleMargin}
						baseLabel={__("Margin")}
					/>
				</PanelBody>
				<PanelBody title={__("Price")} initialOpen={false}>
					<TextControl
						label={__("Price")}
						value={mainPrice}
						onChange={(newPrice) => setAttributes({ mainPrice: newPrice })}
					/>
					<ToggleControl
						label={__("On Sale?")}
						checked={showOnSale}
						onChange={() => {
							setAttributes({ showOnSale: !showOnSale });
						}}
					/>
					{showOnSale && (
						<TextControl
							label={__("Sale Price")}
							value={salePrice}
							onChange={(newsalePrice) =>
								setAttributes({ salePrice: newsalePrice })
							}
						/>
					)}
					<TextControl
						label={__("Price Currency")}
						value={priceCurrency}
						onChange={(newPriceCurrency) =>
							setAttributes({ priceCurrency: newPriceCurrency })
						}
					/>
					<SelectControl
						label={__("Currency Placement")}
						value={currencyPlacement}
						options={[
							{ label: "Left", value: "left" },
							{ label: "Right", value: "right" },
						]}
						onChange={(currencyPlacement) => {
							setAttributes({ currencyPlacement });
						}}
					/>
					<TextControl
						label={__("Price Period (per)")}
						value={pricePeriod}
						onChange={(pricePeriod) => setAttributes({ pricePeriod })}
					/>
					<TextControl
						label={__("Period Separator")}
						value={periodSeparator}
						onChange={(periodSeparator) => setAttributes({ periodSeparator })}
					/>
					<hr />
					<BaseControl>
						<h3 className="eb-control-title">{__("Original Price")}</h3>
					</BaseControl>
					<ColorControl
						label={__("Color")}
						color={priceTextColor}
						onChange={(priceTextColor) => setAttributes({ priceTextColor })}
					/>
					<TypographyDropdown
						baseLabel={__("Typography")}
						typographyPrefixConstant={typoPrefix_price_title}
						resRequiredProps={resRequiredProps}
					/>
					<hr />
					<BaseControl>
						<h3 className="eb-control-title">
							{__("Original Price Currency")}
						</h3>
					</BaseControl>
					<ColorControl
						label={__("Color")}
						color={priceCurrencyTextColor}
						onChange={(priceCurrencyTextColor) =>
							setAttributes({ priceCurrencyTextColor })
						}
					/>
					<TypographyDropdown
						baseLabel={__("Typography")}
						typographyPrefixConstant={typoPrefix_price_currency}
						resRequiredProps={resRequiredProps}
					/>
					<ResponsiveDimensionsControl
						resRequiredProps={resRequiredProps}
						controlName={priceCurrencyMargin}
						baseLabel={__("Margin")}
					/>
					<hr />
					{showOnSale && (
						<>
							<BaseControl>
								<h3 className="eb-control-title">{__("Sale Price")}</h3>
							</BaseControl>
							<ColorControl
								label={__("Color")}
								color={salePriceTextColor}
								onChange={(salePriceTextColor) =>
									setAttributes({ salePriceTextColor })
								}
							/>
							<TypographyDropdown
								baseLabel={__("Typography")}
								typographyPrefixConstant={typoPrefix_saleprice}
								resRequiredProps={resRequiredProps}
							/>
							<hr />
							<BaseControl>
								<h3 className="eb-control-title">
									{__("Sale Price Currency")}
								</h3>
							</BaseControl>
							<ColorControl
								label={__("Color")}
								color={salepriceCurrencyTextColor}
								onChange={(salepriceCurrencyTextColor) =>
									setAttributes({ salepriceCurrencyTextColor })
								}
							/>
							<TypographyDropdown
								baseLabel={__("Typography")}
								typographyPrefixConstant={typoPrefix_saleprice_currency}
								resRequiredProps={resRequiredProps}
							/>
							<ResponsiveDimensionsControl
								resRequiredProps={resRequiredProps}
								controlName={salepriceCurrencyMargin}
								baseLabel={__("Margin")}
							/>
							<hr />
						</>
					)}
					<BaseControl>
						<h3 className="eb-control-title">{__("Pricing Period")}</h3>
					</BaseControl>
					<ColorControl
						label={__("Color")}
						color={pricingPeriodTextColor}
						F
						onChange={(pricingPeriodTextColor) =>
							setAttributes({ pricingPeriodTextColor })
						}
					/>
					<TypographyDropdown
						baseLabel={__("Typography")}
						typographyPrefixConstant={typoPrefix_pricing_period}
						resRequiredProps={resRequiredProps}
					/>
				</PanelBody>

				<PanelBody title={__("Features")} initialOpen={false}>
					<SortableFeatures
						features={attributes.features}
						setAttributes={setAttributes}
					/>
					<Button
						className="eb-pricebox-feature-button"
						label={__("Add feature")}
						icon="plus-alt"
						onClick={onFeatureAdd}
					>
						<span className="eb-pricebox-add-button-label">Add Feature</span>
					</Button>
					<hr />
					<ColorControl
						label={__("Color")}
						color={featuresTextColor}
						onChange={(featuresTextColor) =>
							setAttributes({ featuresTextColor })
						}
					/>
					<ResponsiveRangeController
						baseLabel={__("Icon Size")}
						controlName={featuresIconSize}
						resRequiredProps={resRequiredProps}
						min={0}
						max={50}
						step={1}
						noUnits
					/>
					<TypographyDropdown
						baseLabel={__("Typography")}
						typographyPrefixConstant={typoPrefix_features_text}
						resRequiredProps={resRequiredProps}
					/>
				</PanelBody>

				<PanelBody title={__("Button")} initialOpen={false}>
					<ToggleControl
						label={__("Display Button?")}
						checked={showButton}
						onChange={() => {
							setAttributes({ showButton: !showButton });
						}}
					/>
					<BaseControl label={__("Button Icon")}>
						<FontIconPicker
							icons={faIcons}
							value={buttonIcon}
							onChange={(buttonIcon) => setAttributes({ buttonIcon })}
							appendTo="body"
							closeOnSelect
						/>
					</BaseControl>
					<SelectControl
						label={__("Icon Position")}
						value={buttonIconPosition}
						options={[
							{ label: "Left", value: "left" },
							{ label: "Right", value: "right" },
						]}
						onChange={(buttonIconPosition) => {
							setAttributes({ buttonIconPosition });
						}}
					/>
					<ResponsiveRangeController
						baseLabel={__("Icon Spacing")}
						controlName={buttonIconSpacing}
						resRequiredProps={resRequiredProps}
						min={1}
						max={60}
						step={1}
						noUnits
					/>
					<TextControl
						label={__("Button Text")}
						value={buttonText}
						onChange={(text) => setAttributes({ buttonText: text })}
					/>
					<TextControl
						label={__("Button Link")}
						value={buttonURL}
						onChange={(link) => setAttributes({ buttonURL: link })}
					/>
					<ResponsiveDimensionsControl
						resRequiredProps={resRequiredProps}
						controlName={buttonPadding}
						baseLabel={__("Padding")}
					/>
					<ResponsiveDimensionsControl
						resRequiredProps={resRequiredProps}
						controlName={buttonMargin}
						baseLabel={__("Margin")}
					/>
					<ResponsiveRangeController
						baseLabel={__("Icon Size")}
						controlName={buttonIconSize}
						resRequiredProps={resRequiredProps}
						min={0}
						max={50}
						step={1}
						noUnits
					/>
					<TypographyDropdown
						baseLabel={__("Typography")}
						typographyPrefixConstant={typoPrefix_button}
						resRequiredProps={resRequiredProps}
					/>
					<ColorControl
						label={__("Text Color")}
						color={buttonTextColor}
						onChange={(buttonTextColor) => setAttributes({ buttonTextColor })}
					/>
					<ColorControl
						label={__("Text Hover Color")}
						color={hoverTextColor}
						onChange={(hoverTextColor) => setAttributes({ hoverTextColor })}
					/>
					<BaseControl>
						<h3 className="eb-control-title">{__("Button Background")}</h3>
					</BaseControl>
					<BackgroundControl
						controlName={buttonBackgroundControl}
						resRequiredProps={resRequiredProps}
					/>
					<ColorControl
						label={__("Hover Background")}
						color={hoverBackgroundColor}
						onChange={(hoverBackgroundColor) =>
							setAttributes({ hoverBackgroundColor })
						}
					/>
					<BaseControl>
						<h3 className="eb-control-title">{__("Button Border Style")}</h3>
					</BaseControl>
					<BorderShadowControl
						controlName={buttonBorderShadow}
						resRequiredProps={resRequiredProps}
					/>
				</PanelBody>

				{showHeaderIcon && (
					<PanelBody title={__("Icon Settings")} initialOpen={false}>
						<ToggleControl
							label={__("Show Background")}
							checked={showIconBackground}
							onChange={() => {
								setAttributes({
									showIconBackground: !showIconBackground,
									defaultIconBackground: !showIconBackground,
								});
							}}
						/>
						{showIconBackground && (
							<>
								<ColorControl
									label={__("Background Color")}
									color={iconBackgroundColor}
									onChange={(iconBackgroundColor) =>
										setAttributes({ iconBackgroundColor })
									}
								/>
								<ColorControl
									label={__("Background Hover Color")}
									color={iconBackgroundHoverColor}
									onChange={(iconBackgroundHoverColor) =>
										setAttributes({ iconBackgroundHoverColor })
									}
								/>
								<hr />
							</>
						)}
						<ResponsiveRangeController
							baseLabel={__("Icon Size")}
							controlName={headerIconSize}
							resRequiredProps={resRequiredProps}
							min={0}
							max={200}
							step={1}
						/>
						<ResponsiveRangeController
							baseLabel={__("Icon Area Width")}
							controlName={headerIconWidth}
							resRequiredProps={resRequiredProps}
							units={TWOUNITS}
							min={0}
							max={500}
							step={1}
						/>
						<ResponsiveRangeController
							baseLabel={__("Icon Area Height")}
							controlName={headerIconHeight}
							resRequiredProps={resRequiredProps}
							units={TWOUNITS}
							min={0}
							max={500}
							step={1}
						/>
						<ColorControl
							label={__("Icon Color")}
							color={iconColor}
							onChange={(iconColor) => setAttributes({ iconColor })}
						/>
						<ColorControl
							label={__("Icon Hover Color")}
							color={iconHoverColor}
							onChange={(iconHoverColor) => setAttributes({ iconHoverColor })}
						/>
						<hr />
						<BaseControl>
							<h3 className="eb-control-title">Border</h3>
						</BaseControl>
						<BorderShadowControl
							controlName={iconBorderShadow}
							resRequiredProps={resRequiredProps}
							noShadow
						/>
					</PanelBody>
				)}
				<PanelBody title={__("Ribbon")} initialOpen={false}>
					<ToggleControl
						label={__("Featured")}
						checked={showRibbon}
						onChange={() => {
							setAttributes({
								showRibbon: !showRibbon,
							});
						}}
					/>
					{showRibbon && (
						<>
							<SelectControl
								label={__("Ribbon Style")}
								value={ribbonStyle}
								options={[
									{ label: "Style 1", value: "ribbon-1" },
									{ label: "Style 2", value: "ribbon-2" },
									{ label: "Style 3", value: "ribbon-3" },
									{ label: "Style 4", value: "ribbon-4" },
								]}
								onChange={(ribbonStyle) => {
									setAttributes({ ribbonStyle });
								}}
							/>
							{ribbonStyle !== "ribbon-1" && (
								<TextControl
									label={__("Featured Tag Text")}
									value={ribbonText}
									onChange={(ribbonText) => setAttributes({ ribbonText })}
								/>
							)}
							<ColorControl
								label={__("Color")}
								color={ribbonColor}
								onChange={(ribbonColor) => setAttributes({ ribbonColor })}
							/>
							<ColorControl
								label={__("Background Color")}
								color={ribbonBackgroundColor}
								onChange={(ribbonBackgroundColor) =>
									setAttributes({ ribbonBackgroundColor })
								}
							/>
						</>
					)}
				</PanelBody>
			</span>
		</InspectorControls>
	);
};

export default Inspector;

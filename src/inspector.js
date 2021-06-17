/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
	TextControl,
	Button,
	BaseControl,
	Dropdown,
} = wp.components;

/**
 * Internal dependencies
 */
import {
	BORDER_STYLES,
	FONT_WEIGHT,
	TEXT_TRANSFORM,
	TEXT_DECORATION,
} from "./constants";
import faIcons from "../util/faIcons";
import DimensionsControl from "../util/dimensions-control";
import UnitControl from "../util/unit-control";
import SortableFeatures from "./sortable-features";
import FontPicker from "../util/typography-control/FontPicker";
import ColorControl from "../util/color-control";
import { TypographyIcon } from "../util/icons";
import ResetControl from "../util/reset-control";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";

const Inspector = ({ attributes, setAttributes }) => {
	const {
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

		displaySubtitle,
		titleBackgroundColor,
		titleTextColor,
		displayPriceDetails,
		priceDetails,
		priceBackgroundColor,
		priceTextColor,
		features,
		featuresBackgroundColor,
		featuresTextColor,
		buttonBackground,
		buttonTextColor,
		buttonText,
		hoverBackgroundColor,
		hoverTextColor,
		priceboxBackground,
		shadowColor,
		shadowHOffset,
		shadowVOffset,
		shadowBlur,
		shadowSpread,
		borderWidth,
		borderStyle,
		borderColor,
		linkedMargin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		linkedPadding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		priceIcon,
		marginUnit,
		paddingUnit,
		iconSizeUnit,
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
		buttonURL,
		subtitleFontFamily,
		subtitleFontSize,
		subtitleSizeUnit,
		subtitleFontWeight,
		subtitleTextTransform,
		subtitleTextDecoration,
		subtitleLineHeight,
		subtitleLineHeightUnit,
		subtitleLetterSpacing,
		subtitleLetterSpacingUnit,
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
		priceFontFamily,
		priceFontSize,
		priceSizeUnit,
		priceFontWeight,
		priceTextDecoration,
		priceLineHeight,
		priceLineHeightUnit,
		priceLetterSpacing,
		priceLetterSpacingUnit,
		buttonFontFamily,
		buttonFontSize,
		buttonSizeUnit,
		buttonFontWeight,
		buttonTextDecoration,
		buttonLineHeight,
		buttonLineHeightUnit,
		buttonLetterSpacing,
		buttonLetterSpacingUnit,
	} = attributes;

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

	return (
		<InspectorControls key="controls">
			<span className="eb-panel-control">
				<PanelBody title={__("Settings")}>
					<SelectControl
						label={__("Pricing Style")}
						value={pricingStyle}
						options={[
							{ label: "Default", value: "style-1" },
							{ label: "Style 2", value: "style-2" },
							{ label: "Style 3", value: "style-3" },
						]}
						onChange={(pricingStyle) => {
							setAttributes({ pricingStyle });
						}}
					/>
					<TextControl
						label={__("Title")}
						value={title}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
					/>

					{pricingStyle !== "style-1" && (
						<TextControl
							label={__("Sub Title")}
							value={subtitle}
							onChange={(newSubtitle) =>
								setAttributes({ subtitle: newSubtitle })
							}
						/>
					)}

					{pricingStyle === "style-2" && (
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
				</PanelBody>

				<PanelBody title={__("Typography")} initialOpen={false}>
					{displaySubtitle && (
						<BaseControl label={__("Subtitle")} className="eb-typography-base">
							<Dropdown
								className="eb-typography-dropdown"
								contentClassName="my-popover-content-classname"
								position="bottom right"
								renderToggle={({ isOpen, onToggle }) => (
									<Button isSmall onClick={onToggle} aria-expanded={isOpen}>
										<TypographyIcon />
									</Button>
								)}
								renderContent={() => (
									<div
										className="eb-panel-control"
										style={{ padding: "0.2rem" }}
									>
										<FontPicker
											label={__("Font Family")}
											value={subtitleFontFamily}
											onChange={(subtitleFontFamily) =>
												setAttributes({ subtitleFontFamily })
											}
										/>

										<UnitControl
											selectedUnit={subtitleSizeUnit}
											unitTypes={[
												{ label: "px", value: "px" },
												{ label: "%", value: "%" },
												{ label: "em", value: "em" },
											]}
											onClick={(subtitleSizeUnit) =>
												setAttributes({ subtitleSizeUnit })
											}
										/>

										<RangeControl
											label={__("Font Size")}
											value={subtitleFontSize}
											onChange={(subtitleFontSize) =>
												setAttributes({ subtitleFontSize })
											}
											step={SUBTITLE_SIZE_STEP}
											min={0}
											max={SUBTITLE_SIZE_MAX}
										/>

										<SelectControl
											label={__("Font Weight")}
											value={subtitleFontWeight}
											options={FONT_WEIGHT}
											onChange={(subtitleFontWeight) =>
												setAttributes({ subtitleFontWeight })
											}
										/>

										<SelectControl
											label={__("Text Decoration")}
											value={subtitleTextDecoration}
											options={TEXT_DECORATION}
											onChange={(subtitleTextDecoration) =>
												setAttributes({ subtitleTextDecoration })
											}
										/>

										<UnitControl
											selectedUnit={subtitleLetterSpacingUnit}
											unitTypes={[
												{ label: "px", value: "px" },
												{ label: "em", value: "em" },
											]}
											onClick={(subtitleLetterSpacingUnit) =>
												setAttributes({ subtitleLetterSpacingUnit })
											}
										/>

										<RangeControl
											label={__("Letter Spacing")}
											value={subtitleLetterSpacing}
											onChange={(subtitleLetterSpacing) =>
												setAttributes({ subtitleLetterSpacing })
											}
											min={0}
											max={SUBTITLE_SPACING_MAX}
											step={SUBTITLE_SPACING_STEP}
										/>

										<UnitControl
											selectedUnit={subtitleLineHeightUnit}
											unitTypes={[
												{ label: "px", value: "px" },
												{ label: "em", value: "em" },
											]}
											onClick={(subtitleLineHeightUnit) =>
												setAttributes({ subtitleLineHeightUnit })
											}
										/>

										<RangeControl
											label={__("Line Height")}
											value={subtitleLineHeight}
											onChange={(subtitleLineHeight) =>
												setAttributes({ subtitleLineHeight })
											}
											min={0}
											max={SUBTITLE_LINE_HEIGHT_MAX}
											step={SUBTITLE_LINE_HEIGHT_STEP}
										/>
									</div>
								)}
							/>
						</BaseControl>
					)}

					<BaseControl label={__("Price")} className="eb-typography-base">
						<Dropdown
							className="eb-typography-dropdown"
							contentClassName="my-popover-content-classname"
							position="bottom right"
							renderToggle={({ isOpen, onToggle }) => (
								<Button isSmall onClick={onToggle} aria-expanded={isOpen}>
									<TypographyIcon />
								</Button>
							)}
							renderContent={() => (
								<div className="eb-panel-control" style={{ padding: "0.2rem" }}>
									<FontPicker
										label={__("Font Family")}
										value={priceFontFamily}
										onChange={(priceFontFamily) =>
											setAttributes({ priceFontFamily })
										}
									/>

									<UnitControl
										selectedUnit={priceSizeUnit}
										unitTypes={[
											{ label: "px", value: "px" },
											{ label: "%", value: "%" },
											{ label: "em", value: "em" },
										]}
										onClick={(priceSizeUnit) =>
											setAttributes({ priceSizeUnit })
										}
									/>

									<RangeControl
										label={__("Font Size")}
										value={priceFontSize}
										onChange={(priceFontSize) =>
											setAttributes({ priceFontSize })
										}
										step={PRICE_SIZE_STEP}
										min={0}
										max={PRICE_SIZE_MAX}
									/>

									<SelectControl
										label={__("Font Weight")}
										value={priceFontWeight}
										options={FONT_WEIGHT}
										onChange={(priceFontWeight) =>
											setAttributes({ priceFontWeight })
										}
									/>

									<SelectControl
										label={__("Text Decoration")}
										value={priceTextDecoration}
										options={TEXT_DECORATION}
										onChange={(priceTextDecoration) =>
											setAttributes({ priceTextDecoration })
										}
									/>

									<UnitControl
										selectedUnit={priceLetterSpacingUnit}
										unitTypes={[
											{ label: "px", value: "px" },
											{ label: "em", value: "em" },
										]}
										onClick={(priceLetterSpacingUnit) =>
											setAttributes({ priceLetterSpacingUnit })
										}
									/>

									<RangeControl
										label={__("Letter Spacing")}
										value={priceLetterSpacing}
										onChange={(priceLetterSpacing) =>
											setAttributes({ priceLetterSpacing })
										}
										min={0}
										max={PRICE_SPACING_MAX}
										step={PRICE_SPACING_STEP}
									/>

									<UnitControl
										selectedUnit={priceLineHeightUnit}
										unitTypes={[
											{ label: "px", value: "px" },
											{ label: "em", value: "em" },
										]}
										onClick={(priceLineHeightUnit) =>
											setAttributes({ priceLineHeightUnit })
										}
									/>

									<RangeControl
										label={__("Line Height")}
										value={priceLineHeight}
										onChange={(priceLineHeight) =>
											setAttributes({ priceLineHeight })
										}
										min={0}
										max={PRICE_LINE_HEIGHT_MAX}
										step={PRICE_LINE_HEIGHT_STEP}
									/>
								</div>
							)}
						/>
					</BaseControl>

					<BaseControl label={__("Feauture")} className="eb-typography-base">
						<Dropdown
							className="eb-typography-dropdown"
							contentClassName="my-popover-content-classname"
							position="bottom right"
							renderToggle={({ isOpen, onToggle }) => (
								<Button isSmall onClick={onToggle} aria-expanded={isOpen}>
									<TypographyIcon />
								</Button>
							)}
							renderContent={() => (
								<div className="eb-panel-control" style={{ padding: "0.2rem" }}>
									<FontPicker
										label={__("Font Family")}
										value={featureFontFamily}
										onChange={(featureFontFamily) =>
											setAttributes({ featureFontFamily })
										}
									/>

									<UnitControl
										selectedUnit={featureSizeUnit}
										unitTypes={[
											{ label: "px", value: "px" },
											{ label: "%", value: "%" },
											{ label: "em", value: "em" },
										]}
										onClick={(featureSizeUnit) =>
											setAttributes({ featureSizeUnit })
										}
									/>

									<RangeControl
										label={__("Font Size")}
										value={featureFontSize}
										onChange={(featureFontSize) =>
											setAttributes({ featureFontSize })
										}
										step={FEATURE_SIZE_STEP}
										min={0}
										max={FEATURE_SIZE_MAX}
									/>

									<SelectControl
										label={__("Font Weight")}
										value={featureFontWeight}
										options={FONT_WEIGHT}
										onChange={(featureFontWeight) =>
											setAttributes({ featureFontWeight })
										}
									/>

									<SelectControl
										label={__("Text Transform")}
										value={featureTextTransform}
										options={TEXT_TRANSFORM}
										onChange={(featureTextTransform) =>
											setAttributes({ featureTextTransform })
										}
									/>

									<SelectControl
										label={__("Text Decoration")}
										value={featureTextDecoration}
										options={TEXT_DECORATION}
										onChange={(featureTextDecoration) =>
											setAttributes({ featureTextDecoration })
										}
									/>

									<UnitControl
										selectedUnit={featureLetterSpacingUnit}
										unitTypes={[
											{ label: "px", value: "px" },
											{ label: "em", value: "em" },
										]}
										onClick={(featureLetterSpacingUnit) =>
											setAttributes({ featureLetterSpacingUnit })
										}
									/>

									<RangeControl
										label={__("Letter Spacing")}
										value={featureLetterSpacing}
										onChange={(featureLetterSpacing) =>
											setAttributes({ featureLetterSpacing })
										}
										min={0}
										max={FEATURE_SPACING_MAX}
										step={FEATURE_SPACING_STEP}
									/>

									<UnitControl
										selectedUnit={featureLineHeightUnit}
										unitTypes={[
											{ label: "px", value: "px" },
											{ label: "em", value: "em" },
										]}
										onClick={(featureLineHeightUnit) =>
											setAttributes({ featureLineHeightUnit })
										}
									/>

									<RangeControl
										label={__("Line Height")}
										value={featureLineHeight}
										onChange={(featureLineHeight) =>
											setAttributes({ featureLineHeight })
										}
										min={0}
										max={FEATURE_LINE_HEIGHT_MAX}
										step={FEATURE_LINE_HEIGHT_STEP}
									/>
								</div>
							)}
						/>
					</BaseControl>

					<BaseControl label={__("Button")} className="eb-typography-base">
						<Dropdown
							className="eb-typography-dropdown"
							contentClassName="my-popover-content-classname"
							position="bottom right"
							renderToggle={({ isOpen, onToggle }) => (
								<Button isSmall onClick={onToggle} aria-expanded={isOpen}>
									<TypographyIcon />
								</Button>
							)}
							renderContent={() => (
								<div className="eb-panel-control" style={{ padding: "0.2rem" }}>
									<FontPicker
										label={__("Font Family")}
										value={buttonFontFamily}
										onChange={(buttonFontFamily) =>
											setAttributes({ buttonFontFamily })
										}
									/>

									<UnitControl
										selectedUnit={buttonSizeUnit}
										unitTypes={[
											{ label: "px", value: "px" },
											{ label: "%", value: "%" },
											{ label: "em", value: "em" },
										]}
										onClick={(buttonSizeUnit) =>
											setAttributes({ buttonSizeUnit })
										}
									/>

									<RangeControl
										label={__("Font Size")}
										value={buttonFontSize}
										onChange={(buttonFontSize) =>
											setAttributes({ buttonFontSize })
										}
										step={BUTTON_SIZE_STEP}
										min={0}
										max={BUTTON_SIZE_MAX}
									/>

									<SelectControl
										label={__("Font Weight")}
										value={buttonFontWeight}
										options={FONT_WEIGHT}
										onChange={(buttonFontWeight) =>
											setAttributes({ buttonFontWeight })
										}
									/>

									<SelectControl
										label={__("Text Decoration")}
										value={buttonTextDecoration}
										options={TEXT_DECORATION}
										onChange={(buttonTextDecoration) =>
											setAttributes({ buttonTextDecoration })
										}
									/>

									<UnitControl
										selectedUnit={buttonLetterSpacingUnit}
										unitTypes={[
											{ label: "px", value: "px" },
											{ label: "em", value: "em" },
										]}
										onClick={(buttonLetterSpacingUnit) =>
											setAttributes({ buttonLetterSpacingUnit })
										}
									/>

									<RangeControl
										label={__("Letter Spacing")}
										value={buttonLetterSpacing}
										onChange={(buttonLetterSpacing) =>
											setAttributes({ buttonLetterSpacing })
										}
										min={0}
										max={BUTTON_SPACING_MAX}
										step={BUTTON_SPACING_STEP}
									/>

									<UnitControl
										selectedUnit={buttonLineHeightUnit}
										unitTypes={[
											{ label: "px", value: "px" },
											{ label: "em", value: "em" },
										]}
										onClick={(buttonLineHeightUnit) =>
											setAttributes({ buttonLineHeightUnit })
										}
									/>

									<RangeControl
										label={__("Line Height")}
										value={buttonLineHeight}
										onChange={(buttonLineHeight) =>
											setAttributes({ buttonLineHeight })
										}
										min={0}
										max={BUTTON_LINE_HEIGHT_MAX}
										step={BUTTON_LINE_HEIGHT_STEP}
									/>
								</div>
							)}
						/>
					</BaseControl>
				</PanelBody>

				<PanelBody title={__("Colors")} initialOpen={false}>
					<ColorControl
						label={__("Background Color")}
						color={priceboxBackground}
						onChange={(priceboxBackground) =>
							setAttributes({ priceboxBackground })
						}
					/>

					<ColorControl
						label={__("Title Background")}
						color={titleBackgroundColor}
						onChange={(titleBackgroundColor) =>
							setAttributes({ titleBackgroundColor })
						}
					/>

					<ColorControl
						label={__("Title Text")}
						color={titleTextColor}
						onChange={(titleTextColor) => setAttributes({ titleTextColor })}
					/>

					<ColorControl
						label={__("Price Background")}
						color={priceBackgroundColor}
						onChange={(priceBackgroundColor) =>
							setAttributes({ priceBackgroundColor })
						}
					/>

					<ColorControl
						label={__("Price Text")}
						color={priceTextColor}
						onChange={(priceTextColor) => setAttributes({ priceTextColor })}
					/>

					<ColorControl
						label={__("Features Background")}
						color={featuresBackgroundColor}
						onChange={(featuresBackgroundColor) =>
							setAttributes({ featuresBackgroundColor })
						}
					/>

					<ColorControl
						label={__("Features Text")}
						color={featuresTextColor}
						onChange={(featuresTextColor) =>
							setAttributes({ featuresTextColor })
						}
					/>
				</PanelBody>

				<PanelBody title={__("Border")} initialOpen={false}>
					<ColorControl
						label={__("Border Color")}
						color={borderColor}
						onChange={(borderColor) => setAttributes({ borderColor })}
					/>

					<ResetControl
						onReset={() => setAttributes({ borderWidth: undefined })}
					>
						<RangeControl
							label={__("Border Width")}
							initialOpen={false}
							value={borderWidth}
							onChange={(borderWidth) => setAttributes({ borderWidth })}
						/>
					</ResetControl>

					<SelectControl
						label={__("Border Style")}
						value={borderStyle}
						options={BORDER_STYLES}
						onChange={(newStyle) => setAttributes({ borderStyle: newStyle })}
					/>
				</PanelBody>

				<PanelBody title={__("Shadow")} initialOpen={false}>
					<ColorControl
						label={__("Shadow Color")}
						color={shadowColor}
						onChange={(shadowColor) => setAttributes({ shadowColor })}
					/>

					<ResetControl
						onReset={() => setAttributes({ shadowHOffset: undefined })}
					>
						<RangeControl
							label={__("Horizontal Offset")}
							value={shadowHOffset}
							onChange={(shadowHOffset) => setAttributes({ shadowHOffset })}
							min={0}
							max={200}
						/>
					</ResetControl>

					<ResetControl
						onReset={() => setAttributes({ shadowVOffset: undefined })}
					>
						<RangeControl
							label={__("Vertical Offset")}
							value={shadowVOffset}
							onChange={(shadowVOffset) => setAttributes({ shadowVOffset })}
							min={0}
							max={200}
						/>
					</ResetControl>

					<ResetControl
						onReset={() => setAttributes({ shadowBlur: undefined })}
					>
						<RangeControl
							label={__("Blur")}
							value={shadowBlur}
							onChange={(shadowBlur) => setAttributes({ shadowBlur })}
							min={0}
							max={200}
						/>
					</ResetControl>

					<ResetControl
						onReset={() => setAttributes({ shadowSpread: undefined })}
					>
						<RangeControl
							label={__("Spread")}
							value={shadowSpread}
							onChange={(shadowSpread) => setAttributes({ shadowSpread })}
							min={0}
							max={200}
						/>
					</ResetControl>
				</PanelBody>

				<PanelBody title={__("Button Settings")} initialOpen={false}>
					<UnitControl
						selectedUnit={buttonHeightUnit}
						unitTypes={[
							{ label: "px", value: "px" },
							{ label: "em", value: "em" },
							{ label: "%", value: "%" },
						]}
						onClick={(buttonHeightUnit) => setAttributes({ buttonHeightUnit })}
					/>

					<ResetControl
						onReset={() => setAttributes({ buttonHeight: undefined })}
					>
						<RangeControl
							label={__("Height")}
							value={buttonHeight}
							onChange={(buttonHeight) => setAttributes({ buttonHeight })}
							min={0}
							max={600}
						/>
					</ResetControl>

					<UnitControl
						selectedUnit={buttonWidthUnit}
						unitTypes={[
							{ label: "px", value: "px" },
							{ label: "em", value: "em" },
							{ label: "%", value: "%" },
						]}
						onClick={(buttonWidthUnit) => setAttributes({ buttonWidthUnit })}
					/>

					<ResetControl
						onReset={() => setAttributes({ buttonWidth: undefined })}
					>
						<RangeControl
							label={__("Width")}
							value={buttonWidth}
							onChange={(buttonWidth) => setAttributes({ buttonWidth })}
							min={0}
							max={600}
						/>
					</ResetControl>

					<UnitControl
						selectedUnit={buttonSizeUnit}
						unitTypes={[
							{ label: "px", value: "px" },
							{ label: "em", value: "em" },
							{ label: "%", value: "%" },
						]}
						onClick={(buttonSizeUnit) => setAttributes({ buttonSizeUnit })}
					/>

					<TextControl
						label={__("Button Link")}
						value={buttonURL}
						onChange={(link) => setAttributes({ buttonURL: link })}
					/>

					<ColorControl
						label={__("Button Background")}
						color={buttonBackground}
						onChange={(buttonBackground) => setAttributes({ buttonBackground })}
					/>

					<ColorControl
						label={__("Button Text")}
						color={buttonTextColor}
						onChange={(buttonTextColor) => setAttributes({ buttonTextColor })}
					/>

					<ColorControl
						label={__("Border Color")}
						color={buttonBorderColor}
						onChange={(buttonBorderColor) =>
							setAttributes({ buttonBorderColor })
						}
					/>

					<ColorControl
						label={__("Hover Background")}
						color={hoverBackgroundColor}
						onChange={(hoverBackgroundColor) =>
							setAttributes({ hoverBackgroundColor })
						}
					/>

					<ColorControl
						label={__("Hover Text")}
						color={hoverTextColor}
						onChange={(hoverTextColor) => setAttributes({ hoverTextColor })}
					/>

					<ColorControl
						label={__("Hover Border")}
						color={hoverBorderColor}
						onChange={(hoverBorderColor) => setAttributes({ hoverBorderColor })}
					/>

					<PanelBody title={__("Border")} initialOpen={false}>
						<ResetControl
							onReset={() => setAttributes({ buttonBorderWidth: undefined })}
						>
							<RangeControl
								label={__("Border Width (px)")}
								value={buttonBorderWidth}
								onChange={(buttonBorderWidth) =>
									setAttributes({ buttonBorderWidth })
								}
								min={0}
								max={20}
							/>
						</ResetControl>

						<UnitControl
							selectedUnit={buttonBorderRadiusUnit}
							unitTypes={[
								{ label: "px", value: "px" },
								{ label: "%", value: "%" },
							]}
							onClick={(buttonBorderRadiusUnit) =>
								setAttributes({ buttonBorderRadiusUnit })
							}
						/>

						<ResetControl
							onReset={() => setAttributes({ buttonBorderRadius: undefined })}
						>
							<RangeControl
								label={__("Border Radius")}
								value={buttonBorderRadius}
								onChange={(buttonBorderRadius) =>
									setAttributes({ buttonBorderRadius })
								}
								min={0}
								max={100}
							/>
						</ResetControl>

						<SelectControl
							label={__("Border Style")}
							value={buttonBorderStyle}
							options={BORDER_STYLES}
							onChange={(buttonBorderStyle) =>
								setAttributes({ buttonBorderStyle })
							}
						/>
					</PanelBody>
				</PanelBody>

				<PanelBody title={__("Margin & Padding")} initialOpen={false}>
					<UnitControl
						selectedUnit={marginUnit}
						unitTypes={[
							{ label: "px", value: "px" },
							{ label: "em", value: "em" },
							{ label: "%", value: "%" },
						]}
						onClick={(marginUnit) => setAttributes({ marginUnit })}
					/>

					<DimensionsControl
						label={__("Margin")}
						top={marginTop}
						right={marginRight}
						bottom={marginBottom}
						left={marginLeft}
						onChange={({ top, right, bottom, left }) =>
							setAttributes({
								marginTop: top,
								marginRight: right,
								marginBottom: bottom,
								marginLeft: left,
							})
						}
					/>

					<UnitControl
						selectedUnit={paddingUnit}
						unitTypes={[
							{ label: "px", value: "px" },
							{ label: "em", value: "em" },
							{ label: "%", value: "%" },
						]}
						onClick={(paddingUnit) => setAttributes({ paddingUnit })}
					/>

					<DimensionsControl
						label={__("Padding")}
						top={paddingTop}
						right={paddingRight}
						bottom={paddingBottom}
						left={paddingLeft}
						onChange={({ top, right, bottom, left }) =>
							setAttributes({
								paddingTop: top,
								paddingRight: right,
								paddingBottom: bottom,
								paddingLeft: left,
							})
						}
					/>
				</PanelBody>
			</span>
		</InspectorControls>
	);
};

export default Inspector;

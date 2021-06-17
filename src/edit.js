/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
/**
 * Internal dependencies
 */
import "./editor.scss";
import Inspector from "./inspector";

const edit = (props) => {
	const { attributes, isSelected, setAttributes } = props;
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
		priceBackgroundColor,
		priceTextColor,
		features,
		featuresBackgroundColor,
		featuresTextColor,
		buttonBackground,
		buttonTextColor,
		buttonText,
		isHover,
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
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		marginUnit,
		paddingUnit,
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

	const wrapperStyles = {
		margin: `${marginTop || 0}${marginUnit} ${marginRight || 0}${marginUnit} ${
			marginBottom || 0
		}${marginUnit} ${marginLeft || 0}${marginUnit}`,
		padding: `${paddingTop || 0}${paddingUnit} ${
			paddingRight || 0
		}${paddingUnit} ${paddingBottom || 0}${paddingUnit} ${
			paddingLeft || 0
		}${paddingUnit}`,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		background: priceboxBackground || "#fff",
		boxShadow: `${shadowHOffset || 0}px ${shadowVOffset || 0}px ${
			shadowBlur || 0
		}px ${shadowSpread || 0}px ${shadowColor || "#000000"}`,
		border: `${borderWidth || 0}px ${borderStyle} ${borderColor || "#000000"}`,
	};

	const titleWrapperStyles = {
		width: "100%",
		background: titleBackgroundColor || "transparent",
		textAlign: "center",
	};

	const titleStyles = {
		color: titleTextColor || "#4a5059",
	};

	const subtitleStyles = {
		fontSize: `${subtitleFontSize || 24}${subtitleSizeUnit}`,
		fontFamily: subtitleFontFamily,
		fontWeight: subtitleFontWeight,
		textDecoration: subtitleTextDecoration,
		letterSpacing: subtitleLetterSpacing
			? `${subtitleLetterSpacing}${subtitleLetterSpacingUnit}`
			: undefined,
		lineHeight: subtitleLineHeight
			? `${subtitleLineHeight}${subtitleLineHeightUnit}`
			: undefined,
	};

	const priceWrapperStyles = {
		display: "flex",
		justifyContent: "center",
		width: "100%",
		background: priceBackgroundColor || "#3074ff",
		color: priceTextColor || "#edf1f7",
		lineHeight: priceLineHeight
			? `${priceLineHeight}${priceLineHeightUnit}`
			: undefined,
	};

	const priceStyles = {
		fontSize: `${priceFontSize || 48}${priceSizeUnit}`,
		fontFamily: priceFontFamily,
		fontWeight: priceFontWeight,
		textDecoration: priceTextDecoration,
		letterSpacing: priceLetterSpacing
			? `${priceLetterSpacing}${priceLetterSpacingUnit}`
			: undefined,
		margin: 0,
	};

	const featuresWrapperStyles = {
		background: featuresBackgroundColor,
		width: "100%",
		textAlign: "center",
	};

	const featureListStyle = {
		lineHeight: featureLineHeight
			? `${featureLineHeight}${featureLineHeightUnit}`
			: undefined,
	};

	const featureStyles = {
		color: featuresTextColor || "#767676",
		listStyle: "none",
		fontSize: `${featureFontSize || 18}${featureSizeUnit}`,
		fontFamily: featureFontFamily,
		fontWeight: featureFontWeight,
		textDecoration: featureTextDecoration,
		textTransform: featureTextTransform,
		letterSpacing: featureLetterSpacing
			? `${featureLetterSpacing}${featureLetterSpacingUnit}`
			: undefined,
		marginLeft: 0,
		paddingLeft: 0,
	};

	const buttonStyles = {
		height: buttonHeight ? `${buttonHeight}${buttonHeightUnit}` : undefined,
		width: buttonWidth ? `${buttonWidth}${buttonWidthUnit}` : undefined,
		borderWidth: `${buttonBorderWidth || 0}px`,
		borderStyle: buttonBorderStyle,
		borderColor: isHover
			? hoverBorderColor || "#000000"
			: buttonBorderColor || "#000000",
		textAlign: "center",
		background: isHover
			? hoverBackgroundColor || "#7967ff"
			: buttonBackground || "#3074ff",
		color: isHover ? hoverTextColor || "#ffffff" : buttonTextColor || "#edf1f7",
		margin: 10,
		textAlign: "center",
		padding: "8px 26px",
		display: "inline-block",
		borderRadius: `${buttonBorderRadius || 0}${buttonBorderRadiusUnit}`,
		fontSize: `${buttonFontSize || 16}${buttonSizeUnit}`,
		fontFamily: buttonFontFamily,
		fontWeight: buttonFontWeight,
		textDecoration: buttonTextDecoration,
		textTransform: buttonTextTransform,
		letterSpacing: buttonLetterSpacing
			? `${buttonLetterSpacing}${buttonLetterSpacingUnit}`
			: undefined,
		lineHeight: buttonLineHeight
			? `${buttonLineHeight}${buttonLineHeightUnit}`
			: undefined,
		cursor: isHover ? "pointer" : "default",
	};

	const colorStyles = {
		color: "#00C853",
	};

	const wrapperStylesNew = {
		overflow: "hidden",
	};

	return [
		isSelected && (
			<Inspector attributes={attributes} setAttributes={setAttributes} />
		),

		// Edit view here
		<div className={`ebgb-pricing ${pricingStyle}`} style={wrapperStylesNew}>
			<div className="ebgb-pricing-item featured ribbon-4">
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
				{console.log(attributes)}
				<div className="body">
					<ul>
						{features.map(({ icon, text, color }) => (
							<li data-icon={icon} data-color={color}>
								<span
									className={`ebgb-pricebox-icon ${icon}`}
									style={{ color: color }}
								/>
								<span className="ebgb-pricebox-text">{text}</span>
							</li>
						))}
						{/* <li>
							<span className="li-icon" style={colorStyles}>
								<i className="fas fa-check"></i>
							</span>
							<span className="ebgb-pricebox-feature-text">
								Unlimited calls
							</span>
						</li>
						<li>
							<span className="li-icon" style={colorStyles}>
								<i className="fas fa-check"></i>
							</span>
							Free hosting
						</li>
						<li>
							<span className="li-icon" style={colorStyles}>
								<i className="fas fa-check"></i>
							</span>
							500 MB of storage space
						</li>
						<li>
							<span className="li-icon" style={colorStyles}>
								<i className="fas fa-check"></i>
							</span>
							500 MB Bandwidth
						</li>
						<li>
							<span className="li-icon" style={colorStyles}>
								<i className="fas fa-check"></i>
							</span>
							24/7 support
						</li> */}
					</ul>
				</div>
				<div className="footer">
					<a
						href="#"
						target="_blank"
						rel="nofollow noopener"
						className="ebgb-pricing-button"
					>
						<i className=" fa-icon-left"></i>
						Choose Plan{" "}
					</a>
				</div>
			</div>
		</div>,
		// edit view end
	];
};

export default edit;

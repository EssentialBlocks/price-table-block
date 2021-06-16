/**
 * WordPress dependencies
 */
const { RichText } = wp.blockEditor;

const save = ({ attributes }) => {
	const {
		pricingStyle,
		title,
		subtitle,
		headerIcon,
		price,
		salePrice,
		priceCurrency,

		displaySubtitle,
		titleBackgroundColor,
		titleTextColor,
		priceValueSize,
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
		buttonURL,
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
		background: priceboxBackground ? priceboxBackground : "#ffffff",
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
	};

	const buttonStyles = {
		height: buttonHeight ? `${buttonHeight}${buttonHeightUnit}` : undefined,
		width: buttonWidth ? `${buttonWidth}${buttonWidthUnit}` : undefined,
		background: buttonBackground || "#3074ff",
		borderWidth: `${buttonBorderWidth || 0}px`,
		borderStyle: buttonBorderStyle,
		borderColor: buttonBorderColor || "#000000",
		color: buttonTextColor || "#edf1f7",
		margin: 10,
		padding: "8px 26px",
		textAlign: "center",
		display: "inline-block",
		borderRadius: `${buttonBorderRadius || 0}${buttonBorderRadiusUnit}`,
		textDecoration: "none",
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
	};
	const colorStyles = {
		color: "#00C853",
	};

	const wrapperStylesNew = {
		overflow: "hidden",
	};

	return (
		<>
			<div class={`ebgb-pricing ${pricingStyle}`} style={wrapperStylesNew}>
				<div class="ebgb-pricing-item featured ribbon-4">
					{pricingStyle === "style-2" && headerIcon && (
						<div className="ebgb-pricing-icon" data-icon={headerIcon}>
							<span className="icon">
								<i class={headerIcon}></i>
							</span>
						</div>
					)}
					<div class="header">
						<h2 class="ebgb-pricing-title">{title}</h2>
						{pricingStyle !== "style-1" && (
							<span className="ebgb-pricing-subtitle">{subtitle}</span>
						)}
					</div>
					<div class="ebgb-pricing-tag">
						<span class="price-tag">
							<del class="original-price">
								<span class="price-currency">{priceCurrency}</span>
								{price}
							</del>
							<span class="sale-price">
								<span class="price-currency">{priceCurrency}</span>
								{salePrice}
							</span>
						</span>
						<span class="price-period">/ month</span>
					</div>
					<div class="body">
						<ul>
							<li>
								<span class="li-icon" style={colorStyles}>
									<i class="fas fa-check"></i>
								</span>
								Unlimited calls
							</li>
							<li>
								<span class="li-icon" style={colorStyles}>
									<i class="fas fa-check"></i>
								</span>
								Free hosting
							</li>
							<li>
								<span class="li-icon" style={colorStyles}>
									<i class="fas fa-check"></i>
								</span>
								500 MB of storage space
							</li>
							<li>
								<span class="li-icon" style={colorStyles}>
									<i class="fas fa-check"></i>
								</span>
								500 MB Bandwidth
							</li>
							<li>
								<span class="li-icon" style={colorStyles}>
									<i class="fas fa-check"></i>
								</span>
								24/7 support
							</li>
						</ul>
					</div>
					<div class="footer">
						<a
							href="#"
							target="_blank"
							rel="nofollow noopener"
							class="ebgb-pricing-button"
						>
							<i class=" fa-icon-left"></i>
							Choose Plan{" "}
						</a>
					</div>
				</div>
			</div>
		</>
	);
};
export default save;

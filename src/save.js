/**
 * WordPress dependencies
 */
const { useBlockProps } = wp.blockEditor;

const save = ({ attributes }) => {
	const {
		blockId,
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

		// new attributes

		displaySubtitle,
		titleBackgroundColor,
		titleTextColor,
		priceValueSize,
		displayPriceDetails,
		priceDetails,
		priceBackgroundColor,
		priceTextColor,
		featuresBackgroundColor,
		featuresTextColor,
		buttonBackground,
		buttonTextColor,
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

	// console.log(features);

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
			<div {...useBlockProps.save()}>
				<div className={blockId}>
					<div className={`ebgb-pricing ${pricingStyle}`}>
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
							<div className="body">
								<ul className="ebgb-pricebox-features">
									{features.map(({ icon, text, color, clickable, link }) => (
										<li
											className="ebgb-pricebox-feature-item"
											style={featureListStyle}
											data-icon={icon}
											data-color={color}
											data-clickable={clickable}
											data-link={link}
										>
											{clickable && link ? (
												<a href={link}>
													<span className={`ebgb-pricebox-icon ${icon}`} />
													<span className="ebgb-pricebox-feature-text">
														{text}
													</span>
												</a>
											) : (
												<>
													<span className={`ebgb-pricebox-icon ${icon}`} />
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
				</div>
			</div>
		</>
	);
};
export default save;

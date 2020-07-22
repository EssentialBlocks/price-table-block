/**
 * WordPress dependencies
 */
const { RichText } = wp.blockEditor;

const save = ({ attributes }) => {
	const {
		title,
		titleTag,
		displaySubtitle,
		subtitle,
		titleBackgroundColor,
		titleTextColor,
		price,
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
		fontSize: `${priceValueSize || 48}${priceSizeUnit}`,
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

	return (
		<div
			className="eb-pricebox-wrapper"
			style={wrapperStyles}
			data-button-background={buttonBackground || "#3074ff"}
			data-button-text-color={buttonTextColor || "#ffffff"}
			data-button-border={`${buttonBorderWidth || 0}px ${buttonBorderStyle} ${
				buttonBorderColor || "#000000"
			}`}
			data-hover-background={hoverBackgroundColor || "#7967ff"}
			data-hover-text-color={hoverTextColor || "#edf1f7"}
			data-hover-border={`${buttonBorderWidth || 0}px ${buttonBorderStyle} ${
				hoverBorderColor || "#000000"
			}`}
		>
			<div style={titleWrapperStyles}>
				<RichText.Content
					tagName="h3"
					className="eb-pricebox-title"
					value={title}
					style={titleStyles}
				/>
				<RichText.Content
					tagName="p"
					className="eb-pricebox-subtitle"
					style={{
						...titleStyles,
						...subtitleStyles,
						display: displaySubtitle ? "block" : "none",
					}}
					value={subtitle}
				/>
			</div>

			<div style={priceWrapperStyles}>
				<RichText.Content
					tagName="p"
					className="eb-pricebox-price"
					value={price}
					style={priceStyles}
				/>
			</div>

			<div style={featuresWrapperStyles}>
				<ul className="eb-pricebox-features" style={featureStyles}>
					{features.map(({ icon, text, color, clickable, link }) => (
						<li
							className="eb-pricebox-feature-item"
							style={featureListStyle}
							data-icon={icon}
							data-color={color}
							data-clickable={clickable}
							data-link={link}
						>
							<span
								className={`eb-pricebox-icon ${icon}`}
								style={{ color: color }}
							/>
							<span className="eb-pricebox-feature-text">{text}</span>
						</li>
					))}
				</ul>
			</div>

			<a className="eb-pricebox-button" href={buttonURL} style={buttonStyles}>
				{buttonText}
			</a>
		</div>
	);
};
export default save;

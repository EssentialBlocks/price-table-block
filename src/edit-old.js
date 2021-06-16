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
		title,
		displaySubtitle,
		subtitle,
		titleBackgroundColor,
		titleTextColor,
		price,
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

	return [
		isSelected && <Inspector {...props} />,

		// Edit view here
		<div className="eb-pricebox-wrapper" style={wrapperStyles}>
			<div style={titleWrapperStyles}>
				<RichText
					tagName="h3"
					className="eb-pricebox-title"
					value={title}
					style={titleStyles}
					placeholder="Add Title"
					onChange={(newTitle) => setAttributes({ title: newTitle })}
					keepPlaceholderOnFocus
				/>

				<RichText
					tagName="p"
					className="eb-pricebox-subtitle"
					value={subtitle}
					style={{
						...titleStyles,
						...subtitleStyles,
						display: displaySubtitle ? "block" : "none",
					}}
					placeholder="Add Subtitle"
					onChange={(newSubtitle) => setAttributes({ subtitle: newSubtitle })}
					keepPlaceholderOnFocus
				/>
			</div>

			<div className="eb-pricebox-price" style={priceWrapperStyles}>
				<RichText
					tagName="p"
					value={price}
					style={priceStyles}
					placeholder={__("99")}
					onChange={(newPrice) => setAttributes({ price: newPrice })}
					keepPlaceholderOnFocus
				/>
			</div>

			<div style={featuresWrapperStyles}>
				<ul className="eb-pricebox-features" style={featureStyles}>
					{features.map(({ icon, text, color }) => (
						<li data-icon={icon} data-color={color} style={featureListStyle}>
							<span
								className={`eb-pricebox-icon ${icon}`}
								style={{ color: color }}
							/>
							<span className="eb-pricebox-text">{text}</span>
						</li>
					))}
				</ul>
			</div>

			<div
				className="eb-pricebox-button"
				style={buttonStyles}
				onMouseEnter={() => setAttributes({ isHover: true })}
				onMouseLeave={() => setAttributes({ isHover: false })}
			>
				<RichText
					value={buttonText}
					placeholder={__("Add Text")}
					onChange={(newText) => setAttributes({ buttonText: newText })}
					keepPlaceholderOnFocus
				/>
			</div>
			<div />
		</div>,
	];
};

export default edit;

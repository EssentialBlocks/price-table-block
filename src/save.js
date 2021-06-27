/**
 * WordPress dependencies
 */
const { useBlockProps } = wp.blockEditor;

const Save = ({ attributes }) => {
	const {
		blockId,
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
		hoverBackgroundColor,
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
	} = attributes;

	// ribbon Class
	const ribbonClass = showRibbon ? ` featured ${ribbonStyle}` : "";

	return (
		<div>
			<div className={`${blockId} ebgb-pricing-content-${contentAlign}`}>
				<div className={`ebgb-pricing ${pricingStyle}`}>
					<div className={`ebgb-pricing-item${ribbonClass}`}>
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
						{pricingStyle !== "style-3" && (
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
						)}
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
						{pricingStyle === "style-3" && (
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
						)}
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
		</div>
		// edit view end
	);
};
export default Save;

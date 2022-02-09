/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";

import attributes from "./attributes";

const deprecated = [
	{
		attributes: {
			...attributes,
			title: {
				type: "string",
				source: "text",
				selector: ".eb-pricing .header .eb-pricing-title",
				default: "Startup",
			},
			subtitle: {
				type: "string",
				source: "text",
				selector: ".eb-pricing .header .eb-pricing-subtitle",
				default: "A tagline here.",
			},
			features: {
				type: "array",
				source: "query",
				selector: ".eb-pricing .body ul li",
				query: {
					text: {
						type: "string",
						source: "text",
						selector: ".eb-pricebox-feature-text",
					},
					icon: {
						type: "string",
						source: "attribute",
						attribute: "data-icon",
					},
					color: {
						type: "string",
						source: "attribute",
						attribute: "data-color",
					},
					link: {
						type: "string",
						source: "attribute",
						attribute: "data-link",
					},
					clickable: {
						type: "string",
						source: "attribute",
						attribute: "data-clickable",
					},
				},
				default: [
					{
						icon: "fas fa-check",
						text: "Unlimited Calls",
						color: "#03bb89",
						clickable: "false",
						link: "",
					},
					{
						icon: "fas fa-check",
						text: "Free Hosting",
						color: "#03bb89",
						clickable: "false",
						link: "",
					},
					{
						icon: "fas fa-check",
						text: "500MB free storage",
						color: "#03bb89",
						clickable: "false",
						link: "",
					},
					{
						icon: "fas fa-check",
						text: "24/7 Support",
						color: "#03bb89",
						clickable: "false",
						link: "",
					},
				],
			},
			buttonIcon: {
				type: "attribute",
				selector: ".eb-pricing .footer",
				attribute: "data-icon",
			},
		},
		save: ({ attributes }) => {
			const {
				blockId,
				pricingStyle,
				title,
				showSubtitle,
				subtitle,
				showHeaderIcon,
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
				contentAlign,
				showRibbon,
				ribbonStyle,
			} = attributes;

			// ribbon Class
			const ribbonClass = showRibbon ? ` featured ${ribbonStyle}` : "";

			return (
				<div {...useBlockProps.save()}>
					<div className={`${blockId} eb-pricing-content-${contentAlign}`}>
						<div className={`eb-pricing ${pricingStyle}`}>
							<div className={`eb-pricing-item${ribbonClass}`}>
								<div className="eb-pricing-item-overlay"></div>
								{showHeaderIcon && (
									<div className="eb-pricing-icon" data-icon={headerIcon}>
										<span className="icon">
											<i class={headerIcon}></i>
										</span>
									</div>
								)}
								<div className="header">
									<h2 className="eb-pricing-title">{title}</h2>
									{showSubtitle && (
										<span className="eb-pricing-subtitle">{subtitle}</span>
									)}
								</div>
								{pricingStyle !== "style-3" && (
									<div className="eb-pricing-tag">
										<span className="price-tag">
											<span
												className={`original-price${
													showOnSale === true ? " line-through" : ""
												}`}
												data-price={mainPrice}
											>
												{currencyPlacement === "left" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
												{mainPrice}
												{currencyPlacement === "right" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
											</span>

											{showOnSale && (
												<>
													<span
														className="sale-price"
														data-sale-price={salePrice}
													>
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
									<ul className="eb-pricebox-features">
										{features.map(({ icon, text, color, clickable, link }) => (
											<li
												className="eb-pricebox-feature-item"
												data-icon={icon}
												data-color={color}
												data-clickable={clickable}
												data-link={link}
											>
												{clickable && link ? (
													<a href={link}>
														<span
															className={`eb-pricebox-icon ${icon}`}
															style={{ color: color }}
														/>
														<span className="eb-pricebox-feature-text">
															{text}
														</span>
													</a>
												) : (
													<>
														<span
															className={`eb-pricebox-icon ${icon}`}
															style={{ color: color }}
														/>
														<span className="eb-pricebox-feature-text">
															{text}
														</span>
													</>
												)}
											</li>
										))}
									</ul>
								</div>
								{pricingStyle === "style-3" && (
									<div className="eb-pricing-tag">
										<span className="price-tag">
											<span
												className={`original-price${
													showOnSale === true ? " line-through" : ""
												}`}
												data-price={mainPrice}
											>
												{currencyPlacement === "left" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
												{mainPrice}
												{currencyPlacement === "right" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
											</span>

											{showOnSale && (
												<>
													<span
														className="sale-price"
														data-sale-price={salePrice}
													>
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
										<div className="eb-pricing-button-wrapper">
											<a href={buttonURL} className="eb-pricing-button">
												{buttonIconPosition === "left" && (
													<i className={buttonIcon}></i>
												)}
												<span className="eb-button-text">{buttonText}</span>
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
		},
	},
];

export default deprecated;

const { __ } = wp.i18n;
const { Dashicon } = wp.components;

export const BORDER_STYLES = [
	{ label: __("Dashed"), value: "dashed" },
	{ label: __("Solid"), value: "solid" },
	{ label: __("Dotted"), value: "dotted" },
	{ label: __("Double"), value: "double" },
	{ label: __("Groove"), value: "groove" },
	{ label: __("Inset"), value: "inset" },
	{ label: __("Outset"), value: "outset" },
	{ label: __("Ridge"), value: "ridge" },
];

export const TEXT_TRANSFORM = [
	{ label: __("None"), value: "none" },
	{ label: __("Lowercase"), value: "lowercase" },
	{ label: __("Capitalize"), value: "capitalize" },
	{ label: __("Uppercase"), value: "uppercase" },
];

export const FONT_WEIGHT = [
	{ label: __("Lighter"), value: "lighter" },
	{ label: __("Normal"), value: "normal" },
	{ label: __("Bold"), value: "bold" },
	{ label: __("Bolder"), value: "bolder" },
];

export const TEXT_DECORATION = [
	{ label: __("Initial"), value: "initial" },
	{ label: __("Overline"), value: "overline" },
	{ label: __("Line Through"), value: "line-through" },
	{ label: __("Underline"), value: "underline" },
	{ label: __("Underline Oveline"), value: "underline overline" },
];

export const TWOUNITS = [
	{ label: __("px"), value: "px" },
	{ label: __("%"), value: "%" },
];

// Responsive Range Controller
export const buttonIconSpacing = "btnIconSpace";
export const buttonIconSize = "btnIconSize";
export const headerIconSize = "headerIconSize";
export const headerIconWidth = "headerIconWidth";
export const headerIconHeight = "headerIconHeight";
export const featuresIconSize = "featuresIconSize";

// dimension controls
export const buttonPadding = "btnPadding";
export const buttonMargin = "btnMargin";
export const wrapperMargin = "wrapperMargin";
export const wrapperPadding = "wrapperPadding";
export const titlePadding = "titlePadding";
export const titleMargin = "titleMargin";
export const priceCurrencyMargin = "priceCurrencyMargin";
export const salepriceCurrencyMargin = "salepriceCurrencyMargin";

// background controls
export const buttonBackgroundControl = "btnBg";
export const priceTableBackground = "priceTableBg";

// border shadow controller
export const buttonBorderShadow = "btnBrdSdw";
export const wrapperBorderShadow = "wrpBrdSdw";
export const iconBorderShadow = "iconBrdSdw";

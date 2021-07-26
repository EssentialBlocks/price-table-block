/**
 * WordPress dependeincies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import Save from "./save";
import Edit from "./edit";
import attributes from "./attributes";
import icon from "./icon";
import example from "./example";
import "./style.scss";

registerBlockType("price-table-block/pricing-table", {
	title: __("Pricing Table", "price-table-block"),
	description: __(
		"EB Pricing Table will let you create effective product pricing table with perfect styling to get more sales from your prospective buyers.",
		"price-table-block"
	),
	icon,
	category: "widgets",
	attributes,
	keywords: [
		__("eb price", "price-table-block"),
		__("table", "price-table-block"),
		__("comparison", "price-table-block"),
	],
	edit: Edit,
	save: Save,
	deprecated,
	example,
});

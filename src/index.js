/**
 * WordPress dependeincies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import Save from "./save";
import Edit from "./edit";
import attributes from "./attributes";
import icon from "./icon";
import example from "./example";
import "./style.scss";

registerBlockType("pricing-table-block/pricing-table", {
	title: __("Pricing Table", "essential-blocks"),
	icon,
	category: "widgets",
	attributes,
	keywords: [
		__("eb price", "essential-blocks"),
		__("table", "essential-blocks"),
		__("comparison", "essential-blocks"),
	],
	edit: Edit,
	save: Save,
	example,
});

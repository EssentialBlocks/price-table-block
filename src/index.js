/**
 * WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import Save from "./save";
import Edit from "./edit";
import { PricingTableIcon } from "./icon";
import example from "./example";
import attributes from "./attributes";
import deprecated from "./deprecated";
import "./style.scss";
import metadata from "../block.json";
const { ebConditionalRegisterBlockType } = window.EBPricingTableControls;

ebConditionalRegisterBlockType(metadata, {
	icon: PricingTableIcon,
	attributes,
	keywords: [
		__("eb price", "essential-blocks"),
		__("table", "essential-blocks"),
		__("eb price table", "essential-blocks"),
	],
	edit: Edit,
	save: Save,
	example,
	deprecated,
});

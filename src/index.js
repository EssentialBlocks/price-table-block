import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import save from "./save";
import icon from "./icon";

registerBlockType("essential-blocks/pricing-table", {
	title: __("Pricing Table", "essential-blocks"),
	description: __("", "essential-blocks"),
	category: "widgets",
	icon,
	edit: Edit,
	save,
});

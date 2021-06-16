/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { PanelColorSettings } from "@wordpress/block-editor";
import { BaseControl, TextControl, ToggleControl } from "@wordpress/components";
import { Component, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import {
	SortableContainer,
	SortableElement,
	SortableHandle,
	arrayMove,
} from "react-sortable-hoc";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import ColorControl from "../util/color-control";

/**
 * Internal dependencies
 */
import faIcons from "../util/faIcons";

const DragHandle = SortableHandle(() => (
	<span className="fa fa-ellipsis-v drag-handle" />
));

const TrashIcon = ({ position, onDeleteFeature }) => (
	<span
		className="fa fa-trash eb-pricebox-sortable-trash"
		onClick={() => onDeleteFeature(position)}
	/>
);

const SortableItem = SortableElement(
	({
		feature,
		position,
		onFeatureClick,
		onFeatureChange,
		onDeleteFeature,
		clickedItem,
	}) => {
		return (
			<li className="drag-helper">
				<span className="eb-pricebox-sortable-item">
					<DragHandle />
					<span
						className="eb-pricebox-sortable-title"
						onClick={() => onFeatureClick(position)}
					>
						{feature.text}
					</span>
					<TrashIcon position={position} onDeleteFeature={onDeleteFeature} />
				</span>
				{position === clickedItem && (
					<Fragment>
						<TextControl
							label={__("Text")}
							value={feature.text}
							onChange={(value) => onFeatureChange("text", value, position)}
						/>

						<ToggleControl
							label={__("Link")}
							checked={feature.clickable === "true"}
							onChange={(value) =>
								onFeatureChange("clickable", value.toString(), position)
							}
						/>

						{feature.clickable === "true" && (
							<TextControl
								label={__("Link")}
								value={feature.link}
								onChange={(value) => onFeatureChange("link", value, position)}
							/>
						)}

						<BaseControl label={__("Select Icon")}>
							<FontIconPicker
								icons={faIcons}
								onChange={(value) => onFeatureChange("icon", value, position)}
								value={feature.icon}
								appendTo="body"
								isMulti={false}
							/>
						</BaseControl>

						{feature.icon && (
							<ColorControl
								label={__("Icon Color")}
								color={feature.color}
								onChange={(value) => onFeatureChange("color", value, position)}
							/>
						)}
					</Fragment>
				)}
			</li>
		);
	}
);

const SortableList = SortableContainer(
	({
		features,
		onFeatureClick,
		onFeatureChange,
		onDeleteFeature,
		clickedItem,
	}) => {
		return (
			<ul>
				{features.map((item, index) => (
					<SortableItem
						key={`item-${index}`}
						index={index}
						position={index}
						feature={item}
						clickedItem={clickedItem}
						onFeatureClick={onFeatureClick}
						onFeatureChange={onFeatureChange}
						onDeleteFeature={onDeleteFeature}
					/>
				))}
			</ul>
		);
	}
);

class SortableFeatures extends Component {
	state = {
		clickedItem: null,
	};

	onSortEnd = ({ newIndex, oldIndex }) => {
		const { features, setAttributes } = this.props;
		setAttributes({ features: arrayMove(features, oldIndex, newIndex) });
	};

	onFeatureClick = (index) => {
		let clickedItem = this.state.clickedItem === index ? null : index;
		this.setState({ clickedItem });
	};

	onFeatureChange = (key, value, position) => {
		let features = [...this.props.features];
		features[position][key] = value;

		this.props.setAttributes({ features });
	};

	onDeleteFeature = (position) => {
		const { setAttributes } = this.props;
		let features = [...this.props.features];
		features.splice(position, 1);
		setAttributes({ features });
	};

	render = () => {
		return (
			<SortableList
				features={this.props.features}
				onFeatureClick={this.onFeatureClick}
				onFeatureChange={this.onFeatureChange}
				onDeleteFeature={this.onDeleteFeature}
				onSortEnd={this.onSortEnd}
				clickedItem={this.state.clickedItem}
				useDragHandle
			/>
		);
	};
}

export default SortableFeatures;

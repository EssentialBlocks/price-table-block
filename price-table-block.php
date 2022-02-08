<?php

/**
 * Plugin Name:     Price Table Block
 * Plugin URI: 		https://essential-blocks.com
 * Description:     Instantly create beautiful pricing menu for eCommerce website
 * Version:         1.1.3
 * Author:          WPDeveloper
 * Author URI: 		https://wpdeveloper.net
 * License:         GPL-3.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:     price-table-block
 *
 * @package         price-table-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

require_once __DIR__ . '/includes/font-loader.php';
require_once __DIR__ . '/includes/post-meta.php';
require_once __DIR__ . '/includes/helpers.php';
require_once __DIR__ . '/lib/style-handler/style-handler.php';

function create_block_pricing_table_block_init()
{

	define('PRICE_TABLE_BLOCKS_VERSION', "1.1.3");
	define('PRICE_TABLE_BLOCKS_ADMIN_URL', plugin_dir_url(__FILE__));
	define('PRICE_TABLE_BLOCKS_ADMIN_PATH', dirname(__FILE__));

	$script_asset_path = PRICE_TABLE_BLOCKS_ADMIN_PATH . "/dist/index.asset.php";
	if (!file_exists($script_asset_path)) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "price-table-block/pricing-table" block first.'
		);
	}

	$index_js = PRICE_TABLE_BLOCKS_ADMIN_URL . 'dist/index.js';
	$script_asset = require($script_asset_path);
	$all_dependencies = array_merge($script_asset['dependencies'], array(
		'wp-blocks',
		'wp-i18n',
		'wp-element',
		'wp-block-editor',
		'eb-price-table-blocks-controls-util'
	));

	wp_register_script(
		'eb-pricing-table-block-editor',
		$index_js,
		$all_dependencies,
		$script_asset['version']
	);

	$fontpicker_theme = 'assets/css/fonticonpicker.base-theme.react.css';
	wp_register_style(
		'fontpicker-default-theme',
		plugins_url($fontpicker_theme, __FILE__),
		array()
	);

	$fontpicker_material_theme = 'assets/css/fonticonpicker.material-theme.react.css';
	wp_register_style(
		'fontpicker-matetial-theme',
		plugins_url($fontpicker_material_theme, __FILE__),
		array()
	);

	$editor_css = 'dist/style.css';
	wp_register_style(
		'eb-pricing-table-block-editor-style',
		plugins_url($editor_css, __FILE__),
		array('fontpicker-default-theme', 'fontpicker-matetial-theme'),
		filemtime(PRICE_TABLE_BLOCKS_ADMIN_PATH . "/$editor_css")
	);

	$fontawesome_css = 'assets/css/font-awesome5.css';
	wp_register_style(
		'fontawesome-frontend-css',
		plugins_url($fontawesome_css, __FILE__),
		array()
	);

	$style_css = PRICE_TABLE_BLOCKS_ADMIN_URL . 'dist/style.css';
	wp_register_style(
		'create-block-pricing-table-block',
		$style_css,
		array('fontawesome-frontend-css'),
		filemtime(PRICE_TABLE_BLOCKS_ADMIN_PATH . '/dist/style.css')
	);

	if (!WP_Block_Type_Registry::get_instance()->is_registered('essential-blocks/pricing-table')) {
		register_block_type(
			Price_Table_Helper::get_block_register_path('price-table-block/pricing-table', PRICE_TABLE_BLOCKS_ADMIN_PATH),
			array(
				'editor_script' => 'eb-pricing-table-block-editor',
				'editor_style' => 'eb-pricing-table-block-editor-style',
				'style'         => 'create-block-pricing-table-block',
			)
		);
	}
}
add_action('init', 'create_block_pricing_table_block_init');

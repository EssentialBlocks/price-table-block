<?php
/**
 * Plugin Name:     Price Table Block
 * Plugin URI: 		https://essential-blocks.com
 * Description:     Instantly create beautiful pricing menu for eCommerce website
 * Version:         1.0.0
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

if( ! class_exists('EB_Font_Loader') ) {
	require_once __DIR__ . '/includes/font-loader.php';
}
if( ! class_exists('EB_Post_Meta') ) {
	require_once __DIR__ . '/includes/post-meta.php';
}

function create_block_pricing_table_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "block/pricing-table" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-pricing-table-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);


	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-pricing-table-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	$fontpicker_theme = 'src/css/fonticonpicker.base-theme.react.css';
	wp_enqueue_style(
		'fontpicker-default-theme',
		plugins_url( $fontpicker_theme, __FILE__),
		array()
	);

	$fontpicker_material_theme = 'src/css/fonticonpicker.material-theme.react.css';
	wp_enqueue_style(
		'fontpicker-matetial-theme',
		plugins_url( $fontpicker_material_theme, __FILE__),
		array()
	);

	$fontawesome_css = 'src/css/font-awesome5.css';
	wp_enqueue_style(
		'fontawesome-frontend-css',
		plugins_url( $fontawesome_css, __FILE__),
		array()
	);


	if( ! WP_Block_Type_Registry::get_instance()->is_registered( 'essential-blocks/pricing-table' ) ) {
    register_block_type( 'block/pricing-table', array(
      'editor_script' => 'create-block-pricing-table-block-editor',
      'style'         => 'create-block-pricing-table-block',
			'fontpicker_theme' => 'fontpicker-default-theme',
			'fontpicker_material_theme' => 'fontpicker-material-theme',
			'fontawesome_css' => 'fontawesome-frontend-css',
    ) );
  }
}
add_action( 'init', 'create_block_pricing_table_block_init' );

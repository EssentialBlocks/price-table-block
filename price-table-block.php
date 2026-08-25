<?php

/**
 * Plugin Name:     Price Table Block
 * Plugin URI:         https://essential-blocks.com
 * Description:     Instantly create beautiful pricing menu for eCommerce website
 * Version:         1.3.0
 * Author:          WPDeveloper
 * Author URI:         https://wpdeveloper.net
 * License:         GPL-3.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:     price-table-block
 * Requires at least: 6.0
 * Requires PHP:    7.4
 *
 * @package         price-table-block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

require_once __DIR__ . '/includes/font-loader.php';
require_once __DIR__ . '/includes/post-meta.php';
require_once __DIR__ . '/includes/helpers.php';

/**
 * `lib/style-handler` ships as a git submodule. Guard the require so an
 * uninitialised submodule degrades gracefully instead of fataling the site.
 */
if ( file_exists( __DIR__ . '/lib/style-handler/style-handler.php' ) ) {
    require_once __DIR__ . '/lib/style-handler/style-handler.php';
}

if ( ! function_exists( 'create_block_pricing_table_block_init' ) ) {
function create_block_pricing_table_block_init() {

    define( 'PRICE_TABLE_BLOCKS_VERSION', '1.3.0' );
    define( 'PRICE_TABLE_BLOCKS_ADMIN_URL', plugin_dir_url( __FILE__ ) );
    define( 'PRICE_TABLE_BLOCKS_ADMIN_PATH', dirname( __FILE__ ) );

    $script_asset_path = PRICE_TABLE_BLOCKS_ADMIN_PATH . "/dist/index.asset.php";
    if ( ! file_exists( $script_asset_path ) ) {
        throw new Error(
            'You need to run `npm start` or `npm run build` for the "price-table-block/pricing-table" block first.'
        );
    }

    $index_js     = PRICE_TABLE_BLOCKS_ADMIN_URL . 'dist/index.js';
    $script_asset = require $script_asset_path;

    // Generated *.asset.php files are trusted but may be stale/partial.
    if ( ! is_array( $script_asset ) ) {
        $script_asset = array();
    }
    $asset_dependencies = isset( $script_asset['dependencies'] ) && is_array( $script_asset['dependencies'] )
        ? $script_asset['dependencies']
        : array();
    $asset_version = isset( $script_asset['version'] ) ? $script_asset['version'] : PRICE_TABLE_BLOCKS_VERSION;

    $all_dependencies = array_merge( $asset_dependencies, [
        'wp-blocks',
        'wp-i18n',
        'wp-element',
        'wp-block-editor',
        'eb-price-table-blocks-controls-util',
        'essential-blocks-eb-animation'
    ] );

    wp_register_script(
        'eb-pricing-table-block-editor',
        $index_js,
        $all_dependencies,
        $asset_version
    );

    $load_animation_js = PRICE_TABLE_BLOCKS_ADMIN_URL . 'assets/js/eb-animation-load.js';
    wp_register_script(
        'essential-blocks-eb-animation',
        $load_animation_js,
        [],
        PRICE_TABLE_BLOCKS_VERSION,
        true
    );

    $animate_css = PRICE_TABLE_BLOCKS_ADMIN_URL . 'assets/css/animate.min.css';
    wp_register_style(
        'essential-blocks-animation',
        $animate_css,
        [],
        PRICE_TABLE_BLOCKS_VERSION
    );

    $fontpicker_theme = 'assets/css/fonticonpicker.base-theme.react.css';
    wp_register_style(
        'fontpicker-default-theme',
        plugins_url( $fontpicker_theme, __FILE__ ),
        [],
        PRICE_TABLE_BLOCKS_VERSION
    );

    $fontpicker_material_theme = 'assets/css/fonticonpicker.material-theme.react.css';
    wp_register_style(
        'fontpicker-matetial-theme',
        plugins_url( $fontpicker_material_theme, __FILE__ ),
        [],
        PRICE_TABLE_BLOCKS_VERSION
    );

    /**
     * Font Awesome 6, not 5 — and never at the mercy of a shared handle.
     *
     * `wordpress-icon-picker` ships a Font Awesome 6 icon list while emitting
     * FA5-era prefix classes, so a chosen icon is saved as `fas fa-house`. Under
     * an FA5 stylesheet the `.fas` prefix still resolves and the `<i>` keeps its
     * box, but `.fa-house:before` is never defined, so `content` stays empty and
     * the icon renders as blank space in a correctly positioned container. 798 of
     * the 1873 icons the picker offers are FA6 renames or FA6 additions and fail
     * exactly this way.
     *
     * `fontawesome-frontend-css` is a handle shared with the other Essential
     * Blocks standalone plugins, and `WP_Dependencies::add()` keeps the first
     * registration and silently discards the rest. `active_plugins` is sorted, so
     * `button-group/button-group.php` registers before this file and its Font
     * Awesome 5.15.2 build takes the handle for the whole site — which is what
     * emptied this block's icons in both the picker and the saved markup.
     *
     * The 6.5.1 registration below is still offered, so a sibling that has no
     * Font Awesome of its own inherits FA6. But this block no longer *depends* on
     * the shared handle: when another plugin already owns it, a private handle is
     * registered instead, so the FA6 face and the full FA6 glyph set are on the
     * page no matter who won.
     */
    $fontawesome_css = plugins_url( 'assets/css/fontawesome/css/all.min.css', __FILE__ );

    wp_register_style(
        'fontawesome-frontend-css',
        $fontawesome_css,
        [],
        PRICE_TABLE_BLOCKS_VERSION
    );

    $shared_fontawesome = wp_styles()->query( 'fontawesome-frontend-css', 'registered' );
    $fontawesome_handle = ( $shared_fontawesome && $shared_fontawesome->src === $fontawesome_css )
        ? 'fontawesome-frontend-css'
        : 'eb-price-table-fontawesome';

    if ( 'eb-price-table-fontawesome' === $fontawesome_handle ) {
        wp_register_style(
            $fontawesome_handle,
            $fontawesome_css,
            [],
            PRICE_TABLE_BLOCKS_VERSION
        );
    }

    /**
     * Loading FA6 alongside a sibling's FA5 is not enough on its own: both files
     * define `.fas` / `.far` / `.fab`, and 28 icon names that exist in both
     * releases carry different codepoints, so the winner would come down to
     * stylesheet order. This layer restates Font Awesome 6 under this block's own
     * scopes — `.eb-pricing-wrapper`, `#wipIcon`, `.wip-iconpicker-popup` — so it
     * wins on specificity instead, and cannot reach any other plugin's icons.
     *
     * It is a dependency of both styles below rather than a separate enqueue so
     * it is always printed directly after the Font Awesome build it corrects.
     */
    $fontawesome_compat_css  = 'assets/css/fontawesome-compat.css';
    $fontawesome_compat_path = PRICE_TABLE_BLOCKS_ADMIN_PATH . '/' . $fontawesome_compat_css;
    wp_register_style(
        'eb-price-table-fontawesome-compat',
        plugins_url( $fontawesome_compat_css, __FILE__ ),
        [ $fontawesome_handle ],
        file_exists( $fontawesome_compat_path ) ? filemtime( $fontawesome_compat_path ) : PRICE_TABLE_BLOCKS_VERSION
    );

    /**
     * filemtime() emits a warning (PHP 8+) and returns false on a missing file,
     * which would silently drop the cache-busting version. Fall back to the
     * plugin version instead.
     */
    $editor_css      = 'dist/style.css';
    $editor_css_path = PRICE_TABLE_BLOCKS_ADMIN_PATH . '/' . $editor_css;
    $editor_css_ver  = file_exists( $editor_css_path ) ? filemtime( $editor_css_path ) : PRICE_TABLE_BLOCKS_VERSION;
    /**
     * `dashicons` is a core-registered handle and must be declared here.
     *
     * The block editor canvas is an iframe, and it only receives the stylesheets
     * WordPress collects for it — a block's `editor_style` and that handle's
     * dependency chain. `dashicons` is not in that set on its own: it reaches the
     * admin document only because the `wp-admin` style depends on it, and the
     * iframe is a separate document that never gets `wp-admin`.
     *
     * Without this, a Dashicon chosen in the icon picker rendered in the sidebar
     * (which has `wp-admin`) but came out as an empty box in the canvas, where
     * `.dashicons-*:before` was never defined so `content` computed to `none` and
     * `font-family` fell through to the theme font. Font Awesome was unaffected
     * only because it was already declared as a dependency above.
     */
    wp_register_style(
        'eb-pricing-table-block-editor-style',
        plugins_url( $editor_css, __FILE__ ),
        ['eb-price-table-fontawesome-compat', 'dashicons', 'fontpicker-default-theme', 'fontpicker-matetial-theme'],
        $editor_css_ver
    );

    $style_css      = PRICE_TABLE_BLOCKS_ADMIN_URL . 'dist/style.css';
    $style_css_path = PRICE_TABLE_BLOCKS_ADMIN_PATH . '/dist/style.css';
    $style_css_ver  = file_exists( $style_css_path ) ? filemtime( $style_css_path ) : PRICE_TABLE_BLOCKS_VERSION;
    /**
     * `dashicons` is declared here for the same reason as the editor style above.
     *
     * Nothing pulls it onto a public page: it reached the frontend only for
     * logged-in users, because the admin bar's style depends on it. Logged out —
     * i.e. for every real visitor — a saved Dashicon rendered as an empty box.
     */
    wp_register_style(
        'create-block-pricing-table-block',
        $style_css,
        ['eb-price-table-fontawesome-compat', 'dashicons', 'essential-blocks-animation'],
        $style_css_ver
    );

    if ( ! WP_Block_Type_Registry::get_instance()->is_registered( 'essential-blocks/pricing-table' ) ) {
        register_block_type(
            Price_Table_Helper::get_block_register_path( 'price-table-block/pricing-table', PRICE_TABLE_BLOCKS_ADMIN_PATH ),
            [
                'editor_script'   => 'eb-pricing-table-block-editor',
                'editor_style'    => 'eb-pricing-table-block-editor-style',
                'render_callback' => function ( $attributes, $content ) {
                    if ( ! is_admin() ) {
                        wp_enqueue_script( 'essential-blocks-eb-animation' );
                        wp_enqueue_style( 'create-block-pricing-table-block' );
                    }
                    return $content;
                }
            ]
        );
    }
}
}
add_action( 'init', 'create_block_pricing_table_block_init' );

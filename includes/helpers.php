<?php

/**
 * Load google fonts.
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class Price_Table_Helper
{

    private static $instance;

    /**
     * Registers the plugin.
     */
    public static function register()
    {
        if (null === self::$instance) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    /**
     * The Constructor.
     */
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueues'));
    }

    /**
     * Load fonts.
     *
     * @access public
     */
    public function enqueues($hook)
    {
        global $pagenow;

        if (!defined('PRICE_TABLE_BLOCKS_ADMIN_PATH') || !defined('PRICE_TABLE_BLOCKS_ADMIN_URL')) {
            return;
        }

        /**
         * str_contains() is PHP 8.0+ (polyfilled by WP core only since 5.9), so
         * strpos() is used instead to keep the whole supported range working.
         */
        $query_string = isset($_SERVER['QUERY_STRING'])
            ? sanitize_text_field(wp_unslash($_SERVER['QUERY_STRING']))
            : '';

        /**
         * Only for Admin Add/Edit Pages
         */
        if ($hook == 'post-new.php' || $hook == 'post.php' || $hook == 'site-editor.php' || ($pagenow == 'themes.php' && !empty($query_string) && strpos($query_string, 'gutenberg-edit-site') !== false)) {

            /**
             * `include_once` returns bool true when the file was already loaded,
             * which fatals on PHP 8 once the result is used as an array. Read the
             * generated asset file with `include` and normalise the result.
             */
            $controls_asset_path   = PRICE_TABLE_BLOCKS_ADMIN_PATH . '/dist/modules.asset.php';
            $controls_dependencies = file_exists($controls_asset_path) ? include $controls_asset_path : array();

            if (!is_array($controls_dependencies)) {
                $controls_dependencies = array();
            }
            $controls_deps    = isset($controls_dependencies['dependencies']) && is_array($controls_dependencies['dependencies'])
                ? $controls_dependencies['dependencies']
                : array();
            $controls_version = isset($controls_dependencies['version'])
                ? $controls_dependencies['version']
                : PRICE_TABLE_BLOCKS_VERSION;

            /**
             * The controls bundle contains Babel-compiled `async`/`await` (the font
             * picker requests `/wp/v2/font-families`), which resolves
             * `window.regeneratorRuntime` at call time. DependencyExtractionWebpackPlugin
             * externalises that global but emits `wp-polyfill` instead of the
             * `regenerator-runtime` handle, because wp-polyfill used to bundle it.
             * WordPress 7.1's wp-polyfill no longer carries it, and core registers
             * `regenerator-runtime` with no dependents, so it never loads unless asked
             * for. Without this the font picker throws "Cannot read properties of
             * undefined (reading 'mark')" the moment the Typography panel is opened.
             */
            wp_register_script(
                "eb-price-table-blocks-controls-util",
                PRICE_TABLE_BLOCKS_ADMIN_URL . 'dist/modules.js',
                array_values(array_unique(array_merge($controls_deps, ['lodash', 'regenerator-runtime']))),
                $controls_version,
                true
            );

            wp_localize_script('eb-price-table-blocks-controls-util', 'EssentialBlocksLocalize', array(
                // Kept as a float: the bundled controls JS compares it numerically
                // (`eb_wp_version >= 5.8`). Changing the type would break that check.
                'eb_wp_version' => (float) get_bloginfo('version'),
                'rest_rootURL' => get_rest_url(),
				'fontAwesome' => "true",
                /**
                 * StyleComponent builds the editor preview's media queries from
                 * `EssentialBlocksLocalize.responsiveBreakpoints`. Without it the
                 * editor emitted `@media all and (max-width: undefinedpx)`, so every
                 * tablet/mobile rule was discarded in the editor preview.
                 */
                'responsiveBreakpoints' => self::get_responsive_breakpoints(),
            ));

            if ($hook == 'post-new.php' || $hook == 'post.php') {
                wp_localize_script('eb-price-table-blocks-controls-util', 'eb_conditional_localize', array(
                    'editor_type' => 'edit-post'
                ));
            } else if ($hook == 'site-editor.php' || $pagenow == 'themes.php') {
                wp_localize_script('eb-price-table-blocks-controls-util', 'eb_conditional_localize', array(
                    'editor_type' => 'edit-site'
                ));
            }

            /**
             * Enqueued directly, not merely as a dependency of
             * `essential-blocks-editor-css`.
             *
             * Both handles are shared with the other Essential Blocks standalone
             * plugins, and `WP_Dependencies::add()` returns early when a handle is
             * already registered — src, deps and ver are all discarded. So once a
             * sibling that sorts earlier in `active_plugins` (image-comparison)
             * registered `essential-blocks-editor-css` with its own dependency
             * list, the `essential-blocks-iconpicker-css` dependency below was
             * dropped and the icon picker's stylesheet never loaded: the Button
             * Icon popup lost `.wip-iconpicker-popup`, `.wip-icon-area`,
             * `.wip-icon-box` and `#wipIcon` and collapsed into an unstyled list.
             *
             * Enqueuing it on its own line is independent of who wins the other
             * handle. The dependency is kept so the load order still holds when
             * this plugin does register `essential-blocks-editor-css` first.
             */
			wp_enqueue_style(
				'essential-blocks-iconpicker-css',
				PRICE_TABLE_BLOCKS_ADMIN_URL . 'dist/style-modules.css',
				[],
				PRICE_TABLE_BLOCKS_VERSION,
				'all'
			);

            /**
             * The icon picker's grid and preview render in the editor sidebar,
             * which is the admin document — not the iframed canvas the block's
             * `editor_style` is collected for. Font Awesome reaches it only
             * incidentally, through whichever plugin happens to own the shared
             * `fontawesome-frontend-css` handle, and when that owner ships Font
             * Awesome 5 every FA6-only icon in the picker draws as blank space.
             *
             * Enqueuing the scoped compatibility layer here puts Font Awesome 6
             * (its registered dependency) and the `#wipIcon` /
             * `.wip-iconpicker-popup` overrides in the admin document directly,
             * so the picker no longer depends on that race. Registered on `init`
             * in the plugin bootstrap; `admin_enqueue_scripts` runs after it.
             */
            wp_enqueue_style( 'eb-price-table-fontawesome-compat' );

            wp_enqueue_style(
                'essential-blocks-editor-css',
                PRICE_TABLE_BLOCKS_ADMIN_URL . 'dist/modules.css',
                array('essential-blocks-iconpicker-css'),
                $controls_version,
                'all'
            );
        }
    }
    /**
     * Responsive breakpoints used by the editor preview.
     *
     * Mirrors EbStyleHandlerParseCss::get_responsive_breakpoints() so the editor's
     * media queries match the ones the style handler writes into the frontend CSS.
     * Read-only on purpose — unlike the style handler, this never writes the option
     * back, because it runs on every admin enqueue.
     *
     * @return array{tablet:int,mobile:int}
     */
    public static function get_responsive_breakpoints()
    {
        $defaults = array('tablet' => 1024, 'mobile' => 767);

        $settings = get_option('eb_settings', array());
        if (!is_array($settings) || !isset($settings['responsiveBreakpoints'])) {
            return $defaults;
        }

        $breakpoints = $settings['responsiveBreakpoints'];
        if (is_string($breakpoints)) {
            if ('' === $breakpoints) {
                return $defaults;
            }
            $breakpoints = json_decode(html_entity_decode(stripslashes($breakpoints)), true);
        }

        $breakpoints = is_array($breakpoints) ? $breakpoints : (array) $breakpoints;

        return array(
            'tablet' => isset($breakpoints['tablet']) && is_numeric($breakpoints['tablet'])
                ? (int) $breakpoints['tablet']
                : $defaults['tablet'],
            'mobile' => isset($breakpoints['mobile']) && is_numeric($breakpoints['mobile'])
                ? (int) $breakpoints['mobile']
                : $defaults['mobile'],
        );
    }

    public static function get_block_register_path($blockname, $blockPath)
    {
        /**
         * register_block_type() only accepts a block.json directory since WP 5.8;
         * earlier releases must be handed the block name. version_compare() is used
         * because a float cast of the version string is lossy ("6.10" becomes 6.1).
         */
        if (version_compare(get_bloginfo('version'), '5.8', '>=')) {
            return $blockPath;
        }

        return $blockname;
    }
}
Price_Table_Helper::register();

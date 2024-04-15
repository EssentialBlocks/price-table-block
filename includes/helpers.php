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
        /**
         * Only for Admin Add/Edit Pages
         */
        if ($hook == 'post-new.php' || $hook == 'post.php' || $hook == 'site-editor.php' || ($pagenow == 'themes.php' && !empty($_SERVER['QUERY_STRING']) && str_contains($_SERVER['QUERY_STRING'], 'gutenberg-edit-site'))) {

            $controls_dependencies = include_once PRICE_TABLE_BLOCKS_ADMIN_PATH . '/dist/modules.asset.php';

            wp_register_script(
                "eb-price-table-blocks-controls-util",
                PRICE_TABLE_BLOCKS_ADMIN_URL . '/dist/modules.js',
                 array_merge($controls_dependencies['dependencies'],['lodash']),
                $controls_dependencies['version'],
                true
            );

            wp_localize_script('eb-price-table-blocks-controls-util', 'EssentialBlocksLocalize', array(
                'eb_wp_version' => (float) get_bloginfo('version'),
                'rest_rootURL' => get_rest_url(),
				'fontAwesome' => "true"
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

			wp_register_style(
				'essential-blocks-iconpicker-css',
				PRICE_TABLE_BLOCKS_ADMIN_URL . 'dist/style-modules.css',
				[],
				PRICE_TABLE_BLOCKS_VERSION,
				'all'
			);

            wp_enqueue_style(
                'essential-blocks-editor-css',
                PRICE_TABLE_BLOCKS_ADMIN_URL . '/dist/modules.css',
                array('essential-blocks-iconpicker-css'),
                $controls_dependencies['version'],
                'all'
            );
        }
    }
    public static function get_block_register_path($blockname, $blockPath)
    {
        if ((float) get_bloginfo('version') <= 5.6) {
            return $blockname;
        } else {
            return $blockPath;
        }
    }
}
Price_Table_Helper::register();

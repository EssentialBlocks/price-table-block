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
        /**
         * Only for Admin Add/Edit Pages 
         */
        if ($hook == 'post-new.php' || $hook == 'post.php' || $hook == 'site-editor.php') {
            $controls_dependencies = include_once PRICE_TABLE_BLOCKS_ADMIN_PATH . '/dist/controls.asset.php';

            // var_dump($controls_dependencies);die;
            wp_register_script(
                "eb-price-table-blocks-controls-util",
                PRICE_TABLE_BLOCKS_ADMIN_URL . '/dist/controls.js',
                array_merge($controls_dependencies['dependencies'], array("essential-blocks-edit-post")),
                $controls_dependencies['version'],
                true
            );

            wp_localize_script('eb-price-table-blocks-controls-util', 'EssentialBlocksLocalize', array(
                'eb_wp_version' => (float) get_bloginfo('version'),
                'rest_rootURL' => get_rest_url(),
            ));

            wp_enqueue_style(
                'essential-blocks-editor-css',
                PRICE_TABLE_BLOCKS_ADMIN_URL . '/dist/controls.css',
                array(),
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

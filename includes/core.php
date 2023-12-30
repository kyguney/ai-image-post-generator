<?php
/**
 * Core plugin functionality.
 *
 * @package AIPGPlugin
 */

namespace AIPGPlugin\Core;
const page_hook_suffix = '';

use AIPGPlugin\ModuleInitialization;
use \WP_Error;
use AIPGPlugin\Utility;


/**
 * Default setup routine
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'init', $n( 'i18n' ) );
	add_action( 'init', $n( 'init' ), apply_filters( 'aipg_plugin_init_priority', 8 ) );
	add_action( 'init', $n( 'register_settings' ) );
	add_action( 'wp_enqueue_scripts', $n( 'scripts' ) );
	add_action( 'wp_enqueue_scripts', $n( 'styles' ) );
	add_action( 'admin_menu', $n( 'register_settings_page' ) );
	add_action( 'enqueue_block_editor_assets', $n( 'core_block_overrides' ) );
	add_action( 'enqueue_block_assets', $n( 'enqueue_block_assets' ) );

	// Hook to allow async or defer on asset loading.
	add_filter( 'script_loader_tag', $n( 'script_loader_tag' ), 10, 2 );

	do_action( 'aipg_plugin_loaded' );
}

/**
 * Registers the default textdomain.
 *
 * @return void
 */
function i18n() {
	$locale = apply_filters( 'plugin_locale', get_locale(), 'aipg-plugin' );
	load_textdomain( 'aipg-plugin', WP_LANG_DIR . '/aipg-plugin/aipg-plugin-' . $locale . '.mo' );
	load_plugin_textdomain( 'aipg-plugin', false, plugin_basename( AIPG_PLUGIN_PATH ) . '/languages/' );
}

/**
 * Initializes the plugin and fires an action other plugins can hook into.
 *
 * @return void
 */
function init() {
	do_action( 'aipg_plugin_before_init' );

	// If the composer.json isn't found, trigger a warning.
	if ( ! file_exists( AIPG_PLUGIN_PATH . 'composer.json' ) ) {
		add_action(
			'admin_notices',
			function() {
				$class = 'notice notice-error';
				/* translators: %s: the path to the plugin */
				$message = sprintf( __( 'The composer.json file was not found within %s. No classes will be loaded.', 'aipg-plugin' ), AIPG_PLUGIN_PATH );

				printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
			}
		);
		return;
	}

	ModuleInitialization::instance()->init_classes();
	do_action( 'aipg_plugin_init' );
}

/**
 * Activate the plugin
 *
 * @return void
 */
function activate() {
	// First load the init scripts in case any rewrite functionality is being loaded
	init();
	flush_rewrite_rules();
}

/**
 * Deactivate the plugin
 *
 * Uninstall routines should be in uninstall.php
 *
 * @return void
 */
function deactivate() {
	unregister_setting(
		'aipg_plugin_settings',
		'aipg_plugin_settings_image_chat_api'
	);

	unregister_setting(
		'aipg_plugin_settings',
		'aipg_plugin_settings_open_ai_api'
	);
}

/**
 * Add Plugin Settings Page to admin sidebar options page
 *
 * @return void
 */

function register_settings_page(){
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	$page_hook_suffix = add_options_page(
		__('AIPG Settings', 'aipg-plugin'),
		__('AIPG Settings', 'aipg-plugin'),
		'manage_options',
		'aipg-plugin-settings',
		$n('render_settings_page')
	);

	add_action( "admin_print_scripts-{$page_hook_suffix}", $n( 'admin_assets' ) );
}

/**
 * Render the settings page.
 *
 * @return void
 */

function render_settings_page() {
	echo '<div id="aipg-settings-page"></div>';
}

function register_settings(){
	register_setting(
		'aipg_plugin_settings',
		'aipg_plugin_settings_image_chat_api',
		[
			'default'      => '',
			'show_in_rest' => true,
			'type'         => 'string',
		]
	);

	register_setting(
		'aipg_plugin_settings',
		'aipg_plugin_settings_open_ai_api',
		[
			'default'      => '',
			'show_in_rest' => true,
			'type'         => 'string',
		]
	);
}


/**
 * The list of knows contexts for enqueuing scripts/styles.
 *
 * @return array
 */
function get_enqueue_contexts() {
	return [ 'admin', 'frontend' ];
}

/**
 * Generate an URL to a script, taking into account whether SCRIPT_DEBUG is enabled.
 *
 * @param string $script Script file name (no .js extension)
 * @param string $context Context for the script ('admin', 'frontend')
 *
 * @return string|WP_Error URL
 */
function script_url( $script, $context ) {

	if ( ! in_array( $context, get_enqueue_contexts(), true ) ) {
		return new WP_Error( 'invalid_enqueue_context', 'Invalid $context specified in AIPGPlugin script loader.' );
	}

	return AIPG_PLUGIN_URL . "dist/js/{$script}.js";

}

/**
 * Generate an URL to a stylesheet, taking into account whether SCRIPT_DEBUG is enabled.
 *
 * @param string $stylesheet Stylesheet file name (no .css extension)
 * @param string $context Context for the script ('admin', 'frontend', or 'shared')
 *
 * @return string URL
 */
function style_url( $stylesheet, $context ) {

	if ( ! in_array( $context, get_enqueue_contexts(), true ) ) {
		return new WP_Error( 'invalid_enqueue_context', 'Invalid $context specified in AIPGPlugin stylesheet loader.' );
	}

	return AIPG_PLUGIN_URL . "dist/css/{$stylesheet}.css";

}

/**
 * Enqueue scripts for front-end.
 *
 * @return void
 */
function scripts() {

	wp_enqueue_script(
		'aipg_plugin_frontend',
		script_url( 'frontend', 'frontend' ),
		Utility\get_asset_info( 'frontend', 'dependencies' ),
		Utility\get_asset_info( 'frontend', 'version' ),
		true
	);

}

/**
 * Enqueue scripts for block editor
 *
 * @return void
 */
function enqueue_block_assets() {

	wp_enqueue_style(
		'aipg_plugin_frontend',
		style_url( 'frontend', 'frontend' ),
		[],
		Utility\get_asset_info( 'frontend', 'version' ),
	);

}

/**
 * Enqueue assets for admin.
 *
 * @return void
 */
function admin_assets() {

	wp_enqueue_style(
		'aipg_plugin_admin',
		style_url( 'admin', 'admin' ),
		['wp-components'],
		Utility\get_asset_info( 'admin', 'version' ),
	);

	wp_enqueue_script(
		'aipg_plugin_admin',
		script_url( 'admin', 'admin' ),
		Utility\get_asset_info( 'admin', 'dependencies' ),
		Utility\get_asset_info( 'admin', 'version' ),
		true
	);

}

/**
 * Enqueue core block filters, styles and variations.
 *
 * @return void
 */
function core_block_overrides() {
	$overrides = AIPG_PLUGIN_DIST_PATH . 'js/core-block-overrides.asset.php';
	if ( file_exists( $overrides ) ) {
		$dep = require_once $overrides;
		wp_enqueue_script(
			'core-block-overrides',
			AIPG_PLUGIN_DIST_URL . 'js/core-block-overrides.js',
			array_merge($dep['dependencies'], array( 'wp-api' )),
			$dep['version'],
			true
		);
	}
}

/**
 * Enqueue styles for front-end.
 *
 * @return void
 */
function styles() {

	wp_enqueue_style(
		'aipg_plugin_frontend',
		style_url( 'frontend', 'frontend' ),
		[],
		Utility\get_asset_info( 'frontend', 'version' ),
	);

}

/**
 * Add async/defer attributes to enqueued scripts that have the specified script_execution flag.
 *
 * @link https://core.trac.wordpress.org/ticket/12009
 * @param string $tag    The script tag.
 * @param string $handle The script handle.
 * @return string
 */
function script_loader_tag( $tag, $handle ) {
	$script_execution = wp_scripts()->get_data( $handle, 'script_execution' );

	if ( ! $script_execution ) {
		return $tag;
	}

	if ( 'async' !== $script_execution && 'defer' !== $script_execution ) {
		return $tag; // _doing_it_wrong()?
	}

	// Abort adding async/defer for scripts that have this script as a dependency. _doing_it_wrong()?
	foreach ( wp_scripts()->registered as $script ) {
		if ( in_array( $handle, $script->deps, true ) ) {
			return $tag;
		}
	}

	// Add the attribute if it hasn't already been added.
	if ( ! preg_match( ":\s$script_execution(=|>|\s):", $tag ) ) {
		$tag = preg_replace( ':(?=></script>):', " $script_execution", $tag, 1 );
	}

	return $tag;
}

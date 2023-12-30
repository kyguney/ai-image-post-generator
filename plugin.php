<?php
/**
 * Plugin Name:       AI Image Post Generator
 * Description:       Enhance your WordPress blog with AI Image Post Generator, integrated with Gutenberg Blocks!
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.4
 * Author:            Kyguney
 * Author URI:        https://www.kyguney.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       aipg-plugin
 * Domain Path:       /languages
 * Update URI:        https://github.com/kyguney/ai-image-post-generator
 *
 * @package           AIImagePostGenerator
 */

 // Useful global constants.
define('AIPG_PLUGIN_VERSION', '0.1.0');
define('AIPG_PLUGIN_URL', plugin_dir_url(__FILE__));
define('AIPG_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('AIPG_PLUGIN_INC', AIPG_PLUGIN_PATH . 'includes/');
define('AIPG_PLUGIN_DIST_URL', AIPG_PLUGIN_URL . 'dist/');
define('AIPG_PLUGIN_DIST_PATH', AIPG_PLUGIN_PATH . 'dist/');
define('AIPG_PLUGIN_BLOCK_DIR', AIPG_PLUGIN_INC . 'blocks/');
define('AIPG_PLUGIN_BLOCK_DIST_DIR', AIPG_PLUGIN_DIST_PATH . 'blocks/');

$is_local_env = in_array(wp_get_environment_type(), ['local', 'development'], true);
$is_local_url = strpos(home_url(), '.test') || strpos(home_url(), '.local');
$is_local     = $is_local_env || $is_local_url;

if ($is_local && file_exists(__DIR__ . '/dist/fast-refresh.php')) {
	require_once __DIR__ . '/dist/fast-refresh.php';
	TenUpToolkit\set_dist_url_path(basename(__DIR__), AIPG_PLUGIN_DIST_URL, AIPG_PLUGIN_DIST_PATH);
}

// Include files.
require_once AIPG_PLUGIN_INC . '/core.php';
require_once AIPG_PLUGIN_INC . '/utility.php';
require_once AIPG_PLUGIN_INC . '/blocks.php';

// Activation/Deactivation.
register_activation_hook(__FILE__, '\AIPGPlugin\Core\activate');
register_deactivation_hook(__FILE__, '\AIPGPlugin\Core\deactivate');

// Bootstrap.
AIPGPlugin\Core\setup();
AIPGPlugin\Blocks\setup();

// Require Composer autoloader if it exists.
if (file_exists(AIPG_PLUGIN_PATH . 'vendor/autoload.php')) {
	require_once AIPG_PLUGIN_PATH . 'vendor/autoload.php';
}

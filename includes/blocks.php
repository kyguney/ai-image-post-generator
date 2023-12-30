<?php
/**
 * Gutenberg Blocks setup
 *
 * @package GutenbergLessons
 */

namespace AIPGPlugin\Blocks;

use AIPGPlugin\Utility;

/**
 * Set up blocks
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'enqueue_block_editor_assets', $n( 'blocks_editor_styles' ) );
	add_filter( 'block_categories_all', $n( 'blocks_categories' ), 10, 2 );
	add_action( 'init', $n( 'register_plugin_blocks' ) );
}

/**
 * Automatically registers all blocks that are located within the includes/blocks directory
 *
 * @return void
 */
function register_plugin_blocks() {

	// Register all the blocks in the theme
	if ( file_exists( AIPG_PLUGIN_BLOCK_DIST_DIR ) ) {
		$block_json_files = glob( AIPG_PLUGIN_BLOCK_DIST_DIR . '*/block.json' );

		// auto register all blocks that were found.
		foreach ( $block_json_files as $filename ) {

			$block_folder = dirname( $filename );

			$block_options = [];

			$markup_file_path = $block_folder . '/markup.php';
			if ( file_exists( $markup_file_path ) ) {

				// only add the render callback if the block has a file called markdown.php in it's directory
				$block_options['render_callback'] = function( $attributes, $content, $block ) use ( $block_folder ) {

					// create helpful variables that will be accessible in markup.php file
					$context            = $block->context;
					$wrapper_attributes = wp_kses_post( get_block_wrapper_attributes() );

					// get the actual markup from the markup.php file
					ob_start();
					include $block_folder . '/markup.php';
					return ob_get_clean();
				};
			};

			register_block_type_from_metadata( $block_folder, $block_options );
		};
	};

}

/**
 * Enqueue editor-only JavaScript/CSS for blocks.
 *
 * @return void
 */
function blocks_editor_styles() {
	wp_enqueue_style(
		'editor-style-overrides',
		AIPG_PLUGIN_URL . '/dist/css/editor-style-overrides.css',
		[],
		Utility\get_asset_info( 'editor-style-overrides', 'version' )
	);

	if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
		wp_enqueue_script(
			'editor-style-overrides',
			AIPG_PLUGIN_URL . '/dist/js/editor-style-overrides.js',
			Utility\get_asset_info( 'editor-style-overrides', 'dependencies' ),
			Utility\get_asset_info( 'editor-style-overrides', 'version' ),
			true
		);
	}

}

/**
 * Filters the registered block categories.
 *
 * @param array $categories Registered categories.
 *
 * @return array Filtered categories.
 */
function blocks_categories( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'aipg-plugin',
				'title' => __( 'AIPG Blocks', 'aipg-plugin' ),
			),
		)
	);
}

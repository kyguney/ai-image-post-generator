<?php

/**
 * AI Image Post Generator block markup
 *
 * @package AIPGPlugin\Blocks\CTAComplete
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 * @var array    $context    BLock context.
 */

?>
<figure <?php echo get_block_wrapper_attributes(); ?>>
	<img src="<?php echo esc_url($attributes['blockImage']['url']); ?>" alt="" />
</figure>

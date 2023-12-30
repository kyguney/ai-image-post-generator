import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import block from './block.json';
import { BlockIcon } from './icon';

registerBlockType(block, {
	icon: BlockIcon,
	edit,
	save: () => null,
});

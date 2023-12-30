import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import block from './block.json';
import { BlockIcon } from './icon';
import save from './save';

registerBlockType(block.name, {
	icon: BlockIcon,
	edit,
	save,
});

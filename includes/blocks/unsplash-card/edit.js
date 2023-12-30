import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const BlockEdit = (props) => {
	const { attributes } = props;
	const { keywords, autoSearch, content, imagePosition } = attributes;
	const blockProps = useBlockProps();

	const columnsTemplateImageLeft = [
		[
			'core/column',
			{ width: '33.3%' },
			[['aipg-plugin/unsplash-image', { keywords, autoSearch }]],
		],
		[
			'core/column',
			{ width: '66.66%', verticalAlignment: 'center' },
			[['core/paragraph', { content }]],
		],
	];

	const columnsTemplateImageRight = [
		[
			'core/column',
			{ width: '66.66%', verticalAlignment: 'center' },
			[['core/paragraph', { content }]],
		],
		[
			'core/column',
			{ width: '33.3%' },
			[['aipg-plugin/unsplash-image', { keywords, autoSearch }]],
		],
	];

	const columnsTemplate =
		imagePosition && imagePosition === 'left'
			? columnsTemplateImageLeft
			: columnsTemplateImageRight;

	return (
		<section {...blockProps}>
			<InnerBlocks
				allowedBlocks={[
					'core/columns',
					'core/column',
					'aipg-plugin/unsplash-image',
					'core/paragraph',
				]}
				orientation="horizontal"
				template={[['core/columns', {}, columnsTemplate]]}
			/>
		</section>
	);
};

export default BlockEdit;

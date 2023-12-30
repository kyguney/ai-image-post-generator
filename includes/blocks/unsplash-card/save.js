import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const Save = () => {
	const blockProps = useBlockProps.save();

	return (
		<section {...blockProps}>
			<InnerBlocks.Content />
		</section>
	);
};

export default Save;

/* eslint-disable no-console */
import { addFilter } from '@wordpress/hooks';
import { Button, Spinner, Placeholder } from '@wordpress/components';
import { select, dispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import { usePluginSettings } from '../hooks';
import { imageChatPredict, openAiPredict, manageLoadingProcess } from '../utils';

const addAiImagePostGenerator = (OriginalComponent) => {
	return (props) => {
		const [postGenerationLoading, setPostGenereationLoading] = useState(false);
		const { imageChatApi, openai } = usePluginSettings();
		const featuredId = select('core/editor').getEditedPostAttribute('featured_media');
		const featuredImageObject = useSelect(
			(select) => {
				return select('core').getMedia(featuredId);
			},
			[featuredId],
		);

		const sleep = (ms) => {
			return new Promise((resolve) => {
				setTimeout(resolve, ms);
			});
		};
		const updateMediaMeta = async (mediaId, caption, alt_text) => {
			const newCaption = { raw: caption, rendered: caption };
			const newAltText = alt_text;
			const restApiRequest = await new wp.api.models.Media({
				id: mediaId,
				alt_text: newAltText,
				caption: newCaption,
			});
			await restApiRequest.save();
			await dispatch('core/editor').editPost({ meta: { _thumbnail_id: mediaId } });
		};
		const generatePost = async (imageObject) => {
			manageLoadingProcess('start', __('Post generation started!', 'aipg-plugin'));
			setPostGenereationLoading(true);
			dispatch('core/editor').lockPostSaving('aipg-generator-lock');
			if (!imageObject) {
				await sleep(2000);
				const message = __('Image Not Found!', 'aipg-plugin');
				manageLoadingProcess('error', message);
				setPostGenereationLoading(true);
				console.error(message);
				dispatch('core/editor').unlockPostSaving('aipg-generator-lock');
			}
			await sleep(2000);
			manageLoadingProcess(
				'processing',
				__('Image detail generation in progress...', 'aipg-plugin'),
			);
			imageChatPredict(imageObject?.source_url, imageChatApi)
				.then(async (returnVal) => {
					await sleep(2000);
					manageLoadingProcess(
						'processing',
						__('Image detail generation completed successfully!', 'aipg-plugin'),
					);
					await sleep(2000);
					manageLoadingProcess(
						'processing',
						__('Post detail generation in progress...!', 'aipg-plugin'),
					);
					openAiPredict(returnVal.prediction, openai)
						.then(async (returnVal) => {
							await sleep(2000);
							manageLoadingProcess(
								'processing',
								__('Post detail generation completed successfully!', 'aipg-plugin'),
							);
							await sleep(2000);
							await updateMediaMeta(
								featuredId,
								returnVal.caption,
								returnVal.alt_text,
							);
							manageLoadingProcess(
								'processing',
								__(
									'Featured Image alt text and caption updated successfully!',
									'aipg-plugin',
								),
							);
							await sleep(2000);
							manageLoadingProcess(
								'processing',
								__(
									'Retrieving images for each paragraph in progress...',
									'aipg-plugin',
								),
							);
							await sleep(2000);
							const allBlocks = [];
							returnVal.content.forEach((paragrapObject, index) => {
								const newBlock = createBlock('aipg-plugin/unsplash-card', {
									keywords: paragrapObject.keywords,
									content: paragrapObject.paragraph,
									autoSearch: true,
									imagePosition: (index + 1) % 2 === 0 ? 'right' : 'left',
								});
								allBlocks.push(newBlock);
							});
							dispatch('core/block-editor').resetBlocks(allBlocks);
							await sleep(2000);
							manageLoadingProcess(
								'processing',
								__('Retrieving images completed successfully!', 'aipg-plugin'),
							);
							await sleep(2000);
							manageLoadingProcess(
								'processing',
								__('Post generetion completed successfully!', 'aipg-plugin'),
							);
							dispatch('core/editor').editPost({
								title: returnVal.title,
							});
							await sleep(2000);
							dispatch('core/editor').unlockPostSaving('aipg-generator-lock');
							setPostGenereationLoading(false);
							manageLoadingProcess('end');
						})
						.catch((error) => {
							sleep(2000);
							setPostGenereationLoading(false);
							manageLoadingProcess(
								'error',
								__(
									'Post detail generation has been stopped! Please check the console.',
									'aipg-plugin',
								),
							);
							console.error(error);
						});
				})
				.catch((error) => {
					sleep(2000);
					setPostGenereationLoading(false);
					manageLoadingProcess(
						'error',
						__(
							'Image detail generation has been stopped! Please check the console.',
							'aipg-plugin',
						),
					);
					console.error(error);
				});
		};

		return postGenerationLoading ? (
			<Placeholder>
				<Spinner style={{ margin: '0 auto' }} />
			</Placeholder>
		) : (
			<>
				<OriginalComponent {...props} />
				{featuredId ? (
					<Button
						variant="primary"
						style={{ marginTop: '10px' }}
						onClick={() => generatePost(featuredImageObject)}
					>
						{__('Generate Post with AI', 'aipg-plugin')}
					</Button>
				) : (
					<small
						style={{
							display: 'block',
							marginTop: '10px',
							fontSize: '12px',
							lineHeight: '16px',
							fontStyle: 'italic',
						}}
					>
						{__(
							'Please add featured image for view ai generation post button!',
							'aipg-plugin',
						)}
					</small>
				)}
			</>
		);
	};
};

addFilter('editor.PostFeaturedImage', 'aipg/featured-image-generator', addAiImagePostGenerator);

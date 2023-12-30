/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { pick } from 'lodash';
import { __ } from '@wordpress/i18n';
import {
	BlockIcon,
	useBlockProps,
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { store as noticesStore } from '@wordpress/notices';
import {
	Placeholder,
	Button,
	FormTokenField,
	ToolbarButton,
	RangeControl,
	Spinner,
} from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import { useSelect, useDispatch } from '@wordpress/data';
import { upload, plusCircle, replace } from '@wordpress/icons';
import { createBlobObject, convertImageObjectToArray } from '../../utils';
import UnsplashImageSelectCarousel from './unsplash-image-select-carousel';

const UnsplashImage = (props) => {
	const { attributes, setAttributes } = props;
	const { numberOfImage, keywords, unsplashImages, blockImage, autoSearch } = attributes;
	const { id, url } = blockImage;
	const ALLOWED_MEDIA_TYPES = ['image'];
	const { mediaUpload } = useSelect((select) => {
		const { getSettings } = select(blockEditorStore);
		return pick(getSettings(), ['mediaUpload']);
	});
	const { createErrorNotice, createSuccessNotice } = useDispatch(noticesStore);
	const [isSearchingImage, setIsSearchingImage] = useState(false);
	const [selectedImage, setSelectedImage] = useState(false);
	const [carouselMedias, setCarouselMedias] = useState(false);
	const [currentImage, setCurrentImage] = useState(false);

	const isSelectedMediaImage = id !== 0 && url !== '';
	const isSelectedUnsplashImage = id === 0 && url !== '';

	const isUnsplashSourceAvailable =
		unsplashImages &&
		Object.keys(unsplashImages).length !== 0 &&
		unsplashImages.constructor === Object;

	const isSourceAvailable =
		isSelectedMediaImage || isSelectedUnsplashImage || isUnsplashSourceAvailable;

	const blockProps = useBlockProps({ className: 'unsplash-image-block' });

	const getSearchImage = async (searchTerm) => {
		try {
			const apiEndpoint = `https://source.unsplash.com/1024x1024/?${searchTerm}`;
			const image = await fetch(apiEndpoint);
			const { url } = image;
			return url;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const searchImages = async (imageKeywords, num) => {
		const imageObject = {};
		const imageArray = [];
		const keywordNumArray = Array(num).fill('a');

		setIsSearchingImage(true);

		await imageKeywords.reduce(async (promiseKeywords, keyword) => {
			await promiseKeywords;
			const images = [];
			await keywordNumArray.reduce(async (promiseNumArray) => {
				await promiseNumArray;
				const image = await getSearchImage(keyword);
				images.push(image);
				imageArray.push(image);
			}, Promise.resolve());
			const keywordObject = {
				[keyword.toLowerCase().replace(/\s/g, '_')]: images,
			};
			Object.assign(imageObject, keywordObject);
		}, Promise.resolve());

		setIsSearchingImage(false);
		setCarouselMedias(imageArray);
		setAttributes({ unsplashImages: imageObject });
	};

	const uploadExternal = async () => {
		const imageBlob = await createBlobObject(selectedImage);
		mediaUpload({
			filesList: [imageBlob],
			onFileChange([img]) {
				setAttributes({ blockImage: { id: img.id, url: img.url } });

				if (isBlobURL(img.url)) {
					return;
				}

				createSuccessNotice(__('Image uploaded.'), {
					type: 'snackbar',
				});
			},
			allowedTypes: ALLOWED_MEDIA_TYPES,
			onError(message) {
				createErrorNotice(message, { type: 'snackbar' });
			},
		});
	};

	const handleSelectUnsplashImageClick = () => {
		setSelectedImage(currentImage);
		setAttributes({ blockImage: { id: 0, url: currentImage } });
	};

	const onReplaceImage = () => {
		setSelectedImage('');
		setCurrentImage('');
		setAttributes({ blockImage: { id: 0, url: '' } });
	};

	const validateKeyword = (searchKeyword) => /^[a-zA-Z][a-zA-Z0-9 ]+$/.test(searchKeyword);

	useEffect(() => {
		if (url !== '') {
			setSelectedImage(url);
		}
	}, [url]);

	useEffect(() => {
		if (unsplashImages) {
			setCarouselMedias(convertImageObjectToArray(unsplashImages));
		}
	}, [unsplashImages]);

	useEffect(() => {
		if (autoSearch) {
			searchImages(keywords, numberOfImage);
		}
	}, [autoSearch]);

	return (
		<div {...blockProps}>
			{!isSourceAvailable ? (
				<Placeholder
					icon={<BlockIcon icon="format-image" />}
					label={__('Unsplash Image', 'aipg-plugin')}
					instructions={__(
						'Quickly add image keywords to add images in your site.',
						'aipg-plugin',
					)}
				>
					{isSearchingImage ? (
						<Spinner />
					) : (
						<>
							<div className="unsplash-image-block__keywords">
								<FormTokenField
									__experimentalValidateInput={validateKeyword}
									label="Keywords"
									value={keywords}
									onChange={(tokens) => setAttributes({ keywords: tokens })}
									maxLength={5}
								/>
							</div>
							<div className="unsplash-image-block__image-number">
								<RangeControl
									value={numberOfImage}
									label={__(
										'Number of images per searched keywords',
										'aipg-plugin',
									)}
									onChange={(value) => setAttributes({ numberOfImage: value })}
									min={1}
									max={5}
								/>
							</div>
							{keywords && keywords.length > 0 ? (
								<div className="unsplash-image-block__search">
									<Button
										variant="primary"
										onClick={() => searchImages(keywords, numberOfImage)}
									>
										{__('Search images', 'aipg-plugin')}
									</Button>
								</div>
							) : null}
						</>
					)}
				</Placeholder>
			) : (
				<>
					<BlockControls group="block">
						{selectedImage && isSelectedUnsplashImage && (
							<ToolbarButton
								showTooltip
								onClick={uploadExternal}
								icon={upload}
								label={__('Upload external image')}
							/>
						)}
						{!selectedImage && !isSelectedUnsplashImage && !isSelectedMediaImage && (
							<ToolbarButton
								showTooltip
								icon="update-alt"
								label={__('Research images', 'aipg-plugin')}
								onClick={() => setAttributes({ unsplashImages: {} })}
							/>
						)}
						{!selectedImage && (
							<ToolbarButton
								showTooltip
								icon={plusCircle}
								label={__('Select Image', 'aipg-plugin')}
								onClick={handleSelectUnsplashImageClick}
							/>
						)}
						{selectedImage && (
							<ToolbarButton
								showTooltip
								icon={replace}
								label={__('Replace Image', 'aipg-plugin')}
								onClick={onReplaceImage}
							/>
						)}
					</BlockControls>

					{selectedImage ? (
						<img src={selectedImage} alt="" />
					) : (
						<UnsplashImageSelectCarousel
							medias={carouselMedias}
							onChangeImage={setCurrentImage}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default UnsplashImage;

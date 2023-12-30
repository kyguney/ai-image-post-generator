import { useState, useEffect } from 'react';
import { arrowLeft, arrowRight } from '@wordpress/icons';
import { Button, Icon } from '@wordpress/components';

const UnsplashImageSelectCarousel = ({ medias, onChangeImage }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const isImagesAvailable = medias && medias.length > 0;
	const showNavigation = medias && medias.length > 1;

	const totalSlides = isImagesAvailable ? medias.length : 0;

	useEffect(() => {
		onChangeImage(medias[currentIndex]);
	}, [currentIndex, medias, onChangeImage]);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
	};
	return (
		<div className="aipg-slider-container">
			{isImagesAvailable && (
				<>
					<div
						className="aipg-slider-content"
						style={{ transform: `translateX(-${currentIndex * 100}%)` }}
					>
						{medias.map((image, index) => {
							return (
								<div key={`image-${index + 1}`} className="aipg-slide">
									<img src={image} alt="" />
								</div>
							);
						})}
					</div>
					{showNavigation && (
						<div className="aipg-slider-buttons">
							<Button className="aipg-slider-button" onClick={prevSlide}>
								<Icon icon={arrowLeft} />
							</Button>
							<Button className="aipg-slider-button" onClick={nextSlide}>
								<Icon icon={arrowRight} />
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default UnsplashImageSelectCarousel;

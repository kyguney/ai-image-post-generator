/* eslint-disable no-useless-escape */
import { __ } from '@wordpress/i18n';

export const createFileObject = async (fileURL) => {
	const response = await fetch(fileURL);
	const data = await response.blob();
	const metadata = {
		type: data.type,
	};
	const file = new File([data], fileURL.split(/[\\\/]/).pop(), metadata);
	return file;
};

export const createBlobObject = async (fileURL) => {
	const response = await fetch(fileURL);
	const blob = await response.blob();
	return blob;
};

export const convertImageObjectToArray = (imageObject) => {
	let images = [];
	Object.keys(imageObject).forEach((key) => {
		images = [...images, ...imageObject[key]];
	});
	return images;
};

export const manageLoadingProcess = (status, message) => {
	const overlay = document.querySelector('#aipg-overlay');

	if (status === 'start') {
		if (!overlay) {
			// Show overlay
			const newOverlay = document.createElement('div');
			newOverlay.id = 'aipg-overlay';
			newOverlay.classList.add('active'); // Add the 'active' class for fade-in effect

			const overlayContent = document.createElement('div');
			overlayContent.id = 'aipg-overlay-content';

			const overlaySpinner = document.createElement('div');
			overlaySpinner.id = 'aipg-overlay-spinner';

			const overlayMessage = document.createElement('div');
			overlayMessage.id = 'aipg-overlay-message';
			overlayMessage.textContent = message || __('Loading...', 'aipg-plugin');
			overlayMessage.classList.add('active'); // Add the 'active' class for fade-in effect

			overlayContent.appendChild(overlaySpinner);
			overlayContent.appendChild(overlayMessage);
			newOverlay.appendChild(overlayContent);
			document.body.appendChild(newOverlay);

			// Trigger a reflow to enable the transition
			// eslint-disable-next-line no-unused-expressions
			newOverlay.offsetHeight;
		}
	} else if (status === 'processing') {
		if (overlay) {
			const overlayMessage = overlay.querySelector('#aipg-overlay-message');
			if (overlayMessage) {
				// Update overlay message for processing
				overlayMessage.textContent = message || __('Processing...', 'aipg-plugin');
			}
		}
	} else if (status === 'end') {
		if (overlay) {
			// Hide overlay
			overlay.classList.remove('active'); // Remove the 'active' class for fade-out effect
			const overlayMessage = overlay.querySelector('#aipg-overlay-message');
			if (overlayMessage) {
				overlayMessage.classList.remove('active'); // Remove the 'active' class for fade-out effect
			}
			// Remove the overlay after the transition ends
			overlay.addEventListener('transitionend', function () {
				// Remove the overlay after a short delay
				setTimeout(function () {
					if (overlay && overlay.parentNode) {
						overlay.parentNode.removeChild(overlay);
					}
				}, 100); // Adjust the delay if needed
			});
		}
	} else if (status === 'error') {
		if (overlay) {
			const overlayMessage = overlay.querySelector('#aipg-overlay-message');
			if (overlayMessage) {
				// Update overlay message for error
				overlayMessage.textContent = message || __('An error occurred.', 'aipg-plugin');
				overlayMessage.classList.add('aipg-error');
				// Automatically close the overlay after 5 seconds
				setTimeout(() => {
					manageLoadingProcess('end'); // Close the overlay
				}, 4000);
			}
		}
	}
};

export const imageChatPredict = async (fileURL = '', apiKey = null, prompt = '') => {
	const hostName = 'https://chat-api.chooch.ai';

	const newPrompt = prompt && prompt.trim() !== '' ? prompt : 'Describe this image in detail!';

	const parameters = {
		prompt: newPrompt,
	};

	const parametersJson = JSON.stringify({
		parameters,
		model_id: 'chooch-image-chat-3',
	});

	const formData = new FormData();

	formData.append('data', parametersJson);

	const url = `${hostName}/predict?api_key=${apiKey || ''}`;

	const convertedFile = await createFileObject(fileURL);

	formData.append('file', convertedFile);

	const response = await fetch(url, {
		method: 'POST',
		body: formData,
	});

	const jsonData = await response.json();

	return jsonData;
};

export const openAiPredict = async (textForPredict, openAiObject) => {
	const completion = await openAiObject.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: `Hello, AI! I work as a content writer and could use your assistance in crafting an ideal post for the client's website. The client has provided me with the following text, which serves as the description for the featured image of the post:\n
				${textForPredict}\n
				Could you generate a title, alt_text (up to 120 characters), caption, and a five-paragraph (up to 500 words) post without explicitly mentioning the word 'image'? Additionally, I'm looking for suitable keywords for images related to each paragraph. Can you suggest five keywords for each section? I need all with json object with following json schema. {"title":"","alt_text":"","caption":"",content: [{paragraph: "", "keywords": []},{paragraph: "", "keywords": []},{paragraph: "", "keywords": []},{paragraph: "", "keywords": []},{paragraph: "", "keywords": []}]}`,
			},
		],
		model: 'gpt-3.5-turbo',
	});

	return JSON.parse(completion.choices[0].message.content);
};

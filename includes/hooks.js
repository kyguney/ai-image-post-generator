import { useEntityProp } from '@wordpress/core-data';
import OpenAI from 'openai';

export const usePluginSettings = () => {
	const [imageChatApi] = useEntityProp('root', 'site', 'aipg_plugin_settings_image_chat_api');
	const [openAiApi] = useEntityProp('root', 'site', 'aipg_plugin_settings_open_ai_api');
	const openai =
		openAiApi &&
		new OpenAI({
			apiKey: openAiApi,
			dangerouslyAllowBrowser: true,
		});

	return { imageChatApi, openai };
};

import { useState, Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import api from '@wordpress/api';
import {
	Button,
	ExternalLink,
	Icon,
	Panel,
	PanelBody,
	Placeholder,
	SnackbarList,
	Spinner,
	TextControl,
} from '@wordpress/components';
import { dispatch, useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

const Notices = () => {
	const notices = useSelect(
		(select) =>
			select(noticesStore)
				.getNotices()
				.filter((notice) => notice.type === 'snackbar'),
		[],
	);
	const { removeNotice } = useDispatch(noticesStore);
	return <SnackbarList className="edit-site-notices" notices={notices} onRemove={removeNotice} />;
};

const Settings = () => {
	const [settingsStates, setSettingsStates] = useState({
		imageChatApi: '',
		openAiApi: '',
		isAPILoaded: false,
	});
	useEffect(() => {
		const apiSettings = new api.models.Settings();
		if (settingsStates.isAPILoaded === false) {
			apiSettings.fetch().then((response) => {
				setSettingsStates({
					imageChatApi: response.aipg_plugin_settings_image_chat_api,
					openAiApi: response.aipg_plugin_settings_open_ai_api,
					isAPILoaded: true,
				});
			});
		}
	}, [settingsStates.isAPILoaded]);

	return (
		<Fragment>
			<div className="aipg-plugin__header">
				<div className="aipg-plugin__container">
					<div className="aipg-plugin__title">
						<h1>
							{__('AIPG Plugin Settings', 'aipg-plugin')}{' '}
							<Icon icon="admin-settings" />
						</h1>
					</div>
				</div>
			</div>
			<div className="aipg-plugin__main">
				{!settingsStates.isAPILoaded ? (
					<Panel>
						<Placeholder>
							<Spinner style={{ margin: '0 auto' }} />
						</Placeholder>
					</Panel>
				) : (
					<Panel>
						<PanelBody title={__('ImageChat Settings', 'aipg-plugin')} icon="rest-api">
							<TextControl
								help={[
									<span key="help-text" className="aipg-plugin__help-text">
										{__(
											'In order to use ImageChat features, you need to register and obtain an API key.',
											'aipg-plugin',
										)}
									</span>,
									<ExternalLink
										key="link"
										href="https://app.chooch.ai/feed/sign_up/"
									>
										{__('Get API Key', 'aipg-plugin')}
									</ExternalLink>,
								]}
								label={__('API Key', 'aipg-plugin')}
								onChange={(imageChatApi) =>
									setSettingsStates((prevSettingsStates) => ({
										...prevSettingsStates,
										imageChatApi,
									}))
								}
								value={settingsStates.imageChatApi}
							/>
						</PanelBody>
						<PanelBody title={__('Open AI Settings', 'aipg-plugin')} icon="rest-api">
							<TextControl
								help={[
									<span key="help-text" className="aipg-plugin__help-text">
										{__(
											'In order to use OpenAI features, you need to register and obtain an API key.',
											'aipg-plugin',
										)}
									</span>,
									<ExternalLink
										key="link"
										href="https://platform.openai.com/signup/"
									>
										{__('Get API Key', 'aipg-plugin')}
									</ExternalLink>,
								]}
								label={__('API Key', 'aipg-plugin')}
								onChange={(openAiApi) =>
									setSettingsStates((prevSettingsStates) => ({
										...prevSettingsStates,
										openAiApi,
									}))
								}
								value={settingsStates.openAiApi}
							/>
						</PanelBody>
						<Button
							variant="primary"
							onClick={() => {
								const settings = new api.models.Settings({
									aipg_plugin_settings_image_chat_api:
										settingsStates.imageChatApi,
									aipg_plugin_settings_open_ai_api: settingsStates.openAiApi,
								});
								settings.save();
								dispatch('core/notices').createNotice(
									'success',
									__('Settings Saved', 'aipg-plugin'),
									{
										type: 'snackbar',
										isDismissible: true,
									},
								);
							}}
						>
							{__('Save', 'aipg-plugin')}
						</Button>
					</Panel>
				)}
			</div>
			<div className="aipg-plugin__notices">
				<Notices />
			</div>
		</Fragment>
	);
};

export default Settings;

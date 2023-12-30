!function(){"use strict";var e={n:function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},d:function(t,n){for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,n=window.wp.i18n,i=window.wp.api,a=e.n(i),l=window.wp.components,p=window.wp.data,s=window.wp.notices;const o=()=>{const e=(0,p.useSelect)((e=>e(s.store).getNotices().filter((e=>"snackbar"===e.type))),[]),{removeNotice:n}=(0,p.useDispatch)(s.store);return(0,t.createElement)(l.SnackbarList,{className:"edit-site-notices",notices:e,onRemove:n})};var r=()=>{const[e,i]=(0,t.useState)({imageChatApi:"",openAiApi:"",isAPILoaded:!1});return(0,t.useEffect)((()=>{const t=new(a().models.Settings);!1===e.isAPILoaded&&t.fetch().then((e=>{i({imageChatApi:e.aipg_plugin_settings_image_chat_api,openAiApi:e.aipg_plugin_settings_open_ai_api,isAPILoaded:!0})}))}),[e.isAPILoaded]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"aipg-plugin__header"},(0,t.createElement)("div",{className:"aipg-plugin__container"},(0,t.createElement)("div",{className:"aipg-plugin__title"},(0,t.createElement)("h1",null,(0,n.__)("AIPG Plugin Settings","aipg-plugin")," ",(0,t.createElement)(l.Icon,{icon:"admin-settings"}))))),(0,t.createElement)("div",{className:"aipg-plugin__main"},e.isAPILoaded?(0,t.createElement)(l.Panel,null,(0,t.createElement)(l.PanelBody,{title:(0,n.__)("ImageChat Settings","aipg-plugin"),icon:"rest-api"},(0,t.createElement)(l.TextControl,{help:[(0,t.createElement)("span",{key:"help-text",className:"aipg-plugin__help-text"},(0,n.__)("In order to use ImageChat features, you need to register and obtain an API key.","aipg-plugin")),(0,t.createElement)(l.ExternalLink,{key:"link",href:"https://app.chooch.ai/feed/sign_up/"},(0,n.__)("Get API Key","aipg-plugin"))],label:(0,n.__)("API Key","aipg-plugin"),onChange:e=>i((t=>({...t,imageChatApi:e}))),value:e.imageChatApi})),(0,t.createElement)(l.PanelBody,{title:(0,n.__)("Open AI Settings","aipg-plugin"),icon:"rest-api"},(0,t.createElement)(l.TextControl,{help:[(0,t.createElement)("span",{key:"help-text",className:"aipg-plugin__help-text"},(0,n.__)("In order to use OpenAI features, you need to register and obtain an API key.","aipg-plugin")),(0,t.createElement)(l.ExternalLink,{key:"link",href:"https://platform.openai.com/signup/"},(0,n.__)("Get API Key","aipg-plugin"))],label:(0,n.__)("API Key","aipg-plugin"),onChange:e=>i((t=>({...t,openAiApi:e}))),value:e.openAiApi})),(0,t.createElement)(l.Button,{variant:"primary",onClick:()=>{new(a().models.Settings)({aipg_plugin_settings_image_chat_api:e.imageChatApi,aipg_plugin_settings_open_ai_api:e.openAiApi}).save(),(0,p.dispatch)("core/notices").createNotice("success",(0,n.__)("Settings Saved","aipg-plugin"),{type:"snackbar",isDismissible:!0})}},(0,n.__)("Save","aipg-plugin"))):(0,t.createElement)(l.Panel,null,(0,t.createElement)(l.Placeholder,null,(0,t.createElement)(l.Spinner,{style:{margin:"0 auto"}})))),(0,t.createElement)("div",{className:"aipg-plugin__notices"},(0,t.createElement)(o,null)))};const c=document.getElementById("aipg-settings-page");(0,t.createRoot)(c).render((0,t.createElement)(r,null))}();
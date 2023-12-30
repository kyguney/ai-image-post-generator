import '../../css/admin/admin-style.css';
import { createRoot } from '@wordpress/element';
import { Settings } from './components';

const domNode = document.getElementById('aipg-settings-page');
const root = createRoot(domNode);

root.render(<Settings />);

import React from 'react';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import CookieConsentPopUp from './main/components/cookie-consent/CookieConsent';
import RouteConfig from './navigation/RouteConfig';

function App() {
	return (
		<Router>
			<div className="App h-auto w-screen text-gray-600">
				<RouteConfig />
				<CookieConsentPopUp />
			</div>
		</Router>
	);
}

export default App;

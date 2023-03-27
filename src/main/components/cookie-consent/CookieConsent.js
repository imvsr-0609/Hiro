import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieConsentPopUp = () => {
	return (
		<CookieConsent
			//debug={true}
			buttonText="Accept All"
			// location="bottom"
			enableDeclineButton
			style={{ background: '#161616', fontSize: '13px' }}
			buttonStyle={{
				color: 'white',
				fontSize: '13px',
				backgroundColor: '#2759D0',
			}}
			declineButtonStyle={{ color: 'white', fontSize: '13px' }}
			onAccept={() => {
				// alert('yay!')
			}}
			onDecline={() => {
				// alert('nay!')
			}}
		>
			We use our own cookies as well as third-party cookies on our websites to
			enhance your experience, analyze our traffic, and for security and
			marketing. Select "Accept All" to allow them to be used.
		</CookieConsent>
	);
};

export default CookieConsentPopUp;

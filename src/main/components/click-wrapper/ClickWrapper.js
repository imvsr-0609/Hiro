import React, { useEffect, useRef } from 'react';

const ClickWrapper = ({ func, children }) => {
	const clickRef = useRef();

	useEffect(() => {
		function handleClickOutside(event) {
			if (clickRef.current && !clickRef.current.contains(event.target)) {
				func();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [clickRef]);
	return (
		<div className="h-full w-full " ref={clickRef}>
			{children}
		</div>
	);
};

export default ClickWrapper;

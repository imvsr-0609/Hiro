import React from 'react';
import ReactQuill from 'react-quill';

const MessageInput = ({ label, placeholder, value, setValue, required }) => {
	return (
		<label className="flex flex-col gap-2 text-xs md:text-sm mb-8 ">
			<p className=" font-semibold  ">{label}</p>

			<div className="  h-40">
				<ReactQuill
					className="h-32 "
					placeholder={placeholder}
					required={required}
					value={value}
					onChange={(value) => setValue(value)}
				/>
			</div>
		</label>
	);
};

export default MessageInput;

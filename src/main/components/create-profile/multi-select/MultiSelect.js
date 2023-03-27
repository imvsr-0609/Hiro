import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const MultiSelect = ({
	label,
	placeholder,
	value,
	setValue,
	keySkills,
	property = 'language_name',
}) => {
	return (
		<div className="sm:col-span-2">
			<Autocomplete
				multiple
				id="tags-outlined"
				style={{ background: 'white', fontSize: '.8rem' }}
				options={keySkills}
				value={value}
				onChange={(event, newValue) => {
					//console.log(newValue);
					setValue([
						...new Map(newValue.map((item) => [item[property], item])).values(),
					]);
				}}
				getOptionLabel={(option) => option[property]}
				defaultValue={[]}
				filterSelectedOptions
				renderInput={(params) => (
					<TextField {...params} label={label} placeholder={placeholder} />
				)}
			/>
		</div>
	);
};

export default MultiSelect;

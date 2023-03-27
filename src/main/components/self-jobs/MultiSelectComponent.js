import { Checkbox } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import ClickWrapper from '../../components/click-wrapper/ClickWrapper';

const handleChildClick = (_skill, type, setProfileValue, profileValue) => {
	if (profileValue[type].find((skill) => skill === _skill)) {
		setProfileValue({
			...profileValue,
			[type]: profileValue[type].filter((skill) => skill !== _skill),
		});
	} else {
		const res = [...profileValue[type], _skill];
		setProfileValue({ ...profileValue, [type]: res });
	}
};

const SingleMultiOption = ({ skill, profileValue, setProfileValue, type }) => {
	const [showChild, setShowChild] = useState(false);

	const handleParentClick = (value, skill) => {
		if (value) {
			const res = [...profileValue[type], ...skill.keyword];
			setProfileValue({ ...profileValue, [type]: [...new Set(res)] });
		} else {
			const difference = profileValue[type].filter(
				(x) => !skill.keyword.includes(x),
			);
			setProfileValue({ ...profileValue, [type]: [...new Set(difference)] });
		}
	};

	return (
		<div>
			<div className=" px-3 py-2  text-sm flex  justify-between items-center hover:bg-gray-100 bg-gray-50 border-b-2 border-opacity-10">
				<div className="flex items-center gap-3">
					<Checkbox
						checked={skill.keyword.every((skill) =>
							profileValue[type].includes(skill),
						)}
						onChange={(event) => handleParentClick(event.target.checked, skill)}
						inputProps={{ 'aria-label': 'controlled' }}
					/>
					<p className="font-semibold capitalize">{skill?.skill_type_nested}</p>
				</div>
				<div
					className="text-2xl cursor-pointer"
					onClick={() => setShowChild(!showChild)}
				>
					{showChild ? <BiChevronUp /> : <BiChevronDown />}
				</div>
			</div>
			{showChild && (
				<div className="flex flex-col">
					{skill.keyword.map((_skill, idx) => (
						<label
							key={idx}
							className="flex items-center px-6 py-2 gap-3 hover:bg-gray-100"
						>
							<Checkbox
								checked={profileValue[type].includes(_skill)}
								onChange={(event) =>
									handleChildClick(_skill, type, setProfileValue, profileValue)
								}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
							<p className="text-sm w-full capitalize ">{_skill}</p>
						</label>
					))}
				</div>
			)}
		</div>
	);
};

const MultiSelectComponent = ({
	label,
	profileValue,
	setProfileValue,
	skills,
	skill,
}) => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className="flex flex-col gap-2 text-xs md:text-sm ">
			<p className=" font-semibold  ">{label}</p>
			<div className="relative">
				<div
					onClick={() => setShowMenu(!showMenu)}
					className=" flex justify-between items-center p-3 rounded-xl border-2 border-opacity-40 cursor-pointer"
				>
					<div className="flex flex-1">
						{profileValue[skill]?.length === 0 ? (
							`Select ${skill} skills`
						) : (
							<div className="flex gap-2 flex-wrap">
								{String(profileValue[skill])
									.split(',')
									.map((_skill, idx) => (
										<div
											key={idx}
											className=" flex gap-2 items-center  bg-gray-100 p-1 px-2 rounded-full shadow "
										>
											<p className="text-xs capitalize">{_skill}</p>
											<div
												onClick={() =>
													handleChildClick(
														_skill,
														skill,
														setProfileValue,
														profileValue,
													)
												}
												className="w-4 h-4 grid place-items-center rounded-full bg-gray-200"
											>
												<MdClose />
											</div>
										</div>
									))}
							</div>
						)}
					</div>
					<BiChevronDown className="text-2xl" />
				</div>
				{showMenu && (
					<ClickWrapper func={() => setShowMenu(false)}>
						<div className="absolute top-full inset-x-0 z-50 shadow rounded-b-lg border border-opacity-20 bg-white h-56 overflow-y-scroll ">
							{skills.map((_skill, idx) => (
								<SingleMultiOption
									key={idx}
									skill={_skill}
									type={skill}
									setProfileValue={setProfileValue}
									profileValue={profileValue}
								/>
							))}
						</div>
					</ClickWrapper>
				)}
			</div>
		</div>
	);
};

export default MultiSelectComponent;

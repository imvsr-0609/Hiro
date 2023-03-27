import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import SubmitButton from '../../components/auth/SubmitButton';
import MultiSelectComponent from './MultiSelectComponent';

const CreateJobSkillTab = ({
	activeStep,
	setActiveStep,
	setProfileValue,
	profileValue,
	onSubmit,
	allSkills,
	tnc,
	setTnc,
}) => {
	return (
		<div className="flex flex-col gap-6 p-10">
			<div className="flex flex-col gap-2 border-b-2 pb-6">
				<h1 className="text-2xl font-bold">Additional Skills</h1>

				<p className="text-sm ">
					Add Technical, Management, and Soft Skills to showcase your abilities
					even further. These skills help the recruiters understand you better
					and may help with attaining a role more suited for you.
				</p>
			</div>
			<form onSubmit={onSubmit} className="flex flex-col gap-6 ">
				<div className="flex flex-col gap-6">
					<MultiSelectComponent
						label={'Technical Skills'}
						profileValue={profileValue}
						setProfileValue={setProfileValue}
						skills={allSkills['technical skills']}
						skill={'technical'}
					/>

					<p className="text-sm">
						Technical skills refer to the specific knowledge and abilities
						required to perform a particular job or task within a given field or
						industry.
					</p>
				</div>
				<div className="flex flex-col gap-6">
					<MultiSelectComponent
						label={'Management Skills'}
						profileValue={profileValue}
						setProfileValue={setProfileValue}
						skills={allSkills['management skills']}
						skill={'management'}
					/>

					<p className="text-sm">
						Management skills are essential for individuals who are responsible
						for supervising and leading others, and involve the ability to plan,
						organize, motivate, and communicate effectively.
					</p>
				</div>
				<div className="flex flex-col gap-6">
					<MultiSelectComponent
						label={'Soft Skills'}
						profileValue={profileValue}
						setProfileValue={setProfileValue}
						skills={allSkills['soft skills']}
						skill={'soft'}
					/>

					<p className="text-sm">
						Soft skills, also known as interpersonal skills, are non-technical
						skills that involve the ability to interact with others in a
						positive and effective way, including communication, teamwork,
						problem-solving, and emotional intelligence.
					</p>
				</div>
				<div className="  flex flex-col justify-between gap-3 pt-20">
					<label className="flex items-center gap-2 font-600  cursor-pointer text-xs z-0">
						<input
							value={tnc}
							onChange={(e) => setTnc(e.target.checked)}
							className=" cursor-pointer"
							type="checkbox"
						/>

						<p>I Confirm the details provided are correct</p>
					</label>
					<div className="flex justify-between items-center">
						<button
							onClick={() => setActiveStep(activeStep + 1)}
							className="flex gap-2 text-sm  items-center"
						>
							<BiArrowBack className="text-2xl" /> Back
						</button>
						<SubmitButton text={'Create Job'} disabled={!tnc} />
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateJobSkillTab;

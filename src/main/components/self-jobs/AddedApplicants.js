import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from 'react-icons/md';

const AddedApplicants = ({ data }) => {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<div className="flex flex-col gap-3 h-full ">
			<h3 className="font-semibold">Added Candidates</h3>

			<div className="w-full max-w-3xl  flex flex-col gap-3">
				{data.map((applicant, idx) => {
					const { email, github_profile, name, phone_number } = applicant;
					return (
						<div className="shadow-md rounded-lg w-full " key={idx}>
							<Accordion
								expanded={expanded === `panel${idx + 1}`}
								onChange={handleChange(`panel${idx + 1}`)}
								sx={{
									border: 0,
									borderRadius: '0.5rem',
									outline: 0,
									boxShadow: 'none',
									width: '100%',
									// paddingLeft: '1rem',
									// paddingRight: '1rem',
								}}
							>
								<AccordionSummary
									expandIcon={
										<MdExpandMore className="text-3xl font-extrabold" />
									}
									aria-controls="panel1bh-content"
									id={`panel${idx + 1}bh-header`}
									sx={{
										backgroundColor: '#efefef',
										padding: '0.5rem 1rem',
										borderRadius: '0.5rem',
										width: '100%',
									}}
								>
									<Typography sx={{ fontWeight: '550', fontSize: '14px' }}>
										{name}
									</Typography>
								</AccordionSummary>
								<AccordionDetails
									sx={{
										padding: '1.2rem 1rem',
										border: 0,
										outline: 0,
										backgroundColor: 'white',
									}}
								>
									<Typography sx={{ fontSize: '14px' }}>
										<span className="font-semibold">Email : </span> {email}
									</Typography>
									<Typography sx={{ fontSize: '14px' }}>
										<span className="font-semibold">Phone : </span>
										{phone_number}
									</Typography>
									<Typography sx={{ fontSize: '14px' }}>
										<span className="font-semibold">Github : </span>
										{github_profile}
									</Typography>
								</AccordionDetails>
							</Accordion>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AddedApplicants;

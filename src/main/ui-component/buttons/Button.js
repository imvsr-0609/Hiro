import React from 'react';
import { ArrowTooltip } from '../tooltip/Tooltip';

const Button = ({
	onClick,
	disabled = false,
	text,
	type,
	outline = false,
	toolTipTitle,
}) => {
	const buttonStyles = (type) => {
		switch (type?.toUpperCase()) {
			case 'PRIMARY':
				return ` ${
					outline
						? 'border-2 border-blue-500 bg-white hover:bg-blue-100 text-blue-500'
						: 'bg-blue-500 hover:bg-blue-400'
				}  `;
			case 'SUCCESS':
				return ` ${
					outline
						? 'border-2 border-green-500 bg-white hover:bg-green-100 text-green-500'
						: 'bg-green-500 hover:bg-green-400'
				}  `;

			case 'WARNING':
				return ` ${
					outline
						? 'border-2 border-yellow-500 bg-white hover:bg-yellow-100 text-yellow-500'
						: 'bg-yellow-500 hover:bg-yellow-400'
				}  `;
			case 'ERROR':
				return ` ${
					outline
						? 'border-2 border-red-500 bg-white hover:bg-red-100 text-red-500'
						: 'bg-red-600 hover:bg-red-500'
				}  `;
			case 'DARK':
				return ` ${
					outline
						? 'border-2 border-gray-500 bg-white hover:bg-gray-100 text-gray-500'
						: 'bg-gray-700 hover:bg-gray-600'
				}  `;
			default:
				return 'bg-gray-500 shadow-xl';
		}
	};
	return (
		<ArrowTooltip title={toolTipTitle}>
			<button
				onClick={onClick}
				disable={disabled}
				className={`flex min-w-[150px] shadow-lg text-sm justify-center items-center font-semibold gap-2 p-[10px] disabled:bg-gray-400 px-4 ${buttonStyles(
					type,
				)} text-white rounded-full`}
			>
				{text}
			</button>
		</ArrowTooltip>
	);
};

export default Button;

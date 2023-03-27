import React from 'react';
import { ArrowTooltip } from '../tooltip/Tooltip';

const IconButton = ({
	type,
	onClick,
	toolTipTitle,
	text,
	icon,
	disabled = false,
	align = 'left',
	outline = false,
}) => {
	const buttonStyles = (type) => {
		switch (type?.toUpperCase()) {
			case 'PRIMARY':
				return ` ${
					outline
						? 'border-2 border-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white text-blue-600'
						: 'bg-blue-500 hover:bg-blue-400 shadow-xl'
				}  `;
			case 'SUCCESS':
				return ` ${
					outline
						? 'border-2 border-green-500 bg-green-50 hover:bg-green-500 hover:text-white text-green-500'
						: 'bg-green-500 hover:bg-green-400 shadow-xl'
				}  `;

			case 'WARNING':
				return ` ${
					outline
						? 'border-2 border-orange-500 bg-orange-50 hover:bg-orange-500 hover:text-white text-orange-400'
						: 'bg-orange-500 hover:bg-orange-400 shadow-xl'
				}  `;
			case 'ERROR':
				return ` ${
					outline
						? 'border-2 border-red-500 bg-red-100 hover:bg-red-500 hover:text-white text-red-600'
						: 'bg-red-600 hover:bg-red-500 shadow-xl'
				}  `;
			case 'DARK':
				return ` ${
					outline
						? 'border-2 border-gray-500 bg-gray-100 hover:bg-gray-500 hover:text-white text-gray-500'
						: 'bg-gray-700 hover:bg-gray-600 shadow-xl'
				}  `;
			default:
				return 'bg-gray-500 shadow-xl';
		}
	};

	return (
		<ArrowTooltip title={toolTipTitle}>
			<button
				onClick={onClick}
				disabled={disabled}
				className={`flex ${
					align === 'right' && 'flex-row-reverse'
				} min-w-[150px] justify-center shadow-lg items-center text-sm font-semibold gap-2 p-[10px] disabled:bg-gray-400 px-4 ${buttonStyles(
					type,
				)} text-white rounded-full`}
			>
				<span className="text-xl">{icon}</span> {text}
			</button>
		</ArrowTooltip>
	);
};

export default IconButton;

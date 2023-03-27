import axiosInstance from '../axios/axios';

export const includeComma = (number) => {
	if (number === null) {
		return;
	}
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getIpDetails = async () => {
	try {
		const { data } = await axiosInstance.get(
			`https://api.ipgeolocation.io/ipgeo?apiKey=d582e444f8e44b3699019941488d0ae4`,
		);
		if (data) {
			const { ip, country_name, city } = data;
			return { ip, ipcountry: country_name, ipcity: city };
		}
	} catch (err) {
		return { ip: '', ipcountry: '', ipcity: '' };
	}
};

export const htmltoText = (html) => {
	let text = html;
	text = text.replace(/\n/gi, '');
	text = text.replace(/<style([\s\S]*?)<\/style>/gi, '');
	text = text.replace(/<script([\s\S]*?)<\/script>/gi, '');
	text = text.replace(/<a.*?href="(.*?)[\?\"].*?>(.*?)<\/a.*?>/gi, ' $2 $1 ');
	text = text.replace(/<\/div>/gi, '\n\n');
	text = text.replace(/<\/li>/gi, '\n');
	text = text.replace(/<li.*?>/gi, '  *  ');
	text = text.replace(/<\/ul>/gi, '\n\n');
	text = text.replace(/<\/p>/gi, '\n\n');
	text = text.replace(/<br\s*[\/]?>/gi, '\n');
	text = text.replace(/<[^>]+>/gi, '');
	text = text.replace(/^\s*/gim, '');
	text = text.replace(/ ,/gi, ',');
	text = text.replace(/ +/gi, ' ');
	text = text.replace(/\n+/gi, '\n\n');
	return text;
};

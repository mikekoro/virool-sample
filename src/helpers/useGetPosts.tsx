import React, { useEffect,useState } from 'react';
import axios from 'axios';

interface IUseGetUserPosts {
	data: any | null;
	error: boolean;
	loading: boolean;
	getDataFromUrl: (url: string) => void;
}

const useGetUserPosts = ():IUseGetUserPosts => {
	
	const [data, setData] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [url, getDataFromUrl] = useState('');

	useEffect(() => {
		
		const fetchData = async () => {

			setLoading(true)
			try {
				let response = await axios({
					method: 'GET',
					url: url
				});
				const { data } = response;
				setData(data)

			} catch(err) {
				setError(true)
			}
			setLoading(false)

		}

		if(url) {
			fetchData();
		}

	}, [url])

	return { data, error, loading, getDataFromUrl }

}

export default useGetUserPosts;
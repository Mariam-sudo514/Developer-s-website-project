"use client";

import styles from './ButtonGetRequest.module.css';

async function getMessageFromAPI(params) {
	const res = await fetch('/api/hello');
	return res.json();
}

const ButtonGetRequest = () => {
	const clickHandler = async () => {
		const { message } = await getMessageFromAPI();
		alert(message);
	}

	return (
		<button onClick={clickHandler} className={styles.button}>
			Make Get request (client)
		</button>
	);
};

export default ButtonGetRequest;

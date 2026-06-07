"use client";

import styles from './Button.module.css';

const Button = () => {
	return (
		<button onClick={() => alert('Here we go!')} className={styles.button}>
			Click me (click event)
		</button>
	);
}

export default Button;

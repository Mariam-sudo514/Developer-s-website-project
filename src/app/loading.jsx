import styles from '@/components/Shared/SimplePage.module.css';

const Loading = () => {
	return (
		<div className={styles.loaderWrapper}>
			<span className={styles.loader}></span>
		</div>
	);
};

export default Loading;

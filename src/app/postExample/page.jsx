import { createHelloGreeting } from '@/lib/hello';
import styles from '@/components/shared/SimplePage.module.css';

const PostExample = async () => {
	const { message } = createHelloGreeting('Yurij');
	return (
		<section className={styles.content}>
			<h2 className={styles.sectionTitle}>Post request</h2>

			{message && <h3>{message}</h3>}
		</section>
	);
};

export default PostExample;

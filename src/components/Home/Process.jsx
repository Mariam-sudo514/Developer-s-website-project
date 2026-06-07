import styles from './Process.module.css';
import { IoIosArrowDown } from "react-icons/io";

const processItems = ['Discovery', 'Structure & Flow', 'Development', 'Launch'];

const Process = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2>Process</h2>
				<div className={styles.list}>
					{processItems.map((item) => (
						<details className={styles.item} key={item}>
							<summary>
								<span>{item}</span>
								<span aria-hidden="true"><IoIosArrowDown /></span>
							</summary>
							<p>
								We begin with a focused conversation to understand your goals, audience, brand direction, and the role your website needs to play. This helps create a clear foundation before any design or development work begins.
							</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
};

export default Process;

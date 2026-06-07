import Hero from './Hero';
import HomeCta from './HomeCta';
import Process from './Process';
import SelectedWork from './SelectedWork';
import Services from './Services';
import WhyChoose from './WhyChoose';
import styles from './HomePage.module.css';

const HomePage = () => {
	return (
		<div className={styles.page}>
			<Hero />
			<WhyChoose />
			<SelectedWork />
			<Services />
			<Process />
			<HomeCta />
		</div>
	);
};

export default HomePage;

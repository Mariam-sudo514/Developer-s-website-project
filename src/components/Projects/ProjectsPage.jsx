import Link from 'next/link';
import ContactButton from '../ContactButton/ContactButton';
import ProjectCard from './ProjectCard';
import styles from './ProjectsPage.module.css';
import { projectsData } from './projectsData';

const ProjectsPage = () => {
	return (
		<div className={styles.page}>
			<section className={styles.hero}>
				<p className={styles.label}>PORTFOLIO</p>
				<h1>Selected Projects</h1>
				<p className={styles.lead}>
					A collection of recent work across industries. Thoughtful design,
					clean code, and meaningful results.
				</p>
				<Link className={styles.heroButton} href="/contacts">
					Start a project <span aria-hidden="true">→</span>
				</Link>
			</section>

			<section className={styles.projects} aria-label="Selected projects">
				<div className={styles.grid}>
					{projectsData.map((project, index) => (
						<ProjectCard
							key={project.slug}
							project={project}
							priority={index < 3}
						/>
					))}
				</div>
			</section>

			<section className={styles.cta}>
				<div>
					<h2>Have a project in mind? Let's create something exceptional.</h2>
					<p>
						I help brands and startups bring ideas to life through elegant
						design and performance.
					</p>
				</div>
				<ContactButton compact />
			</section>
		</div>
	);
};

export default ProjectsPage;

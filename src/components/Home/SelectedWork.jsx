import Link from 'next/link';
import ProjectCard from '../Projects/ProjectCard';
import { featuredProjects } from '../Projects/projectsData';
import styles from './SelectedWork.module.css';

const SelectedWork = () => {
	return (
		<section className={styles.section} id="selected-work">
			<div className={styles.container}>
				<div className={styles.heading}>
					<h2>Selected Work</h2>
					<Link className={styles.textLink} href="/projects">
						View all projects <span aria-hidden="true">→</span>
					</Link>
				</div>
				<div className={styles.grid}>
					{featuredProjects.map((project, index) => (
						<ProjectCard
							key={project.slug}
							project={project}
							priority={index === 0}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default SelectedWork;

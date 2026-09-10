import Link from 'next/link';
import ProjectCard from '../Projects/ProjectCard';
import { featuredProjects } from '../Projects/projectsData';
import styles from './SelectedWork.module.css';

// Match the grid, container width and ProjectCard padding.
const projectImageSizes = [
	'(max-width: 560px) calc(100vw - 80px)',
	'(max-width: 920px) min(592px, calc(100vw - 88px))',
	'(max-width: 1200px) min(279px, calc((100vw - 268px) / 3))',
	'min(387px, calc((100vw - 352px) / 3))',
].join(', ');

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
							imageSizes={projectImageSizes}
							priority={index === 0}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default SelectedWork;

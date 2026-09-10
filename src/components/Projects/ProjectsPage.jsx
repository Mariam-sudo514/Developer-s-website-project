import ButtonLink from '@/components/Shared/ButtonLink/ButtonLink';
import ContactButton from '../ContactButton/ContactButton';
import ProjectCard from './ProjectCard';
import styles from './ProjectsPage.module.css';
import { projectListData } from './projectListData';

// Match the grid, container width and ProjectCard padding.
const projectImageSizes = [
	'(max-width: 560px) min(480px, calc(100vw - 72px))',
	'(max-width: 700px) calc(100vw - 88px)',
	'(max-width: 920px) min(298px, calc(50vw - 82px))',
	'(max-width: 1100px) calc(50vw - 98px)',
	'(max-width: 1200px) min(276px, calc((100vw - 276px) / 3))',
	'min(384px, calc((100vw - 360px) / 3))',
].join(', ');

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
				<ButtonLink href="/contacts" variant="primary">
					Start a project <span aria-hidden="true">→</span>
				</ButtonLink>
			</section>

			<section className={styles.projects} aria-label="Selected projects">
				<div className={styles.grid}>
					{projectListData.map((project, index) => (
						<ProjectCard
							key={project.slug}
							project={project}
							imageSizes={projectImageSizes}
							priority={index < 3}
						/>
					))}
				</div>
			</section>

			<section className={styles.cta}>
				<div>
					<h2>Have a project in mind? Let&apos;s create something exceptional.</h2>
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

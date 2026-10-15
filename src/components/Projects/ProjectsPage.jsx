import ButtonLink from '@/components/Shared/ButtonLink/ButtonLink';
import ContactButton from '../ContactButton/ContactButton';
import ProjectCard from './ProjectCard';
import styles from './ProjectsPage.module.css';
import { projectListData } from './projectListData';

const projectImageSizes = [
	'(max-width: 448px) min(384px, calc(100vw - 58px))',
	'(max-width: 736px) min(472px, calc(100vw - 72px))',
	'(max-width: 960px) min(371px, calc(50vw - 71px))',
	'(max-width: 1016px) calc(50vw - 99px)',
	'min(316px, calc((100vw - 264px) / 3))',
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
							className={styles.projectCard}
							key={project.slug}
							project={project}
							imageSizes={projectImageSizes}
							priority={index < 3}
							ctaLabel="View project"
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
				<ContactButton />
			</section>
		</div>
	);
};

export default ProjectsPage;

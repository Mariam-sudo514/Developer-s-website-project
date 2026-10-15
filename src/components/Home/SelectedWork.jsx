import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import ProjectCard from '../Projects/ProjectCard';
import { projectListData } from '../Projects/projectListData';
import styles from './SelectedWork.module.css';

const selectedProjectSlugs = ['sales-crm', 'kinolook', 'drogan-vpn'];
const selectedProjects = selectedProjectSlugs
	.map((slug) => projectListData.find((project) => project.slug === slug))
	.filter(Boolean);

const projectImageSizes = [
	'(max-width: 448px) calc(100vw - 64px)',
	'(max-width: 736px) min(472px, calc(100vw - 72px))',
	'(max-width: 960px) calc(50vw - 71px)',
	'(max-width: 1016px) calc(50vw - 85.5px)',
	'calc((100vw - 229px) / 3)',
].join(', ');

const SelectedWork = () => {
	return (
		<section className={styles.section} id="selected-work">
			<div className={styles.container}>
				<div className={styles.heading}>
					<h2>Selected Work</h2>
					<Link className={styles.arrow} href="/projects">
						<span>View all projects</span>
						<FaArrowRightLong className={styles.arrowIcon} />
					</Link>
				</div>
				<div className={styles.grid}>
					{selectedProjects.map((project, index) => (
						<ProjectCard
							className={styles.featuredCard}
							key={project.slug}
							project={project}
							imageSizes={projectImageSizes}
							priority={index === 0}
							ctaLabel="View project"
							href={project.href}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default SelectedWork;

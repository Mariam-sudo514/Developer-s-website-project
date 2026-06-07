import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, priority = false, className = '' }) => {
	const classNames = [styles.card, className].filter(Boolean).join(' ');

	return (
		<Link
			className={classNames}
			href="/projects"
			aria-label={`View ${project.title} project`}
		>
			<div className={styles.media}>
				<img
					className={styles.image}
					src={project.image}
					alt={`${project.title} project preview`}
					loading={priority ? 'eager' : 'lazy'}
					decoding="async"
					fetchPriority={priority ? 'high' : undefined}
				/>
			</div>

			<div className={styles.body}>
				<h3>{project.title}</h3>
				<p>{project.description}</p>
				<div className={styles.tags} aria-label={`${project.title} tags`}>
					{project.tags.map((tag) => (
						<span key={`${project.slug}-${tag}`}>{tag}</span>
					))}
				</div>
			</div>

			<span className={styles.arrow} aria-hidden="true">
				<FaArrowRightLong />
			</span>
		</Link>
	);
};

export default ProjectCard;

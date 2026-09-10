import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import styles from './ProjectCard.module.css';

const ProjectCard = ({
	project,
	priority = false,
	className = '',
	imageSizes = '100vw',
}) => {
	const classNames = [styles.card, className].filter(Boolean).join(' ');

	return (
		<Link
			className={classNames}
			href={project.href}
			aria-label={`View ${project.title} project`}
		>
			<div className={styles.media}>
				<Image
					className={styles.image}
					fill
					sizes={imageSizes}
					src={project.poster}
					alt={`${project.title} project preview`}
					loading={priority ? 'eager' : 'lazy'}
					decoding="async"
					fetchPriority={priority ? 'high' : undefined}
				/>
			</div>

			<div className={styles.body}>
				<h3>{project.title}</h3>
				<p>{project.shortDescription}</p>
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

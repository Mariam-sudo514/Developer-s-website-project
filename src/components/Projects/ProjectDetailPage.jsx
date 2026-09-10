import Image from 'next/image';
import Link from 'next/link';
import ButtonLink from '@/components/Shared/ButtonLink/ButtonLink';
import styles from './ProjectDetailPage.module.css';

// Include the frame padding and the detail page's column breakpoints.
const heroImageSizes = [
	'(max-width: 448px) calc(100vw - 44px)',
	'(max-width: 736px) min(486px, calc(100vw - 58px))',
	'(max-width: 860px) min(694px, calc(100vw - 77px))',
	'(max-width: 960px) calc(57vw - 75px)',
	'min(741px, calc(57vw - 108px))',
].join(', ');

const galleryImageSizes = [
	'(max-width: 448px) calc(100vw - 48px)',
	'(max-width: 736px) min(225px, calc(50vw - 47px))',
	'(max-width: 960px) calc(37.32vw - 66px)',
	'min(472px, calc(37.32vw - 83px))',
].join(', ');

const ArchitectureDiagram = ({ diagram, projectTitle }) => {
	return (
		<div
			className={styles.diagram}
			role="group"
			aria-label={`${projectTitle} architecture diagram`}
		>
			<div className={styles.diagramNode}>{diagram.root}</div>
			<span className={styles.diagramArrow} aria-hidden="true">
				↓
			</span>
			<div className={styles.diagramNode}>{diagram.api}</div>
			<span className={styles.diagramArrow} aria-hidden="true">
				↓
			</span>
			<div className={styles.diagramNode}>{diagram.backend}</div>
			<div className={styles.diagramServices}>
				{diagram.services.map((service) => (
					<div className={styles.diagramService} key={service}>
						{service}
					</div>
				))}
			</div>
		</div>
	);
};

const ProjectDetailPage = ({ project }) => {
	const gallery = Array.isArray(project.gallery) ? project.gallery : [];
	const architecture = project.architecture;

	return (
		<div className={styles.page}>
			<Link className={styles.backLink} href="/projects">
				← Back to projects
			</Link>

			<article className={styles.project}>
				<section className={styles.hero}>
					<div className={styles.heroCopy}>
						<p className={styles.eyebrow}>{project.category}</p>
						<h1>{project.detailTitle || project.title}</h1>
						<p className={styles.heroDescription}>
							{project.heroDescription || project.shortDescription}
						</p>

						<div className={styles.heroMeta}>
							{project.status ? (
								<span className={styles.statusBadge}>{project.status}</span>
							) : null}
							<ul className={styles.tagList} aria-label="Project technologies">
								{project.tags.map((tag) => (
									<li key={tag}>{tag}</li>
								))}
							</ul>
						</div>

						<div className={styles.actions}>
							{project.githubUrl ? (
								<a
									className={styles.actionLink}
									href={project.githubUrl}
									rel="noopener noreferrer"
									target="_blank"
								>
									View on GitHub <span aria-hidden="true">↗</span>
								</a>
							) : null}
							{project.liveUrl ? (
								<a
									className={styles.actionLink}
									href={project.liveUrl}
									rel="noopener noreferrer"
									target="_blank"
								>
									Live project <span aria-hidden="true">↗</span>
								</a>
							) : null}
							<ButtonLink
								className={styles.startAction}
								href="/contacts"
								variant="primary"
							>
								Start a similar project <span aria-hidden="true">→</span>
							</ButtonLink>
						</div>
					</div>

					<figure className={styles.heroMedia}>
						<div className={styles.imageFrame}>
							<Image
								alt={`${project.title} project poster`}
								className={styles.heroImage}
								fill
								sizes={heroImageSizes}
								loading="eager"
								decoding="async"
								src={project.poster}
							/>
						</div>
					</figure>
				</section>

				{project.confidentiality ? (
					<aside className={styles.confidentiality}>
						<h2>{project.confidentiality.heading}</h2>
						<p>{project.confidentiality.text}</p>
					</aside>
				) : null}

				<section className={styles.section}>
					<div className={styles.sectionHeader}>
						<p className={styles.sectionKicker}>Overview</p>
						<div className={styles.sectionHeadingContent}>
							<h2>What this project does</h2>
							<div className={styles.copy}>
								{project.overview.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className={styles.section}>
					<div className={styles.sectionHeader}>
						<p className={styles.sectionKicker}>Key features</p>
						<div className={styles.sectionHeadingContent}>
							<h2>Built around the workflow</h2>
							<ul className={styles.featureList}>
								{project.features.map((feature) => (
									<li key={feature}>{feature}</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				<section className={styles.section}>
					<div className={styles.sectionHeader}>
						<p className={styles.sectionKicker}>Tech stack</p>
						<div className={styles.sectionHeadingContent}>
							<h2>Tools behind the build</h2>
							<ul className={styles.stackList} aria-label="Technology stack">
								{project.stack.map((technology) => (
									<li key={technology}>{technology}</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				{architecture ? (
					<section className={styles.section}>
						<div className={styles.sectionHeader}>
							<p className={styles.sectionKicker}>Technical approach</p>
							<div className={styles.sectionHeadingContent}>
								<h2>{architecture.heading}</h2>
								<div
									className={`${styles.architectureLayout} ${
										architecture.diagram ? styles.withDiagram : ''
									}`}
								>
									<div className={styles.copy}>
										{architecture.paragraphs.map((paragraph) => (
											<p key={paragraph}>{paragraph}</p>
										))}
									</div>
									{architecture.diagram ? (
										<ArchitectureDiagram
											diagram={architecture.diagram}
											projectTitle={project.title}
										/>
									) : null}
								</div>
							</div>
						</div>
					</section>
				) : null}

				{project.currentStatus ? (
					<section className={`${styles.section} ${styles.statusSection}`}>
						<div className={styles.statusHeader}>
							<p className={styles.sectionKicker}>Status</p>
							<span className={styles.statusBadge}>{project.status}</span>
						</div>
						<div className={styles.statusContent}>
							<h2>{project.currentStatus.heading}</h2>
							<div className={styles.copy}>
								{project.currentStatus.paragraphs.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</div>
					</section>
				) : null}

				{gallery.length > 0 ? (
					<section className={styles.section}>
						<div className={styles.sectionHeader}>
							<p className={styles.sectionKicker}>Gallery</p>
							<div className={styles.sectionHeadingContent}>
								<h2>Selected screens</h2>
								<div className={styles.galleryGrid}>
									{gallery.map((item) => (
										<figure className={styles.galleryItem} key={item.src}>
											<div className={styles.imageFrame}>
												<Image
													alt={item.alt}
													className={styles.galleryImage}
													fill
													sizes={galleryImageSizes}
													loading="lazy"
													src={item.src}
												/>
											</div>
											{item.caption ? (
												<figcaption>{item.caption}</figcaption>
											) : null}
										</figure>
									))}
								</div>
							</div>
						</div>
					</section>
				) : null}

				<section className={styles.bottomCta}>
					<div>
						<p className={styles.sectionKicker}>Next step</p>
						<h2>Need something similar?</h2>
						<p className={styles.bottomCtaCopy}>
							Custom development and adaptation are available based on the scope,
							functionality, and technical requirements of your project.
						</p>
					</div>
					<ButtonLink
						className={styles.bottomAction}
						href="/contacts"
						variant="primary"
					>
						Start a project <span aria-hidden="true">→</span>
					</ButtonLink>
				</section>
			</article>
		</div>
	);
};

export default ProjectDetailPage;

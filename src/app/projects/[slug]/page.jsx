import { notFound } from 'next/navigation';
import ProjectDetailPage from '@/components/Projects/ProjectDetailPage';
import { projectListData } from '@/components/Projects/projectListData';

const getProject = (slug) =>
	projectListData.find((project) => project.slug === slug);

export function generateStaticParams() {
	return projectListData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		return {};
	}

	return {
		title: `${project.detailTitle || project.title} | Maria.dev`,
		description: project.heroDescription || project.shortDescription,
	};
}

export default async function ProjectDetails({ params }) {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		notFound();
	}

	return <ProjectDetailPage project={project} />;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description:
      "Write a short explanation of the problem and the purpose of this project.",
    technologies: ["React", "TypeScript"],
    featured: true,
  },
  {
    id: 2,
    title: "Project Two",
    description:
      "Write a short explanation of the main features of this project.",
    technologies: ["HTML", "CSS"],
  },
  {
    id: 3,
    title: "Project Three",
    description:
      "Write a short explanation of your contribution to this project.",
    technologies: ["JavaScript", "CSS"],
  },
];

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-heading">
          <p>My work</p>
          <h2>Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              className={`project-card${project.featured ? " project-card--featured" : ""}`}
              key={project.id}
            >
              <div className="project-card-header">
                <div className="project-number">
                  {String(project.id).padStart(2, "0")}
                </div>
                <div className="project-icon" aria-hidden="true">
                  ↗
                </div>
              </div>

              <h3>{project.title}</h3>

              <p className="project-description">{project.description}</p>

              <div className="technology-list">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>

              <a href="#" className="project-link">
                View Project
                <span className="project-link-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;

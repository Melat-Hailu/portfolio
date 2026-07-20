interface Skill{
    name:string;
    description:string
}
const Skill: Skill[] = [
  {
    name: "HTML",
    description: "Website structure",
  },
  {
    name: "CSS",
    description: "Website styling",
  },
  {
    name: "TypeScript",
    description: "Programming language",
  },
  {
    name: "React",
    description: "User interface development",
  },
];

function Skills()
{
    return(
        <section className="section skills-section" id="skills">
            <div className="container">
                <div className="section-heading">
                    <p>what i know</p>
                    <p>my skills</p>
                </div>
                <div className="skills-grid">
                      {Skill.map((skill) => (
            <article className="skill-card" key={skill.name}>
              <div className="skill-symbol">
                {skill.name.substring(0, 2).toUpperCase()}
              </div>

              <h3>{skill.name}</h3>

              <p>{skill.description}</p>
            </article>
          ))}
        </div>
                
            </div>
        </section>
    )
};
export default Skills;
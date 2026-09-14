export default function TechnologyList({ technologies }: { technologies: string[] }) {
  if (technologies.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2.5">
      {technologies.map((tech) => (
        <li key={tech} className="tech-tag">
          {tech}
        </li>
      ))}
    </ul>
  );
}

export default function ProfileSkills({ skills }: { skills: string[] }) {
  return (
    <section aria-labelledby="profile-skills-heading">
      <h2 id="profile-skills-heading" className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">
        02 / Skills
      </h2>
      {skills.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2">
          {skills.map((skill) => (
            <li key={skill} className="text-sm text-soft-white/70">
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-soft-white/45">No skills listed yet.</p>
      )}
    </section>
  );
}

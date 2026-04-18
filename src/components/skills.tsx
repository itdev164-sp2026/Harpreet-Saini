import { Braces, Atom, Gem, Server, Palette, FileCode } from "lucide-react";

export const Skills = () => {
  const skills = [
    { name: "JavaScript", icon: Braces },
    { name: "React", icon: Atom },
    { name: "Next.js", icon: Gem },
    { name: "Node.js", icon: Server },
    { name: "Tailwind CSS", icon: Palette },
    { name: "TypeScript", icon: FileCode },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="flex flex-col items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition"
        >
          <skill.icon className="w-10 h-10 text-blue-500 mb-2" />
          <h3 className="text-lg font-semibold">{skill.name}</h3>
        </div>
      ))}
    </div>
  );
};

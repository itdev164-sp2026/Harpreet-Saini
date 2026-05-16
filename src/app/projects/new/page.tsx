import ProjectForm from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <ProjectForm />
    </div>
  );
}
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, Project } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createProject } from "@/app/actions";

export default function ProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Project>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "active",
    },
  });

  const onSubmit = async (data: Project) => {
    // Convert object to FormData for Server Action
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("status", data.status);

    const response = await createProject(formData);
    
    if (response && !response.success) {
      toast.error(response.error || "Failed to create project.");
    }
    // If successful, the Server Action redirects to /projects
    // No toast needed here because the page will change
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title Field */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter project title"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter project description"
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Status Field */}
      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          {...register("status")}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Create Project
      </Button>
    </form>
  );
}
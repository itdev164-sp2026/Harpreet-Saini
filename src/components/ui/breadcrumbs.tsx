import { usePathname } from "next/navigation";

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500">
      {segments.length === 0 ? (
        <span>Home</span>
      ) : (
        <span>
          Home / {segments.map((segment, index) => (
            <span key={index}>
              {segment}
              {index < segments.length - 1 && " / "}
            </span>
          ))}
        </span>
      )}
    </nav>
  );
};

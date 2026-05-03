# Prompts Documentation

## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**
> Create a Zod validation schema in src/lib/schemas.ts for a "Project" with title (min 3 chars), description (min 10 chars), and status enum ("active", "completed", "archived"). Export the schema and inferred type.

**What happened:**
> Agent created schemas.ts correctly with custom error messages and exported both the schema and Project type using z.infer.

### Prompt 2

**What I asked:**
> Using the Zod schema, create a form component with react-hook-form and shadcn components, a Server Action with server-side validation, a /projects/new page, and add a "New Project" button.

**What happened:**
> Agent created all 4 files. The form validates client-side with inline errors. The Server Action re-validates with safeParse() before inserting into Supabase. Layout was updated with Toaster component.

### Reflection

> The Schema-First approach with Zod creates a single source of truth for validation. Instead of scattering if/else checks across HTML, client JS, and API routes, I define rules once in a Zod schema. That same schema validates on the client (instant user feedback) AND on the server (security). This prevents junk data because server-side validation cannot be bypassed - even if someone disables JavaScript or sends raw POST requests, Zod rejects invalid data before it reaches Supabase. Compared to previous courses where I manually checked each field with if statements, Zod is declarative, type-safe, and guarantees consistency across the entire stack.
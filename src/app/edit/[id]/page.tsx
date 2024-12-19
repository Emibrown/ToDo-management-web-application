import Edit from "@/components/Edit";
import { FileSystemTodoRepository } from "@/infrastructure/repositories/FileSystemTodoRepository";
import { notFound } from "next/navigation";

export const revalidate = 0

export const metadata = {
    title: 'Edit Todo',
};

interface EditTodoPageProps {
    params: {
        id: string;
    };
}
    
export default async function EditPage({ params }: EditTodoPageProps) {
    const { id } = params;
    const repo = new FileSystemTodoRepository();

    const todo = await repo.getById(id);
  
    if (!todo) {
      notFound();
    }
  
    return (
        <Edit todo={todo} />
    );
}
  
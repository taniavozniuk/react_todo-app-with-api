import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  filteredTodos: Todo[];
  toggleTodo: (id: number) => void;
  handleDelete: (id: number) => void;
  loadingTodoId: number[];
  handleUpdate: (updatedTodo: Todo) => void;
  setError: (message: string) => void;
}

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  toggleTodo,
  handleDelete,
  loadingTodoId,
  handleUpdate,
  setError,
}) => {
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  // const handleEdit = (id: number) => {
  //   setEditTodoId(id);
  // };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          handleDelete={handleDelete}
          loadingTodoId={loadingTodoId}
          handleUpdate={handleUpdate}
          setError={setError}
          isEditing={editTodoId === todo.id}
          setEditTodoId={setEditTodoId}
        />
      ))}
    </section>
  );
};

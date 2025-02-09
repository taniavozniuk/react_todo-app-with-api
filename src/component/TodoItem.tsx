import React, { RefObject, useState } from 'react';
import classNames from 'classnames';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Props {
  todo: Todo;
  toggleTodo: (id: number) => void;
  handleDelete: (id: number) => void;
  loadingTodoId: number[];
  handleUpdate: (updatedTodo: Todo) => void;
  setError: (message: string) => void;
  isEditing: boolean;
  setEditTodoId: (id: number | null) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  handleDelete,
  loadingTodoId,
  handleUpdate,
  // setError,
  isEditing,
  setEditTodoId,
}) => {
  const isLoading = loadingTodoId.includes(todo.id);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const saveUpdateTitle = () => {
    const trimedTitle = editedTitle.trim();

    if (!trimedTitle) {
      handleDelete(todo.id);
    }

    if (trimedTitle) {
      handleUpdate({ ...todo, title: trimedTitle });
      // setError('');
      // setEditTodoId(null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (editedTitle.trim() !== todo.title) {
        saveUpdateTitle();
      } else {
        setEditTodoId(null);
      }
    } else if (event.key === 'Escape') {
      setEditTodoId(null);
      setEditedTitle(todo.title);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          disabled={isLoading}
        />
      </label>

      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__edit-input"
          value={editedTitle}
          placeholder="Empty todo will be deleted"
          onChange={e => setEditedTitle(e.target.value)}
          onBlur={saveUpdateTitle}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setEditTodoId(todo.id)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          disabled={isLoading}
          onClick={() => handleDelete(todo.id)}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        {isLoading && <div className="loader" />}
      </div>
    </div>
  );
};

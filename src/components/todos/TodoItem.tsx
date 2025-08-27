import React, { useState } from 'react';
import type { TodoType } from '../../types/TodoType';
import { useTodos } from '../../contexts/TodoContext';

type TodoItemProps = {
  todo: TodoType;
};

const TodoItem = ({ todo }: TodoItemProps): JSX.Element => {
  const { toggleTodo, deleteTodo, editTodo } = useTodos();

  // 수정중인지
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditTitle(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      // 타이틀 수정
      handleEditSave();
    }
    if (e.key === 'Escape') {
      // 취소하기
      handleEditCancel();
    }
  };
  const handleEditSave = (): void => {
    if (editTitle.trim()) {
      editTodo(todo.id, editTitle);
      setEditTitle(editTitle);
      setIsEdit(false);
    }
  };
  const handleEditCancel = (): void => {
    setEditTitle(todo.title);
    setIsEdit(false);
  };

  return (
    <li>
      {isEdit ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => handleChangeTitle(e)}
            onKeyDown={e => handleKeyDown(e)}
          />
          <div>
            <button onClick={handleEditSave}>저장</button>
            <button onClick={handleEditCancel}>취소</button>
          </div>
        </>
      ) : (
        <>
          <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
          <span>{todo.title}</span>
          <div>
            <button onClick={() => setIsEdit(true)}>수정</button>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;

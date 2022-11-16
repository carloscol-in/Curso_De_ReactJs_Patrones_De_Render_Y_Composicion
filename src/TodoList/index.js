import React from 'react';
import './TodoList.css'

function TodoList({
  children,
  error,
  loading,
  totalTodos,
  searchedTodos,
  searchValue,
  onError,
  onLoading,
  onEmptyTodos,
  onEmptySearchedResults,
  render
}) {
  const renderTodos = () => {
    if (searchedTodos.length > 0) {
      return searchedTodos.map(children || render)
    }

    if (totalTodos > 0) {
      return onEmptySearchedResults(searchValue)
    }

    if (!loading) return onEmptyTodos()
  }

  return (
    <section className="TodoList-container">
      {error && onError()}
      {loading && onLoading()}
      {renderTodos()}
    </section>
  );
}

export { TodoList };

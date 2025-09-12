// 5. Provider 생성
// interface InfiniteScrollProviderProps {
//   children?: React.ReactNode;
//   itemsPerPage: number;
// }
interface InfiniteScrollProviderProps extends PropsWithChildren {
  itemsPerPage?: number;
}

export const InfiniteScrollProvider: React.FC<InfiniteScrollProviderProps> = ({
  children,
  itemsPerPage = 5,
}) => {
  // ts 자리
  // useReducer 를 활용
  const [state, dispatch] = useReducer(reducer, initialState);

  // 초기 데이터 로드
  const loadingIntialTodos = async (): Promise<void> => {
    try {
      // 초기로딩 활성화
      dispatch({ type: InfiniteScrollActionType.SET_LOADING, payload: true });
      const result = await getTodosInfinite(0, itemsPerPage);

      console.log(
        '초기로드 된 데이터 ',
        result.todos.map(item => ({
          id: item.id,
          title: item.title,
          create_at: item.created_at,
          user_id: item.user_id,
        })),
      );

      dispatch({
        type: InfiniteScrollActionType.SET_TODOS,
        payload: { todos: result.todos, hasMore: result.hasMore, totalCount: result.totalCount },
      });
    } catch (error) {
      console.log(`초기 데이터 로드 실패 : ${error}`);
      dispatch({ type: InfiniteScrollActionType.SET_LOADING, payload: false });
    }
  };

  // 데이터 더 보기 기능
  const loadMoreTodos = async (): Promise<void> => {
    try {
      dispatch({ type: InfiniteScrollActionType.SET_LOADING_MORE, payload: true });
      const result = await getTodosInfinite(state.todos.length, itemsPerPage);
      console.log(
        '추가로 로드된 데이터 ',
        result.todos.map(item => ({
          id: item.id,
          title: item.title,
          create_at: item.created_at,
          user_id: item.user_id,
        })),
      );

      dispatch({
        type: InfiniteScrollActionType.APPEND_TODOS,
        payload: { todos: result.todos, hasMore: result.hasMore },
      });
    } catch (error) {
      console.log(`추가 데이터 로드 실패 : ${error}`);
      dispatch({ type: InfiniteScrollActionType.SET_LOADING_MORE, payload: false });
    }
  };

  // Todo 추가
  const addTodo = (todo: Todo): void => {
    dispatch({ type: InfiniteScrollActionType.ADD_TODO, payload: { todo } });
  };

  // Todo 토글
  const toggleTodo = (id: number): void => {
    dispatch({ type: InfiniteScrollActionType.TOGGLE_TODO, payload: { id } });
  };

  // Todo 삭제
  const deleteTodo = (id: number): void => {
    dispatch({ type: InfiniteScrollActionType.DELETE_TODO, payload: { id } });
  };

  // Todo 수정
  const editTodo = (id: number, title: string): void => {
    dispatch({ type: InfiniteScrollActionType.EDIT_TODO, payload: { id, title } });
  };

  // Context 상태 초기화
  const reset = (): void => {
    dispatch({ type: InfiniteScrollActionType.RESET });
  };

  const value: InfiniteScrollContextValue = {
    todos: state.todos,
    hasMore: state.hasMore,
    totalCount: state.totalCount,
    loading: state.loading,
    loadingMore: state.loadingMore,
    loadingIntialTodos,
    loadMoreTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    reset,
  };

  // tsx 자리
  return <InfiniteScrollContext.Provider value={value}>{children}</InfiniteScrollContext.Provider>;
};

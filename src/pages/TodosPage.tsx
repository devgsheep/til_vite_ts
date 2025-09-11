import { useEffect, useState } from 'react';
import Pagination from '../components/todos/Pagination';
import TodoList from '../components/todos/TodoList';
import TodoWrite from '../components/todos/TodoWrite';
import { useAuth } from '../contexts/AuthContext';
import { TodoProvider, useTodos } from '../contexts/TodoContext';
import { getProfile } from '../lib/profile';
import type { Profile } from '../types/TodoType';

// 컴포넌트를 여기에다 작성, 필요하면 이동하기
interface TodosContentProps {
  currentPage: number;
  itemsPerPage: number;
  handleChangePage: (page: number) => void;
}
const TodosContent = ({
  currentPage,
  itemsPerPage,
  handleChangePage,
}: TodosContentProps): JSX.Element => {
  const { totalCount, totalPages } = useTodos();
  return (
    <div>
      <div>
        <div>
          {/* 새글 등록시 1페이지로 이동 후 목록 새로고침 */}
          <TodoWrite handleChangePage={handleChangePage} />
        </div>
        <div>
          <TodoList />
        </div>
        <div>
          <Pagination
            totalCount={totalCount}
            totalPages={totalPages}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handleChangePage={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

function TodosPage() {
  const { user } = useAuth();
  // 페이지네이션 관련
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // 페이지 변경 핸들러
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const [profile, setProfile] = useState<Profile | null>(null);
  // 프로필 가져오기
  const loadProfile = async (): Promise<any> => {
    try {
      if (user?.id) {
        const userProfile = await getProfile(user.id);
        if (!userProfile) {
          alert('탈퇴한 회원입니다. 관리자님에게 요청하세요.');
        }
        setProfile(userProfile);
      }
    } catch (error) {
      console.log('프로필 가져오기 Error: ', error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);
  return (
    <div>
      <h2>{profile?.nickname} | 할일</h2>
      <TodoProvider currentPage={currentPage} limit={itemsPerPage}>
        <TodosContent
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          handleChangePage={handleChangePage}
        />
      </TodoProvider>
    </div>
  );
}

export default TodosPage;

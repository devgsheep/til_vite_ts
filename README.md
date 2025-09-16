# 스타일 정리

## 1. css 기본 코드

- /src/index.css 업데이트

## 2. App.tsx css정리

```tsx
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import TodosPage from './pages/TodosPage';
import AuthCallback from './pages/AuthCallback';
import Protected from './components/Protected';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import TodosInfinitePage from './pages/TodosInfinitePage';
import TodoListPage from './pages/TodoListPage';
import TodoWritePage from './pages/TodoWritePage';
import TodoEditPage from './pages/TodoEditPage';
import TodoDetailPage from './pages/TodoDetailPage';

const TopBar = () => {
  const { signOut, user } = useAuth();
  // 관리자인 경우 메뉴 추가로 출력하기
  // isAdmin은 true / false
  const isAdmin = user?.email === 'dev.gsheep@gmail.com';
  return (
    <nav className="nav">
      <Link to="/" className="nav-link">
        홈
      </Link>
      {user && (
        <Link to="/todos" className="nav-link">
          할일
        </Link>
      )}
      {user && (
        <Link to="/todos-infinite" className="nav-link">
          무한스크롤 할일
        </Link>
      )}
      {!user && (
        <Link to="/signup" className="nav-link">
          회원가입
        </Link>
      )}
      {!user && (
        <Link to="/signin" className="nav-link">
          로그인
        </Link>
      )}
      {user && (
        <Link to="/profile" className="nav-link">
          프로필
        </Link>
      )}
      {user && (
        <button onClick={signOut} className="btn btn-secondary btn-sm">
          로그아웃
        </button>
      )}

      {isAdmin && (
        <Link to="/admin" className="nav-link">
          관리자
        </Link>
      )}
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">😎 Todo Service</h1>
        </div>
        <Router>
          <TopBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/todos"
              element={
                <Protected>
                  <TodoListPage />
                </Protected>
              }
            />
            <Route
              path="/todos-infinite"
              element={
                <Protected>
                  <TodosInfinitePage />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <ProfilePage />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <Protected>
                  <AdminPage />
                </Protected>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
```

## 3. /src/pages/HomePage.tsx 정리

```tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">🏡 홈</h2>
        <p className="page-subtitle">
          {user ? `${user.email}님, 환영합니다.` : 'Todo 서비스에 오신 것을 환영합니다.'}
        </p>
      </div>
      {user ? (
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>할일 관리</h3>
          <p style={{ marginBottom: 'var(--space-6)', color: 'var(--gray-600)' }}>
            효율적으로 할 일을 관리하고 생산성을 높여보세요.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to={'/todos'} className="btn btn-primary btn-lg">
              할 일 관리하기
            </Link>
            <Link to={'/todos-infinite'} className="btn btn-success btn-lg">
              무한 스크롤로 보기
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>🚩 시작하기</h3>
          <p style={{ marginBottom: 'var(--space-6)', color: 'var(--gray-600)' }}>
            계정을 만들고 할 일 관리를 시작해보세요.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to={'/signin'} className="btn btn-primary btn-lg">
              로그인
            </Link>
            <Link to={'/signup'} className="btn btn-success btn-lg">
              회원가입
            </Link>
          </div>
        </div>
      )}
      {/* 기능 소개 섹션 */}
      <div className="card">
        <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>🔎 주요 기능</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-4',
          }}
        >
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>📄</div>
            <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-800)' }}>할 일 관리</h4>
            <p style={{ color: 'var(--gray-800)', fontSize: '14px' }}>
              할 일을 추가, 수정, 삭제하고 완료 상태를 관리할 수 있습니다.
            </p>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>🧾</div>
            <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-800)' }}>
              무한 스크롤
            </h4>
            <p style={{ color: 'var(--gray-800)', fontSize: '14px' }}>
              많은 할 일을 효율적으로 탐색할 수 있는 무한 스크롤 기능을 제공합니다.
            </p>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>👷</div>
            <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-800)' }}>
              프로필 관리
            </h4>
            <p style={{ color: 'var(--gray-800)', fontSize: '14px' }}>
              개인 정보와 아바타를 관리하고 계정을 안전하게 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      {/* 추가 기능 섹션 */}
      {user && (
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>🔎 주요 기능</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-4',
            }}
          >
            <Link
              to={'/profile'}
              className="btn btn-secondary"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              🔑 프로필 관리
            </Link>
            <Link
              to={'/profile'}
              className="btn btn-secondary"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              📆 캘린더
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
```

## 4. /src/pages/SignUpPage.tsx 정리

```tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { preventDefault } from '@fullcalendar/core/internal';
import { supabase } from '../lib/supabase';
import { createProfile } from '../lib/profile';
import type { ProfileInsert } from '../types/TodoType';

function SignUpPage() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  // 추가 정보 (닉네임)
  const [nickName, setNickName] = useState<string>('');

  const [msg, setMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 웹 브라우저 갱신 막기
    e.preventDefault();

    if (!email.trim()) {
      alert('이메일을 입력하세요.');
      return;
    }

    if (!pw.trim()) {
      alert('비밀번호를 입력하세요.');
      return;
    }
    if (pw.length < 6) {
      alert('비밀번호는 최소 6자 입니다.');
      return;
    }

    if (!nickName.trim()) {
      alert('닉네임을 입력하세요.');
      return;
    }

    // 회원가입 및 추가정보 입력하기
    const { error, data } = await supabase.auth.signUp({
      email,
      password: pw,
      options: {
        // 회원 가입 후 이메일로 인증 확인시 리다이렉트 될 URL
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        // 잠시 추가정보를 보관합니다.
        // supabase 에서 auth에는 추가적인 정보를 저장하는 객체가 존재
        // 공식적인 명칭이 metadata 라고 합니다.
        // 이메일 인증 후에 프로필 생성시에 사용하려고 보관
        data: { nickName: nickName },
      },
    });

    if (error) {
      setMsg(`회원가입 오류 : ${error}`);
    } else {
      setMsg(
        '회원가입이 성공했습니다. 이메일 인증 링크를 확인해주세요. 인증 완료 후 프로필이 자동으로 생성됩니다.',
      );
      //  // 회원가입 성공했으므로 profiles도 채워준다.
      // if (data?.user?.id) {
      //   // 프로필을 추가한다.
      //   const newUser: ProfileInsert = { id: data.user.id, nickname: nickName };
      //   const result = await createProfile(newUser);
      //   if (result) {
      //     // 프로필 추가가 성공한 경우
      //     setMsg(`회원가입이 성공했습니다. 이메일 인증 링크를 확인해주세요.`);
      //   } else {
      //     // 프로필 추가가 실패한 경우
      //     setMsg(`회원가입은 성공, 하지만, 프로필 생성 실패했습니다.`);
      //   }
      // } else {
      //   setMsg(`회원가입이 성공했습니다. 이메일 인증 링크를 확인해주세요.`);
      // }
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">회원가입</h2>
        <p className="page-subtitle">새 계정을 만들어 보세요.</p>
      </div>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요."
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="비밀번호를 입력하세요."
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">닉네임</label>
            <input
              type="text"
              value={nickName}
              onChange={e => setNickName(e.target.value)}
              placeholder="닉네임을 입력하세요."
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-lg" style={{ width: '100%' }}>
            회원가입
          </button>
        </form>
        {/* 메시지 출력 */}
        {msg && (
          <p
            style={{
              marginTop: 'var(--space-4)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: msg.includes('성공') ? 'var(--success-50)' : '#fef2f2',
              color: msg.includes('성공') ? 'var(--success-600)' : '#dc2626',
              border: `1px solid ${msg.includes('성공') ? 'var(--success-600)' : '#dc2626'}`,
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
```

## 5. /src/pages/SignInPage.tsx 정리

```tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await signIn(email, pw);
    if (error) {
      setMsg(`로그인 오류 : ${error}`);
    } else {
      setMsg('로그인 성공');
      navigate('/todos');
    }
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">로그인 페이지</h2>
        <p className="page-subtitle">계정에 로그인하시오.</p>
      </div>

      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn btn-success btn-lg" style={{ width: '100%' }}>
            로그인
          </button>
        </form>
        {/* 메시지 출력 */}
        {msg && (
          <p
            style={{
              marginTop: 'var(--space-4)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: msg.includes('성공') ? 'var(--success-50)' : '#fef2f2',
              color: msg.includes('성공') ? 'var(--success-600)' : '#dc2626',
              border: `1px solid ${msg.includes('성공') ? 'var(--success-600)' : '#dc2626'}`,
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignInPage;
```

## 6. /src/pages/TodosPage.tsx 정리

```tsx
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
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
      <div className="page-header">
        <h2 className="page-title">📝 할일 관리</h2>
        {profile?.nickname && <p className="page-subtitle">{profile?.nickname}님의 Todo관리</p>}
      </div>

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
```

## 7. /src/pages/TodosInfinitePage.tsx 정리

```tsx
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuth } from '../contexts/AuthContext';
import { InfiniteScrollProvider, useInfiniteScroll } from '../contexts/InfiniteScrollContext';
import { getProfile } from '../lib/profile';
import type { Profile } from '../types/TodoType';
// 용서하세요. 입력창 컴포넌트
const InfiniteTodoWrite = () => {
  const { addTodo, loadingInitialTodos } = useInfiniteScroll();

  const [title, setTitle] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };
  const handleSave = async (): Promise<void> => {
    if (!title.trim()) {
      alert('제목을 입력하세요');
      return;
    }
    try {
      // 새할일 추가
      await addTodo(title);
      // 다시 데이터를 로딩한다.
      await loadingInitialTodos();
      setTitle('');
    } catch (error) {
      console.log('등록에 오류가 발생 : ', error);
      alert(`등록에 오류가 발생 : ${error}`);
    }
  };
  return (
    <div className="card">
      <h3
        style={{
          margin: '0 0 15px 0',
          color: 'var(--gray-900)',
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        ✏️ 할일 작성
      </h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={title}
          onChange={e => handleChange(e)}
          onKeyDown={e => handleKeyDown(e)}
          placeholder="할일을 입력하세요."
          className="form-input"
          style={{ flex: 1 }}
        />
        <button onClick={handleSave} className="btn btn-primary">
          등록
        </button>
      </div>
    </div>
  );
};

// 용서하세요. 목록 컴포넌트
const InfiniteTodoList = () => {
  const {
    loading,
    loadingMore,
    hasMore,
    loadMoreTodos,
    todos,
    totalCount,
    editTodo,
    toggleTodo,
    deleteTodo,
    loadingInitialTodos,
  } = useInfiniteScroll();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  // 사용자 프로필 가져오기
  useEffect(() => {
    const loadProifle = async () => {
      if (user?.id) {
        const userProfile = await getProfile(user.id);
        setProfile(userProfile);
      }
    };
    loadProifle();
  }, [user?.id]);

  // 번호 계산 함수 (최신글이 높은 번호가지도록 )
  const getGlobalIndex = (index: number) => {
    // 무한스크롤시에 계산 해서 번호 출력
    const globalIndex = totalCount - index;
    // console.log(
    //   `번호 계산 - index : ${index}, totalCount : ${totalCount}, globalIndex: ${globalIndex}`,
    // );
    return globalIndex;
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '날짜 없음';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 수정 상태 관리
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  // 개별 액션 로딩 상태 관리
  const [actionLoading, setActionLoading] = useState<{
    [key: number]: {
      edit: boolean;
      toggle: boolean;
      delete: boolean;
    };
  }>({});

  // 수정 시작
  const handleEditStart = (todo: any) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleEditSave = async (id: number) => {
    if (!editingTitle.trim()) {
      alert('제목을 입력하세요.');
      return;
    }

    try {
      // 수정 진행 중
      setActionLoading(prev => ({
        ...prev,
        [id]: { ...prev[id], edit: true },
      }));

      await editTodo(id, editingTitle);
      setEditingId(null);
      setEditingTitle('');
    } catch (error) {
      console.log('수정 실패:', error);
      alert('수정에 실패했습니다.');
    } finally {
      // 수정 완료
      setActionLoading(prev => ({
        ...prev,
        [id]: { ...prev[id], edit: false },
      }));
    }
  };

  const handleToggle = async (id: number) => {
    try {
      // 토글 진행 중
      setActionLoading(prev => ({
        ...prev,
        [id]: { ...prev[id], toggle: true },
      }));

      await toggleTodo(id);
    } catch (error) {
      console.log('토글 실패:', error);
      alert('상태 변경에 실패하였습니다.');
    } finally {
      // 토글 완료
      setActionLoading(prev => ({
        ...prev,
        [id]: { ...prev[id], toggle: false },
      }));
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        // 삭제 진행 중
        setActionLoading(prev => ({
          ...prev,
          [id]: { ...prev[id], delete: true },
        }));

        await deleteTodo(id);
        // 삭제 이후에 번호를 갱신해서 정리해줌
        await loadingInitialTodos();
      } catch (error) {
        console.log('삭제 실패:', error);
        alert('삭제에 실패하였습니다.');
      } finally {
        // 삭제 완료
        setActionLoading(prev => ({
          ...prev,
          [id]: { ...prev[id], delete: false },
        }));
      }
    }
  };

  if (loading) {
    return <div className="loading-container">데이터 로딩중 ...</div>;
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid var(--gray-200)',
          backgroundColor: 'var(--gray-50)',
        }}
      >
        <h3
          style={{
            margin: '0',
            color: 'var(--gray-900)',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          📋 TodoList(무한 스크롤)
          {profile?.nickname && (
            <span
              style={{
                marginLeft: '8px',
                fontSize: '14px',
                color: 'var(--gray-600)',
                fontWeight: '400',
              }}
            >
              {profile.nickname}님의 할일
            </span>
          )}
        </h3>
      </div>

      {todos.length === 0 ? (
        <div className="loading-container">등록된 할일이 없습니다.</div>
      ) : (
        // 무한 스크롤 라이브러리 적용
        <div style={{ height: '500px', overflow: 'auto' }}>
          <InfiniteScroll
            dataLength={todos.length}
            next={loadMoreTodos}
            hasMore={hasMore}
            height={500}
            loader={<div className="loading-container">데이터를 불러오는 중...</div>}
            endMessage={
              <div
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: 'var(--success-500)',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                모든 데이터를 불러왔습니다.
              </div>
            }
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {todos.map((item, index) => {
                const itemLoading = actionLoading[item.id] || {
                  edit: false,
                  toggle: false,
                  delete: false,
                };

                return (
                  <li
                    key={item.id}
                    className={`todo-item ${item.completed ? 'completed' : ''}`}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'white' : 'var(--gray-50)',
                      opacity: itemLoading.edit || itemLoading.delete ? 0.7 : 1,
                    }}
                  >
                    {/* 번호표시 */}
                    <span className="todo-number">{getGlobalIndex(index)}.</span>

                    {editingId === item.id ? (
                      <>
                        {/* 수정 모드 */}
                        <div className="todo-content">
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={e => setEditingTitle(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                handleEditSave(item.id);
                              } else if (e.key === 'Escape') {
                                handleEditCancel();
                              }
                            }}
                            className="form-input"
                            style={{
                              fontSize: '14px',
                              padding: 'var(--space-2)',
                              width: '100%',
                              marginBottom: '4px',
                            }}
                            disabled={itemLoading.edit}
                            autoFocus
                          />
                          <span className="todo-date">작성일: {formatDate(item.created_at)}</span>
                        </div>

                        <div className="todo-actions">
                          <button
                            onClick={() => handleEditSave(item.id)}
                            className="btn btn-success btn-sm"
                            disabled={itemLoading.edit}
                          >
                            {itemLoading.edit ? '⏳ 저장 중...' : '✅ 저장'}
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="btn btn-secondary btn-sm"
                            disabled={itemLoading.edit}
                          >
                            ❌ 취소
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* 일반 모드 */}
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleToggle(item.id)}
                          disabled={itemLoading.toggle}
                          style={{
                            transform: 'scale(1.2)',
                            cursor: itemLoading.toggle ? 'not-allowed' : 'pointer',
                            opacity: itemLoading.toggle ? 0.6 : 1,
                          }}
                        />

                        <div className="todo-content">
                          <span className={`todo-title ${item.completed ? 'completed' : ''}`}>
                            {item.title}
                          </span>
                          <span className="todo-date">작성일: {formatDate(item.created_at)}</span>
                        </div>

                        <div className="todo-actions">
                          <button
                            onClick={() => handleEditStart(item)}
                            className="btn btn-sm"
                            style={{
                              backgroundColor: '#ffc107',
                              color: '#212529',
                            }}
                            disabled={itemLoading.toggle || itemLoading.delete}
                          >
                            ✏️ 수정
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-danger btn-sm"
                            disabled={itemLoading.toggle || itemLoading.delete}
                          >
                            {itemLoading.delete ? '⏳ 삭제 중...' : '🗑️ 삭제'}
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

function TodosInfinitePage() {
  return (
    <InfiniteScrollProvider itemsPerPage={10}>
      <div>
        <div className="page-header">
          <h2 className="page-title">🔄 무한 스크롤 Todo 목록</h2>
          <p className="page-subtitle">스크롤하여 더 많은 할일을 확인하세요</p>
        </div>

        <div className="container">
          <div style={{ marginBottom: '20px' }}>
            <InfiniteTodoWrite />
          </div>

          <div>
            <InfiniteTodoList />
          </div>
        </div>
      </div>
    </InfiniteScrollProvider>
  );
}

export default TodosInfinitePage;
```

## 8. /src/pages/ProfilePage.tsx 정리

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProfile, removeAvatar, updateProfile, uploadAvatar } from '../lib/profile';
import type { Profile, ProfileUpdate } from '../types/TodoType';
import Loading from '../components/Loading';

/**
 * 사용자 프로필 페이지
 * - 기본 정보 표시
 * - 정보 수정
 * - 회원탈퇴 기능 : 확인을 거치고 진행하도록
 */
function ProfilePage() {
  // 회원 기본 정보
  const { user, deleteAccount } = useAuth();
  // 데이터 가져오는 동안의 로딩
  const [loading, setLoading] = useState<boolean>(true);
  // 사용자 프로필
  const [profileData, setProfileData] = useState<Profile | null>(null);
  // 에러 메시지
  const [error, setError] = useState<string>('');
  // 회원 정보 수정
  const [edit, setEdit] = useState<boolean>(false);
  // 회원 닉네임 보관
  const [nickName, setNickName] = useState<string>('');

  // 사용자 아바타 이미지를 위한 상태관리
  // 이미지 업로드 상태 표현
  const [uploading, setUploading] = useState<boolean>(false);
  // 미리보기 이미지 url (문자열)
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // 실제 파일 (바이너리)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 사용자가 새로운 이미지 선택시 즉, 편집 중인 경우 원본 URL 보관용 문자열
  const [originalAvatarUrl, setOriginalAvatarUrl] = useState<string | null>(null);
  // 이미지 제거 요청 상태(그러나, 실제 file 제거는 수정확인 버튼 눌렀을 때 처리)
  const [imageRemovalRequest, setImageRemovalRequest] = useState<boolean>(false);
  // input type = "file" 태그 참조
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 사용자 프로필 정보 가져오기
  const loadProfile = async () => {
    if (!user?.id) {
      // 사용자의 id가 없으면 중지
      setError('사용자 정보를 찾을 수 없습니다.');
      setLoading(false);
      return;
    }
    try {
      // 사용자 정보 가져오기 (null 일수도 있다.)
      const tempData = await getProfile(user?.id);
      if (!tempData) {
        // null 일때
        setError('사용자 프로필 정보를 찾을 수 없습니다.');
        return;
      }
      // 사용자 정보가 있다.
      setNickName(tempData.nickname || '');
      setProfileData(tempData);
    } catch (err) {
      console.log(err);
      setError('사용자 프로필 호출 오류!!!');
    } finally {
      setLoading(false);
    }
  };

  // 프로필 데이터 업데이트
  const saveProfile = async () => {
    if (!user) {
      return;
    }
    if (!profileData) {
      return;
    }
    // 여러개가 업로드 되면 안됨
    setLoading(true);

    try {
      let imgUrl = originalAvatarUrl; // 원본 이미지 URL
      // 아바타이미지 제거라면
      if (imageRemovalRequest) {
        // storage에 실제 이미지를 제거함.
        const success = await removeAvatar(user.id);
        if (success) {
          imgUrl = null;
        } else {
          alert('이미지 제거에 실패했습니다. 기존 이미지가 유지됩니다.');
        }
      } else if (selectedFile) {
        // 새로운 이미지가 업로드 된다면
        const uploadedImageUrl = await uploadAvatar(selectedFile, user.id);
        if (uploadedImageUrl) {
          // 실제로 업로드 완료 후 전달받은 URL 문자열을 보관함
          // profiles 테이블에 avatar_url 에 넣어줄 문자열
          imgUrl = uploadedImageUrl;
        } else {
          alert('이미지 업로드에 실패했습니다. 닉네임만 저장합니다.');
        }
      }

      const tempUpdateData: ProfileUpdate = { nickname: nickName, avatar_url: imgUrl };

      const success = await updateProfile(tempUpdateData, user.id);
      if (!success) {
        console.log('프로필 업데이트에 실패하였습니다');
        return;
      }
      // 업데이트 성공시 초기화 진행
      setPreviewImage(null);
      setSelectedFile(null);
      setImageRemovalRequest(false);
      setOriginalAvatarUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      await loadProfile();
      alert('프로필이 성공적으로 업데이트 되었습니다.');
    } catch (err) {
      console.log('프로필 업데이트 오류', err);
    } finally {
      setEdit(false);
    }
  };

  // 회원 탈퇴
  const handleDeleteUser = () => {
    const message: string = '😥 계정을 완전히 삭제하시겠습니까? \n\n 복구가 불가능합니다.';
    let isConfirm = false;
    isConfirm = confirm(message);

    if (isConfirm) {
      deleteAccount();
    }
  };

  // 이미지 선택 처리(미리보기)
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    // 파일 형식 검증
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert(`지원하지 않는 파일 형식입니다. 허용 형식: ${allowedTypes.join(', ')}`);
      return;
    }

    // 파일 크기 검증 (5MB 제한)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert(`파일 크기가 너무 큽니다. 최대 5MB까지 업로드 가능합니다.`);
      return;
    }

    // 미리보기 생성 (파일을 글자로 변환한 것...)
    const reader = new FileReader();
    reader.onload = e => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setSelectedFile(file);
    // 새 이미지 선택 시 이미지 제거 요청 상태 초기화
    setImageRemovalRequest(false);
  };

  // 이미지 파일 선택 취소
  const handleCancelUpload = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 이미지 제거 처리
  const handleRemoveImage = () => {
    const ok = confirm('프로필 이미지를 제거하시겠습니까?');
    if (!ok) {
      return;
    }
    // 즉시 제거하지 않습니다.
    // 제거하라는 상태만 별도로 관리
    setImageRemovalRequest(true);
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return <Loading message="프로필 정보를 불러오는 중..." size="lg" />;
  }

  // error 메세지 출력하기
  if (error) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2 className="page-title">⚠ 프로필 오류</h2>
        <div style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-4)' }}>🚫{error}</div>
        <button onClick={loadProfile} className="btn btn-primary">
          재시도
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">👩‍💼 회원정보</h2>
        <p className="page-subtitle">개인 정보를 확인하고 수정하세요.</p>
      </div>
      {/* 사용자 기본 정보 섹션 */}
      <div className="card">
        <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>기본 정보</h3>
        <div className="form-group">
          <label className="form-label">이메일</label>
          <div
            style={{
              padding: 'var(--space-3)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--gray-700)',
            }}
          >
            {user?.email}
          </div>
        </div>
        <div className="form-group">
          <label>가입일</label>
          <div
            style={{
              padding: 'var(--space-3)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--gray-700)',
            }}
          >
            {user?.created_at && new Date(user.created_at).toLocaleString()}
          </div>
        </div>
      </div>
      {/* 사용자 추가정보 */}
      <div className="card">
        <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>
          👩‍💼 사용자 추가 정보
        </h3>
        <div className="form-group">
          <label className="form-label">아이디</label>
          <div
            style={{
              padding: 'var(--space-3)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--gray-700)',
            }}
          >
            {profileData?.id}
          </div>
        </div>

        {edit ? (
          <>
            <div className="form-group">
              <label className="form-label">닉네임</label>
              <input
                type="text"
                value={nickName}
                onChange={e => setNickName(e.target.value)}
                className="form-input"
                placeholder="닉네임을 입력하세요."
              />
            </div>
            <div className="form-group">
              <label className="form-label">아바타 편집</label>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                {previewImage ? (
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={previewImage}
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '3px solid var(--paimary-500)',
                        boxShadow: 'var(--shadow-md)',
                      }}
                    />
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--primary-600)',
                        marginTop: 'var(--space-2)',
                        fontWeight: 'bold',
                      }}
                    >
                      새로운 이미지 미리보기
                    </p>
                  </div>
                ) : imageRemovalRequest ? (
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: '120px',
                        height: '120px',
                        backgroundColor: 'var(--gray-50)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '3px dashed #dc3545',
                        margin: '0 auto',
                      }}
                    >
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: '11px',
                          color: '#dc3545',
                          fontWeight: 'bold',
                        }}
                      >
                        이미지 제거됨
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#dc3545',
                        marginTop: 'var(--space-2)',
                        fontWeight: 'bold',
                      }}
                    >
                      이미지가 제거되었습니다
                    </p>
                  </div>
                ) : originalAvatarUrl ? (
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={originalAvatarUrl}
                      alt="현재 아바타"
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '3px solid var(--success-500)',
                        boxShadow: 'var(--shadow-md)',
                      }}
                    />
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--success-600)',
                        marginTop: 'var(--space-2)',
                        fontWeight: 'bold',
                      }}
                    >
                      현재 아바타
                    </p>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: '120px',
                        height: '120px',
                        backgroundColor: 'var(--gray-50)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '3px dashed var(--gray-400)',
                        margin: '0 auto',
                      }}
                    >
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: '11px',
                          color: 'var(--gray-500)',
                          fontWeight: 'bold',
                        }}
                      >
                        이미지 없음
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--gray-500)',
                        marginTop: 'var(--space-2)',
                      }}
                    >
                      아바타 이미지를 설정해보세요
                    </p>
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageSelect}
                />
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--space-3)',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    <button
                      className={`btn ${uploading ? 'btn-secondary' : 'btn-primary'}`}
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading ? '업로드 중...' : '이미지 선택'}
                    </button>

                    {previewImage && (
                      <button
                        className={`btn ${uploading ? 'btn-secondary' : 'btn-primary'}`}
                        disabled={uploading}
                        onClick={handleCancelUpload}
                      >
                        취소
                      </button>
                    )}

                    {!previewImage && !imageRemovalRequest && originalAvatarUrl && (
                      <button
                        className="btn"
                        style={{ backgroundColor: uploading ? 'var(--gray-300)' : '#dc3545' }}
                        onClick={handleRemoveImage}
                      >
                        {uploading ? '처리중...' : '이미지 제거'}
                      </button>
                    )}

                    {imageRemovalRequest && (
                      <button
                        disabled={uploading}
                        className={`btn ${uploading ? 'btn-secondary' : 'btn-success'}`}
                        onClick={() => {
                          setImageRemovalRequest(false);
                        }}
                      >
                        제거 취소
                      </button>
                    )}
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--gray-500)',
                    marginTop: 'var(--space-2)',
                    textAlign: 'center',
                  }}
                >
                  지원 형식 : JPEG, PNG, GIF (최대 5MB)
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="form-label">닉네임</label>
              <div
                style={{
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--gray-50)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--gray-700)',
                }}
              >
                {profileData?.nickname || '닉네임이 설정되지 않았습니다'}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">🖼️ 아바타</label>
              <div style={{ textAlign: 'center' }}>
                {profileData?.avatar_url ? (
                  <img
                    src={profileData.avatar_url}
                    alt="프로필 이미지"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      border: '3px solid var(--success-500)',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      backgroundColor: 'var(--gray-50)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px dashed var(--gray-400)',
                      margin: '0 auto',
                    }}
                  >
                    <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 'bold' }}>
                      이미지 없음
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="form-group">
          <label className="form-label">가입일</label>
          <div
            style={{
              padding: 'var(--space-3)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--gray-700)',
            }}
          >
            {profileData?.created_at && new Date(profileData.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {edit ? (
          <>
            <button
              className={`btn btn-lg ${uploading ? 'btn-secondary' : 'btn-primary'}`}
              disabled={uploading}
              onClick={saveProfile}
            >
              {uploading ? '저장 중...' : '수정 확인'}
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => {
                setEdit(false);
                setNickName(profileData?.nickname || '');
                setPreviewImage(null);
                setSelectedFile(null);
                setImageRemovalRequest(false);
                setOriginalAvatarUrl(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              수정취소
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                setEdit(true);
                // 편집 시작 시 원본 이미지 URL 저장
                setOriginalAvatarUrl(profileData?.avatar_url || null);
                setImageRemovalRequest(false);
              }}
            >
              정보수정
            </button>
            <button className="btn btn-danger btn-lg" onClick={handleDeleteUser}>
              회원탈퇴
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
```

# 라우터 정리(할일을 별도 페이지로)

## 1. 할일 목록 페이지

- /src/pages/TodoListPage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TodoProvider, useTodos } from '../contexts/TodoContext';
import { getProfile } from '../lib/profile';
import type { Profile, Todo } from '../types/TodoType';
import TodoWrite from '../components/todos/TodoWrite';
import TodoList from '../components/todos/TodoList';
import Pagination from '../components/Pagination';
import TodoWriteBox from '../components/todos/TodoWriteBox';
import { Link } from 'react-router-dom';

// 컴포넌트 생성
type TodoItemProps = {
  todo: Todo;
  index: number;
};
const TodoItemBox = ({ todo, index }: TodoItemProps) => {
  const { toggleTodo, deleteTodo, editTodo, currentPage, itemsPerPage, totalCount } = useTodos();

  // 순서번호 매기기
  const globalIndex = totalCount - ((currentPage - 1) * itemsPerPage + index);

  // 작성 날짜 포맷팅
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '날짜 없음';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} `}>
      {/* 출력 번호 */}
      <span className="todo-number">{globalIndex}</span>
      <div className="todo-content">
        <Link
          to={`/todos/detail/${todo.id}`}
          className={`todo-title ${todo.completed ? 'completed' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          {todo.title}
        </Link>
        <span className="todo-date">작성일: {formatDate(todo.created_at)}</span>
      </div>
    </li>
  );
};

const TodoListBox = () => {
  const { user } = useAuth();
  // 전체 할일 목록 가져오기
  const { todos } = useTodos();
  return (
    <ul className="todo-list">
      {todos.map((item, index) => (
        <TodoItemBox key={item.id} todo={item} index={index} />
      ))}
    </ul>
  );
};

// 컴포넌트를 여기에다 작성, 필요하면 이동하기
interface TodosContentProps {
  profile: Profile | null;
  currentPage: number;
  itemsPerPage: number;
  handleChangePage: (page: number) => void;
}
const TodosContent = ({
  profile,
  currentPage,
  itemsPerPage,
  handleChangePage,
}: TodosContentProps): JSX.Element => {
  const { totalCount, totalPages } = useTodos();
  return (
    <div>
      <div>
        {/* 새글 등록시 1페이지로 이동 후 목록 새로고침 */}
        <TodoWriteBox profile={profile} />
      </div>
      <div>
        <TodoListBox />
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
  );
};

function TodoListPage() {
  // 1. 사용자 정보 가져오기
  const { user } = useAuth();

  // 3. 페이지네이션 관련 가져오기
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 2. 사용자 프로필 가져오기
  const [profile, setProfile] = useState<Profile | null>(null);
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

  // 페이지 변경 핸들러
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">📝 할일 관리</h2>
        {profile?.nickname && <p className="page-subtitle">{profile?.nickname}님의 Todo관리</p>}
      </div>

      <TodoProvider currentPage={currentPage} limit={itemsPerPage}>
        <TodosContent
          profile={profile}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          handleChangePage={handleChangePage}
        />
      </TodoProvider>
    </div>
  );
}

export default TodoListPage;
```

- /src/components/todos/TodoWriteBox.tsx 생성

```tsx
import { Link } from 'react-router-dom';
import type { Profile } from '../../types/TodoType';

interface TodoWriteBoxProps {
  profile: Profile | null;
}

const TodoWriteBox = ({ profile }: TodoWriteBoxProps) => {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>
          ✏️ 새 할일 작성
          {profile?.nickname && (
            <span
              style={{ marginLeft: 'var(--space-2)', fontSize: '16px', color: 'var(--gray-600)' }}
            >
              - {profile.nickname}
            </span>
          )}
        </h2>
        <Link to={'/todos/write'} className="btn btn-primary" style={{ color: '#fff' }}>
          작성하기
        </Link>
      </div>
    </div>
  );
};

export default TodoWriteBox;
```

## 2. 할일 내용 및 제목 작성 페이지

- /src/pages/TodoWritePage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { Profile, TodoInsert } from '../types/TodoType';
import { getProfile } from '../lib/profile';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '../services/todoService';

function TodoWritePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 사용자 입력 내용
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // 데이터가 추가 되고 있는지의 상태
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCancel = () => {
    // 사용자가 실수로 취소를 할 수 있으므로 이에 대비
    if (title.trim() || content.trim()) {
      if (window.confirm('작성중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
        // 목록으로
        navigate('/todos');
      }
    } else {
      // 목록으로
      navigate('/todos');
    }
  };
  const handleSave = async () => {
    // 제목은 필수 입력
    if (!title.trim()) {
      alert('제목은 필수 입니다.');
      return;
    }
    try {
      setSaving(true);
      const newTodo: TodoInsert = { title, user_id: user!.id, content };
      const result = await createTodo(newTodo);
      if (result) {
        alert('할일이 성공적으로 등록되었습니다.');
        navigate('/todos');
      } else {
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.log('데이터 추가에 실패하였습니다.', error);
      alert(`데이터 추가에 실패하였습니다. ${error}`);
    } finally {
      setSaving(false);
    }
  };

  // 사용자 정보
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const userProfile = await getProfile(user.id);
        setProfile(userProfile);
      }
    };
    loadProfile();
  }, [user?.id]);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">✏️ 새 할일 작성</h2>
        {profile?.nickname && <p className="page-subtitle">{profile.nickname}님의 새로운 할 일</p>}
      </div>
      {/* 입력창 */}
      <div className="card">
        <div className="form-group">
          <label className="form-label">제목</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={e => handleTitleChange(e)}
            placeholder="할일을 입력해 주세요"
            disabled={saving}
          />
        </div>
        <div className="form-group">
          <label className="form-label">상세 내용</label>
          <textarea
            className="form-input"
            value={content}
            onChange={e => handleContentChange(e)}
            placeholder="상세 내용을 입력해주세요 (선택사항)"
            rows={6}
            disabled={saving}
          />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? '⏳ 등록 중...' : '등록'}
          </button>
          <button className="btn btn-secondary" onClick={handleCancel} disabled={saving}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoWritePage;
```

## 3. 할일 상세 페이지

- /src/pages/TodoDetailPage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import type { Profile, Todo } from '../types/TodoType';
import { getProfile } from '../lib/profile';
import { deleteTodo, getTodoById, getTodos } from '../services/todoService';
import Loading from '../components/Loading';

function TodoDetailPage({}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  // param 값을 읽기
  const { id } = useParams<{ id: string }>();
  // id를 이용해서 Todo 내용 가져오기
  const [todo, setTodo] = useState<Todo | null>(null);
  // 상세 페이지에 오면 todo 내용을 호출해야 하므로 true 세팅
  const [loading, setLoading] = useState(true);
  // 현재 삭제 중인지 처리
  const [actionLoading, setActionLoading] = useState<{
    delete: boolean;
  }>({ delete: false });

  useEffect(() => {
    const loadTodo = async () => {
      if (!id) {
        navigate('/todos');
        return;
      }
      try {
        setLoading(true);
        const todoData = await getTodoById(parseInt(id));
        if (!todoData) {
          alert('해당 할일을 찾을 수 없습니다.');
          navigate('/todos');
          return;
        }

        // 본인의 Todo가 아니면
        if (todoData.user_id !== user?.id) {
          alert('조회 권한이 없습니다.');
          navigate('/todos');
          return;
        }

        setTodo(todoData);
      } catch (error) {
        console.log('Todo 로드 실패 : ', error);
        alert('할 일을 불러오는데 실패했습니다.');
        navigate('/todos');
      } finally {
        setLoading(false);
      }
    };
    loadTodo();
  }, [id, user?.id, navigate]);

  // 사용자 정보
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const userProfile = await getProfile(user.id);
        setProfile(userProfile);
      }
    };
    loadProfile();
  }, [user?.id]);

  const handleDelete = async () => {
    if (!todo) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      setActionLoading({ ...actionLoading, delete: true });
      await deleteTodo(todo.id);
      alert('할일이 삭제되었습니다.');
      navigate('/todos');
    } catch (error) {
    } finally {
      setActionLoading({ ...actionLoading, delete: false });
    }
  };

  if (loading) {
    return <Loading message="할 일 정보를 불러오는 중..." size="lg" />;
  }
  if (!todo) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h3>할 일을 찾을 수 없습니다.</h3>
        <button className="btn btn-primary" onClick={() => navigate('/todos')}>
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">할일 상세보기</h2>
        {profile?.nickname && <p className="page-subtitle">{profile.nickname}님의 할 일</p>}
      </div>
      {/* 실제내용 */}
      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 'var(--space-6)',
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                // margin: '0 0 var(--space-1) 0',
                color: 'var(--gray-800)',
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.7 : 1,
              }}
            >
              {todo.title}
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span
              style={{
                padding: 'var(--space-1) var(--space-3)',
                borderRadius: 'var(--radius-md)',
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: todo.completed ? 'var(--success-100)' : 'var(--primary-100)',
                color: todo.completed ? 'var(--success-700)' : 'var(--primary-700)',
              }}
            >
              {todo.completed ? '✅ 완료' : '⏳ 진행 중'}
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-2)',
            margin: '0 0 var(--space-4) 0',
            justifyContent: 'end',
          }}
        >
          <button
            onClick={() => navigate(`/todos/edit/${todo.id}`)}
            className="btn btn-primary"
            disabled={actionLoading.delete}
          >
            ✏️ 수정
          </button>
          <button onClick={handleDelete} className="btn btn-danger" disabled={actionLoading.delete}>
            {actionLoading.delete ? '⏳ 삭제 중...' : '🗑️ 삭제'}
          </button>
        </div>
        {/* 상세내용 */}
        {todo.content && (
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <h4 style={{ margin: '0 0 var(--space-3) 0', color: 'var(--gray-700)' }}>상세내용</h4>
            <p
              style={{
                margin: 0,
                color: 'var(--gray-600)',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
              }}
            >
              {todo.content}
            </p>
          </div>
        )}
        {/* 추가정보 출력 */}
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <h4 style={{ margin: '0 0 var(--space-3) 0', color: 'var(--gray-700)' }}>할일 정보</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-3)',
            }}
          >
            <div>
              <span style={{ fontWeight: '500', color: 'var(--gray-600)' }}>작성일 :</span>
              <div style={{ color: 'var(--gray-600)', marginTop: 'var(--space-1)' }}>
                {todo.created_at ? new Date(todo.created_at).toLocaleString() : '정보 없음'}
              </div>
            </div>
            <div>
              <span style={{ fontWeight: '500', color: 'var(--gray-600)' }}>수정일 :</span>
              <div style={{ color: 'var(--gray-600)', marginTop: 'var(--space-1)' }}>
                {todo.updated_at ? new Date(todo.updated_at).toLocaleString() : '정보 없음'}
              </div>
            </div>
            <div>
              <span style={{ fontWeight: '500', color: 'var(--gray-600)' }}>작성자 :</span>
              <div style={{ color: 'var(--gray-600)', marginTop: 'var(--space-1)' }}>
                {profile?.nickname || user?.email}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/todos')}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoDetailPage;
```

## 4. 할일 내용 및 제목 수정 페이지

- /src/pages/TodoEditPage.tsx

## 5. 라우터 구성

- App.tsx 업데이트
- `edit과 detail은 id를 param` 으로 전달함.

```tsx
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import TodosPage from './pages/TodosPage';
import AuthCallback from './pages/AuthCallback';
import Protected from './components/Protected';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import TodosInfinitePage from './pages/TodosInfinitePage';
import TodoListPage from './pages/TodoListPage';
import TodoWritePage from './pages/TodoWritePage';
import TodoEditPage from './pages/TodoEditPage';
import TodoDetailPage from './pages/TodoDetailPage';

const TopBar = () => {
  const { signOut, user } = useAuth();
  // 관리자인 경우 메뉴 추가로 출력하기
  // isAdmin은 true / false
  const isAdmin = user?.email === 'dev.gsheep@gmail.com';
  return (
    <nav className="nav">
      <Link to="/" className="nav-link">
        홈
      </Link>
      {user && (
        <Link to="/todos" className="nav-link">
          할일
        </Link>
      )}
      {user && (
        <Link to="/todos-infinite" className="nav-link">
          무한스크롤 할일
        </Link>
      )}
      {!user && (
        <Link to="/signup" className="nav-link">
          회원가입
        </Link>
      )}
      {!user && (
        <Link to="/signin" className="nav-link">
          로그인
        </Link>
      )}
      {user && (
        <Link to="/profile" className="nav-link">
          프로필
        </Link>
      )}
      {user && (
        <button onClick={signOut} className="btn btn-secondary btn-sm">
          로그아웃
        </button>
      )}

      {isAdmin && (
        <Link to="/admin" className="nav-link">
          관리자
        </Link>
      )}
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">😎 Todo Service</h1>
        </div>
        <Router>
          <TopBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/todos"
              element={
                <Protected>
                  <TodoListPage />
                </Protected>
              }
            />
            <Route
              path="/todos/write"
              element={
                <Protected>
                  <TodoWritePage />
                </Protected>
              }
            />
            <Route
              path="/todos/edit/:id"
              element={
                <Protected>
                  <TodoEditPage />
                </Protected>
              }
            />
            <Route
              path="/todos/detail/:id"
              element={
                <Protected>
                  <TodoDetailPage />
                </Protected>
              }
            />

            <Route
              path="/todos-infinite"
              element={
                <Protected>
                  <TodosInfinitePage />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <ProfilePage />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <Protected>
                  <AdminPage />
                </Protected>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
```

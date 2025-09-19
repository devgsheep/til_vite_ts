import { supabase } from '../lib/supabase';
import type { Todo, TodoInsert, TodoUpdate } from '../types/TodoType';

// Todo 목록 조회
export const getTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });
  // 실행은 되었지만, 결과가 오류이다.
  if (error) {
    throw new Error(`getTodos 오류 : ${error.message}`);
  }
  return data || [];
};

// Todo 목록 조회 (id)를 이용함
export const getTodoById = async (id: number): Promise<Todo | null> => {
  try {
    const { data, error } = await supabase.from('todos').select('*').eq('id', id).single();
    if (error) {
      throw new Error(`getTodoById 오류 : ${error.message}`);
    }
    return data;
  } catch (err) {
    console.log('getTodoById 에러 : ', err);
    return null;
  }
};

// Todo 생성
// 로그인을 하고 나면 실제로 user_id가 이미 파악이 됨
// todoInsert에서 user_id : 값을 생략하는 타입을 생성
// 타입스크립트에서 Omit을 이용하면, 특정 키를 제거할 수 있음.
export const createTodo = async (newTodo: Omit<TodoInsert, 'user_id'>): Promise<Todo | null> => {
  try {
    // 현재 로그인 한 사용자 정보 가져오기
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([{ ...newTodo, completed: false, user_id: user.id }])
      .select('*')
      .single();
    if (error) {
      throw new Error(`createTodos 오류 : ${error.message}`);
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// Todo 수정
// 로그인을 하고 나면 실제로 user_id가 이미 파악이 됨
// todoInsert에서 user_id : 값을 생략하는 타입을 생성
// 타입스크립트에서 Omit을 이용하면, 특정 키를 제거할 수 있음.
export const updateTodo = async (
  id: number,
  updateDate: Omit<TodoUpdate, 'user_id'>,
): Promise<Todo | null> => {
  try {
    // 1. 아직 DB에는 예전의 내용이 있다.
    // 수정 전 content에 있던 이미지 URL들을 확인하기 위함.
    // 예전 데이터 조회
    const { data: oldTodo, error: fetchError } = await supabase
      .from('todos')
      .select('content')
      .eq('id', id)
      .single();
    if (fetchError) {
      throw new Error(`updateTodo fetch 오류 : ${fetchError.message}`);
    }
    console.log(oldTodo);
    console.log(updateDate);

    // 2. content가 변경된 경우, 삭제된 이미지들을 정리
    // 새로운 content와 기존의 content를 비교
    // 삭제된 이미지들을 찾아서 storage에서 제거
    if (updateDate.content && oldTodo) {
      // 정규표현식으로 이미지를 찾음.
      const oldimageUrlPattern = /https:\/\/[^"'\s]+\.(jpg|jpeg|png|gif|webp|svg)/gi;
      const newimageUrlPattern = /https:\/\/[^"'\s]+\.(jpg|jpeg|png|gif|webp|svg)/gi;

      // 기존 content와 새로운 content에서 이미지 url을 추출
      const oldImageUrls: string[] = oldTodo.content.match(oldimageUrlPattern) || [];
      const newImageUrls: string[] = updateDate.content.match(newimageUrlPattern) || [];

      // 삭제된 이미지 URL들을 찾기
      // 기존에 있던 이미지 URL 중에서 새로운 content에 없는 것들을 필터링
      const deletedImageUrls = oldImageUrls.filter(item => !newImageUrls.includes(item));
      // 삭제된 이미지로 판별된다면 storage에서 제거한다.
      for (const deleteUrl of deletedImageUrls) {
        try {
          // url을 "/"로 분리해서 배열을 만듦
          const urlParats = deleteUrl.split('/');
          // todo-images에서 버킷 이름이 있는 인덱스를 찾는다.
          const bucketIndex = urlParats.findIndex((item: string) => item === 'todo-images');
          // todo-images를 찾았고, 다음에 나오는 것들을 이용해서 실제 파일 경로를 만듦
          if (bucketIndex !== -1 && bucketIndex + 1 < urlParats.length) {
            const filePath = urlParats.slice(bucketIndex + 1).join('/');
            // 실제 filePath로 이미지 삭제하기
            const { error: deleteError } = await supabase.storage
              .from('todo-images')
              .remove([filePath]);

            // 파일 삭제에 실패하면 메세지 출력
            if (deleteError) {
              console.log(deleteError.message);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    // 3. 데이터 업데이트
    const { data, error } = await supabase
      .from('todos')
      .update({ ...updateDate, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) {
      throw new Error(`updateTodo 오류 : ${error.message}`);
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Todo 삭제
// content에 포함된 파일을 제거하고나서 내용을 삭제함.
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    // 1. 먼저 삭제할 todo의 content에서 이미지의 url만 추출한다.
    const { data: todo, error: fetchError } = await supabase
      .from('todos')
      .select('content, user_id')
      .eq('id', id)
      .single();
    if (fetchError) {
      throw new Error(`deleteTodo fetch 오류 : ${fetchError.message}`);
    }
    // 2. content에서 이미지 URL을 추출
    if (todo.content) {
      // 정규 표현식으로 특정 패턴의 글자를 알아낸다.
      const imageUrlPattern = /https:\/\/[^"'\s]+\.(jpg|jpeg|png|gif|webp|svg)/gi;
      const imageUrls = todo.content.match(imageUrlPattern) || [];

      // 배열의 반복으로 요소를 찾아내는 법
      // imageUrls에서 url를 찾아서 파일 삭제 supabase 실행함
      for (const url of imageUrls) {
        try {
          const urlParts = url.split('/');
          // todo-images 라는 버킷이 몇번째 인지를 알아냄.
          // 버킷 다음이 실제 파일의 경로가 됨.
          const bucketIndex = urlParts.findIndex((item: string) => item === 'todo-images');
          // todo-images의 인덱스를 찾았으므로 실제 파일 경로가 있는지 검사
          // 만약 없다면 bucketIndex가 -1 이라고 담겨짐
          if (bucketIndex !== -1 && bucketIndex + 1 < urlParts.length) {
            const filePath = urlParts.slice(bucketIndex + 1).join('/');
            const { error: deleteError } = await supabase.storage
              .from('todo-images')
              .remove([filePath]);
            if (deleteError) {
              console.log(deleteError.message);
            }
          }
        } catch (imageError) {
          console.log(`이미지 삭제 중 오류 : ${imageError}`);
        }
      }
    }
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
      throw new Error(`deleteTodo 오류 : ${error.message}`);
    }
  } catch (error) {
    console.log(error);
  }
};
// Completed Toggle
export const toggleTodo = async (id: number, completed: boolean): Promise<Todo | null> => {
  return updateTodo(id, { completed });
};

// 페이지 단위로 조각내서 목록 출력하기
// getTodosPaginated(1, 10개)
// getTodosPaginated(2, 10개)
// getTodosPaginated(페이지번호, 10개)
export const getTodosPaginated = async (
  page: number = 1,
  limit: number = 10,
): Promise<{ todos: Todo[]; totalCount: number; totalPages: number; currentPage: number }> => {
  // 시작
  // page = 2, limit 10
  // 2-1 * 10 => 10
  const from = (page - 1) * limit;
  // 제한
  // 10 + 10 - 1 => 19
  const to = from + limit - 1;

  // 전체 데이터 개수 (row의 개수)
  const { count } = await supabase.from('todos').select('*', { count: 'exact', head: true });

  // from 부터 to 까지의 상세 데이터
  const { data } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })
    .range(from, to);

  // 편하게 활용
  const totalCount = count || 0;
  // 몇페이지 인지 계산 (소숫점은 올림)
  const totalPages = Math.ceil(totalCount / limit);
  return {
    todos: data || [],
    totalCount,
    totalPages,
    currentPage: page,
  };
};

// 무한 스크롤 todo 목록 조회
export const getTodosInfinite = async (
  offset: number = 0,
  limit: number = 5,
): Promise<{ todos: Todo[]; hasMore: boolean; totalCount: number }> => {
  try {
    // 전체 todos의 Row 개수
    const { count, error: countError } = await supabase
      .from('todos')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw new Error(`getTodosInfinite count 오류 : ${countError.message}`);
    }
    // 무한 스크롤 데이터 조회
    const { data, error: limitError } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    if (limitError) {
      throw new Error(`getTodosInfinite limit 오류 : ${limitError.message}`);
    }

    // 전체 개수
    const totalCount = count || 0;
    // 앞으로 더 가져올 것이 있는가?
    const hasMore = offset + limit < totalCount;
    // 최종 값을 리턴함.
    return {
      todos: data || [],
      hasMore,
      totalCount,
    };
  } catch (error) {
    console.log(`getTodosInfinite 오류 : ${error}`);
    throw new Error(`getTodosInfinite 오류 : ${error}`);
  }
};

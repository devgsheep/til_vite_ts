// Todo 수정
// 로그인을 하고 나면 실제로 user_id 가 이미 파악이 됨
// TodoUpdate 에서 user_id : 값 을 생략하는 타입을 생성
// 타입스크립트에서 Omit 을 이용하면, 특정 키를 제거할 수 있음.
export const updateTodo = async (
  id: number,
  updateData: Omit<TodoUpdate, 'user_id'>,
): Promise<Todo | null> => {
  try {
    // 1. 아직 DB 에는 예전의 내용이 있다.
    // 수정 전 content 에 있던 이미지 URL 들을 확인하기 위함.
    // 예전 데이터 조회
    const { data: oldTodo, error: fetchError } = await supabase
      .from('todos')
      .select('content')
      .eq('id', id)
      .single();
    if (fetchError) {
      throw new Error(`updateTodo fetch 오류 : ${fetchError.message}`);
    }

    // 2. content 가 변경된 경우, 삭제된 이미지들을 정리
    // 새로운 content 와 기존의 content를 비교
    // 삭제된 이미지들을 찾아서 storage 에서 제거
    if (updateData.content && oldTodo.content) {
      // 정규표현식으로 이미지를 찾음.
      const oldImageUrlPattern = /https:\/\/[^"'\s]+\.(jpg|jpeg|png|gif|webp|svg)/gi;
      const newImageUrlPattern = /https:\/\/[^"'\s]+\.(jpg|jpeg|png|gif|webp|svg)/gi;

      // 기존 content 와 새로운 content 에서 이미지 url 을 추출
      const oldImageUrls: string[] = oldTodo.content.match(oldImageUrlPattern) || [];
      const newImageUrls: string[] = updateData.content.match(newImageUrlPattern) || [];

      // 삭제된 이미지 URL들을 찾기
      // 기존에 있던 이미지 URL 중에서 새로운 content에 없는 것들을 필터링
      const deletedImageUrls = oldImageUrls.filter(item => !newImageUrls.includes(item));

      // 삭제된 이미지로 판별된다면 storage 에서 제거한다.
      for (const deleteUrl of deletedImageUrls) {
        try {
          // url 을 "/" 로 분리해서 배열을 만듦
          const urlParts = deleteUrl.split('/');
          // 배열에서 todo-images 버킷 이름이 있는 인덱스 찾는다.
          const bucketIndex = urlParts.findIndex((item: string) => item === 'todo-images');

          // todo-images 를 찾았고, 다음에 나오는 것들을 이용해서 실제 파일 경로를 만듦
          if (bucketIndex !== -1 && bucketIndex + 1 < urlParts.length) {
            const filePath = urlParts.slice(bucketIndex + 1).join('/');
            // 실제 filePath 로 이미지 삭제하기
            const { error: deleteError } = await supabase.storage
              .from('todo-images')
              .remove([filePath]);
            // 파일 삭제에 실패하면 메시지 출력
            if (deleteError) {
              console.log(`삭제된 파일 정리 실패 : ${filePath}`, deleteError.message);
            }
          }
        } catch (error) {
          console.log(`이미지 정리 중 오류 : ${deleteUrl}, ${error}`);
        }
      }
    }

    // 3. 데이터 업데이트
    const { data, error } = await supabase
      .from('todos')
      .update({ ...updateData, updated_at: new Date().toISOString() })
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

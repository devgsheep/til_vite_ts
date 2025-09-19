import { supabase } from '../lib/supabase';
import type { Memo, MemoInsert, MemoUpdate } from '../types/TodoType';

// 메모 타입 (TodoType.ts 일부 추출)
// export type Memo = Database['public']['Tables']['memos']['Row'];
// export type MemoInsert = Database['public']['Tables']['memos']['Insert'];
// export type MemoUpdate = Database['public']['Tables']['memos']['Update'];

// 메모 불러오기
export const getMemos = async (): Promise<Memo[]> => {
  const { data, error } = await supabase
    .from('memos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(`메모 불러오기 오류 ${error.message}`);
  }
  return data || [];
};

// id를 이용한 메모 불러오기
export const getMemoById = async (id: number): Promise<Memo | null> => {
  try {
    const { data, error } = await supabase.from('memos').select('*').eq('id', id).single();
    if (error) {
      throw new Error(`id를 이용한 메모조회 실패 ${error.message}`);
    }
    return data;
  } catch (err) {
    console.log('getMemoById 에러 : ', err);
    return null;
  }
};

// 메모 생성
export const createMemo = async (newMemo: MemoInsert): Promise<Memo | null> => {
  try {
    const { data, error } = await supabase
      .from('memos')
      .insert([{ ...newMemo }])
      .select('*')
      .single();
    if (error) {
      throw new Error(`메모 생성 오류 ${error.message}`);
    }
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// 메모 수정
export const updateMemo = async (id: number, EditMemo: MemoUpdate): Promise<Memo | null> => {
  try {
    const { data, error } = await supabase
      .from('memos')
      .update({ ...EditMemo })
      .eq('id', id)
      .select('*')
      .single();
    if (error) {
      throw new Error(`메모수정 오류 ${error}`);
    }
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// 메모 삭제
export const deleteMemo = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase.from('memos').delete().eq('id', id);
    if (error) {
      throw new Error(`삭제 오류 ${error.message}`);
    }
  } catch (err) {
    console.log(err);
  }
};

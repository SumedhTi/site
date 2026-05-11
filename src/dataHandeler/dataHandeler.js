import { supabase } from "./supabaseClient";

export async function fetchData(setPoemData, setWritingData) {
  const { data, error } = await supabase
    .from("poems")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;

  const poems = data.filter(item => item.isPoem);
  const writings = data.filter(item => !item.isPoem);

  setPoemData(poems);
  setWritingData(writings);
}

export async function addNewData(poem) {
  const { data, error } = await supabase
    .from("poems")
    .insert([poem]);

  if (error) throw error;

  return data;
}

export async function editData(updatedData, id) {
  const { data, error } = await supabase
    .from("poems")
    .update(updatedData)
    .eq("id", id);

  if (error) throw error;

  return data;
}

export async function editLikes(id, inc) {
  const { error } = await supabase.rpc("increment_likes", {
    row_id: id,
    inc: inc
  });

  if (error) throw error;
}














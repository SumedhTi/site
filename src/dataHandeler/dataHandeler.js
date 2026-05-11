import { supabase } from "./supabaseClient";

export async function fetchData(setPoemData) {
  const { data, error } = await supabase
    .from("poems")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  data.forEach((item, index) => {
    item.id = index + 1;
  });
  setPoemData(data);
}

export async function addNewData(poem) {
  const { data, error } = await supabase.from("poems").insert([poem]);

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
    inc: inc,
  });

  if (error) throw error;
}

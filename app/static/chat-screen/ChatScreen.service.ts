import { supabase } from "../../../lib/supabase";

export async function getAllMessages(id: string) {
  return await supabase.from("messages").select("*").eq("chat_id", id);
}

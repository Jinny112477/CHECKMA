import { supabase } from "../lib/supabaseClient.js";
import { io } from "../server.js";

// POST: send signals
export const sendSignal = async (req, res) => {
  try {
    const { class_id } = req.params;
    const { user_id } = req.body;

    if (!class_id || !user_id) {
      return res.status(400).json({ error: "Missing class_id or user_id" });
    }

    const { data: classSession, error: classError } = await supabase
      .from("class_session")
      .select("id, session_id")
      .eq("id", class_id)
      .single();

    if (classError || !classSession) {
      return res.status(404).json({ error: "Class session not found" });
    }

    const { data, error } = await supabase
      .from("attendance_signals")
      .insert([{ class_id, user_id, status: "pending" }])
      .select();

    if (error) {
      if (error.code === "23505") {
        const { error: updateError } = await supabase
          .from("attendance_signals")
          .update({ status: "pending" })
          .eq("class_id", class_id)
          .eq("user_id", user_id);

        if (updateError) throw updateError;

        io.emit(`signals:${class_id}`, { type: "INSERT" }); // 👈 re-activated
        return res.status(200).json({ message: "Signal re-activated" });
      }

      return res.status(500).json({ error: error.message });
    }

    io.emit(`signals:${class_id}`, { type: "INSERT" }); // 👈 new signal
    return res.status(200).json({ message: "Signal sent", data });

  } catch (err) {
    console.error("🔥 SERVER ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// GET: signal fetch
export const getSignals = async (req, res) => {
  try {
    const { class_id } = req.params;

    if (!class_id) {
      return res.status(400).json({ error: "Missing class_id" });
    }

    const { data, error } = await supabase
      .from("attendance_signals")
      .select(`
        id, class_id, user_id, status, created_at,
        users (
          student_info ( firstname, surname, student_id )
        )
      `)
      .eq("class_id", class_id)
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (error) throw error;

    return res.status(200).json(data); // 👈 return data not message

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch signals" });
  }
};

// DELETE: remove signal when student leaves
export const cancelSignal = async (req, res) => {
  try {
    const { class_id } = req.params;
    const { user_id } = req.body;

    if (!class_id || !user_id) {
      return res.status(400).json({ error: "Missing class_id or user_id" });
    }

    const { data, error } = await supabase
      .from("attendance_signals")
      .delete()
      .eq("class_id", class_id)
      .eq("user_id", user_id)
      .select();

    if (error) throw error;

    io.emit(`signals:${class_id}`, { type: "DELETE" }); // 👈 notify professor
    return res.status(200).json({ message: "Signal removed" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to remove signal" });
  }
};
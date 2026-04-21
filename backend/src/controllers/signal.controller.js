import { supabase } from "../lib/supabaseClient.js";

// POST: send signals
export const sendSignal = async (req, res) => {
  try {
    const { class_id } = req.params;
    const { user_id } = req.body;

    // Validate input
    if (!class_id || !user_id) {
      return res.status(400).json({ error: "Missing class_id or user_id" });
    }

    // Get class_session (to know which session it belongs to)
    const { data: classSession, error: classError } = await supabase
      .from("class_session")
      .select("id, session_id")
      .eq("id", class_id)
      .single();

    if (classError || !classSession) {
      return res.status(404).json({ error: "Class session not found" });
    }

    // Check user is in that session (IMPORTANT FIX)
    const { data: participant, error: participantError } = await supabase
      .from("session_participants")
      .select("*")
      .eq("session_id", classSession.session_id)
      .eq("user_id", user_id)
      .maybeSingle();

    if (participantError || !participant) {
      return res.status(403).json({ error: "User not in this session" });
    }

    // Insert signal (let UNIQUE constraint handle duplicates)
    const { data, error } = await supabase
      .from("attendance_signals")
      .insert([
        {
          class_id,
          user_id,
          status: "pending",
        },
      ])
      .select();

    // Handle duplicate (UNIQUE constraint)
    if (error) {
      if (error.code === "23505") {
        return res.status(200).json({ message: "Signal already sent" });
      }
      throw error;
    }

    return res.status(200).json({
      message: "Signal sent",
      data,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// GET: signal fetch
export const
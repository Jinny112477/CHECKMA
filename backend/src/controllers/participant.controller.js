import { supabase } from "../lib/supabaseClient.js";

// POST: join class
export const joinClass = async (req, res) => {
  try {
    const { session_code, user_id } = req.body;

    if (!session_code) {
      return res.status(400).json({ error: "session_code is required" });
    }

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    // find session
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("session_id")
      .eq("session_code", session_code)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: "Invalid session code" });
    }

    // prevent duplicate join
    const { data: existing } = await supabase
      .from("session_participants")
      .select("*")
      .eq("session_id", session.session_id)
      .eq("user_id", user_id)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({ error: "Already joined this session" });
    }

    // insert participant
    const { data, error } = await supabase
      .from("session_participants")
      .insert([
        {
          session_id: session.session_id,
          user_id: user_id,
          status: "accepted",
          joined_at: new Date(),
        },
      ])
      .select();

    if (error) throw error;

    res.json({
      message: "Joined session successfully",
      session_id: session.session_id,
      participant: data,
    });

  } catch (err) {
    console.error("JOIN SESSION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

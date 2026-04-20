import { supabase } from "../lib/supabaseClient.js";

// POST: join session
export const joinClass = async (req, res) => {
  try {
    const { session_code, user_id } = req.body;

    if (!session_code) {
      return res.status(400).json({ error: "session_code is required" });
    }

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("session_id")
      .eq("session_code", session_code)
      .maybeSingle();

    if (sessionError || !session) {
      return res.status(404).json({ error: "Invalid session code" });
    }

    const { data: existing } = await supabase
      .from("session_participants")
      .select("id")
      .eq("session_id", session.session_id)
      .eq("user_id", user_id)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({ error: "Already joined this session" });
    }

    const { data, error } = await supabase
      .from("session_participants")
      .insert([
        {
          session_id: session.session_id,
          user_id,
          status: "accepted",
          joined_at: new Date().toISOString(),
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

// GET: fetch joined session
export const getJoinedSession = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    const { data, error } = await supabase
      .from("student_sessions_view")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw error;

    res.json(data || []);
  } catch (err) {
    console.error("GET JOINED SESSION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET: sessions participants info by user_id
export const getParticipantById = async (req, res) => {
  try {
    const { session_id } = req.params;

    const { data, error } = await supabase
      .from("session_participants")
      .select(
        `
          user_id,
          users (
            student_info (
              firstname,
              surname,
              student_id
            )
          )
        `,
      )
      .eq("session_id", session_id);

    if (error) throw error;

    res.json(data || []);
  } catch (err) {
    console.error("STUDENT FETCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

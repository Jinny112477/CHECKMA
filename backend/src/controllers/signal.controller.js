import { supabase } from "../lib/supabaseClient.js";

// POST: send signals
export const sendSignal = async (req, res) => {
  try {
    const { class_id } = req.params;
    const { user_id } = req.body;

    console.log("=== SEND SIGNAL START ===");
    console.log("class_id:", class_id);
    console.log("user_id:", user_id);

    // 1. Validate input
    if (!class_id || !user_id) {
      console.log("❌ Missing input");
      return res.status(400).json({ error: "Missing class_id or user_id" });
    }

    // 2. Check class_session exists
    const { data: classSession, error: classError } = await supabase
      .from("class_session")
      .select("id, session_id")
      .eq("id", class_id)
      .single();

    console.log("classSession:", classSession);
    console.log("classError:", classError);

    if (classError || !classSession) {
      console.log("❌ Class session not found");
      return res.status(404).json({ error: "Class session not found" });
    }

    // 3. Check participant (DEBUG MODE: log but don't block)
    const { data: participant, error: participantError } = await supabase
      .from("session_participants")
      .select("*")
      .eq("session_id", classSession.session_id)
      .eq("user_id", user_id);

    console.log("participant:", participant);
    console.log("participantError:", participantError);

    // ⚠️ TEMP: don't block insert
    // if (!participant || participant.length === 0) {
    //   console.log("❌ User not in session");
    //   return res.status(403).json({ error: "User not in this session" });
    // }

    // 4. Insert signal
    console.log("➡️ Attempting insert...");

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

    console.log("Insert data:", data);
    console.log("Insert error:", error);

    // 5. Handle insert errors
    if (error) {
      // duplicate
      if (error.code === "23505") {
        console.log("⚠️ Duplicate signal");
        return res.status(200).json({ message: "Signal already sent" });
      }

      console.log("❌ Insert failed");
      return res.status(500).json({
        error: error.message,
        details: error,
      });
    }

    console.log("✅ Signal inserted successfully");
    console.log("=== END ===");

    return res.status(200).json({
      message: "Signal sent",
      data,
    });

  } catch (err) {
    console.error("🔥 SERVER ERROR:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
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
        id,
        class_id,
        user_id,
        status,
        created_at,
        users (
          student_info (
            firstname,
            surname,
            student_id
          )
        )
      `)
      .eq("class_id", class_id)
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (error) throw error;

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch signals" });
  }
};
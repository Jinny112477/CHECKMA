import { supabase } from "../lib/supabaseClient.js";
import { io } from "../server.js";

// POST: send signals
export const sendSignal = async (req, res) => {
  try {
    const { class_id } = req.params;
    const { user_id, location_lat, location_lng } = req.body;

    if (!class_id || !user_id) {
      return res.status(400).json({ error: "Missing class_id or user_id" });
    }

    // ✅ get class location + radius
    const { data: classSession, error: classError } = await supabase
      .from("class_session")
      .select("id, session_id, location_lat, location_lng, radius")
      .eq("id", class_id)
      .single();

    if (classError || !classSession) {
      return res.status(404).json({ error: "Class session not found" });
    }

    // ✅ distance function
    const getDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3;
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) ** 2;

      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    // ✅ calculate validation
    let is_valid = false;
    let distance = null;

    if (location_lat && location_lng) {
      distance = getDistance(
        location_lat,
        location_lng,
        classSession.location_lat,
        classSession.location_lng
      );

      is_valid = distance <= classSession.radius;
    }

    // ✅ insert signal
    const { data, error } = await supabase
      .from("attendance_signals")
      .insert([
        {
          class_id,
          user_id,
          status: "pending",
          location_lat,
          location_lng,
          is_valid,
        },
      ])
      .select();

    // ✅ handle duplicate (update instead)
    if (error) {
      if (error.code === "23505") {
        const { error: updateError } = await supabase
          .from("attendance_signals")
          .update({
            status: "pending",
            location_lat,
            location_lng,
            is_valid
          })
          .eq("class_id", class_id)
          .eq("user_id", user_id);

        if (updateError) throw updateError;

        io.emit(`signals:${class_id}`, { type: "INSERT" });
        return res.status(200).json({ message: "Signal re-activated" });
      }

      return res.status(500).json({ error: error.message });
    }

    io.emit(`signals:${class_id}`, { type: "INSERT" });

    return res.status(200).json({
      message: "Signal sent",
      data,
      is_valid,
      distance
    });

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
      .select(
        `
        id, class_id, user_id, status, created_at,
        users (
          student_info ( firstname, surname, student_id )
        )
      `,
      )
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

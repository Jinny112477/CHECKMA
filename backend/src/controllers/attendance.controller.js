import { supabase } from "../lib/supabaseClient.js";

// POST: update student status
export const checkInAttendance = async (req, res) => {
  try {
    const {
      user_id,
      class_id,
      status
    } = req.body;

    if (!user_id || !class_id || !status) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const { data, error } = await supabase
      .from("attendance_records")
      .insert([{
        user_id,
        class_id,
        status,
        check_in_time: new Date(),
        is_valid: true
      }])
      .select();

    if (error) throw error;

    res.json({ message: "Attendance saved", data });

  } catch (err) {
    console.error("SERVER ERROR:", err); // 👈 add this for debugging
    res.status(500).json({ error: err.message });
  }
};

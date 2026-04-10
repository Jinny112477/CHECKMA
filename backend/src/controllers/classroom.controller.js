import { generateSessionId } from "../utils/id.js";
import { supabase } from "../lib/supabaseClient.js";

// POST: Create Classroom
export const classroomCreate = async (req, res) => {
  try {
    const session_code = generateSessionId();

    const {
      course_name,
      course_id,
      section,
      day,
      start_time,
      end_time,
      room,
      location_lat,
      location_lng,
      radius,
      status,
      host_id,
    } = req.body;

    console.log("REQ BODY:", req.body);

    if (!host_id) {
      return res.status(400).json({
        error: "host_id is required",
      });
    }

    const { data, error } = await supabase
      .from("sessions")
      .insert([
        {
          session_code,
          course_name,
          course_id,
          section,
          day,
          start_time,
          end_time,
          room,
          location_lat,
          location_lng,
          radius,
          status,
          host_id,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET: fetch classrom
export const getMyClasses = async (req, res) => {
  try {
    const { host_id } = req.query;

    if (!host_id) {
      return res.status(400).json({ error: "host_id required" });
    }

    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("host_id", host_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

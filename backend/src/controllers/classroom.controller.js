import { generateSessionId } from "../utils/id.js";
import { supabase } from "../lib/supabaseClient.js";

// POST: Create Classroom
export const classroomCreate = async (req, res) => {
  try {
    const session_code = generateSessionId();

    const {
      icon,
      course_name,
      course_id,
      section,
      day,
      start_time,
      end_time,
      room,
      status,
      host_id,
    } = req.body;

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
          icon,
          course_name,
          course_id,
          section,
          day,
          start_time,
          end_time,
          room,
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

// GET: fetch classrom (for homepage)
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

// GET: fetch class by SESSION ID (for attendance page)
export const getClassById = async (req, res) => {
  try {
    const { session_id } = req.params;

    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("session_id", session_id)
      .single();

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data);

  } catch (err) {
    console.error("CATCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// PUT: edit class information
export const editClassroom = async (req, res) => {
  try {
    const { session_id } = req.params;

    const {
      icon,
      course_name,
      course_id,
      section,
      day,
      start_time,
      end_time,
      room,
      status,
    } = req.body;

    if (!session_id) {
      return res.status(400).json({ error: "id is required" });
    }

    const { data, error } = await supabase
      .from("sessions")
      .update({
        icon,
        course_name,
        course_id,
        section,
        day,
        start_time,
        end_time,
        room,
        status,
      })
      .eq("session_id", session_id)
      .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Classroom not found" });
      }

      res.json({
        message: "Classroom updated successfully",
        data,
      })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE: delete classroom and all its dependencies
export const deleteClassroom = async (req, res) => {
  try {
    const { session_id } = req.params;

    // Get all class IDs in this session
    const { data: classes, error: classError } = await supabase
      .from("class_session")
      .select("id")
      .eq("session_id", session_id);

    if (classError) throw classError;

    const classIds = classes.map((c) => c.id);

    // Delete attendance_records (if have)
    if (classIds.length > 0) {
      const { error: recError } = await supabase
        .from("attendance_records")
        .delete()
        .in("class_id", classIds);

      if (recError) throw recError;
    }

    // Delete class_session (if have)
    if (classIds.length > 0) {
      const { error: classDelError } = await supabase
        .from("class_session")
        .delete()
        .eq("session_id", session_id);

      if (classDelError) throw classDelError;
    }

    // Delete session_participants
    const { error: participantError } = await supabase
      .from("session_participants")
      .delete()
      .eq("session_id", session_id);

    if (participantError) throw participantError;

    // Delete the session itself
    const { data, error } = await supabase
      .from("sessions")
      .delete()
      .eq("session_id", session_id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    res.json({ message: "Classroom deleted successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

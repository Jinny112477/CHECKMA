import { supabase } from "../lib/supabaseClient.js";

// POST: update student status
export const checkInAttendance = async (req, res) => {
  try {
    const { user_id, class_id, status } = req.body;

    if (!user_id || !class_id || !status) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const { data, error } = await supabase
      .from("attendance_records")
      .insert([
        {
          user_id,
          class_id,
          status,
          check_in_time: new Date(),
          is_valid: true,
        },
      ])
      .select();

    if (error) throw error;

    res.json({ message: "Attendance saved", data });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET: fetch student joined class session
export const getJoinedClassSession = async (req, res) => {
  try {
    const { session_id, user_id } = req.params;

    // 1. Get all classes in this session
    const { data: classes, error: classError } = await supabase
      .from("class_session")
      .select("id, class_name, class_number, class_date")
      .eq("session_id", session_id)
      .order("class_number", { ascending: true });

    if (classError) return res.status(500).json(classError);

    const classIds = classes.map((c) => c.id);

    // 2. Get attendance records WITHOUT filtering by user first
    const { data: allRecords, error: recError } = await supabase
      .from("attendance_records")
      .select("class_id, user_id, status, check_in_time")
      .in("class_id", classIds);

    // 3. Now filter by user_id
    const records = allRecords?.filter((r) => r.user_id === user_id) ?? [];
    const result = classes.map((cls) => {
      const record = records.find((r) => r.class_id === cls.id) ?? null;
      return {
        id: cls.id,
        class_name: cls.class_name,
        class_date: cls.class_date,
        status: record?.status || "Absent",
        check_in_time: record?.check_in_time || null,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("CATCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET: fetch classes attendance
export const getClassAttendance = async (req, res) => {
  try {
    const { session_id, class_id } = req.params;

    const { data: participants, error: partError } = await supabase
      .from("session_participants")
      .select(`
        user_id,
        users (
          student_info (
            firstname,
            surname,
            student_id
          )
        )
      `)
      .eq("session_id", session_id);

    if (partError) throw partError;

    const userIds = participants.map((p) => p.user_id);

    const { data: records, error: recError } = await supabase
      .from("attendance_records")
      .select("user_id, status, check_in_time")
      .eq("class_id", class_id)
      .in("user_id", userIds);

    if (recError) throw recError;

    // mappped data for frontend easier call
    const result = participants.map((p) => {
      const record = records.find((r) => r.user_id === p.user_id) ?? null;
      return {
        user_id: p.user_id,
        firstname: p.users.student_info?.firstname,
        surname: p.users.student_info?.surname,
        student_id: p.users.student_info?.student_id,
        status: record?.status || "Absent",
        check_in_time: record?.check_in_time || null,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("STUDENT FETCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// PUT: edit users status
export const editStudentStatus = async (req, res) => {
  try {
    const { class_id, user_id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ error: "Missing status" });

    const { data, error } = await supabase
      .from("attendance_records")
      .update({status})
      .eq("class_id", class_id)
      .eq("user_id", user_id)
      .select();
    
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET: check if that class is already check
export const getAttendanceStatus = async (req, res) => {
  const { class_id, user_id } = req.params;

  const { data, error } = await supabase
    .from("attendance_records")
    .select("status")
    .eq("class_id", class_id)
    .eq("user_id", user_id)
    .single();

  if (error && error.code !== "PGRST116")
    return res.status(500).json({ error: error.message });

  res.json(data ?? null);
};
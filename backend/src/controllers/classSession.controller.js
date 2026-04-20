import { supabase } from "../lib/supabaseClient.js";

// POST: Create New class in session
export const createClassSession = async (req, res) => {
  try {
    const { session_id, class_date, location_lat, location_lng, radius } =
      req.body;

    if (!session_id) {
      return res.status(400).json({
        error: "session_id is required",
      });
    }

    // get last class
    const { data: lastClass, error: lastError } = await supabase
      .from("class_session")
      .select("class_number")
      .eq("session_id", session_id)
      .order("class_number", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lastError) throw lastError;

    const classNumber = lastClass ? lastClass.class_number + 1 : 1;

    // close all previous classes
    const { error: updateError } = await supabase
      .from("class_session")
      .update({ status: "closed" })
      .eq("session_id", session_id);

    if (updateError) throw updateError;

    // create new class
    const { data, error } = await supabase
      .from("class_session")
      .insert([
        {
          session_id,
          class_number: classNumber,
          class_name: `Class ${classNumber}`,
          class_date: class_date || new Date().toISOString(),
          status: "open",
          location_lat,
          location_lng,
          radius,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: "Class created successfully",
      class: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET: fetch class session
export const getClassSession = async (req, res) => {
  try {
    const { session_id } = req.params;

    const { data, error } = await supabase
      .from("class_session")
      .select("*")
      .eq("session_id", session_id)
      .order("class_number", { ascending: true });

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data);
  } catch (err) {
    console.error("CATCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

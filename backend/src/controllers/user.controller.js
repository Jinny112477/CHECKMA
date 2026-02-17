import { supabase } from "../lib/supabaseClient.js";

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.sub;

    const { data, error } = await supabase
      .from("users")
      .select(
        `
                id,
                username,
                email,
                role,
                avatar_url,
                student_info!student_info_id_fkey (
                    firstname,
                    surname,
                    student_id,
                    faculty,
                    major
                ),
                prof_info!prof_info_id_fkey (
                    firstname,
                    surname
                )
                `,
      )

      .eq("id", userId)
      .single();

    if (error) {
      console.log("GET PROFILE ERROR:", error);
      return res.status(500).json({ error: error.message });
    }

    let profileData = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
      avatar_url: data.avatar_url,
    };

    // Merge based on role
    if (data.role === "student" && data.student_info) {
      profileData = { ...profileData, ...data.student_info };
    }

    if (data.role === "professor" && data.prof_info) {
      profileData = { ...profileData, ...data.prof_info };
    }

    res.json(profileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const userId = req.user.sub;

    const { avatar_url, firstname, surname, student_id, faculty, major } =
      req.body;

    // ===============================
    // 1️⃣ Update users table
    // ===============================
    const { error: userError } = await supabase;
    if (avatar_url !== undefined && avatar_url !== null) {
      await supabase
        .from("users")
        .update({ avatar_url })
        .eq("id", userId);
    }

    if (userError) {
      return res.status(500).json({ error: "Failed to update user" });
    }

    // ===============================
    // 2️⃣ Get user role
    // ===============================
    const { data: userData, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (roleError) {
      return res.status(500).json({ error: "Failed to fetch role" });
    }

    // ===============================
    // 3️⃣ Update correct table based on role
    // ===============================

    // If student, update student_info
    if (userData.role === "student") {
      const { error } = await supabase.from("student_info").upsert(
        {
          id: userId,
          firstname,
          surname,
          student_id,
          faculty,
          major,
        },
        { onConflict: "id" },
      );

      if (error) {
        console.log("STUDENT UPSERT ERROR:", error);
        return res.status(500).json({ error: error.message });
      }
    }

    // If professor, update prof_info
    if (userData.role === "professor") {
      const { error } = await supabase.from("prof_info").upsert({
        id: userId,
        firstname,
        surname,
      });

      if (error) {
        return res
          .status(500)
          .json({ error: "Failed to update professor info" });
      }
    }

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

import { supabase } from "../../supabaseClient.js";
import bcrypt from "bcrypt";

// POST /api/users/sync
export const syncUserProfile = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user?.id || !user?.email) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    const provider = user.app_metadata?.provider || "email";

    const username =
      user.user_metadata?.username ||
      user.user_metadata?.full_name ||
      user.email.split("@")[0];

    const avatar_url =
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      null;

    const { error } = await supabase
      .from("users")
      .upsert(
        {
          id: user.id,
          email: user.email,
          username,
          provider,
          avatar_url,
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Failed to sync user profile" });
    }

    return res.status(200).json({
      message: "User profile synced successfully",
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

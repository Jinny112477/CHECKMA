import { supabase } from "../../supabaseClient.js";
import bcrypt from "bcrypt";

//username generate
export const generateUsername = async (supabase, base) => {
  let username = base.toLowerCase().replace(/[^a-z0-9_]/g, "");
  let suffix = 0;

  while (true) {
    const { data } = await supabase
      .from("users")
      .select("id")
      .eq("username", suffix ? `${username}${suffix}` : username)
      .maybeSingle();

    if (!data) {
      return suffix ? `${username}${suffix}` : username;
    }

    suffix++;
  }
};

// POST /api/users/sync
export const syncUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    // get user from token
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const provider = user.app_metadata?.provider || "email";

    const { data: existingUser } = await supabase
      .from("users")
      .select("id, username")
      .eq("id", user.id)
      .maybeSingle();

    //Username Genreator for Google OAuth
    let username;

    // EMAIL signup → username already chosen
    if (provider === "email") {
      username = user.user_metadata?.username;
      if (!username) {
        return res.status(400).json({ error: "Username required" });
      }
    }

    // GOOGLE signup
    if (provider === "google") {
      if (existingUser) {
        username = existingUser.username;
      } else {
        const base = user.user_metadata?.full_name || user.email.split("@")[0];
        username = await generateUsername(supabase, base);
      }
    }

    const avatar_url =
      user.user_metadata?.avatar_url || user.user_metadata?.picture || null;

    const { error: dbError } = await supabase.from("users").upsert({
      id: user.id,
      email: user.email,
      username,
      provider,
      avatar_url,
    });

    if (dbError) {
      console.error(dbError);
      return res.status(500).json({ error: "Database insert failed" });
    }

    return res.status(200).json({ message: "User synced" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

//GET /api/users for Login existing account

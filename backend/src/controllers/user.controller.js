import { supabase } from '../config/supabase.js'

//POST/api/users
exports.registerUser = async (req, res) => {
  try {
    const {email, username, password} = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, username, and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, username, password: hashedPassword }])
      .select()
      .single();

      if(error) {
        return res.status(400).json({ message: error.message });
      }

      res.status(201).json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//GET/api/users
exports.getUsers = async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, username, created_at');

  if(error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json(data);
};

//GET/api/users/:id
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('users')
    .select('id, email, username, created_at')
    .eq('id', id)
    .single();

  if(error) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(data);
};
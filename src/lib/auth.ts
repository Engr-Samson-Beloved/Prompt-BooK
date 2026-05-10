import { supabase } from "./supabase";

export const signUpUser = async (
  email: string,
  password: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup Error:", error.message);
    return null;
  }

  return data;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    console.error("Login Error:", error.message);
    return null;
  }

  return data;
};
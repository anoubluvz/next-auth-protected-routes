import { supabase } from "../utils/supabaseClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Profile({ user })
{
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(async () => {
    if(user != null)
    {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id)
        .single();

      if(error)
      {
        alert(error.message);
        return;
      }
      setProfile(data);
      setLoading(false);
    }
  }, []);

  const createProfile = async (e) => {
    e.preventDefault();
    try
    {
      setLoading(true);
      const { error } = await supabase.from("profiles").insert({
        username,
        id: user.id
      });

      if(error)
        throw error;
      
      router.push("/");
    }
    catch(error)
    {
      alert(error.message);
    }
    finally
    {
      setLoading(false);
    }
  }

  return (
      <>
        {!loading ? 
        <>
          {
            profile != null ?
            <>
              <div>Welcome!</div>
              <div>Your username is: {profile.username}</div>
              <div>Your email is: {user.email}</div>
              <div>Your uid is: {profile.id}</div>
            </>
            :
            <>
              <h1>You don't have a profile, create one:</h1>
              <form onSubmit={createProfile}>
                <input type="text" placeholder="Enter your username" min="3" onChange={(e) => setUsername(e.target.value)}/>
                <button type="submit">Create profile</button>
              </form>
            </>            
          }
        </>
        :
        <div>Please wait....</div>
        }
      </>
  )
}

// Only sessions protection
export async function getServerSideProps({ req })
{
  // verify user
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if(user == null)
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }

  return {
    props: {
      user,
    }
  }
}

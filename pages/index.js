import { supabase } from "../utils/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({ authenticated, user }) {
  const [profile, setProfile] = useState(null);

  useEffect(async () => {
    if(authenticated)
    {
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
    }
  }, []);

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if(error)
    {
      alert(error.message);
      return;
    }
    window.location.reload();
  }

  return (
    <>
      <div>Welcome!</div>
      {authenticated ?
      <>
        <button onClick={logoutHandler}>Logout</button>
        <br/>
        {profile != null ?
        <>
          <div>Username: {profile.username} </div>
          <div>Email: {user.email}</div>
          <div>UID: {profile.id}</div>
        </>
        :
        <>
          <Link passHref={true} href="/profile"><a>Create a profile</a></Link>
        </>
        }
      </>
      :
      <>
        <div>You are not logged in</div>
        <Link passHref={true} href="/login"><a>Login</a></Link>
        <br/>
        <Link passHref={true} href="/signup"><a>Signup</a></Link>
      </>
      }
    </>
  )
}

// Get profile
export async function getServerSideProps({ req })
{
  const { user } = await supabase.auth.api.getUserByCookie(req);

  return {
    props: {
      authenticated: user == null ? false : true,
      user
    }
  }
}

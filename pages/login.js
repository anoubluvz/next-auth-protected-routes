import { supabase } from "../utils/supabaseClient"
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login()
{
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try
        {
          setLoading(true);
          const { data, error } = await supabase.auth.signIn({
            email,
            password
          });

          if(error)
            throw error;

          if(data)
          {
            router.push("/profile");
          }
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
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                        <button type="submit">Login</button>
                    </form>
                </>
            :
                <div>Please wait..</div>
            }
        </>
    )
}

// Only no sessions protection
export async function getServerSideProps({ req })
{
  // Get user
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if(user != null || user != undefined)
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }

  return {
    props: {
      authenticated: false
    }
  }
}

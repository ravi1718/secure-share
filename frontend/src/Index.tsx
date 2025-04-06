import { useUser } from "@clerk/clerk-react"
import { Button } from "./components/ui/button"

export default function Example() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }

  return(
   <>
   <h6 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
    Hello {user.firstName}!
    </h6>
    <p>Manage and organize all your documents in one place</p>
    </>
  )
}
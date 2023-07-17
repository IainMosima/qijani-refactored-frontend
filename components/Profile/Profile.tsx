import { useRouter } from 'next/router'
import { User } from "@/models/user";
 
interface ViewUserProfileProps {
    loggedInUser: User
}

const ViewUserProfile=({loggedInUser}: ViewUserProfileProps)=>{
   const userId = loggedInUser._id;
   const navigate = useRouter();
}

export default ViewUserProfile;
// export default function Page() {
    
//     const navigate = useRouter()
//   return <p>Post: {navigate.query.user}</p>
// }
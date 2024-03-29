'use client';

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const  PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  //function Copy button:
  const [copy, setCopy] = useState("")
  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopy(""), 1000);
  }

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card">

      {/* profile div */}
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>

          {/* Creator profile: */}
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          {/* Creator name and email: */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-[#3f3f3e]">{post.creator.username}</h3>
            <p className="font-inter text-sm text-[#fea765] tracking-wide">{post.creator.email}</p>
          </div>
        </div>

        {/* Copy Button: */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copy === post.prompt 
              ? '/assets/icons/tick.svg'
              : 'assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      
      {/* prompt div */}
      <p className="my-4 font-satoshi tracking-wide text-md text-[#3e3e3eb9]">{post.prompt}</p>
      {/* tag div */}
      <p className="font-inter text-sm text-[#676464] cursor-pointer"
         onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {/* This part contains EDIT and DELETE, 
      Only shows in profile path 
      and user and creator should be same */}
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-50 pt-3">
          <p 
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p 
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard

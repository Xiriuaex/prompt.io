
import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'><span className='blue_gradient'>{type} Post</span></h1>
      <p className='desc text-left max-w-md text-[#ededed] ml-3 mt-5'>
        {type} and share amazing prompts with the world.
      </p>

      <form 
        onSubmit={handleSubmit}
        className='sm:mt-[35vh] mt-[63vw] mb-14 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>
          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value})}
            placeholder="Write Your Prompt Here..."
            required
            className='form_textarea'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag
          </span>
          <input 
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value})}
            placeholder="Write tags... (#product, #webdevelopment etc)"
            required
            className='form_input'
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>Cancel</Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...`: type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form

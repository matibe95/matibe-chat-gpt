import { Avatar } from '@/components/Avatar'
import { ChatGPTLogo, PlusIcon, SendIcon } from '@/components/Icons'
import { TypingEffect } from '@/components/TypingEffect'
import Head from 'next/head'

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>matibe Chat GPT</title>
      </Head>
      <div className='w-full relative bg-gptgray h-screen'>
        <Aside />
        {children}
      </div>
    </>
  )
}

function Aside() {
  return (
    <aside className='bg-gptdarkgray fixed flex w-64 h-screen flex-col'>
      <nav className='flex flex-col flex-1 h-full p-2 space-y-1'>
        <button className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
          <PlusIcon />
          New chat
        </button>
      </nav>

    </aside>
  )
}

function UserAvatar() {
  return (
    <img
      alt="Foto de Matibe"
      src='https://avatars.githubusercontent.com/u/111000847?v=4' />
  )
}

function Message({ ia, message }) {
  const avatar = ia ? <ChatGPTLogo /> : <UserAvatar/>
  const textElement = ia ? <TypingEffect text={message}/> : message
  return (
    <div className={`text-gray-100 ${ia ? "bg-gptlightgray" : "bg-gptgray"}`}>
      <article className="flex gap-4 p-6 m-auto max-w-3xl">
        <Avatar>
          {avatar}
        </Avatar>
        <div className='min-h-[20px] flex flex-1 flex-col items-start gap-4 whitespace-pre-wrap'>
          <div class="markdown prose w-full break-words">
            <p>{textElement}</p>
          </div>
        </div>
      </article>
    </div>
  )
}

function Chat() {
  const messages = [
    {
      id: 1,
      ia: false,
      message: 'Explain quantum computing in simple terms'
    },
    {
      id: 1,
      ia: true,
      message: 'Quantum computing is a new type of computing that uses the principles of quantum mechanics to perform operations on data. In traditional computing, a bit can only exist in one of two states, either 0 or 1, whereas in quantum computing, a qubit can exist in multiple states simultaneously, allowing for the computation of multiple outcomes in parallel.'
    },
  ]


  return (
    <div className='flex flex-col h-full flex-1 pl-64'>
      <main>
        {messages.map((entry) => (
          <Message key={entry.id} {...entry}></Message>
        ))}
      </main>
      <ChatForm />
    </div>
  )
}

function ChatForm() {
  return (
    <section className='absolute bottom-0 w-full left-0 right-0 ml-32'>
      <form className='flex flex-row max-w-3xl pt-6 m-auto mb-6'>
        <div className='relative flex flex-col flex-grow w-full px-4 py-3 text-white border rounded-md shadow-lg bg-gptlightgray border-gray-900/50'>
          <textarea className='w-full h-[24px] resize-none bg-transparent m-0 border-0 outline-none' />
          <button className='absolute p-1 rounded-md bottom-2 right-2'><SendIcon /></button>
        </div>
      </form>
    </section>
  )
}

export default function Home() {
  return (
    <Layout>
      <Chat />
    </Layout>
  )
}

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <h1 className='text-5xl font-medium'>Check your email!</h1>
      <p>Please click the link in the email in order to verify your account and continue.</p>
      <p>You can close this page now</p>
      <p>Did not get the email? <a>Click here</a></p>
    </div>
  )
}
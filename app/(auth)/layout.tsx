interface Props  {
    children : React.ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div className='bg-muted min-h-svh flex flex-col p-6 md:p-10 justify-center items-center' >
        <div className='w-full max-w-sm md:max-w-3xl'>
            {children}
        </div>
    </div>
        
)
}

export default Layout
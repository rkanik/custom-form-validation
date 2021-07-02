import TWInput from "./components/utils/TWInput";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-200 grid place-items-center">
      <div className="container mx-auto px-5 md:px-0">
        <div className='p-5 md:py-12 md:px-12 bg-white rounded-md shadow-lg w-full md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto'>
          <h2 className='font-bold text-xl text-gray-800'>Validation Form</h2>
          <div className='text-gray-600'>Customly made vaidations</div>
          <hr className='my-3' />
          <form className='py-4'>
            <TWInput
              rules={[
                v => !!v || 'Field is required.',
                v => v.length >= 3 || 'Data must have at least 3 characters.',
                v => /^[a-zA-Z0-9]+$/.test(v) || 'Data can only have charactera and numbera.'
              ]}
            />
            <hr className='my-8' />
            <TWInput
              required
              hint='e.g: john_doe'
              label='Username'
              helpText='Username can have only characters, numbers and underscore.'
              rules={[
                v => v.length >= 3 || 'Data must have at least 3 characters.',
                v => !/^[0-9]/.test(v) || 'Username Can\'t start with number.',
                v => /^[a-zA-Z0-9_]+$/.test(v) || 'Username can have only characters, numbers and underscore.'
              ]}
            />
            <TWInput
              required
              type='password'
              label='Password'
              className='mt-3'
              hint='Enter your password here'
              helpText='Password must have at least 8 characters.'
              rules={[
                v => v.length >= 8 || 'Password must have at least 8 characters.',
                v => v.length <= 20 || 'Password can\'t have more than 20 characters.',
              ]}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

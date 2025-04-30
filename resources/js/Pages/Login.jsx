import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react'; // import icon
import Swal from 'sweetalert2'; // import swal

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login', {
      onSuccess: () => {
        Swal.fire({
          title: 'Login Berhasil!',
          text: 'Selamat datang di dashboard admin.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
              className="w-full px-4 py-2 border rounded mt-2"
            />
            {errors.username && (
              <div className="text-red-500 text-sm">{errors.username}</div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="w-full px-4 py-2 border rounded mt-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            {processing ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './resources/**/*.blade.php',
      './resources/js/**/*.jsx', // Memastikan file JSX terdeteksi
      './resources/js/**/*.js',  // Jika menggunakan JS untuk React
      './resources/js/Pages/**/*.jsx',  // Mengkonfigurasi path ke halaman-halaman React
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
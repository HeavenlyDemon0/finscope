function OTPVerify() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
      <div className="bg-slate-900 p-8 rounded-2xl w-96 text-center">
        <h2 className="text-2xl text-purple-400 mb-4">
          OTP Verification
        </h2>
        <p className="text-gray-400 mb-6">
          Enter the OTP sent to your phone
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-3 rounded bg-slate-800 mb-4"
        />

        <button className="w-full bg-purple-600 py-3 rounded-xl">
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default OTPVerify;
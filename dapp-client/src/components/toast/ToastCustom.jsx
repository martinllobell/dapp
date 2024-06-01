import { toast } from 'react-hot-toast';

const ToastCustom = ({ message }) => {
  toast.custom(() => (
    <div className=" shadow-xl rounded-xl backdrop-blur-xl text-3xl bg-white/10 drop-shadow-xl right-5 top-5 rounded-lg p-6">
      <h1 className="text-xl font-bold">
        {message}
      </h1>
    </div>
  ));
};

export default ToastCustom;
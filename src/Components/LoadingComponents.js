import { XMarkIcon } from "@heroicons/react/24/outline";

const LoadingSpinner = () => (
  <span className="flex items-center justify-center">
    <XMarkIcon className="animate-spin h-5 w-5 mr-3 text-gray-700 dark:text-white" />
    <p className="animate-pulse text-gray-700 dark:text-white">Loading</p>
  </span>
);

export default LoadingSpinner;

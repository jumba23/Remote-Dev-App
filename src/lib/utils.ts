import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
  let message;

  // Check if the error is an instance of the Error class
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Failed to fetch job items";
  }

  toast.error(message);
};

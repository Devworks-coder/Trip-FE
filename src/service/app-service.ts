import { displayToast } from "../components/toast/toast";

export type AppServiceProps = {
  path: string;
  method: "GET" | "PATCH" | "POST" | "DELETE";
  body?: unknown; // Optional body for POST and PATCH requests
};

export type ResponseType = {
  status: "error" | "success";
  data: any;
  message: string;
};
export const APISERVICE = async ({ path, method, body }: AppServiceProps) => {
  // Construct the URL for the request
  const URL = "http://localhost:8080/api/v1/" + path;
  console.log(URL);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("appToken") || ""}`, // Token from localStorage for auth
  };

  const configs: RequestInit = {
    method,
    headers,
  };

  if (method === "POST" || method === "PATCH") {
    if (body) {
      configs.body = JSON.stringify(body); // Convert the body to JSON format
    } else {
      throw new Error("Body is required for POST or PATCH requests");
    }
  }

  try {
    // Perform the fetch request
    const response = await fetch(URL, configs);

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse and return the JSON response
    const result: ResponseType = await response.json();
    if (result.status == "error") {
      displayToast({ status: "error", description: result.message });
    }

    return result as ResponseType;
  } catch (error) {
    console.log(error);
  }
};

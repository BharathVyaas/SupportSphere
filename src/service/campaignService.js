import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function queryHadler(method) {
  try {
    const res = await fetch(
      `http://localhost:4001/campaign/view-campaigns/${method}`
    );

    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

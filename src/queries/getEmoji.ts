import {QueryClient, QueryClientProvider, useQuery} from "react-query";

function useGetEmojisCategory(category: string) {
  const apiUrl =
    category === "random"
      ? "https://emojihub.yurace.pro/api/random"
      : `https://emojihub.yurace.pro/api/random/category/${category}`;
  return useQuery(["repoData", category], () =>
    fetch(apiUrl).then(res => res.json())
  );
}
export {useGetEmojisCategory};

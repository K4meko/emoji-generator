import {QueryClient, QueryClientProvider, useQuery} from "react-query";
function useGetEmojis() {
  return useQuery("repoData", () =>
    fetch("https://emojihub.yurace.pro/api/random").then(res => res.json())
  );
}

export {useGetEmojis};

interface WieldUserResponse {
  result: {
    user: {
      fid: string;
      username: string;
    };
  };
  source: string;
}

export async function getFidByUsername(
  username: string
): Promise<number | null> {
  try {
    const response = await fetch(
      `https://build.wield.xyz/farcaster/v2/user-by-username?username=${username}`,
      {
        headers: {
          "API-KEY": process.env.NEXT_PUBLIC_WIELD_API_KEY || "",
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error("Failed to fetch user data");
    }

    const data: WieldUserResponse = await response.json();
    return parseInt(data.result.user.fid);
  } catch (error) {
    console.error("Error fetching FID:", error);
    return null;
  }
}

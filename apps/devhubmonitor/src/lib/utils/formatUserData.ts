export function formatUserData (userData: any) {
  return userData.data.map((data: any) => ({
    user: {
      login: data.login,
      avatar_url: data.avatar_url,
      url: data.url,
      name: data.name,
      company: data.company,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
    },
  }));
}

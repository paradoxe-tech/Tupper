type Socials = {
  [key: string]: {
    url: string;
    icon: string;
  }
}

export const supportedSocials: Socials = {
  "instagram": {
    url: "https://instagram.com/$u",
    icon: "logo-instagram",
  },
  "discord": {
    url: "about:blank",
    icon: "logo-discord",
  },
  "linkedin": {
    url: "https://fr.linkedin.com/in/$u",
    icon: "logo-linkedin",
  },
  "reddit": {
    url: "https://reddit.com/u/$u",
    icon: "logo-reddit",
  },
  "facebook": {
    url: "https://facebook.com/$u",
    icon: "logo-facebook",
  },
  "twitter": {
    url: "https://twitter.com/$u",
    icon: "logo-twitter",
  },
  "youtube": {
    url: "https://youtube.com/@$u",
    icon: "logo-youtube",
  },
  "github": {
    url: "https://github.com/$u",
    icon: "logo-github",
  },
  "pinterest": {
    url: "https://pinterest.com/$u",
    icon: "logo-pinterest",
  },
  "tiktok": {
    url: "https://tiktok.com/@$u",
    icon: "logo-tiktok",
  },
  "snapchat": {
    url: "https://snapchat.com/add/$u",
    icon: "logo-snapchat",
  },
  "twitch": {
    url: "https://twitch.tv/$u",
    icon: "logo-twitch",
  },
  "medium": {
    url: "https://medium.com/@$u",
    icon: "logo-medium",
  },
  "stackoverflow": {
    url: "https://stackoverflow.com/users/$u",
    icon: "logo-stackoverflow",
  },
  "whatsapp": {
    url: "https://wa.me/$u",
    icon: "logo-whatsapp",
  },
  "telegram": {
    url: "https://t.me/$u",
    icon: "logo-telegram",
  },
  "spotify": {
    url: "https://open.spotify.com/user/$u",
    icon: "logo-spotify",
  },
};
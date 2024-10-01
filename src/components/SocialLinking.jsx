import {Linking} from 'react-native';

export const openInstagramProfile = () => {
  const username = 'nextworktechnologies';
  const url = `instagram://user?username=${username}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        // Fallback to web URL if the app is not installed
        return Linking.openURL(`https://www.instagram.com/${username}`);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

export const openWebsite = () => {
  const websiteUrl = 'https://www.nextworktechnologies.com'; // Replace with your website URL

  Linking.openURL(websiteUrl).catch(err =>
    console.error('An error occurred', err),
  );
};

export const openWhatsApp = () => {
  const phoneNumber = '+919875982215';
  const url = `whatsapp://send?phone=${phoneNumber}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        return Linking.openURL(`https://wa.me/${phoneNumber}`);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

export const openYouTubeProfile = () => {
  const channelId = 'UCLE1QBCaXlKPlN0NHpEdxNQ';
  const appUrl = `vnd.youtube://channel/${channelId}`;
  const webUrl = `https://www.youtube.com/channel/${channelId}`;

  Linking.openURL(appUrl).catch(() => {
    Linking.openURL(webUrl).catch(err =>
      console.error('An error occurred with the fallback URL', err),
    );
  });
};

export const openSpotifyPodcast = () => {
  console.log('spotify');

  const podcastId = '2MU4uzJpziud0JRg1PnIPh?si=93fe6d898a3f4e71';
  const url = `spotify:show:${podcastId}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        return Linking.openURL(`https://open.spotify.com/show/${podcastId}`);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

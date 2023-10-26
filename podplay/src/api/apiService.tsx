import axios from 'axios';

//this was hosted on a server but temp hosted on client for github pages
var episodes = [
  {
    id: 'short',
    audio: '/audio/short.mp3',
    name: 'Shorty',
    markers: [
      {
        type: 'ad',
        start: 0,
        duration: 10,
        content: 'Do you have an angry mom?',
        link: 'https://en.wikipedia.org/wiki/Angry_Mom',
      },
      { type: 'text', start: 10, duration: 10, content: 'This is a text, yo!' },
      { type: 'image', start: 20, duration: 5, content: '/images/image01.jpg' },
      {
        type: 'ad',
        start: 30,
        duration: 10,
        content: 'Become a member of the Moth Union.',
        link: 'https://en.wikipedia.org/wiki/Nymphicula_xanthobathra',
      },
    ],
  },
  {
    id: 'long',
    audio: '/audio/long.mp3',
    name: 'Long John Silver',
    markers: [
      {
        type: 'ad',
        start: 0,
        duration: 5,
        content: 'Visit Treasure Island Today!',
        link: 'https://en.wikipedia.org/wiki/Long_John_Silver',
      },
      { type: 'image', start: 5, duration: 75, content: '/images/image02.jpg' },
      {
        type: 'ad',
        start: 80,
        duration: 15,
        content: 'Vacation at Peytons Brook!',
        link: 'https://en.wikipedia.org/wiki/Peytons_Brook',
      },
      { type: 'text', start: 100, duration: 20, content: 'Some text.' },
      { type: 'text', start: 125, duration: 5, content: 'Another text.' },
      {
        type: 'image',
        start: 140,
        duration: 10,
        content: '/images/image03.jpg',
      },
      {
        type: 'ad',
        start: 152,
        duration: 11,
        content: 'Play with Pedro!',
        link: 'https://en.wikipedia.org/wiki/Pedro_Ant%C3%B3nio_Coelho_Moreira',
      },
    ],
  },
];

const apiUrl = 'http://localhost:1337';

export const apiService = {
  getAllEpisodes: async () => {
    try {
      // const { data } = await axios.get(`${apiUrl}/episodes`);
      return episodes;
    } catch (error: any) {
      console.log(error);
    }
  },

  getEpisodeById: async (id: string) => {
    try {
      // const episode = await fetch(`${apiUrl}/episodes/${id}`);
      if (id === 'short') {
        return episodes[0];
      } else {
        return episodes[1];
      }
      // return episode;
    } catch (error: any) {
      console.log(error);
    }
  },
};

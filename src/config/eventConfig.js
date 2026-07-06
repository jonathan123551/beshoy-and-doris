/**
 * Centralized Event Configuration
 * ================================
 * Change ALL event details from this single file.
 * Every component reads from this configuration.
 */

import photo01 from '../assets/couple/photo-01.jpg';
import photo02 from '../assets/couple/photo-02.jpg';

export const eventConfig = {
  // ─── Couple Names ───
  brideName: 'Doris',
  groomName: 'Beshoy',

  // ─── Event Date & Time ───
  date: '2026-11-14',
  time: '17:00',
  displayDate: '14 November 2026',
  displayDay: 'Saturday',
  displayTime: '5:00 PM',

  // ─── Ceremony ───
  church: {
    name: 'Church of Archangel Michael',
    area: 'Sheraton',
    mapUrl: 'https://maps.app.goo.gl/8on9xhmV9xnS9zPG7?g_st=ic',
  },

  // ─── Reception ───
  reception: {
    name: 'La Pensée',
    area: 'Gardenia',
    mapUrl: 'https://maps.app.goo.gl/SMVCau5jSZhje6fh7?g_st=ic',
  },

  // ─── Couple Photos ───
  // Add more photos to this array as they become available.
  // The PhotoStory component will automatically adapt:
  //   1 photo  → Single hero cinematic mode
  //   2 photos → Dual editorial mode
  //   3+ photos → Cinematic sequence mode
  couplePhotos: [
    {
      src: photo01,
      alt: 'Beshoy and Doris',
      orientation: 'portrait',
      objectPositionMobile: '50% 35%',
      objectPositionDesktop: '50% 40%',
    },
    {
      src: photo02,
      alt: 'Beshoy and Doris',
      orientation: 'portrait',
      objectPositionMobile: '50% 30%',
      objectPositionDesktop: '50% 35%',
    },
  ],

  // ─── Meta / SEO ───
  meta: {
    title: 'Beshoy & Doris — 14 November 2026',
    description:
      'You are invited to celebrate the wedding of Beshoy and Doris. 14 November 2026 at 5:00 PM.',
    ogImage: '/og-image.jpg',
    themeColor: '#0B0A09',
  },
};

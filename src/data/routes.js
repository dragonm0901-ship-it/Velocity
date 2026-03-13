// Realistic/Approximate GPS coordinates for 21 treks in Nepal
export const trekRoutes = {
  'Everest Base Camp': {
    center: [27.9881, 86.925], zoom: 10,
    waypoints: [
      [27.6872, 86.7316, 'Lukla (2,860m)'], [27.7085, 86.7133, 'Phakding (2,610m)'],
      [27.8063, 86.7104, 'Namche Bazaar (3,440m)'], [27.8371, 86.7673, 'Tengboche (3,860m)'],
      [27.8656, 86.8113, 'Dingboche (4,410m)'], [27.9098, 86.8296, 'Lobuche (4,940m)'],
      [27.9353, 86.8296, 'Gorak Shep (5,164m)'], [28.0025, 86.8528, 'EBC (5,364m)'],
    ], crowd: 'red',
  },
  'Gokyo Lakes': {
    center: [27.95, 86.7], zoom: 10,
    waypoints: [
      [27.6872, 86.7316, 'Lukla (2,860m)'], [27.8063, 86.7104, 'Namche (3,440m)'],
      [27.8427, 86.7214, 'Dole (4,110m)'], [27.8864, 86.7142, 'Machhermo (4,470m)'],
      [27.9542, 86.6946, 'Gokyo (4,790m)'], [27.9592, 86.6852, 'Gokyo Ri (5,357m)'],
    ], crowd: 'yellow',
  },
  'Three Passes Trek': {
    center: [27.9, 86.8], zoom: 10,
    waypoints: [
      [27.8063, 86.7104, 'Namche (3,440m)'], [27.8656, 86.8113, 'Dingboche (4,410m)'],
      [27.9030, 86.8530, 'Kongma La (5,535m)'], [27.9542, 86.6946, 'Gokyo (4,790m)'],
      [27.9150, 86.6430, 'Renjo La (5,360m)'], [27.8350, 86.6340, 'Thame (3,800m)'],
    ], crowd: 'yellow',
  },
  'Annapurna Circuit': {
    center: [28.6, 84.2], zoom: 9,
    waypoints: [
      [28.2698, 84.3729, 'Besisahar (760m)'], [28.4757, 84.3650, 'Chame (2,670m)'],
      [28.6321, 84.1291, 'Manang (3,540m)'], [28.7982, 83.9338, 'Thorong La (5,416m)'],
      [28.8048, 83.8706, 'Muktinath (3,760m)'], [28.6898, 83.6466, 'Jomsom (2,720m)'],
    ], crowd: 'yellow',
  },
  'Annapurna Base Camp': {
    center: [28.53, 83.87], zoom: 10,
    waypoints: [
      [28.2982, 83.7744, 'Nayapul (1,070m)'], [28.3751, 83.8153, 'Ghandruk (1,940m)'],
      [28.4143, 83.8183, 'Chhomrong (2,170m)'], [28.4893, 83.8643, 'Deurali (3,230m)'],
      [28.5143, 83.8778, 'MBC (3,700m)'], [28.5303, 83.8780, 'ABC (4,130m)'],
    ], crowd: 'red',
  },
  'Mardi Himal': {
    center: [28.4, 83.9], zoom: 11,
    waypoints: [
      [28.2466, 83.9488, 'Kande (1,770m)'], [28.3500, 83.8700, 'Forest Camp (2,550m)'],
      [28.4200, 83.8500, 'High Camp (3,580m)'], [28.4900, 83.8800, 'Mardi BC (4,500m)'],
    ], crowd: 'green',
  },
  'Poon Hill': {
    center: [28.4, 83.7], zoom: 11,
    waypoints: [
      [28.2982, 83.7744, 'Nayapul (1,070m)'], [28.3512, 83.7381, 'Tikhedhunga (1,540m)'],
      [28.3995, 83.6993, 'Ghorepani (2,874m)'], [28.4023, 83.6908, 'Poon Hill (3,210m)'],
      [28.3751, 83.8153, 'Ghandruk (1,940m)'],
    ], crowd: 'red',
  },
  'Khopra Danda': {
    center: [28.45, 83.7], zoom: 11,
    waypoints: [
      [28.3995, 83.6993, 'Ghorepani (2,874m)'], [28.4520, 83.7250, 'Swanta (2,270m)'],
      [28.4850, 83.6820, 'Khopra Danda (3,660m)'], [28.5200, 83.7000, 'Khayer Lake (4,600m)'],
    ], crowd: 'green',
  },
  'Langtang Valley': {
    center: [28.2, 85.5], zoom: 10,
    waypoints: [
      [28.1652, 85.3340, 'Syabrubesi (1,550m)'], [28.1880, 85.4200, 'Lama Hotel (2,380m)'],
      [28.2140, 85.5000, 'Langtang (3,430m)'], [28.2110, 85.5670, 'Kyanjin Gompa (3,870m)'],
      [28.2250, 85.5680, 'Kyanjin Ri (4,773m)'],
    ], crowd: 'yellow',
  },
  'Gosainkunda Lakes': {
    center: [28.08, 85.4], zoom: 11,
    waypoints: [
      [28.1064, 85.2970, 'Dhunche (1,950m)'], [28.0920, 85.3500, 'Chandanbari (3,330m)'],
      [28.0840, 85.4140, 'Gosainkunda (4,380m)'], [28.0600, 85.4500, 'Laurebina Pass (4,610m)'],
    ], crowd: 'yellow',
  },
  'Tamang Heritage Trail': {
    center: [28.25, 85.3], zoom: 11,
    waypoints: [
      [28.1652, 85.3340, 'Syabrubesi (1,550m)'], [28.2100, 85.2800, 'Gatlang (2,238m)'],
      [28.2600, 85.3100, 'Tatopani (2,607m)'], [28.2150, 85.3600, 'Briddim (2,229m)'],
    ], crowd: 'green',
  },
  'Manaslu Circuit': {
    center: [28.5, 84.7], zoom: 9,
    waypoints: [
      [28.1500, 84.8500, 'Soti Khola (700m)'], [28.3200, 84.8800, 'Jagat (1,340m)'],
      [28.5200, 84.7800, 'Namrung (2,660m)'], [28.5800, 84.6300, 'Samagaon (3,530m)'],
      [28.6500, 84.5200, 'Larkya La (5,106m)'], [28.5300, 84.4500, 'Bimthang (3,590m)'],
    ], crowd: 'green',
  },
  'Tsum Valley': {
    center: [28.4, 85.0], zoom: 10,
    waypoints: [
      [28.3200, 84.8800, 'Jagat (1,340m)'], [28.3800, 84.9200, 'Lokpa (2,240m)'],
      [28.4500, 85.0200, 'Chhokangparo (3,010m)'], [28.5200, 85.0800, 'Mu Gompa (3,700m)'],
    ], crowd: 'green',
  },
  'Upper Mustang': {
    center: [29.0, 83.9], zoom: 9,
    waypoints: [
      [28.6898, 83.6466, 'Jomsom (2,720m)'], [28.8375, 83.7820, 'Kagbeni (2,810m)'],
      [28.9400, 83.8200, 'Chele (3,050m)'], [29.1800, 83.9500, 'Lo Manthang (3,840m)'],
    ], crowd: 'green',
  },
  'Lower Mustang': {
    center: [28.7, 83.7], zoom: 10,
    waypoints: [
      [28.6898, 83.6466, 'Jomsom (2,720m)'], [28.8375, 83.7820, 'Kagbeni (2,810m)'],
      [28.8048, 83.8706, 'Muktinath (3,710m)'], [28.6650, 83.6300, 'Marpha (2,670m)'],
    ], crowd: 'yellow',
  },
  'Kanchenjunga Base Camp': {
    center: [27.6, 88.0], zoom: 9,
    waypoints: [
      [27.3500, 87.6700, 'Suketar (2,420m)'], [27.6600, 87.9300, 'Ghunsa (3,595m)'],
      [27.7800, 88.0000, 'Pangpema (5,143m)'], [27.5600, 87.9800, 'Oktang BC (4,730m)'],
    ], crowd: 'green',
  },
  'Makalu Base Camp': {
    center: [27.8, 87.1], zoom: 9,
    waypoints: [
      [27.3200, 87.1900, 'Tumlingtar (400m)'], [27.5800, 87.2300, 'Tashigaon (2,100m)'],
      [27.7400, 87.1600, 'Khumbila (3,890m)'], [27.8600, 87.0800, 'Makalu BC (4,870m)'],
    ], crowd: 'green',
  },
  'Upper Dolpo': {
    center: [29.3, 83.0], zoom: 8,
    waypoints: [
      [28.9800, 82.8200, 'Juphal (2,475m)'], [29.0700, 82.9500, 'Phoksundo Lake (3,600m)'],
      [29.3400, 83.0200, 'Shey Gompa (4,160m)'], [29.4000, 83.1500, 'Saldang (3,770m)'],
    ], crowd: 'green',
  },
  'Rara Lake': {
    center: [29.5, 82.0], zoom: 10,
    waypoints: [
      [29.5400, 82.1100, 'Talcha (2,735m)'], [29.5200, 82.0800, 'Rara Lake (2,990m)'],
      [29.5000, 82.0500, 'Murma Top (3,600m)'],
    ], crowd: 'green',
  },
  'Dhaulagiri Circuit': {
    center: [28.7, 83.4], zoom: 9,
    waypoints: [
      [28.3400, 83.5600, 'Beni (830m)'], [28.6000, 83.3500, 'Italian Base Camp (3,660m)'],
      [28.7200, 83.4000, 'Dhaulagiri BC (4,740m)'], [28.7600, 83.4500, 'French Pass (5,360m)'],
      [28.7600, 83.6000, 'Marpha (2,670m)'],
    ], crowd: 'green',
  },
  'Tsum Valley to Manaslu': {
    center: [28.5, 84.9], zoom: 8,
    waypoints: [
      [28.1500, 84.8500, 'Soti Khola (700m)'], [28.5200, 85.0800, 'Mu Gompa (3,700m)'],
      [28.5200, 84.7800, 'Namrung (2,660m)'], [28.6500, 84.5200, 'Larkya La (5,106m)'],
    ], crowd: 'green',
  }
};

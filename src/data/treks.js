export const crowdColors = { green: '#16a34a', yellow: '#eab308', red: '#dc2626' };
export const crowdLabels = { green: 'Low Crowd', yellow: 'Moderate', red: 'Busy' };

export const treks = [
  // 1. Everest Region
  {
    id: 1, name: 'Everest Base Camp', difficulty: 'hard', days: 14, interests: ['mountains', 'culture'], altitude: '5,364m', price: 1400, crowd: 'red',
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    description: "The classic trek to the foot of the world's highest peak. Pass through Sherpa villages, ancient monasteries, and breathtaking mountain vistas.",
    itinerary: [
      { day: 1, place: 'Kathmandu', desc: 'Arrive and hotel check-in. Team briefing and gear check.', alt: '1,400m' },
      { day: 2, place: 'Kathmandu → Lukla → Phakding', desc: 'Scenic flight to Lukla. Trek to Phakding.', alt: '2,610m' },
      { day: 3, place: 'Phakding → Namche Bazaar', desc: 'Cross suspension bridges, climb to Namche.', alt: '3,440m' },
      { day: 4, place: 'Namche Bazaar', desc: 'Acclimatization day. Visit Sherpa museum.', alt: '3,440m' },
      { day: 5, place: 'Namche → Tengboche', desc: 'Trek through forests to Tengboche monastery.', alt: '3,860m' },
      { day: 6, place: 'Tengboche → Dingboche', desc: 'Descend to river, then climb to Dingboche.', alt: '4,410m' },
      { day: 7, place: 'Dingboche', desc: 'Acclimatization. Hike to Nangkartshang Peak.', alt: '4,410m' },
      { day: 8, place: 'Dingboche → Lobuche', desc: 'Pass Dughla and memorial cairns.', alt: '4,940m' },
      { day: 9, place: 'Lobuche → Gorak Shep → EBC', desc: 'Trek to Everest Base Camp!', alt: '5,364m' },
      { day: 10, place: 'Gorak Shep → Kala Patthar', desc: 'Pre-dawn hike for sunrise Everest views.', alt: '5,545m' },
      { day: 11, place: 'Gorak Shep → Pheriche', desc: 'Descend through the valley.', alt: '4,240m' },
      { day: 12, place: 'Pheriche → Namche', desc: 'Long descent back to Namche.', alt: '3,440m' },
      { day: 13, place: 'Namche → Lukla', desc: 'Final trek. Celebration dinner.', alt: '2,860m' },
      { day: 14, place: 'Lukla → Kathmandu', desc: 'Morning flight back. Trip complete!', alt: '1,400m' },
    ]
  },
  {
    id: 2, name: 'Gokyo Lakes', difficulty: 'hard', days: 13, interests: ['mountains', 'offbeat'], altitude: '5,357m', price: 1350, crowd: 'yellow',
    image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=800&auto=format&fit=crop",
    description: "A spectacular alternative to EBC, featuring pristine turquoise alpine lakes and the magnificent Gokyo Ri viewpoint.",
    itinerary: [
      { day: 1, place: 'Kathmandu → Lukla → Phakding', desc: 'Flight to Lukla, trek to Phakding.', alt: '2,610m' },
      { day: 2, place: 'Phakding → Namche Bazaar', desc: 'Climb to the Sherpa capital.', alt: '3,440m' },
      { day: 3, place: 'Namche Bazaar', desc: 'Acclimatization day.', alt: '3,440m' },
      { day: 4, place: 'Namche → Dole', desc: 'Leave main EBC trail, head up Dudh Kosi valley.', alt: '4,110m' },
      { day: 5, place: 'Dole → Machhermo', desc: 'Short climb to Machhermo.', alt: '4,470m' },
      { day: 6, place: 'Machhermo → Gokyo', desc: 'First views of the turquoise lakes.', alt: '4,790m' },
      { day: 7, place: 'Gokyo Ri', desc: 'Sunrise hike for panoramic views, including Everest.', alt: '5,357m' },
      { day: 8, place: 'Gokyo → Dole', desc: 'Begin the descent back down the valley.', alt: '4,110m' },
      { day: 9, place: 'Dole → Namche Bazaar', desc: 'Long descent to Namche.', alt: '3,440m' },
      { day: 10, place: 'Namche → Lukla', desc: 'Final trekking day.', alt: '2,860m' },
      { day: 11, place: 'Lukla → Kathmandu', desc: 'Fly back to Kathmandu.', alt: '1,400m' },
    ]
  },
  {
    id: 3, name: 'Three Passes Trek', difficulty: 'hard', days: 20, interests: ['mountains', 'extreme'], altitude: '5,535m', price: 1800, crowd: 'yellow',
    image: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=800&auto=format&fit=crop",
    description: "The ultimate Everest circuit crossing Kongma La, Cho La, and Renjo La passes. For experienced trekkers only.",
    itinerary: [
      { day: 1, place: 'Lukla → Phakding', desc: 'Arrive and start trek.', alt: '2,610m' },
      { day: 5, place: 'Dingboche → Chhukung', desc: 'Head towards the first pass.', alt: '4,730m' },
      { day: 7, place: 'Kongma La Pass → Lobuche', desc: 'Cross 5,535m pass.', alt: '4,940m' },
      { day: 10, place: 'Cho La Pass → Gokyo', desc: 'Cross 5,420m pass over glacier.', alt: '4,790m' },
      { day: 14, place: 'Renjo La Pass → Lungden', desc: 'Cross 5,360m pass with Mt. Everest views.', alt: '4,368m' },
      { day: 20, place: 'Lukla → Kathmandu', desc: 'Conclusion.', alt: '1,400m' },
    ]
  },
  // 2. Annapurna Region
  {
    id: 4, name: 'Annapurna Circuit', difficulty: 'hard', days: 18, interests: ['mountains', 'diversity'], altitude: '5,416m', price: 1200, crowd: 'yellow',
    image: "https://images.unsplash.com/photo-1588693959604-db5eec931566?q=80&w=800&auto=format&fit=crop",
    description: "A legendary route circling the Annapurna massif through diverse landscapes—from lush rice paddies to high desert plateaus.",
    itinerary: [
      { day: 1, place: 'Kathmandu → Besisahar', desc: 'Drive to Besisahar trailhead.', alt: '760m' },
      { day: 3, place: 'Bahundanda → Chamje', desc: 'Follow the Marsyangdi River valley.', alt: '1,410m' },
      { day: 7, place: 'Upper Pisang → Manang', desc: 'Dramatic mountain scenery.', alt: '3,540m' },
      { day: 11, place: 'Thorong La Pass → Muktinath', desc: 'Cross the 5,416m pass!', alt: '3,760m' },
      { day: 14, place: 'Ghasa → Tatopani', desc: 'Hot springs village!', alt: '1,190m' },
      { day: 16, place: 'Ghorepani → Poon Hill', desc: 'Famous sunrise point.', alt: '3,210m' },
      { day: 18, place: 'Pokhara → Kathmandu', desc: 'Drive back.', alt: '1,400m' },
    ]
  },
  {
    id: 5, name: 'Annapurna Base Camp', difficulty: 'moderate', days: 12, interests: ['mountains'], altitude: '4,130m', price: 900, crowd: 'red',
    image: "https://images.unsplash.com/photo-1517584343160-5f284ded0915?q=80&w=800&auto=format&fit=crop",
    description: "Trek directly into the heart of the Annapurna Sanctuary, surrounded by a 360-degree amphitheater of peaks.",
    itinerary: [
      { day: 1, place: 'Pokhara → Nayapul → Ghandruk', desc: 'Drive and trek to Gurung village.', alt: '1,940m' },
      { day: 3, place: 'Ghandruk → Chhomrong', desc: 'Descend to river and climb.', alt: '2,170m' },
      { day: 5, place: 'Chhomrong → Dovan', desc: 'Trek through bamboo forests.', alt: '2,600m' },
      { day: 7, place: 'Dovan → MBC → ABC', desc: 'Reach Machhapuchhre BC, then Annapurna BC.', alt: '4,130m' },
      { day: 9, place: 'ABC → Bamboo', desc: 'Long descent out of the sanctuary.', alt: '2,310m' },
      { day: 12, place: 'Nayapul → Pokhara', desc: 'Drive back to Pokhara.', alt: '827m' },
    ]
  },
  {
    id: 6, name: 'Mardi Himal', difficulty: 'moderate', days: 7, interests: ['mountains', 'offbeat'], altitude: '4,500m', price: 600, crowd: 'green',
    image: "https://images.unsplash.com/photo-1510662145379-13537db782dc?q=80&w=800&auto=format&fit=crop",
    description: "A shorter, off-the-beaten-path trek offering stunning close-up views of Machhapuchhre and the Annapurna range.",
    itinerary: [
      { day: 1, place: 'Pokhara → Kande → Pothana', desc: 'Drive to Kande, trek to Pothana village.', alt: '1,890m' },
      { day: 2, place: 'Pothana → Forest Camp', desc: 'Trek through dense rhododendron forest.', alt: '2,550m' },
      { day: 3, place: 'Forest Camp → Low Camp', desc: 'Enter the alpine ridge.', alt: '2,990m' },
      { day: 4, place: 'Low Camp → High Camp', desc: 'Stunning views of Machhapuchhre open up.', alt: '3,580m' },
      { day: 5, place: 'High Camp → Mardi Himal BC', desc: 'Summit day! Base camp at 4,500m.', alt: '4,500m' },
      { day: 6, place: 'Mardi Himal BC → Siding', desc: 'Descend via alternative route.', alt: '1,750m' },
      { day: 7, place: 'Siding → Pokhara', desc: 'Drive to Pokhara.', alt: '827m' },
    ]
  },
  {
    id: 7, name: 'Poon Hill', difficulty: 'easy', days: 5, interests: ['sunrise', 'culture'], altitude: '3,210m', price: 400, crowd: 'red',
    image: "https://images.unsplash.com/photo-1581452906190-3882747161b3?q=80&w=800&auto=format&fit=crop",
    description: "A short, easy trek famous for its stunning golden sunrise over the Dhaulagiri and Annapurna ranges.",
    itinerary: [
      { day: 1, place: 'Pokhara → Nayapul → Tikhedhunga', desc: 'Drive and short trek.', alt: '1,540m' },
      { day: 2, place: 'Tikhedhunga → Ghorepani', desc: 'Stone steps through villages.', alt: '2,874m' },
      { day: 3, place: 'Poon Hill sunrise → Tadapani', desc: 'Pre-dawn hike, then trek.', alt: '2,630m' },
      { day: 4, place: 'Tadapani → Ghandruk', desc: 'Cultural village visit.', alt: '1,940m' },
      { day: 5, place: 'Ghandruk → Pokhara', desc: 'Descend and drive.', alt: '827m' },
    ]
  },
  {
    id: 8, name: 'Khopra Danda', difficulty: 'moderate', days: 8, interests: ['mountains', 'offbeat'], altitude: '3,660m', price: 650, crowd: 'green',
    image: "https://images.unsplash.com/photo-1544735716-43b9e4a3c200?q=80&w=800&auto=format&fit=crop",
    description: "An incredible ridge trek near Annapurna offering community lodge stays and a trip to the sacred Khayer Lake.",
    itinerary: [
      { day: 1, place: 'Pokhara → Ghandruk', desc: 'Start trek.', alt: '1,940m' },
      { day: 3, place: 'Tadapani → Dobato', desc: 'Off main trails.', alt: '3,420m' },
      { day: 5, place: 'Dobato → Khopra Danda', desc: 'Ridge views.', alt: '3,660m' },
      { day: 6, place: 'Khopra Danda (Khayer Lake)', desc: 'Optional hike to 4,600m lake.', alt: '4,600m' },
      { day: 8, place: 'Tatopani → Pokhara', desc: 'Drive back.', alt: '827m' },
    ]
  },
  // 3. Langtang & Helambu
  {
    id: 9, name: 'Langtang Valley', difficulty: 'moderate', days: 10, interests: ['culture', 'mountains'], altitude: '3,870m', price: 700, crowd: 'yellow',
    image: "https://images.unsplash.com/photo-1628169212023-e66fa61d02c6?q=80&w=800&auto=format&fit=crop",
    description: "The 'Valley of Glaciers'. Quick access from Kathmandu, offering Tamang culture and rebuilt mountain villages.",
    itinerary: [
      { day: 1, place: 'Kathmandu → Syabrubesi', desc: 'Drive.', alt: '1,550m' },
      { day: 3, place: 'Lama Hotel → Langtang Village', desc: 'Follow river.', alt: '3,430m' },
      { day: 4, place: 'Langtang → Kyanjin Gompa', desc: 'Monastery.', alt: '3,870m' },
      { day: 5, place: 'Kyanjin Ri', desc: 'Viewpoint hike.', alt: '4,773m' },
      { day: 10, place: 'Syabrubesi → Kathmandu', desc: 'Drive back.', alt: '1,400m' },
    ]
  },
  {
    id: 10, name: 'Gosainkunda Lakes', difficulty: 'moderate', days: 7, interests: ['culture'], altitude: '4,380m', price: 550, crowd: 'yellow',
    image: "https://images.unsplash.com/photo-1512401826027-04c97eb70b13?q=80&w=800&auto=format&fit=crop",
    description: "A pilgrimage route connecting sacred frozen lakes high in the Langtang National Park.",
    itinerary: [
      { day: 1, place: 'Kathmandu → Dhunche', desc: 'Drive.', alt: '1,950m' },
      { day: 3, place: 'Dhunche → Chandanbari', desc: 'Pine forests.', alt: '3,330m' },
      { day: 4, place: 'Chandanbari → Gosainkunda', desc: 'Sacred lakes.', alt: '4,380m' },
      { day: 7, place: 'Dhunche → Kathmandu', desc: 'Drive back.', alt: '1,400m' },
    ]
  },
  {
    id: 11, name: 'Tamang Heritage Trail', difficulty: 'easy', days: 8, interests: ['culture', 'diversity'], altitude: '3,165m', price: 600, crowd: 'green',
    image: "https://images.unsplash.com/photo-1627916298647-750c187bc97b?q=80&w=800&auto=format&fit=crop",
    description: "Immerse yourself in Tibetan/Tamang culture, homestays, and hot springs near the Tibetan border.",
    itinerary: [
      { day: 1, place: 'Kathmandu → Syabrubesi', desc: 'Drive.', alt: '1,550m' },
      { day: 2, place: 'Syabrubesi → Gatlang', desc: 'Traditional village.', alt: '2,238m' },
      { day: 4, place: 'Gatlang → Tatopani', desc: 'Hot springs.', alt: '2,607m' },
      { day: 6, place: 'Tatopani → Briddim', desc: 'Homestay experience.', alt: '2,229m' },
      { day: 8, place: 'Syabrubesi → Kathmandu', desc: 'Drive back.', alt: '1,400m' },
    ]
  },
  // 4. Manaslu Region
  {
    id: 12, name: 'Manaslu Circuit', difficulty: 'hard', days: 16, interests: ['mountains', 'offbeat'], altitude: '5,106m', price: 1500, crowd: 'green',
    image: "https://images.unsplash.com/photo-1582200230353-93dfd53716d4?q=80&w=800&auto=format&fit=crop",
    description: "A remote, less crowded alternative to Annapurna Circuit crossing the epic Larkya La pass.",
    itinerary: [
      { day: 1, place: 'Kathmandu → Soti Khola', desc: 'Long drive.', alt: '700m' },
      { day: 6, place: 'Namrung → Samagaon', desc: 'Views of Manaslu.', alt: '3,530m' },
      { day: 10, place: 'Larkya La Pass → Bimthang', desc: 'Cross 5,106m pass!', alt: '3,590m' },
      { day: 16, place: 'Dharapani → Kathmandu', desc: 'Drive back.', alt: '1,400m' },
    ]
  },
  {
    id: 13, name: 'Tsum Valley', difficulty: 'hard', days: 18, interests: ['culture', 'offbeat'], altitude: '3,700m', price: 1650, crowd: 'green',
    image: "https://images.unsplash.com/photo-1544735716-cf4c02287f32?q=80&w=800&auto=format&fit=crop",
    description: "A hidden valley of ancient Tibetan Buddhism, centuries-old monasteries, and untouched culture.",
    itinerary: [
      { day: 1, place: 'Kathmandu → Soti Khola', desc: 'Drive.', alt: '700m' },
      { day: 5, place: 'Jagat → Lokpa', desc: 'Enter Tsum Valley.', alt: '2,240m' },
      { day: 8, place: 'Chhokangparo → Nile', desc: 'Monasteries.', alt: '3,361m' },
      { day: 10, place: 'Mu Gompa', desc: 'Highest point.', alt: '3,700m' },
      { day: 18, place: 'Soti Khola → Kathmandu', desc: 'Drive back.', alt: '1,400m' },
    ]
  },
  // 5. Mustang Region
  {
    id: 14, name: 'Upper Mustang', difficulty: 'moderate', days: 14, interests: ['culture', 'diversity'], altitude: '3,840m', price: 1800, crowd: 'green',
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop",
    description: "Trek into the forbidden kingdom of Lo Manthang, featuring striking high-desert landscapes and ancient cave dwellings.",
    itinerary: [
      { day: 1, place: 'Pokhara → Jomsom → Kagbeni', desc: 'Fly in.', alt: '2,810m' },
      { day: 3, place: 'Kagbeni → Chele', desc: 'Enter restricted area.', alt: '3,050m' },
      { day: 7, place: 'Lo Manthang', desc: 'Explore the walled city.', alt: '3,840m' },
      { day: 14, place: 'Jomsom → Pokhara', desc: 'Fly out.', alt: '827m' },
    ]
  },
  {
    id: 15, name: 'Lower Mustang', difficulty: 'easy', days: 7, interests: ['culture', 'mountains'], altitude: '3,710m', price: 700, crowd: 'yellow',
    image: "https://images.unsplash.com/photo-1627885474647-7557c5d42fd6?q=80&w=800&auto=format&fit=crop",
    description: "Experience the dramatic Kali Gandaki gorge, apple orchards of Marpha, and the sacred temple of Muktinath.",
    itinerary: [
      { day: 1, place: 'Pokhara → Jomsom', desc: 'Fly or drive.', alt: '2,720m' },
      { day: 3, place: 'Jomsom → Muktinath', desc: 'Temple visit.', alt: '3,710m' },
      { day: 5, place: 'Muktinath → Marpha', desc: 'Apple capital.', alt: '2,670m' },
      { day: 7, place: 'Jomsom → Pokhara', desc: 'Return.', alt: '827m' },
    ]
  },
  // 6. Far East (Kanchenjunga & Makalu)
  {
    id: 16, name: 'Kanchenjunga Base Camp', difficulty: 'hard', days: 22, interests: ['extreme', 'offbeat'], altitude: '5,143m', price: 2200, crowd: 'green',
    image: "https://images.unsplash.com/photo-1544735716-e574d6d6a13d?q=80&w=800&auto=format&fit=crop",
    description: "Journey to the 3rd highest mountain in the world. Extremely remote, long, and pristine wilderness.",
    itinerary: [
      { day: 1, place: 'Kathmandu → Suketar', desc: 'Fly east.', alt: '2,420m' },
      { day: 10, place: 'Ghunsa → Pangpema', desc: 'North Base Camp.', alt: '5,143m' },
      { day: 16, place: 'Ramche → Oktang', desc: 'South Base Camp.', alt: '4,730m' },
      { day: 22, place: 'Suketar → Kathmandu', desc: 'Return.', alt: '1,400m' },
    ]
  },
  {
    id: 17, name: 'Makalu Base Camp', difficulty: 'hard', days: 17, interests: ['mountains', 'offbeat'], altitude: '4,870m', price: 1700, crowd: 'green',
    image: "https://images.unsplash.com/photo-1546205809-54fb27021eb3?q=80&w=800&auto=format&fit=crop",
    description: "Deep valleys, high passes, and complete isolation leading to the base of the mighty Makalu.",
    itinerary: [
      { day: 1, place: 'Kathmandu → Tumlingtar', desc: 'Fly.', alt: '400m' },
      { day: 10, place: 'Khumbila → Makalu BC', desc: 'Arrive at base camp.', alt: '4,870m' },
      { day: 17, place: 'Tumlingtar → Kathmandu', desc: 'Fly back.', alt: '1,400m' },
    ]
  },
  // 7. Far West (Dolpo & Rara)
  {
    id: 18, name: 'Upper Dolpo', difficulty: 'hard', days: 24, interests: ['culture', 'extreme'], altitude: '5,300m', price: 3000, crowd: 'green',
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    description: "Follow the Snow Leopard. Ancient Bon Buddhism, Shey Phoksundo Lake, and severe isolation.",
    itinerary: [
      { day: 1, place: 'Nepalgunj → Juphal', desc: 'Fly to Dolpo.', alt: '2,475m' },
      { day: 5, place: 'Phoksundo Lake', desc: 'Aquamarine lake.', alt: '3,600m' },
      { day: 12, place: 'Shey Gompa', desc: 'Crystal Mountain.', alt: '4,160m' },
      { day: 24, place: 'Juphal → Kathmandu', desc: 'Return flight.', alt: '1,400m' },
    ]
  },
  {
    id: 19, name: 'Rara Lake', difficulty: 'moderate', days: 10, interests: ['nature', 'offbeat'], altitude: '2,990m', price: 1100, crowd: 'green',
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", // placeholder
    description: "Trek to Nepal's largest and most pristine alpine lake, surrounded by pine forests.",
    itinerary: [
      { day: 1, place: 'Nepalgunj → Talcha', desc: 'Fly.', alt: '2,735m' },
      { day: 3, place: 'Talcha → Rara Lake', desc: 'Arrive at lake.', alt: '2,990m' },
      { day: 5, place: 'Murma Top', desc: 'Lake viewpoint.', alt: '3,600m' },
      { day: 10, place: 'Talcha → Kathmandu', desc: 'Return.', alt: '1,400m' },
    ]
  },
  // 8. Dhaulagiri
  {
    id: 20, name: 'Dhaulagiri Circuit', difficulty: 'hard', days: 18, interests: ['extreme', 'mountains'], altitude: '5,360m', price: 2100, crowd: 'green',
    image: "https://images.unsplash.com/photo-1628169212023-e66fa61d02c6?q=80&w=800&auto=format&fit=crop",
    description: "A highly challenging camping trek over French Pass and Dhampus Pass beside the sheer Dhaulagiri wall.",
    itinerary: [
      { day: 1, place: 'Pokhara → Beni', desc: 'Drive.', alt: '830m' },
      { day: 9, place: 'Dhaulagiri BC', desc: 'Base camp.', alt: '4,740m' },
      { day: 11, place: 'French Pass', desc: 'Cross pass.', alt: '5,360m' },
      { day: 14, place: 'Marpha', desc: 'Descend to civilization.', alt: '2,670m' },
      { day: 18, place: 'Jomsom → Pokhara', desc: 'Fly out.', alt: '827m' },
    ]
  },
  {
    id: 21, name: 'Tsum Valley to Manaslu', difficulty: 'hard', days: 22, interests: ['culture', 'mountains'], altitude: '5,106m', price: 2200, crowd: 'green',
    image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=800&auto=format&fit=crop",
    description: "Combines the profound ancient Tibetan culture of Tsum Valley with the soaring heights of the Manaslu Circuit.",
    itinerary: [
      { day: 1, place: 'Kathmandu → Soti Khola', desc: 'Drive.', alt: '700m' },
      { day: 5, place: 'Tsum Valley', desc: 'Explore monasteries.', alt: '3,700m' },
      { day: 12, place: 'Namrung', desc: 'Join Manaslu trail.', alt: '2,660m' },
      { day: 18, place: 'Larkya La Pass', desc: 'Cross pass.', alt: '5,106m' },
      { day: 22, place: 'Besishahar → Kathmandu', desc: 'Drive.', alt: '1,400m' },
    ]
  }
];

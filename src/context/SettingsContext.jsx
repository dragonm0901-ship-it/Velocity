/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

const translations = {
  // Hero
  'hero.tagline': { EN: 'Nepal\'s Premier Adventure Partner', FR: 'Le partenaire d\'aventure de premier plan au Népal', DE: 'Nepals führender Abenteuerpartner', ZH: '尼泊尔首屈一指的探险伙伴' },
  'hero.title': { EN: 'NEPAL', FR: 'NÉPAL', DE: 'NEPAL', ZH: '尼泊尔' },
  'hero.desc': { EN: 'Curated Himalayan expeditions with real-time booking, local expertise, and uncompromising safety standards.', FR: 'Expéditions himalayennes organisées avec réservation en temps réel, expertise locale et normes de sécurité sans compromis.', DE: 'Kuratierte Himalaya-Expeditionen mit Echtzeitbuchung, lokaler Expertise und kompromisslosen Sicherheitsstandards.', ZH: '精心策划的喜马拉雅探险，提供实时预订、本地专业知识和毫不妥协的安全标准。' },
  'hero.cta': { EN: 'Explore Treks', FR: 'Explorer les randonnées', DE: 'Treks erkunden', ZH: '探索徒步旅行' },
  'hero.secondary': { EN: 'How It Works', FR: 'Comment ça marche', DE: 'So funktioniert es', ZH: '如何运作' },
  'hero.scroll': { EN: 'Scroll', FR: 'Défiler', DE: 'Scrollen', ZH: '滚动' },

  // Navbar
  'nav.destinations': { EN: 'Destinations', FR: 'Destinations', DE: 'Reiseziele', ZH: '目的地' },
  'nav.features': { EN: 'Features', FR: 'Fonctionnalités', DE: 'Funktionen', ZH: '特色' },
  'nav.testimonials': { EN: 'Reviews', FR: 'Avis', DE: 'Bewertungen', ZH: '评论' },
  'nav.contact': { EN: 'Contact', FR: 'Contact', DE: 'Kontakt', ZH: '联系' },
  'nav.book': { EN: 'Book Now', FR: 'Réserver', DE: 'Jetzt buchen', ZH: '立即预订' },

  // Destinations
  'dest.title': { EN: 'Expand Your Horizon.', FR: 'Élargissez vos horizons.', DE: 'Erweitern Sie Ihren Horizont.', ZH: '拓展您的视野。' },
  'dest.desc': { EN: 'Curated expeditions into the heart of the Himalayas. Discover trails that test your limits and reward your spirit.', FR: 'Expéditions organisées au cœur de l\'Himalaya. Découvrez des sentiers qui testent vos limites.', DE: 'Kuratierte Expeditionen ins Herz des Himalaya. Entdecken Sie Pfade, die Ihre Grenzen testen.', ZH: '精心策划的喜马拉雅核心探险。发现测试你极限的小径。' },
  'dest.viewall': { EN: 'View All Treks', FR: 'Voir tous les treks', DE: 'Alle Treks ansehen', ZH: '查看所有路线' },
  'dest.days': { EN: 'Days', FR: 'Jours', DE: 'Tage', ZH: '天' },
  'dest.altitude': { EN: 'Max Altitude', FR: 'Altitude max', DE: 'Max. Höhe', ZH: '最高海拔' },
  'dest.book': { EN: 'Book This Trek', FR: 'Réserver ce trek', DE: 'Trek buchen', ZH: '预订此路线' },

  // Features
  'feat.title': { EN: 'The Premier Experience', FR: 'L\'expérience premium', DE: 'Das Premium-Erlebnis', ZH: '顶级体验' },
  'feat.desc': { EN: 'We handle the logistics of the Himalayas so you can focus on the ascent. From domestic flights to local permits.', FR: 'Nous gérons la logistique de l\'Himalaya pour que vous puissiez vous concentrer sur l\'ascension.', DE: 'Wir kümmern uns um die Logistik des Himalaya, damit Sie sich auf den Aufstieg konzentrieren können.', ZH: '我们处理喜马拉雅山的后勤工作，让您专注于攀登。' },
  'feat.flights': { EN: 'Real-Time Flight Booking', FR: 'Réservation de vols en temps réel', DE: 'Echtzeitflugbuchung', ZH: '实时航班预订' },
  'feat.flights.desc': { EN: 'Direct integration with Yeti Airlines and Buddha Air. Lock your seat to Lukla instantly.', FR: 'Intégration directe avec Yeti Airlines et Buddha Air. Réservez votre siège pour Lukla instantanément.', DE: 'Direkte Anbindung an Yeti Airlines und Buddha Air. Sichern Sie sich sofort Ihren Platz nach Lukla.', ZH: '与雪人航空和佛陀航空直接集成。立即锁定飞往卢卡拉的座位。' },
  'feat.payments': { EN: 'Local & Global Payments', FR: 'Paiements locaux et internationaux', DE: 'Lokale & globale Zahlungen', ZH: '本地和全球支付' },
  'feat.payments.desc': { EN: 'Stripe and PayPal for international travelers, plus eSewa, Fonepay and Khalti for locals.', FR: 'Stripe et PayPal pour les voyageurs internationaux, plus eSewa, Fonepay et Khalti pour les locaux.', DE: 'Stripe und PayPal für internationale Reisende, plus eSewa, Fonepay und Khalti für Einheimische.', ZH: '国际旅客可使用Stripe和PayPal，本地用户可使用eSewa、Fonepay和Khalti。' },
  'feat.permits': { EN: 'Permits Guaranteed', FR: 'Permis garantis', DE: 'Genehmigungen garantiert', ZH: '许可证保证' },
  'feat.permits.desc': { EN: 'TIMS cards and National Park permits pre-arranged before your arrival.', FR: 'Cartes TIMS et permis de parc national pré-arrangés avant votre arrivée.', DE: 'TIMS-Karten und Nationalpark-Genehmigungen vor Ihrer Ankunft vorab organisiert.', ZH: 'TIMS卡和国家公园许可证在您抵达前预先安排。' },
  'feat.weather': { EN: 'Live Weather Data', FR: 'Données météo en direct', DE: 'Live-Wetterdaten', ZH: '实时天气数据' },
  'feat.weather.desc': { EN: 'Dynamic altitude and weather data for Everest Base Camp and Annapurna.', FR: 'Données d\'altitude et météo dynamiques pour le camp de base de l\'Everest et l\'Annapurna.', DE: 'Dynamische Höhen- und Wetterdaten für das Everest Base Camp und Annapurna.', ZH: '珠穆朗玛峰大本营和安纳普尔纳的动态海拔和天气数据。' },

  // Testimonials
  'test.title': { EN: 'What Trekkers Say', FR: 'Ce que disent les randonneurs', DE: 'Was Trekker sagen', ZH: '徒步旅行者怎么说' },

  // CTA
  'cta.title': { EN: 'Ready for the Summit?', FR: 'Prêt pour le sommet ?', DE: 'Bereit für den Gipfel?', ZH: '准备好登顶了吗？' },
  'cta.desc': { EN: 'Start planning your Himalayan expedition today. Our expert team is ready to craft your perfect adventure.', FR: 'Commencez à planifier votre expédition himalayenne dès aujourd\'hui.', DE: 'Beginnen Sie noch heute mit der Planung Ihrer Himalaya-Expedition.', ZH: '今天就开始规划您的喜马拉雅探险。' },
  'cta.btn': { EN: 'Start Planning', FR: 'Commencer la planification', DE: 'Planung starten', ZH: '开始规划' },
  'cta.whatsapp': { EN: 'Chat on WhatsApp', FR: 'Discuter sur WhatsApp', DE: 'Auf WhatsApp chatten', ZH: 'WhatsApp 聊天' },

  // Footer
  'footer.desc': { EN: 'The high-performance booking engine for true Himalayan adventures. Experience Nepal with uncompromising quality.', FR: 'Le moteur de réservation haute performance pour de véritables aventures himalayennes.', DE: 'Die Hochleistungs-Buchungsmaschine für echte Himalaya-Abenteuer.', ZH: '为真正的喜马拉雅探险打造的高性能预订引擎。' },
  'footer.treks': { EN: 'Treks', FR: 'Treks', DE: 'Treks', ZH: '路线' },
  'footer.company': { EN: 'Company', FR: 'Entreprise', DE: 'Unternehmen', ZH: '公司' },
  'footer.everest': { EN: 'Everest Region', FR: 'Région Everest', DE: 'Everest-Region', ZH: '珠穆朗玛峰地区' },
  'footer.annapurna': { EN: 'Annapurna Region', FR: 'Région Annapurna', DE: 'Annapurna-Region', ZH: '安纳普尔纳地区' },
  'footer.langtang': { EN: 'Langtang Region', FR: 'Région Langtang', DE: 'Langtang-Region', ZH: '蓝塘地区' },
  'footer.heli': { EN: 'Helicopter Tours', FR: 'Tours en hélicoptère', DE: 'Hubschrauberrundflüge', ZH: '直升机之旅' },
  'footer.about': { EN: 'About Us', FR: 'À propos', DE: 'Über uns', ZH: '关于我们' },
  'footer.guides': { EN: 'Our Guides', FR: 'Nos guides', DE: 'Unsere Guides', ZH: '我们的向导' },
  'footer.sustain': { EN: 'Sustainability', FR: 'Durabilité', DE: 'Nachhaltigkeit', ZH: '可持续发展' },
  'footer.contact': { EN: 'Contact', FR: 'Contact', DE: 'Kontakt', ZH: '联系我们' },
  'footer.copyright': { EN: 'Project Peak Booking Engine. All rights reserved.', FR: 'Project Peak. Tous droits réservés.', DE: 'Project Peak Buchungsmaschine. Alle Rechte vorbehalten.', ZH: 'Project Peak 预订引擎。保留所有权利。' },
};

export const SettingsProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('EN');

  const rates = {
    USD: 1,
    NPR: 133,
    EUR: 0.92,
  };

  const convertPrice = (usdPrice) => {
    const rate = rates[currency];
    const converted = usdPrice * rate;
    const symbols = { USD: '$', NPR: 'Rs.', EUR: '€' };
    const formatted = Math.round(converted).toLocaleString();
    return `${symbols[currency]} ${formatted}`;
  };

  const t = (key) => {
    return translations[key]?.[language] || translations[key]?.['EN'] || key;
  };

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, language, setLanguage, convertPrice, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

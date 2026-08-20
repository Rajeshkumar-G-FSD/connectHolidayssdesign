export interface WorldTourPackage {
  id: string;
  country: string;
  location: string;
  places: string;
  budgetINR: number;
  image: string;
}

// Location, country, highlights and starting 4N/5D budget supplied for the tour catalogue.
const locations = `UAE|Dubai & Abu Dhabi|Burj Khalifa, Desert Safari, Sheikh Zayed Mosque|45000
Singapore|Singapore City Escape|Marina Bay, Sentosa, Gardens by the Bay|55000
Thailand|Bangkok & Pattaya|Grand Palace, Coral Island, Pattaya|28000
Indonesia|Bali Escape|Ubud, Kuta, Nusa Penida, Tanah Lot|35000
Malaysia|Kuala Lumpur|Petronas Towers, Batu Caves, Genting|30000
Vietnam|Hanoi & Halong Bay|Hanoi, Halong Bay, Old Quarter|30000
Sri Lanka|Colombo & Kandy|Colombo, Kandy, Sigiriya, Bentota|25000
Nepal|Kathmandu & Pokhara|Pashupatinath, Pokhara, Sarangkot|25000
Bhutan|Paro & Thimphu|Tiger's Nest, Thimphu, Punakha|35000
Maldives|Maldives Island Escape|Malé, Maafushi, Water Villas|50000
Mauritius|Mauritius Island|Chamarel, Grand Baie, Ile aux Cerfs|55000
Seychelles|Mahé Island|Victoria, Beau Vallon, Praslin|75000
Malaysia|Langkawi|Sky Bridge, Pantai Cenang, Island Tour|35000
Vietnam|Ho Chi Minh City|Cu Chi Tunnels, Mekong Delta, Saigon|30000
Vietnam|Da Nang & Hoi An|Ba Na Hills, Golden Bridge, Hoi An|35000
Philippines|Manila & Boracay|Manila, White Beach, Island Hopping|55000
Philippines|Cebu|Cebu City, Kawasan Falls, Island Tour|55000
Cambodia|Siem Reap|Angkor Wat, Bayon Temple, Pub Street|30000
Hong Kong|Hong Kong|Victoria Peak, Disneyland, Harbour|55000
Macau|Macau|Ruins of St. Paul's, Cotai, Venetian|55000
Japan|Tokyo|Shibuya, Mount Fuji, Asakusa|85000
Japan|Osaka & Kyoto|Osaka Castle, Fushimi Inari, Arashiyama|85000
South Korea|Seoul|N Seoul Tower, Gyeongbokgung, Myeongdong|70000
China|Beijing|Great Wall, Forbidden City, Tiananmen|65000
China|Shanghai|Bund, Yu Garden, Shanghai Tower|65000
Taiwan|Taipei|Taipei 101, Shilin, Jiufen|60000
Australia|Sydney|Opera House, Harbour Bridge, Bondi|100000
Australia|Melbourne|Great Ocean Road, Federation Square|100000
New Zealand|Auckland|Sky Tower, Rotorua, Waitomo|120000
Turkey|Istanbul|Hagia Sophia, Blue Mosque, Bosphorus|70000
Greece|Athens & Santorini|Acropolis, Oia, Fira|90000
Italy|Rome|Colosseum, Vatican, Trevi Fountain|100000
Italy|Venice|Grand Canal, Rialto Bridge, Murano|100000
Italy|Milan|Duomo, Lake Como, Galleria|100000
France|Paris|Eiffel Tower, Louvre, Versailles|100000
Switzerland|Zurich & Lucerne|Mount Titlis, Lucerne, Rhine Falls|120000
UK|London|Big Ben, Tower Bridge, London Eye|100000
Spain|Barcelona|Sagrada Familia, Park Güell, Gothic Quarter|95000
Spain|Madrid|Royal Palace, Prado, Plaza Mayor|95000
Portugal|Lisbon|Belém, Alfama, Sintra|90000
Netherlands|Amsterdam|Canals, Rijksmuseum, Zaanse Schans|95000
Germany|Munich|Neuschwanstein, Marienplatz, BMW Museum|90000
Austria|Vienna|Schönbrunn, Hofburg, Belvedere|90000
Czech Republic|Prague|Prague Castle, Charles Bridge, Old Town|85000
Hungary|Budapest|Parliament, Buda Castle, Danube|80000
UK|Edinburgh|Edinburgh Castle, Royal Mile, Arthur's Seat|100000
Ireland|Dublin|Trinity College, Temple Bar, Cliffs of Moher|100000
Norway|Oslo & Fjords|Oslo, Fjords, Flåm|120000
Sweden|Stockholm|Gamla Stan, Vasa Museum, Archipelago|110000
Finland|Helsinki|Suomenlinna, Helsinki Cathedral, Lapland|120000
Iceland|Reykjavik|Blue Lagoon, Golden Circle, Waterfalls|130000
Denmark|Copenhagen|Nyhavn, Tivoli, Rosenborg|110000
Croatia|Dubrovnik|Old Town, City Walls, Adriatic Coast|100000
Georgia|Tbilisi & Kazbegi|Tbilisi, Gudauri, Kazbegi|55000
Armenia|Yerevan|Lake Sevan, Garni, Geghard|55000
Azerbaijan|Baku|Flame Towers, Old City, Gobustan|55000
Egypt|Cairo & Giza|Pyramids, Sphinx, Nile|65000
Jordan|Amman & Petra|Petra, Wadi Rum, Dead Sea|75000
Israel|Jerusalem & Tel Aviv|Old City, Dead Sea, Tel Aviv|90000
Morocco|Marrakech|Medina, Sahara, Jemaa el-Fnaa|80000
South Africa|Cape Town|Table Mountain, Cape Point, Waterfront|90000
Kenya|Nairobi & Safari|Maasai Mara, Nairobi, Giraffe Centre|100000
Tanzania|Zanzibar|Stone Town, Nungwi, Safari|100000
Tanzania|Serengeti Safari|Serengeti, Ngorongoro, Arusha|120000
Zimbabwe|Victoria Falls|Victoria Falls, Zambezi|100000
Namibia|Namibia Escape|Sossusvlei, Swakopmund, Etosha|120000
Botswana|Okavango Safari|Okavango Delta, Chobe|150000
Ghana|Accra & Cape Coast|Accra, Cape Coast, Kakum|90000
Morocco|Casablanca & Marrakech|Casablanca, Marrakech, Atlas Mountains|80000
Rwanda|Kigali & Gorilla Safari|Kigali, Volcanoes National Park|120000
USA|New York|Times Square, Statue of Liberty, Central Park|130000
USA|Los Angeles|Hollywood, Santa Monica, Beverly Hills|130000
USA|Las Vegas|Strip, Grand Canyon, Fremont Street|130000
USA|San Francisco|Golden Gate, Alcatraz, Fisherman's Wharf|130000
Canada|Toronto|CN Tower, Niagara Falls, Downtown|120000
Canada|Vancouver|Stanley Park, Whistler, Capilano|130000
Mexico|Cancun|Beaches, Chichen Itza, Cenotes|110000
Mexico|Mexico City|Zócalo, Teotihuacan, Frida Kahlo Museum|100000
Brazil|Rio de Janeiro|Christ the Redeemer, Copacabana|120000
Peru|Lima & Machu Picchu|Lima, Cusco, Machu Picchu|140000
Argentina|Buenos Aires|La Boca, Recoleta, Tango Show|130000
Chile|Santiago|Andes, Santiago, Valparaiso|130000
Colombia|Cartagena|Old Town, Rosario Islands, Beaches|120000
Bolivia|Uyuni|Salar de Uyuni, La Paz|130000
Ecuador|Quito & Galápagos|Quito, Galápagos Islands|160000
Panama|Panama City|Canal, Casco Viejo, Islands|120000
Costa Rica|San José & Arenal|Volcano, Rainforest, Waterfalls|120000
Dominican Republic|Punta Cana|Beaches, Saona Island, Resorts|110000
Jamaica|Montego Bay|Beaches, Dunn's River Falls|120000
Aruba|Aruba Island|Palm Beach, Eagle Beach, Oranjestad|130000
Fiji|Fiji Islands|Nadi, Coral Coast, Island Cruise|110000
French Polynesia|Bora Bora|Mount Otemanu, Lagoon, Motu|200000
Palau|Palau Islands|Rock Islands, Blue Lagoon, Diving|140000
Vanuatu|Port Vila|Blue Lagoon, Efate, Waterfalls|120000
Philippines|Palawan|El Nido, Coron, Island Hopping|60000
Indonesia|Jakarta & Bandung|Jakarta, Bandung, Kawah Putih|40000
Thailand|Phuket & Krabi|Phi Phi, James Bond Island, Railay|32000
Vietnam|Phu Quoc|Beaches, VinWonders, Island Tour|35000
Portugal|Porto|Ribeira, Douro Valley, Livraria Lello|90000
Switzerland|Interlaken|Jungfrau, Lauterbrunnen, Grindelwald|120000`;

export const WORLD_TOUR_PACKAGES: WorldTourPackage[] = locations.split('\n').map((line, index) => {
  const [country, location, places, budget] = line.split('|');
  const search = encodeURIComponent(`${location} ${country} travel`);
  return {
    id: `world-tour-${index + 1}`,
    country,
    location,
    places,
    budgetINR: Number(budget),
    // Location search returns a travel photograph matched to this tour at display time.
    image: `https://loremflickr.com/900/700/${search}`,
  };
});

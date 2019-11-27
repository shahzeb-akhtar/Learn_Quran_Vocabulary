var surahInfo = [[7,5,1, 'الفاتحة', "Al-Faatiha", 'The Opening', 'Meccan', 1],
			[286,87,40, 'البقرة', "Al-Baqara", 'The Cow', 'Medinan', 2],
			[200,89,20, 'آل عمران', "Aal-i-Imraan", 'The Family of Imraan', 'Medinan', 3],
			[176,92,24, 'النساء', "An-Nisaa", 'The Women', 'Medinan', 4],
			[120,112,16, 'المائدة', "Al-Maaida", 'The Table', 'Medinan', 5],
			[165,55,20, 'الأنعام', "Al-An'aam", 'The Cattle', 'Meccan', 6],
			[206,39,24, 'الأعراف', "Al-A'raaf", 'The Heights', 'Meccan', 7],
			[75,88,10, 'الأنفال', "Al-Anfaal", 'The Spoils of War', 'Medinan', 8],
			[129,113,16, 'التوبة', "At-Tawba", 'The Repentance', 'Medinan', 9],
			[109,51,11, 'يونس', "Yunus", 'Jonas', 'Meccan', 10],
			[123,52,10, 'هود', "Hud", 'Hud', 'Meccan', 11],
			[111,53,12, 'يوسف', "Yusuf", 'Joseph', 'Meccan', 12],
			[43,96,6, 'الرعد', "Ar-Ra'd", 'The Thunder', 'Medinan', 13],
			[52,72,7, 'ابراهيم', "Ibrahim", 'Abraham', 'Meccan', 14],
			[99,54,6, 'الحجر', "Al-Hijr", 'The Rock', 'Meccan', 15],
			[128,70,16, 'النحل', "An-Nahl", 'The Bee', 'Meccan', 16],
			[111,50,12, 'الإسراء', "Al-Israa", 'The Night Journey', 'Meccan', 17],
			[110,69,12, 'الكهف', "Al-Kahf", 'The Cave', 'Meccan', 18],
			[98,44,6, 'مريم', "Maryam", 'Mary', 'Meccan', 19],
			[135,45,8, 'طه', "Taa-Haa", 'Taa-Haa', 'Meccan', 20],
			[112,73,7, 'الأنبياء', "Al-Anbiyaa", 'The Prophets', 'Meccan', 21],
			[78,103,10, 'الحج', "Al-Hajj", 'The Pilgrimage', 'Medinan', 22],
			[118,74,6, 'المؤمنون', "Al-Muminoon", 'The Believers', 'Meccan', 23],
			[64,102,9, 'النور', "An-Noor", 'The Light', 'Medinan', 24],
			[77,42,6, 'الفرقان', "Al-Furqaan", 'The Criterion', 'Meccan', 25],
			[227,47,11, 'الشعراء', "Ash-Shu'araa", 'The Poets', 'Meccan', 26],
			[93,48,7, 'النمل', "An-Naml", 'The Ant', 'Meccan', 27],
			[88,49,8, 'القصص', "Al-Qasas", 'The Stories', 'Meccan', 28],
			[69,85,7, 'العنكبوت', "Al-Ankaboot", 'The Spider', 'Meccan', 29],
			[60,84,6, 'الروم', "Ar-Room", 'The Romans', 'Meccan', 30],
			[34,57,3, 'لقمان', "Luqman", 'Luqman', 'Meccan', 31],
			[30,75,3, 'السجدة', "As-Sajda", 'The Prostration', 'Meccan', 32],
			[73,90,9, 'الأحزاب', "Al-Ahzaab", 'The Clans', 'Medinan', 33],
			[54,58,6, 'سبإ', "Saba", 'Sheba', 'Meccan', 34],
			[45,43,5, 'فاطر', "Faatir", 'The Originator', 'Meccan', 35],
			[83,41,5, 'يس', "Yaseen", 'Yaseen', 'Meccan', 36],
			[182,56,5, 'الصافات', "As-Saaffaat", 'Those drawn up in Ranks', 'Meccan', 37],
			[88,38,5, 'ص', "Saad", 'The letter Saad', 'Meccan', 38],
			[75,59,8, 'الزمر', "Az-Zumar", 'The Groups', 'Meccan', 39],
			[85,60,9, 'غافر', "Al-Ghaafir", 'The Forgiver', 'Meccan', 40],
			[54,61,6, 'فصلت', "Fussilat", 'Explained in detail', 'Meccan', 41],
			[53,62,5, 'الشورى', "Ash-Shura", 'Consultation', 'Meccan', 42],
			[89,63,7, 'الزخرف', "Az-Zukhruf", 'Ornaments of gold', 'Meccan', 43],
			[59,64,3, 'الدخان', "Ad-Dukhaan", 'The Smoke', 'Meccan', 44],
			[37,65,4, 'الجاثية', "Al-Jaathiya", 'Crouching', 'Meccan', 45],
			[35,66,4, 'الأحقاف', "Al-Ahqaf", 'The Dunes', 'Meccan', 46],
			[38,95,4, 'محمد', "Muhammad", 'Muhammad', 'Medinan', 47],
			[29,111,4, 'الفتح', "Al-Fath", 'The Victory', 'Medinan', 48],
			[18,106,2, 'الحجرات', "Al-Hujuraat", 'The Inner Apartments', 'Medinan', 49],
			[45,34,3, 'ق', "Qaaf", 'The letter Qaaf', 'Meccan', 50],
			[60,67,3, 'الذاريات', "Adh-Dhaariyat", 'The Winnowing Winds', 'Meccan', 51],
			[49,76,2, 'الطور', "At-Tur", 'The Mount', 'Meccan', 52],
			[62,23,3, 'النجم', "An-Najm", 'The Star', 'Meccan', 53],
			[55,37,3, 'القمر', "Al-Qamar", 'The Moon', 'Meccan', 54],
			[78,97,3, 'الرحمن', "Ar-Rahmaan", 'The Beneficent', 'Medinan', 55],
			[96,46,3, 'الواقعة', "Al-Waaqia", 'The Inevitable', 'Meccan', 56],
			[29,94,4, 'الحديد', "Al-Hadid", 'The Iron', 'Medinan', 57],
			[22,105,3, 'المجادلة', "Al-Mujaadila", 'The Pleading Woman', 'Medinan', 58],
			[24,101,3, 'الحشر', "Al-Hashr", 'The Exile', 'Medinan', 59],
			[13,91,2, 'الممتحنة', "Al-Mumtahana", 'She that is to be examined', 'Medinan', 60],
			[14,109,2, 'الصف', "As-Saff", 'The Ranks', 'Medinan', 61],
			[11,110,2, 'الجمعة', "Al-Jumu'a", 'Friday', 'Medinan', 62],
			[11,104,2, 'المنافقون', "Al-Munaafiqoon", 'The Hypocrites', 'Medinan', 63],
			[18,108,2, 'التغابن', "At-Taghaabun", 'Mutual Disillusion', 'Medinan', 64],
			[12,99,2, 'الطلاق', "At-Talaaq", 'Divorce', 'Medinan', 65],
			[12,107,2, 'التحريم', "At-Tahrim", 'The Prohibition', 'Medinan', 66],
			[30,77,2, 'الملك', "Al-Mulk", 'The Sovereignty', 'Meccan', 67],
			[52,2,2, 'القلم', "Al-Qalam", 'The Pen', 'Meccan', 68],
			[52,78,2, 'الحاقة', "Al-Haaqqa", 'The Reality', 'Meccan', 69],
			[44,79,2, 'المعارج', "Al-Ma'aarij", 'The Ascending Stairways', 'Meccan', 70],
			[28,71,2, 'نوح', "Nooh", 'Noah', 'Meccan', 71],
			[28,40,2, 'الجن', "Al-Jinn", 'The Jinn', 'Meccan', 72],
			[20,3,2, 'المزمل', "Al-Muzzammil", 'The Enshrouded One', 'Meccan', 73],
			[56,4,2, 'المدثر', "Al-Muddaththir", 'The Cloaked One', 'Meccan', 74],
			[40,31,2, 'القيامة', "Al-Qiyaama", 'The Resurrection', 'Meccan', 75],
			[31,98,2, 'الانسان', "Al-Insaan", 'Man', 'Medinan', 76],
			[50,33,2, 'المرسلات', "Al-Mursalaat", 'The Emissaries', 'Meccan', 77],
			[40,80,2, 'النبإ', "An-Naba", 'The Announcement', 'Meccan', 78],
			[46,81,2, 'النازعات', "An-Naazi'aat", 'Those who drag forth', 'Meccan', 79],
			[42,24,1, 'عبس', "Abasa", 'He frowned', 'Meccan', 80],
			[29,7,1, 'التكوير', "At-Takwir", 'The Overthrowing', 'Meccan', 81],
			[19,82,1, 'الإنفطار', "Al-Infitaar", 'The Cleaving', 'Meccan', 82],
			[36,86,1, 'المطففين', "Al-Mutaffifin", 'Defrauding', 'Meccan', 83],
			[25,83,1, 'الإنشقاق', "Al-Inshiqaaq", 'The Splitting Open', 'Meccan', 84],
			[22,27,1, 'البروج', "Al-Burooj", 'The Constellations', 'Meccan', 85],
			[17,36,1, 'الطارق', "At-Taariq", 'The Morning Star', 'Meccan', 86],
			[19,8,1, 'الأعلى', "Al-A'laa", 'The Most High', 'Meccan', 87],
			[26,68,1, 'الغاشية', "Al-Ghaashiya", 'The Overwhelming', 'Meccan', 88],
			[30,10,1, 'الفجر', "Al-Fajr", 'The Dawn', 'Meccan', 89],
			[20,35,1, 'البلد', "Al-Balad", 'The City', 'Meccan', 90],
			[15,26,1, 'الشمس', "Ash-Shams", 'The Sun', 'Meccan', 91],
			[21,9,1, 'الليل', "Al-Lail", 'The Night', 'Meccan', 92],
			[11,11,1, 'الضحى', "Ad-Dhuhaa", 'The Morning Hours', 'Meccan', 93],
			[8,12,1, 'الشرح', "Ash-Sharh", 'The Consolation', 'Meccan', 94],
			[8,28,1, 'التين', "At-Tin", 'The Fig', 'Meccan', 95],
			[19,1,1, 'العلق', "Al-Alaq", 'The Clot', 'Meccan', 96],
			[5,25,1, 'القدر', "Al-Qadr", 'The Power, Fate', 'Meccan', 97],
			[8,100,1, 'البينة', "Al-Bayyina", 'The Evidence', 'Medinan', 98],
			[8,93,1, 'الزلزلة', "Az-Zalzala", 'The Earthquake', 'Medinan', 99],
			[11,14,1, 'العاديات', "Al-Aadiyaat", 'The Chargers', 'Meccan', 100],
			[11,30,1, 'القارعة', "Al-Qaari'a", 'The Calamity', 'Meccan', 101],
			[8,16,1, 'التكاثر', "At-Takaathur", 'Competition', 'Meccan', 102],
			[3,13,1, 'العصر', "Al-Asr", 'The Declining Day, Epoch', 'Meccan', 103],
			[9,32,1, 'الهمزة', "Al-Humaza", 'The Traducer', 'Meccan', 104],
			[5,19,1, 'الفيل', "Al-Fil", 'The Elephant', 'Meccan', 105],
			[4,29,1, 'قريش', "Quraish", 'Quraysh', 'Meccan', 106],
			[7,17,1, 'الماعون', "Al-Maa'un", 'Almsgiving', 'Meccan', 107],
			[3,15,1, 'الكوثر', "Al-Kawthar", 'Abundance', 'Meccan', 108],
			[6,18,1, 'الكافرون', "Al-Kaafiroon", 'The Disbelievers', 'Meccan', 109],
			[3,114,1, 'النصر', "An-Nasr", 'Divine Support', 'Medinan', 110],
			[5,6,1, 'المسد', "Al-Masad", 'The Palm Fibre', 'Meccan', 111],
			[4,22,1, 'الإخلاص', "Al-Ikhlaas", 'Sincerity', 'Meccan', 112],
			[5,20,1, 'الفلق', "Al-Falaq", 'The Dawn', 'Meccan', 113],
			[6,21,1, 'الناس', "An-Naas", 'Mankind', 'Meccan', 114]
			],
		surahDesc = ["Al-Faatiha is the first surah",
			"Al-Baqara is the 2nd surah",
			"Aal-i-Imraan is the  3rd surah",
			"An-Nisaa is the 4th surah",
			"Al-Maaida is the 5th surah",
			"Al-An'aam is the 6th surah",
			"Al-A'raaf is the 7th surah",
			"Al-Anfaal is the 8th surah",
			"At-Tawba is the 9th surah",
			"Yunus is the 10th surah",
			"Hud is the 11th surah",
			"Yusuf is the 12th surah",
			"Ar-Ra'd is the 13th surah",
			"Ibrahim is the 14th surah",
			"Al-Hijr is the 15th surah",
			"An-Nahl is the 16th surah",
			"Al-Israa is the 17th surah",
			"Al-Kahf is the 18th surah",
			"Maryam is the 19th surah",
			"Taa-Haa is the 20th surah",
			"Al-Anbiyaa is the 21st surah",
			"Al-Hajj is the 22nd surah",
			"Al-Muminoon is the 23rd surah",
			"An-Noor is the 24th surah",
			"Al-Furqaan is the 25th surah",
			"Ash-Shu'araa is the 26th surah",
			"An-Naml is the 27th surah",
			"Al-Qasas is the 28th surah",
			"Al-Ankaboot is the 29th surah",
			"Ar-Room is the 30th surah",
			"Luqman is the 31st surah",
			"As-Sajda is the 32nd surah",
			"Al-Ahzaab is the 33rd surah",
			"Saba is the 34th surah",
			"Faatir is the 35th surah",
			"Yaseen is the 36th surah",
			"As-Saaffaat is the 37th surah",
			"Saad is the 38th surah",
			"Az-Zumar is the 39th surah",
			"Al-Ghaafir is the 40th surah",
			"Fussilat is the 41st surah",
			"Ash-Shura is the 42nd surah",
			"Az-Zukhruf is the 43rd surah",
			"Ad-Dukhaan is the 44th surah",
			"Al-Jaathiya is the 45th surah",
			"Al-Ahqaf is the 46th surah",
			"Muhammad is the 47th surah",
			"Al-Fath is the 48th surah",
			"Al-Hujuraat is the 49th surah",
			"Qaaf is the 50th surah",
			"Adh-Dhaariyat is the 51st surah",,
			"At-Tur is the 52nd surah",
			"An-Najm is the 53rd surah",
			"Al-Qamar is the 54th surah",
			"Ar-Rahmaan is the 55th surah",
			"Al-Waaqia is the 56th surah",
			"Al-Hadid is the 57th surah",
			"Al-Mujaadila is the 58th surah",
			"Al-Hashr is the 59th surah",
			"Al-Mumtahana is the 60th surah",
			"As-Saff is the 61st surah",
			"Al-Jumu'a is the 62nd surah",
			"Al-Munaafiqoon is the 63rd surah",
			"At-Taghaabun is the 64th surah",
			"At-Talaaq is the 65th surah",
			"At-Tahrim is the 66th surah",
			"Al-Mulk is the 67th surah",
			"Al-Qalam is the 68th surah",
			"Al-Haaqqa is the 69th surah",
			"Al-Ma'aarij is the 70th surah",
			"Nooh is the 71st surah",
			"Al-Jinn is the 72nd surah",
			"Al-Muzzammil is the 73rd surah",
			"Al-Muddaththir is the 74th surah",
			"Al-Qiyaama is the 75th surah",
			"Al-Insaan is the 76th surah",
			"Al-Mursalaat is the 77th surah",
			"An-Naba is the 78th surah",
			"An-Naazi'aat is the 79th surah",
			"Abasa is the 80th surah",
			"At-Takwir is the 81st surah",
			"Al-Infitaar is the 82nd surah",
			"Al-Mutaffifin is the 83rd surah",
			"Al-Inshiqaaq is the 84th surah",
			"Al-Burooj is the 85th surah",
			"At-Taariq is the 86th surah",
			"Al-A'laa is the 87th surah",
			"Al-Ghaashiya is the 88th surah",
			"Al-Fajr is the 89th surah",
			"Al-Balad is the 90th surah",
			"Ash-Shams is the 91st surah",
			"Al-Lail is the 92nd surah",
			"Ad-Dhuhaa is the 93rd surah",
			"Ash-Sharh is the 94th surah",
			"At-Tin is the 95th surah",
			"Al-Alaq is the 96th surah",
			"Al-Qadr is the 97th surah",
			"Al-Bayyina is the 98th surah",,
			"Az-Zalzala is the 99th surah",
			"Al-Aadiyaat is the 100th surah",
			"Al-Qaari'a is the 101st surah",
			"At-Takaathur is the 102nd surah",
			"Al-Asr is the 103rd surah",
			"Al-Humaza is the 104th surah",
			"Al-Fil is the 105th surah",
			"Quraish is the 106th surah",
			"Al-Maa'un is the 107th surah",
			"Al-Kawthar is the 108th surah",
			"Al-Kaafiroon is the 109th surah",
			"An-Nasr is the 110th surah",
			"Al-Masad is the 111th surah",
			"Al-Ikhlaas is the 112th surah",
			"Al-Falaq is the 113th surah",
			"An-Naas is the 114th surah"
			];

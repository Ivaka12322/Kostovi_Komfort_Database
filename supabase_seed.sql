-- Seed file for initial categories and subcategories

-- We will use anonymous blocks (DO $$) to avoid duplicate insertions 
-- but keep it simple with standard INSERT and ON CONFLICT if we had unique constraints.
-- Since UUIDs are generated, we can't easily rely on ON CONFLICT without predefined UUIDs or unique names.
-- Let's just do a clean insert. You should only run this ONCE on an empty database.

DO $$
DECLARE
  entry_id UUID := gen_random_uuid();
  interior_id UUID := gen_random_uuid();
  garage_id UUID := gen_random_uuid();
  other_id UUID := gen_random_uuid();
BEGIN
  -- Insert Main Categories
  INSERT INTO categories (id, name, services_image_url) VALUES
    (entry_id, 'Входни Врати', 'https://images.pexels.com/photos/2564866/pexels-photo-2564866.jpeg?_gl=1*1q6d8a3*_ga*MTgwMDI1MjAyNS4xNzc3NzM3MjU3*_ga_8JE65Q40S6*czE3Nzc3MzcyNTckbzEkZzEkdDE3Nzc3MzcyNzYkajQxJGwwJGgw'),
    (interior_id, 'Интериорни Врати', 'https://images.pexels.com/photos/6585753/pexels-photo-6585753.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (garage_id, 'Гаражни Врати', 'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    (other_id, 'Други Врати', 'https://images.pexels.com/photos/6585765/pexels-photo-6585765.jpeg?auto=compress&cs=tinysrgb&w=1200');

  -- Insert Subcategories for 'Входни Врати'
  INSERT INTO subcategories (category_id, name, description, image_url) VALUES
    (entry_id, 'Метални Врати', 'Металните входни врати предлагат максимална здравина и дълготрайност. Изработени от висококачествена стомана, те осигуряват отлична защита срещу взлом, с разнообразие от цветове, покрития и декоративни елементи, подходящи за всеки архитектурен стил.', 'https://images.pexels.com/photos/1827054/pexels-photo-1827054.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (entry_id, 'Блиндирани Врати', 'Блиндираните врати са специално проектирани за максимална защита на вашия дом. Многоточковото заключване и противовзломните системи осигуряват сигурност от най-висок клас, като в същото време поддържат елегантен външен вид.', 'https://images.pexels.com/photos/5584052/pexels-photo-5584052.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (entry_id, 'За Къща', 'Входните врати за еднофамилни къщи съчетават монументален дизайн с висока енергийна ефективност. Предлагаме широка гама от материали, размери и стилове, идеални за модерни и традиционни архитектурни концепции.', 'https://images.pexels.com/photos/6585759/pexels-photo-6585759.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (entry_id, 'За Панел без Къртене', 'Специализираните врати за панелни блокове се монтират без необходимост от ремонтни дейности. Прецизно изработени в стандартни размери за панелни апартаменти, те предлагат бърза и чиста инсталация с минимални неудобства.', 'https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg?auto=compress&cs=tinysrgb&w=600');

  -- Insert Subcategories for 'Интериорни Врати'
  INSERT INTO subcategories (category_id, name, description, image_url) VALUES
    (interior_id, 'Класически Врати', 'Класическите интериорни врати са вечен избор, подходящ за всеки стил на домашен интериор. Изработени от масив или ПДЧ с разнообразни покрития и филийки, те внасят топлота и традиционен стил в пространството.', 'https://images.pexels.com/photos/6585758/pexels-photo-6585758.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (interior_id, 'Модерни Врати', 'Модерните интериорни врати представят чистите линии и минималистичната естетика на съвременния дизайн. Гладките повърхности, иновативните материали и стъклените елементи създават светло и просторно усещане.', 'https://images.pexels.com/photos/6585762/pexels-photo-6585762.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (interior_id, 'Плъзгащи Врати', 'Плъзгащите интериорни врати са идеалното решение за пестене на пространство в по-малки помещения. Скритите механизми и тихото движение осигуряват функционалност и елегантен вид без компромис с дизайна.', 'https://images.pexels.com/photos/6585764/pexels-photo-6585764.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (interior_id, 'Хармоника Врати', 'Вратите тип хармоника са практично и гъвкаво решение за разделяне на пространства или достъп до тесни отвори. Компактното сгъване, лесната употреба и разнообразието от дизайни ги правят популярен избор.', 'https://images.pexels.com/photos/6585756/pexels-photo-6585756.jpeg?auto=compress&cs=tinysrgb&w=600');

  -- Insert Subcategories for 'Гаражни Врати'
  INSERT INTO subcategories (category_id, name, description, image_url) VALUES
    (garage_id, 'Ролетни Врати', 'Ролетните гаражни врати предлагат компактно, практично решение, идеално за гаражи с ограничено тавано пространство. Алуминиевите ламели осигуряват дълготрайност, а моторизираното управление добавя комфорт от ново ниво.', 'https://images.pexels.com/photos/2816932/pexels-photo-2816932.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (garage_id, 'Охранителни Ролетки', 'Охранителните ролетки съчетават защитната функция с практичността на ролетните системи. Усилената конструкция и противовзломните механизми осигуряват надеждна сигурност за вашия гараж и собственост.', 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (garage_id, 'Секционни Врати', 'Секционните гаражни врати са най-популярният избор за модерни домове. Системата от хоризонтални панели позволява оптимално използване на гаражното пространство, а автоматиката Hörmann гарантира плавна и тиха работа.', 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (garage_id, 'Летящо Крило', 'Едночастните гаражни врати тип "летящо крило" представляват класическо, издръжливо и икономично решение. Плавното отваряне нагоре, здравата конструкция и простата механика ги правят отличен дългосрочен избор.', 'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600');

  -- Insert Subcategories for 'Други Врати'
  INSERT INTO subcategories (category_id, name, description, image_url) VALUES
    (other_id, 'Стъклени Врати', 'Стъклените врати привнасят светлина и усещане за пространство в интериора. Изработени от закалено или ламинирано стъкло в алуминиеви или стоманени профили, те са елегантен и съвременен избор за домове и офиси.', 'https://images.pexels.com/photos/6585761/pexels-photo-6585761.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (other_id, 'Пожароустойчиви Врати', 'Пожароустойчивите врати са задължителен елемент за сигурността на жилищни и търговски обекти. Сертифицирани по европейски стандарти (EI30, EI60, EI90), те осигуряват критично важно забавяне при пожар и спокойствие.', 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (other_id, 'Врати за Баня', 'Специализираните врати за баня са изработени от влагоустойчиви материали и покрития, устойчиви на влага и чести колебания в температурата. Предлагаме разнообразни дизайни, подходящи за всеки банен интериор.', 'https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=600'),
    (other_id, 'Тераса и Балкон', 'Вратите за тераса и балкон свързват вашия дом с открития свят, като осигуряват отлична топлоизолация и защита от UV лъчение. Достъпни в различни конфигурации на отваряне, те добавят стойност и комфорт.', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600');
END $$;
